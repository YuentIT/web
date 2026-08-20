import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

/** Izgaranın ihtiyacı olan alanlar. `Etkinlik`in tamamı değil: MDX gövdesini
 *  taşımanın bir anlamı yok, kart onu hiç göstermiyor. */
export type EtkinlikKarti = {
  slug: string;
  baslik: string;
  kisaAciklama: string;
  kategori: string;
  kapakGorsel?: string;
  ozellikler: string[];
};

/**
 * Bento düzeni — kartlar ikişerli satırlara giriyor, satır genişlikleri sırayla
 * geniş/dar ve dar/geniş oluyor. Kartların hepsi aynı boyda olsaydı ızgara
 * katalog gibi görünürdü; boy farkı hangi etkinliğin daha büyük olduğunu değil,
 * sayfanın ritmini kuruyor.
 *
 * Düzen sabit bir desen dizisi **değil**, sayıdan türetiliyor: eskiden dörtlü
 * bir desen tekrarlıyordu ve etkinlik sayısı 4'ün katı olmadığında son satırda
 * boşluk kalıyordu. Etkinlik listesi büyüyeceği için (20.08.2026) tek kalan
 * kart artık tam genişliğe yayılıyor — hiçbir sayıda delik kalmıyor.
 *
 * Yükseklikler satır satır 400/340 arasında dönüşüyor; tam genişlikteki
 * kapanış kartı daha alçak duruyor ki 12 sütuna yayılmış bir görsel sayfayı
 * ezmesin.
 *
 * Sınıf adları **birebir** yazılıyor, parça parça kurulmuyor: Tailwind kaynağı
 * metin olarak tarıyor ve `col-span-${n}` gibi çalışma anında birleşen bir adı
 * hiç görmediği için o yardımcı sınıfı üretmez.
 */
const SATIR_DUZENLERI = [
  ["lg:col-span-7 lg:h-[400px]", "lg:col-span-5 lg:h-[400px]"],
  ["lg:col-span-5 lg:h-[340px]", "lg:col-span-7 lg:h-[340px]"],
];

/** Satırda tek başına kalan kart: 12 sütunun tamamı, daha alçak. */
const KAPANIS_KARTI = "lg:col-span-12 lg:h-[300px]";

function bentoDuzeni(adet: number): string[] {
  const siniflar: string[] = [];

  for (let satir = 0; satir * 2 < adet; satir++) {
    if (satir * 2 + 1 === adet) {
      siniflar.push(KAPANIS_KARTI);
      break;
    }

    siniflar.push(...SATIR_DUZENLERI[satir % SATIR_DUZENLERI.length]);
  }

  return siniflar;
}

/**
 * Etkinlik ızgarası (F4-01 · görsel yön 19.08.2026).
 *
 * Ana sayfa ile `/etkinlikler` bunu paylaşıyor (20.08.2026): ana sayfa
 * `oneCikanEtkinlikler`i, liste sayfası ise etkinliklerin tamamını basıyor.
 *
 * Yerleşim ytugirisim.org'daki gibi asimetrik; hareket ise bize ait. Kart
 * hover'ı Uiverse'teki JohnnyCSilva kartının uyarlaması: görsel kaybolmuyor,
 * bulanıklaşıp hafifçe büyüyor ve metin ortada beliriyor.
 *
 * Kırpma `overflow-hidden` yerine `clip-path` ile yapılıyor: `backdrop-filter`
 * kullanan bir çocuk ebeveynin `border-radius` kırpmasını yok sayıyor ve
 * köşelerde bulanmamış görsel sızıyor.
 *
 * Ayrıntılar yalnızca hover'da göründüğü için `group-focus-visible` de ekli —
 * klavyeyle gezen biri aynı bilgiyi görüyor. Dokunmatikte hover yok ama duran
 * hâlde etkinlik adı zaten okunuyor ve karta dokunmak sayfasına gidiyor.
 *
 * Bu bileşenin istemci tarafına ihtiyacı yok: hareketin tamamı CSS.
 */
export function EtkinlikIzgarasi({
  etkinlikler,
}: {
  etkinlikler: EtkinlikKarti[];
}) {
  if (etkinlikler.length === 0) return null;

  const duzen = bentoDuzeni(etkinlikler.length);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
      {etkinlikler.map((etkinlik, i) => (
        <Link
          key={etkinlik.slug}
          href={`/etkinlikler/${etkinlik.slug}`}
          className={cn(
            "group relative h-[300px] overflow-hidden rounded-[20px] bg-surface-2 shadow-[0_0_0_1px_var(--border)] transition duration-200 ease-in-out [clip-path:inset(0_round_20px)]",
            "hover:scale-[1.02] hover:-rotate-[0.5deg] focus-visible:scale-[1.02] focus-visible:-rotate-[0.5deg] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
            duzen[i],
          )}
        >
          {etkinlik.kapakGorsel ? (
            <Image
              src={etkinlik.kapakGorsel}
              alt=""
              fill
              sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
              priority={i < 2}
              className="scale-[1.04] object-cover transition duration-200 ease-in-out group-hover:scale-[1.1] group-hover:blur-[13px] group-hover:brightness-[0.7] group-hover:saturate-[0.85] group-focus-visible:scale-[1.1] group-focus-visible:blur-[13px] group-focus-visible:brightness-[0.7] group-focus-visible:saturate-[0.85]"
            />
          ) : (
            <span
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center font-heading text-4xl font-bold text-text-subtle"
            >
              {etkinlik.baslik.slice(0, 2).toLocaleUpperCase("tr")}
            </span>
          )}

          {/* Duran hâl: altta yumuşak biten bulanık şerit + etkinlik adı */}
          <span className="yuent-kart-serit absolute inset-x-0 bottom-0 block px-5 pt-5 pb-5 transition duration-200 ease-in-out group-hover:translate-y-2.5 group-hover:opacity-0 group-focus-visible:translate-y-2.5 group-focus-visible:opacity-0">
            <span className="block text-[0.5625rem] tracking-[0.16em] text-brand-accent uppercase">
              {etkinlik.kategori}
            </span>
            <span className="mt-1.5 block font-heading text-base leading-tight font-bold uppercase">
              {etkinlik.baslik}
            </span>
          </span>

          {/* Hover hâli: ortada başlık, ayrıntılar ve detay butonu */}
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/40 p-6 text-center opacity-0 transition duration-200 ease-in-out group-hover:opacity-100 group-focus-visible:opacity-100">
            <span className="text-[0.5625rem] tracking-[0.16em] text-brand-accent uppercase">
              {etkinlik.kategori}
            </span>
            <span className="font-heading text-lg leading-tight font-bold uppercase">
              {etkinlik.baslik}
            </span>
            <span className="max-w-sm text-xs leading-relaxed text-foreground/90">
              {etkinlik.kisaAciklama}
            </span>
            {etkinlik.ozellikler.length > 0 ? (
              <span className="max-w-sm text-[0.6875rem] leading-relaxed text-text-muted">
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
  );
}
