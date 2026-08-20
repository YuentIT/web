import Image from "next/image";

import type { KureNoktasi } from "@/lib/kure";
import type { GaleriGorseli } from "@/types";

const TARIH_BICIMI = new Intl.DateTimeFormat("tr-TR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  // `timeZone: "UTC"` şart. `new Date("2024-03-12")` UTC gece yarısını
  // gösteriyor; saat dilimi geride olan bir tarayıcıda yerel biçimlendirme
  // günü bir geri alır ve ekrandaki tarih dosyadakiyle ayrışır.
  timeZone: "UTC",
});

/** `2024-03-12` → `12.03.2024`. */
export function tarihMetni(iso: string): string {
  return TARIH_BICIMI.format(new Date(`${iso}T00:00:00Z`));
}

/**
 * Tek bir polaroid karosu (F4-08).
 *
 * Durum tutmaz, olay dinlemez — yalnız görünüş. Küre üzerindeki yeri satır içi
 * CSS değişkenleriyle geliyor; karo o değişkenleri nasıl kullanacağını bilmiyor,
 * bunu `globals.css` içindeki sahne kuralları belirliyor. Aynı bileşen hem
 * küre üzerinde hem düz masa düzeninde bu yüzden değişmeden çalışıyor.
 *
 * Not satırı iki parçalı: etkinlik adı üstte (en fazla iki satır), tarih
 * altında. İkisi de opsiyonel; hiçbiri yoksa şerit boş kalıyor ama
 * kalınlığını koruyor — polaroid'i polaroid yapan şey o boşluk.
 *
 * `children`, karonun üstüne konacak isteğe bağlı katman içindir; büyütme
 * düğmesi oradan geliyor. `figure` içine doğrudan `button` konulamıyor
 * (geçerli HTML değil), bu yüzden düğme ayrı bir katman olarak biniyor.
 */
export function Polaroid({
  gorsel,
  nokta,
  children,
}: {
  gorsel: GaleriGorseli;
  nokta: KureNoktasi;
  children?: React.ReactNode;
}) {
  const notVar = Boolean(gorsel.etkinlik || gorsel.tarih);

  return (
    <figure
      className="yuent-polaroid"
      style={
        {
          "--lon": `${nokta.lon}deg`,
          "--egim-x": `${nokta.egimX}deg`,
          "--egim": `${nokta.egim}deg`,
        } as React.CSSProperties
      }
    >
      <div className="yuent-polaroid-cerceve">
        <Image
          src={gorsel.src}
          alt={gorsel.alt}
          fill
          // Karo küçük: tarayıcı 4K dosya değil ~176-352 px genişliğinde bir
          // kesit çeksin. Üst sınır küredeki 132 px değil masa düzenindeki
          // 176 px — `sizes` iki düzenin de genişini kapsamalı, yoksa hareket
          // kısıtı altındaki kullanıcı bulanık görsel görür.
          sizes="(max-width: 640px) 24vw, 176px"
          priority={nokta.onde}
          className="object-cover"
        />
      </div>

      {notVar ? (
        <figcaption className="yuent-polaroid-not">
          {gorsel.etkinlik ? (
            <span className="yuent-polaroid-etkinlik">{gorsel.etkinlik}</span>
          ) : null}
          {gorsel.tarih ? (
            <time dateTime={gorsel.tarih} className="yuent-polaroid-tarih">
              {tarihMetni(gorsel.tarih)}
            </time>
          ) : null}
        </figcaption>
      ) : null}

      {children}
    </figure>
  );
}
