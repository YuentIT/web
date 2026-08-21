"use client";

import {
  AnimatePresence,
  type Transition,
  type Variants,
  motion,
  useReducedMotion,
} from "motion/react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

/** Yoğun sönümlü yay: kelime yerine oturuyor, zıplamıyor. */
const GECIS: Transition = {
  type: "spring",
  stiffness: 900,
  damping: 80,
  mass: 10,
};

/** Kelime alttan dönerek geliyor, üstten dönerek çıkıyor. */
const VARYANTLAR: Variants = {
  initial: { y: 20, rotateX: 90, opacity: 0, filter: "blur(4px)" },
  animate: { y: 0, rotateX: 0, opacity: 1, filter: "blur(0px)" },
  exit: { y: -20, rotateX: -90, opacity: 0, filter: "blur(4px)" },
};

/**
 * Sırayla değişen kelime (motion-primitives `TextLoop`, projeye uyarlanmış).
 *
 * Ana sayfa başlığının ikinci satırı için yazıldı: üst satır sabit
 * ("İzlemekle Kalma,"), bu satır dönüyor.
 *
 * **`aria-hidden` bilerek:** iki saniyede bir değişen bir kelime ekran
 * okuyucuda başlığı sürekli yeniden okutur. Erişilebilir adı çağıran veriyor
 * (`Hero`daki `aria-label`), buradaki dönüş görsel süs sayılıyor.
 *
 * Üç uyarlama, üçü de projenin kendi kurallarından:
 *
 * 1. **`AnimatePresence initial={false}`** — sunucu ilk kelimeyi *son*
 *    hâliyle basıyor. Olmasaydı sunucu çıktısı `initial` varyantını alır,
 *    yani başlığın ikinci satırı HTML'de saydam ve bulanık gelirdi; JS
 *    çalışmayan tarayıcıda temelli görünmezdi.
 * 2. **`prefers-reduced-motion` altında döngü hiç kurulmuyor**, ilk kelime
 *    sabit duruyor.
 * 3. **Sekme arka plandayken sayaç duruyor.** `setInterval` arka planda da
 *    işliyor ama kare gelmediği için geçişler birikiyor; kullanıcı döndüğünde
 *    kelimeler üst üste atlıyordu. Görünürlük değişiminde durdurup başlatıyoruz.
 */
export function TextLoop({
  kelimeler,
  aralik = 2200,
  className,
}: {
  kelimeler: string[];
  /** İki kelime arası bekleme, ms. */
  aralik?: number;
  className?: string;
}) {
  const [sira, setSira] = useState(0);
  const hareketKisitli = useReducedMotion();

  useEffect(() => {
    if (hareketKisitli || kelimeler.length < 2) return;

    let sayac: ReturnType<typeof setInterval> | null = null;
    const durdur = () => {
      if (sayac) clearInterval(sayac);
      sayac = null;
    };
    const basla = () => {
      durdur();
      sayac = setInterval(
        () => setSira((n) => (n + 1) % kelimeler.length),
        aralik,
      );
    };

    const gorunurlukDegisti = () => (document.hidden ? durdur() : basla());
    gorunurlukDegisti();
    document.addEventListener("visibilitychange", gorunurlukDegisti);

    return () => {
      durdur();
      document.removeEventListener("visibilitychange", gorunurlukDegisti);
    };
  }, [hareketKisitli, kelimeler.length, aralik]);

  return (
    <span
      aria-hidden="true"
      className={cn(
        // Maske: kelime yukarı/aşağı kayarken satırın dışına taşmasın.
        // `yuent-glif-payi` kesme çizgisini harflerin dışına itiyor; onsuz
        // `Ç Ş`nin çengeli ve `İ Ö Ü`nün noktaları kesiliyor (globals.css).
        // Yatayda kırpma bilerek yok: kelimeler farklı genişlikte ve
        // `popLayout` çıkan kelimeyi mutlak konumluyor.
        "yuent-glif-payi inline-block overflow-y-clip align-bottom",
        className,
      )}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={sira}
          className="inline-block"
          variants={VARYANTLAR}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={GECIS}
        >
          {kelimeler[sira]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
