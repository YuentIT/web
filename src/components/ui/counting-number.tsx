"use client";

import {
  type AnimationPlaybackControls,
  type ValueAnimationTransition,
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useEffect, useLayoutEffect, useRef } from "react";

import { cn } from "@/lib/utils";

/**
 * `useLayoutEffect` sunucuda uyarı basar; istemcide ise **boyamadan önce**
 * çalışır. Sayacın başlangıç değerini boyamadan önce sıfırlamak zorundayız
 * (aşağıdaki açıklamaya bakın), o yüzden ikisi arasında ortama göre seçiyoruz.
 */
const useIzoLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export type CountingNumberProps = {
  /** Sayacın duracağı rakam. */
  target: number;
  /** Nereden başlasın. */
  from?: number;
  transition?: ValueAnimationTransition;
  className?: string;
};

/**
 * Görünür olunca hedefine kadar sayan rakam (Animate UI `counting-number`,
 * projeye uyarlanmış hâli).
 *
 * `motion` paketi bu bileşen için kuruldu — `SITE_PLAN.md` §4'teki animasyon
 * kararının "ilk gerçek ihtiyaçta kurulur" maddesi.
 *
 * Kaynak bileşenden dört sapma var, dördü de projenin kendi kurallarından:
 *
 * 1. **Sunucu son rakamı basıyor, sıfırı değil.** Kaynak bileşen `from` ile
 *    başlıyor, yani JS çalışmazsa sayfada temelli "0" kalıyordu. Burada motion
 *    değeri doğrudan `target` ile kuruluyor: HTML'de rakam yazılı geliyor,
 *    hydration uyuşuyor ve JS hiç çalışmazsa doğru sayı görünmeye devam ediyor.
 *
 * 2. **Sıfırlama boyamadan önce ve DOM'a doğrudan.** Değer `target`la
 *    kurulduğu için sayacın başlayabilmesi geri alınmasını gerektiriyor; bu
 *    `useLayoutEffect` içinde, ilk boyamadan önce yapılıyor. `set()` tek başına
 *    yetmiyor — gerekçesi efektin içinde yazılı.
 *
 * 3. **Görünürlükte başlıyor, mount'ta değil.** Sayı bandı ilk ekranın altında;
 *    `autoStart` ile sayma, kullanıcı oraya kaydırmadan biterdi.
 *
 * 4. **`prefers-reduced-motion` altında hiç oynamıyor.** Rakam doğrudan son
 *    değerinde duruyor — `RoketSayilar` ile aynı davranış.
 */
export function CountingNumber({
  target,
  from = 0,
  transition = { duration: 2, ease: "easeOut", type: "tween" },
  className,
}: CountingNumberProps) {
  const sayi = useMotionValue(target);
  // Binlik ayracı **bilerek yok**: içerikte "2000+" yazıyor, "2.000+" değil.
  const metin = useTransform(sayi, (an) => String(Math.round(an)));
  const kapsayici = useRef<HTMLSpanElement>(null);

  useIzoLayoutEffect(() => {
    const el = kapsayici.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    sayi.set(from);
    // `set()` tek başına ekrana yansımıyor: `motion`, MotionValue çocuğunu
    // kendi kare döngüsünde DOM'a yazıyor ve o döngü yalnızca aktif bir
    // animasyon varken dönüyor. Animasyon henüz başlamadığı için burada
    // planlanan hiçbir kare yok, dolayısıyla `set()` sessizce beklemede
    // kalıyor ve ekranda sunucudan gelen rakam duruyordu. Sonuç: sayaç
    // başlayınca rakam hedeften sıfıra **sıçrıyordu.** İlk değeri bu yüzden
    // doğrudan yazıyoruz; animasyon başlayınca yazma işini `motion` devralıyor.
    el.textContent = String(from);

    let kontrol: AnimationPlaybackControls | null = null;
    const basla = () => {
      kontrol = animate(sayi, target, transition);
    };

    // Gözlemci yoksa beklemenin anlamı yok: rakam sıfırda kalmaktansa saysın.
    if (typeof IntersectionObserver === "undefined") {
      basla();
      return () => kontrol?.stop();
    }

    // `rootMargin` ile alt sınır 200 px aşağı taşınıyor: sayma, bant ekranın
    // altındayken başlıyor. Eşik 0.4 olsaydı sayaç ancak bant %40 görününce
    // başlar, kullanıcı sıfırdan başlayışı izlerdi. Şimdi bant görüş alanına
    // girdiğinde sayma çoktan sürüyor.
    const gozlemci = new IntersectionObserver(
      (girisler) => {
        if (!girisler.some((g) => g.isIntersecting)) return;
        gozlemci.disconnect();
        basla();
      },
      { rootMargin: "0px 0px 200px 0px", threshold: 0 },
    );
    gozlemci.observe(el);

    return () => {
      gozlemci.disconnect();
      kontrol?.stop();
    };
    // `transition` bilerek bağımlılık listesinde yok: her boyamada yeni bir
    // nesne olduğu için konulsaydı sayaç sonsuza kadar yeniden başlardı.
    // (`exhaustive-deps` bu efekti hiç denetlemiyor — kural yalnızca hook'u
    // adıyla tanıdığında çalışıyor, burada takma ad var. Liste elle doğru
    // tutulmalı.)
  }, [from, target, sayi]);

  return (
    <motion.span ref={kapsayici} className={cn("tabular-nums", className)}>
      {metin}
    </motion.span>
  );
}
