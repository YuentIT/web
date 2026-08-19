"use client";

import { Rocket } from "lucide-react";
import { useEffect, useRef } from "react";

export type Istatistik = { deger: string; etiket: string };

/**
 * Soldan sağa geçen roket, arkasında kalan duman ve dumandan doğan sayılar
 * (F4-02 · 19.08.2026).
 *
 * Sayfa kaydırıldıkça bölümün görüntü alanındaki ilerlemesi 0→1 arası bir
 * `--yuent-roket` değerine çevriliyor; roketin yatay konumu, dumanın uzunluğu
 * ve sayıların açılma eşikleri hep o tek değerden türüyor. Böylece animasyon
 * kaydırma hızına bağlı — kullanıcı durursa roket de duruyor.
 *
 * Dumanın **eskisi dağılıyor, bir kısmı kalıyor:** iz katmanının maskesi solda
 * saydam, sağda opak. Roket ilerledikçe iz uzuyor ama arkada bıraktığı kısım
 * maskenin saydam ucuna doğru kayıp siliniyor. Kalan kısım da sayıların
 * arkasındaki hafif parlaklık olarak duruyor.
 *
 * `prefers-reduced-motion: reduce` altında hiç dinleyici bağlanmıyor ve
 * ilerleme doğrudan 1'e sabitleniyor: roket sağ uçta, sayılar açık. Bilgi
 * hareketin arkasına saklanmıyor.
 *
 * JS çalışmazsa da sayılar görünür kalır — açılma `data-acik` ile yapılıyor ve
 * sunucudan `data-acik="evet"` basılıyor; JS yüklenince ilk boyamada kapanıp
 * kaydırmayla açılıyorlar.
 */
export function RoketSayilar({
  istatistikler,
}: {
  istatistikler: Istatistik[];
}) {
  const bolum = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bolum.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--yuent-roket", "1");
      return;
    }

    const sayilar = Array.from(
      el.querySelectorAll<HTMLElement>("[data-esik]"),
    ).map((n) => ({ n, esik: Number(n.dataset.esik) }));

    let bekleyen = false;

    const boya = () => {
      bekleyen = false;
      const r = el.getBoundingClientRect();
      const ekran = window.innerHeight || 1;

      // Bölümün üstü ekranın %90'ına geldiğinde uçuş başlıyor, yarım ekran
      // sonra bitiyor. Bölüm yüksekliğinden bağımsız olması kasıtlı: uçuşun
      // süresi içerik uzunluğuna değil, kaydırma mesafesine bağlı.
      const ilerleme = Math.min(
        Math.max((ekran * 0.9 - r.top) / (ekran * 0.55), 0),
        1,
      );

      el.style.setProperty("--yuent-roket", ilerleme.toFixed(4));
      for (const { n, esik } of sayilar) {
        n.dataset.acik = ilerleme >= esik ? "evet" : "hayir";
      }
    };

    // İlk boyamada sayıları kapat; sunucudan açık geliyorlar ki JS olmadan da
    // okunabilsinler.
    boya();

    const kaydir = () => {
      if (!bekleyen) {
        bekleyen = true;
        requestAnimationFrame(boya);
      }
    };

    window.addEventListener("scroll", kaydir, { passive: true });
    window.addEventListener("resize", kaydir);
    return () => {
      window.removeEventListener("scroll", kaydir);
      window.removeEventListener("resize", kaydir);
    };
  }, []);

  if (istatistikler.length === 0) return null;

  return (
    <div ref={bolum} className="yuent-roket-alani relative">
      {/* Uçuş şeridi */}
      <div aria-hidden="true" className="relative h-24 overflow-hidden sm:h-28">
        <span className="yuent-roket-iz" />
        <span className="yuent-roket-tasiyici">
          <Rocket className="yuent-roket-ikon size-7 sm:size-8" />
        </span>
      </div>

      {/* Dumandan doğan sayılar */}
      <dl className="mt-2 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
        {istatistikler.map((sayi, i) => (
          <div
            key={sayi.etiket}
            data-esik={(0.3 + i * 0.16).toFixed(2)}
            data-acik="evet"
            className="yuent-roket-sayi text-center"
          >
            <dd className="font-heading text-[clamp(2rem,5vw,3.25rem)] leading-none font-bold tracking-[-0.04em]">
              {sayi.deger}
            </dd>
            <dt className="mt-3 text-[0.6875rem] tracking-[0.14em] text-text-subtle uppercase">
              {sayi.etiket}
            </dt>
          </div>
        ))}
      </dl>
    </div>
  );
}
