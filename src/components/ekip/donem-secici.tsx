import Link from "next/link";

import { cn } from "@/lib/utils";
import type { Donem } from "@/types";

/**
 * Dönemler arası geçiş (F4-04).
 *
 * Güncel dönem `/ekibimiz`e, diğerleri `/ekibimiz/[donem]`e gidiyor. Güncel
 * dönemin iki adresi olmasın diye arşiv adresi ona hiç verilmiyor — aynı
 * ekibin iki ayrı adreste yayınlanması hem arama motorunda kopya içerik hem de
 * "hangisi doğru adres" sorusu doğuruyor.
 *
 * Düz `<a>` listesi: JS kapalıyken de tüm arşiv gezilebiliyor (Faz 4'ün ortak
 * kabul kriteri).
 */
export function DonemSecici({
  donemler,
  aktifSlug,
  className,
}: {
  donemler: Donem[];
  /** Şu an açık olan dönem. */
  aktifSlug: string;
  className?: string;
}) {
  if (donemler.length <= 1) return null;

  return (
    <nav
      aria-label="Dönem seçimi"
      className={cn("flex flex-wrap gap-2", className)}
    >
      {donemler.map((donem) => {
        const aktif = donem.slug === aktifSlug;

        return (
          <Link
            key={donem.slug}
            href={donem.guncel ? "/ekibimiz" : `/ekibimiz/${donem.slug}`}
            aria-current={aktif ? "page" : undefined}
            className={cn(
              "rounded-full border px-4 py-2 text-[0.6875rem] font-bold tracking-[0.1em] uppercase transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
              aktif
                ? "border-brand-accent bg-brand-accent text-primary-foreground"
                : "border-border text-text-muted hover:border-border-strong hover:text-foreground",
            )}
          >
            {donem.baslik}
            {donem.guncel ? (
              <span className="sr-only"> (güncel dönem)</span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}
