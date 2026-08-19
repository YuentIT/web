import {
  Compass,
  Flame,
  Heart,
  HeartHandshake,
  Lightbulb,
  Rocket,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

import type { Hakkimizda } from "@/types";

/**
 * İçerikteki ikon adını bileşene çeviren eşleme.
 *
 * Anahtarlar `schemas.ts`teki `degerIkonu` enum'undan geliyor; `Record` o
 * birleşim tipiyle yazıldığı için listeye yeni bir ad eklenip buraya
 * eklenmezse **derleme durur**. Dinamik `lucide-react` erişimi (ör.
 * `icons[ad]`) yerine bu tercih edildi: dinamik erişim ağacın tamamını
 * paketleyip ~1 MB ekliyor.
 */
const IKONLAR: Record<Hakkimizda["degerler"][number]["ikon"], LucideIcon> = {
  flame: Flame,
  lightbulb: Lightbulb,
  "trending-up": TrendingUp,
  "heart-handshake": HeartHandshake,
  rocket: Rocket,
  sparkles: Sparkles,
  compass: Compass,
  heart: Heart,
};

/**
 * "Değerlerimiz" kutuları (F4-02 · 19.08.2026).
 *
 * Düzen itugirisim.org/about'takine benziyor: ortalanmış ikon, kalın başlık,
 * küçük açıklama; hover'da kart hafifçe kalkıyor, kenarı aksana dönüyor ve
 * yumuşak bir gölge alıyor. Renkler bizim paletimizden — orada kartlar beyaz,
 * burada mürekkep yüzey ve asit aksan.
 */
export function Degerler({ degerler }: { degerler: Hakkimizda["degerler"] }) {
  if (degerler.length === 0) return null;

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {degerler.map((deger) => {
        const Ikon = IKONLAR[deger.ikon];

        return (
          <li
            key={deger.baslik}
            className="group flex flex-col items-center rounded-xl border border-border bg-surface px-6 py-8 text-center transition duration-300 hover:-translate-y-1.5 hover:border-brand-accent hover:shadow-[0_16px_36px_-18px_rgb(232_254_85_/_0.45)]"
          >
            <Ikon
              aria-hidden="true"
              className="size-7 text-brand-accent transition-transform duration-300 group-hover:scale-110"
            />

            <h3 className="mt-4 font-heading text-base font-bold tracking-[0.04em] uppercase">
              {deger.baslik}
            </h3>

            <p className="mt-2.5 text-sm leading-relaxed text-text-muted">
              {deger.aciklama}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
