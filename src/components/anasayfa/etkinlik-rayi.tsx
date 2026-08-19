"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

/** Rayın ihtiyacı olan alanlar. `Etkinlik`in tamamı değil: MDX gövdesi
 *  istemci paketine serileşmesin diye sayfada bu şekle indirgeniyor. */
export type RayKarti = {
  slug: string;
  baslik: string;
  kisaAciklama: string;
  kategori: string;
  kapakGorsel?: string;
  ozellikler: string[];
};

/** Kart genişliği + aradaki boşluk. Oklar tam bir kart kaydırıyor. */
const ADIM = 210 + 14;

/**
 * Ana sayfadaki yatay etkinlik rayı (F4-01 · 19.08.2026).
 *
 * Kart hover'ı Uiverse'teki JohnnyCSilva kartının uyarlaması: görsel kaybolmuyor,
 * bulanıklaşıp hafifçe büyüyor ve metin ortada beliriyor. Özgün koddaki
 * aşağı-yukarı süzülme animasyonu **kaldırıldı** (19.08.2026 kararı).
 *
 * İki incelik:
 * - Kırpma `overflow-hidden` yerine `clip-path` ile yapılıyor. `backdrop-filter`
 *   kullanan bir çocuk, ebeveynin `border-radius` kırpmasını yok sayıyor ve
 *   köşelerde bulanmamış görsel sızıyordu; `clip-path` bunu kesin çözüyor.
 * - Ayrıntılar yalnızca hover'da göründüğü için `group-focus-visible` de
 *   ekli: klavyeyle gezen biri de aynı bilgiyi görüyor.
 *
 * Oklar rayın dışında, kartların başladığı noktadan (36 px) önce duruyor —
 * üst üste binmedikleri için en soldaki kart her zaman tıklanabilir.
 */
export function EtkinlikRayi({ etkinlikler }: { etkinlikler: RayKarti[] }) {
  const ray = useRef<HTMLDivElement>(null);

  const kaydir = (yon: 1 | -1) => {
    ray.current?.scrollBy({ left: yon * ADIM, behavior: "smooth" });
  };

  if (etkinlikler.length === 0) return null;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => kaydir(-1)}
        aria-label="Önceki etkinlikler"
        className="group absolute start-0 top-1.5 z-10 hidden h-[300px] w-7 items-center justify-center focus-visible:outline-none sm:flex"
      >
        <span aria-hidden="true" className="yuent-ok-cam" />
        <span
          aria-hidden="true"
          className="relative text-lg text-text-subtle transition duration-300 group-hover:scale-125 group-hover:text-foreground group-focus-visible:scale-125 group-focus-visible:text-foreground"
        >
          ‹
        </span>
      </button>

      <button
        type="button"
        onClick={() => kaydir(1)}
        aria-label="Sonraki etkinlikler"
        className="group absolute end-0 top-1.5 z-10 hidden h-[300px] w-7 items-center justify-center focus-visible:outline-none sm:flex"
      >
        <span aria-hidden="true" className="yuent-ok-cam" />
        <span
          aria-hidden="true"
          className="relative text-lg text-text-subtle transition duration-300 group-hover:scale-125 group-hover:text-foreground group-focus-visible:scale-125 group-focus-visible:text-foreground"
        >
          ›
        </span>
      </button>

      <div
        ref={ray}
        className="flex snap-x snap-mandatory [scrollbar-width:none] gap-3.5 overflow-x-auto pt-1.5 pb-5 [-ms-overflow-style:none] sm:px-9 [&::-webkit-scrollbar]:hidden"
      >
        {etkinlikler.map((etkinlik) => (
          <Link
            key={etkinlik.slug}
            href={`/etkinlikler/${etkinlik.slug}`}
            className="group relative h-[300px] w-[210px] shrink-0 snap-center overflow-hidden rounded-[20px] bg-surface-2 shadow-[0_0_0_1px_var(--border)] transition duration-200 ease-in-out [clip-path:inset(0_round_20px)] hover:scale-[1.04] hover:-rotate-1 focus-visible:scale-[1.04] focus-visible:-rotate-1 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            {etkinlik.kapakGorsel ? (
              <Image
                src={etkinlik.kapakGorsel}
                alt=""
                fill
                sizes="210px"
                className="scale-[1.06] object-cover transition duration-200 ease-in-out group-hover:scale-[1.14] group-hover:blur-[13px] group-hover:brightness-[0.72] group-hover:saturate-[0.85] group-focus-visible:scale-[1.14] group-focus-visible:blur-[13px] group-focus-visible:brightness-[0.72] group-focus-visible:saturate-[0.85]"
              />
            ) : (
              <span
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center font-heading text-3xl font-bold text-text-subtle"
              >
                {etkinlik.baslik.slice(0, 2).toLocaleUpperCase("tr")}
              </span>
            )}

            {/* Duran hâl: altta yumuşak biten bulanık şerit + etkinlik adı */}
            <span className="yuent-kart-serit absolute inset-x-0 bottom-0 block px-4 pt-4 pb-4 transition duration-200 ease-in-out group-hover:translate-y-2.5 group-hover:opacity-0 group-focus-visible:translate-y-2.5 group-focus-visible:opacity-0">
              <span className="block text-[0.5625rem] tracking-[0.16em] text-brand-accent uppercase">
                {etkinlik.kategori}
              </span>
              <span className="mt-1.5 block font-heading text-[0.84rem] leading-tight font-bold uppercase">
                {etkinlik.baslik}
              </span>
            </span>

            {/* Hover hâli: ortada başlık, ayrıntılar ve detay butonu */}
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-background/40 p-5 text-center opacity-0 transition duration-200 ease-in-out group-hover:opacity-100 group-focus-visible:opacity-100">
              <span className="text-[0.5625rem] tracking-[0.16em] text-brand-accent uppercase">
                {etkinlik.kategori}
              </span>
              <span className="font-heading text-[0.94rem] leading-tight font-bold uppercase">
                {etkinlik.baslik}
              </span>
              <span className="text-[0.6875rem] leading-relaxed text-foreground/90">
                {etkinlik.kisaAciklama}
              </span>
              {etkinlik.ozellikler.length > 0 ? (
                <span className="text-[0.625rem] leading-relaxed text-text-muted">
                  {etkinlik.ozellikler.slice(0, 2).join(" · ")}
                </span>
              ) : null}
              <span className="mt-1 rounded-full bg-primary px-4 py-2 text-[0.625rem] font-extrabold tracking-[0.1em] text-primary-foreground uppercase">
                Detay →
              </span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
