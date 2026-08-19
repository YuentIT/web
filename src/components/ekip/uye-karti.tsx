import Image from "next/image";

import { cn } from "@/lib/utils";
import type { Uye } from "@/types";

/**
 * Addan baş harfleri çıkarır: ilk ve son kelimenin ilk harfi.
 *
 * "Beyza N. Şevval Ulubey" → "BU". Tek harflik göbek adları ("N.") atlanıyor,
 * yoksa "BN" gibi bilgisiz bir kısaltma çıkıyor. Büyütme Türkçe yerelle:
 * `toUpperCase()` "i"yi "I" yapıyor, "İ" değil.
 */
function basHarfler(ad: string) {
  const kelimeler = ad
    .split(/\s+/)
    .map((k) => k.replace(/\.$/, ""))
    .filter((k) => k.length > 1);

  const secilen =
    kelimeler.length >= 2
      ? [kelimeler[0], kelimeler[kelimeler.length - 1]]
      : kelimeler.slice(0, 1);

  return secilen
    .map((k) => k[0])
    .join("")
    .toLocaleUpperCase("tr");
}

/**
 * Ekip üyesi kartı (F4-03 / F4-04).
 *
 * Fotoğraf yoksa **stok fotoğraf konmuyor** (planın açık kuralı); yerine addan
 * türetilmiş baş harflerle tipografik bir alan çiziliyor. Şu an içerikteki 77
 * kişinin hiçbirinde fotoğraf yok, yani sayfa tamamen bu hâlle çalışıyor;
 * fotoğraflar gelince yalnızca `fotograf` alanı dolduruluyor, kart değişmiyor.
 *
 * `linkedin` de aynı şekilde koşullu: bağlantı yoksa boş bir ikon yeri
 * bırakılmıyor.
 */
export function UyeKarti({ uye, className }: { uye: Uye; className?: string }) {
  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-brand-accent",
        className,
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-surface-2">
        {uye.fotograf ? (
          <Image
            src={uye.fotograf}
            alt=""
            fill
            sizes="(min-width: 1024px) 16rem, (min-width: 640px) 30vw, 45vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <span
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center font-heading text-3xl font-bold tracking-tight text-text-subtle transition-colors group-hover:text-brand-accent"
          >
            {basHarfler(uye.ad)}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="font-heading text-sm leading-tight font-bold tracking-[0.02em] uppercase">
          {uye.ad}
        </h3>

        <p className="text-xs leading-relaxed text-text-muted">{uye.gorev}</p>

        {uye.linkedin ? (
          <a
            href={uye.linkedin}
            target="_blank"
            rel="noreferrer"
            className="mt-1 inline-flex w-fit rounded text-[0.625rem] tracking-[0.12em] text-brand-accent uppercase hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            LinkedIn
            <span className="sr-only"> — {uye.ad}</span>
          </a>
        ) : null}
      </div>
    </article>
  );
}
