import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import type { Etkinlik } from "@/types";

/**
 * Etkinlik kartı — ana sayfada ve `/etkinlikler` listesinde kullanılıyor.
 *
 * Tarih ve kayıt durumu **gösterilmiyor**: sitede tarih yayınlanmıyor
 * (18.08.2026 kararı). Kart bir duyuru değil, bilgilendirme girişi.
 *
 * Kapak görseli yoksa **stok fotoğraf konmuyor** (planın açık kuralı);
 * yerine başlığın baş harflerinden tipografik bir alan çiziliyor.
 */
export function EventCard({
  etkinlik,
  oncelikli = false,
  className,
}: {
  etkinlik: Etkinlik;
  /** İlk ekranda görünen en fazla iki kart için — F7-07. */
  oncelikli?: boolean;
  className?: string;
}) {
  const basHarfler = etkinlik.baslik
    .split(/\s+/)
    .slice(0, 3)
    .map((k) => k[0])
    .join("")
    .toLocaleUpperCase("tr");

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-border-strong",
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
        {etkinlik.kapakGorsel ? (
          <Image
            src={etkinlik.kapakGorsel}
            alt=""
            fill
            sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 92vw"
            priority={oncelikli}
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-full items-center justify-center font-heading text-4xl font-bold tracking-tight text-text-subtle"
          >
            {basHarfler}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-eyebrow text-brand-accent uppercase">
          {etkinlik.kategori}
        </p>

        <h3 className="text-subsection">
          {/* Genişletilmiş tıklama alanı: kartın tamamı bağlantı gibi
              davranıyor ama DOM'da tek bir <a> var — iç içe bağlantı ve
              ekran okuyucuda tekrar oluşmuyor. */}
          <Link
            href={`/etkinlikler/${etkinlik.slug}`}
            className="after:absolute after:inset-0"
          >
            {etkinlik.baslik}
          </Link>
        </h3>

        <p className="line-clamp-3 text-sm leading-relaxed text-text-muted">
          {etkinlik.kisaAciklama}
        </p>
      </div>
    </article>
  );
}
