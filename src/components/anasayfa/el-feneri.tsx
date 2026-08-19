"use client";

import { useEffect, useRef } from "react";

/**
 * İmleci takip eden el feneri (F4-01 · 19.08.2026).
 *
 * Sayfanın tamamında geçerli; `position: fixed` olduğu için kaydırma sırasında
 * imleç kıpırdamasa bile ışık ekrandaki yerinde kalıyor — konum sayfaya değil
 * görüntü alanına göre.
 *
 * Üç ayrı sebeple hiç bağlanmayabilir:
 * - `prefers-reduced-motion: reduce` — sürekli hareket istenmiyor,
 * - `pointer: fine` yoksa — dokunmatikte takip edilecek bir imleç yok,
 * - element henüz yoksa.
 *
 * Boyama `requestAnimationFrame` ile kareye bir kez kısıtlanıyor; `pointermove`
 * saniyede yüzlerce kez tetiklenebiliyor ve her birinde stil yazmak boşuna iş.
 */
export function ElFeneri() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let x = 0;
    let y = 0;
    let bekleyen = false;

    const boya = () => {
      bekleyen = false;
      el.style.setProperty("--yuent-torch-x", `${x}px`);
      el.style.setProperty("--yuent-torch-y", `${y}px`);
    };

    const hareket = (olay: PointerEvent) => {
      x = olay.clientX;
      y = olay.clientY;
      if (!bekleyen) {
        bekleyen = true;
        requestAnimationFrame(boya);
      }
    };

    window.addEventListener("pointermove", hareket, { passive: true });
    return () => window.removeEventListener("pointermove", hareket);
  }, []);

  return <div ref={ref} aria-hidden="true" className="yuent-torch z-0" />;
}
