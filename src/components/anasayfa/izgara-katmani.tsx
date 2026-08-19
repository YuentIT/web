"use client";

import { useEffect, useRef } from "react";

/**
 * Sayfanın üst bölgesini kaplayan ızgara (F4-01 · 19.08.2026).
 *
 * İki ayrı sönme birlikte çalışıyor:
 * 1. **Geometrik** — sarmalayıcıdaki dikey maske ızgarayı kapsadığı bölgenin
 *    sonuna doğru eritiyor. Sarmalayıcı hero'dan etkinliklerin sonuna kadar
 *    uzandığı için ızgara etkinlikler bölümü bitmeden yok oluyor.
 * 2. **Kaydırmaya bağlı** — sayfa aşağı indikçe genel opaklık %100'den %60'a
 *    iniyor, yani ızgara yalnızca kesilmiyor, aynı zamanda hafifliyor.
 *
 * İkincisi CSS ile ifade edilemiyor (`animation-timeline: scroll()` Firefox'ta
 * hâlâ bayrak arkasında), o yüzden burada tek bir custom property yazılıyor.
 * Yazılan şey opaklık olduğu için düzen yeniden hesaplanmıyor.
 */
export function IzgaraKatmani() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let bekleyen = false;

    const boya = () => {
      bekleyen = false;
      const oran = Math.min(window.scrollY / window.innerHeight, 1);
      el.style.setProperty("--yuent-grid-fade", String(1 - oran * 0.4));
    };

    boya(); // sayfa ortadan yenilenirse ilk hâli doğru olsun

    const kaydir = () => {
      if (!bekleyen) {
        bekleyen = true;
        requestAnimationFrame(boya);
      }
    };

    window.addEventListener("scroll", kaydir, { passive: true });
    return () => window.removeEventListener("scroll", kaydir);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="yuent-grid-mask pointer-events-none absolute inset-0"
    >
      <div ref={ref} className="yuent-grid absolute inset-0" />
    </div>
  );
}
