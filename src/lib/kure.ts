/**
 * Küre üzerinde eşit aralıklı nokta dağılımı (F4-08).
 *
 * Fotoğrafları küreye rastgele serpmek kümelenme üretir: bir yerde yığılma,
 * başka yerde boşluk. Fibonacci (altın açı) dağılımı bunu deterministik olarak
 * çözüyor — hem düzgün yayılıyor hem de her çağrıda aynı sonucu veriyor.
 *
 * Determinizm burada süs değil şart: hesap sunucuda yapılıp satır içi stil
 * olarak basılıyor, istemci aynı sonucu üretmezse React hydration uyuşmazlığı
 * verir.
 *
 * Bu dosya React, DOM ve Next bilmez. Girdisi bir sayı, çıktısı açı listesi.
 */

/** Altın açı — Fibonacci küresinin boylam adımı. */
const ALTIN_ACI = Math.PI * (3 - Math.sqrt(5));

const DERECE = 180 / Math.PI;

/** Masa düzenindeki eğimin sınırı: ±4°. */
const EGIM_GENLIGI = 4;

/** `priority` verilecek karo sayısı. Fazlası YTÜ'nün B5 hatası olur. */
const ONCELIKLI_ADET = 2;

export type KureNoktasi = {
  /** Boylam, derece. CSS'te doğrudan `rotateY`. */
  lon: number;
  /**
   * Derece cinsinden dikey eğim. **Enlemin eksisi** olarak dönüyor ki CSS
   * şablonunda `calc(-1 * …)` gibi bir işaret çevirmesi kalmasın; adı bu
   * yüzden `lat` değil `egimX`.
   */
  egimX: number;
  /**
   * Masa (ızgara) düzenindeki küçük eğim, −4°…+4°. İndeksten türüyor, yani
   * rastgele değil — "masaya atılmış fotoğraflar" görünümü her yüklemede aynı.
   */
  egim: number;
  /**
   * Başlangıçta izleyiciye en yakın iki karodan biri mi. `next/image`
   * `priority`'si bunlara veriliyor: LCP adayı gerçekten onlar.
   */
  onde: boolean;
};

/**
 * `adet` karo için küre koordinatları üretir.
 *
 * Sıfır ve negatif girdide boş liste döner — çağıranın ayrıca kontrol etmesi
 * gerekmesin diye.
 */
export function kureNoktalari(adet: number): KureNoktasi[] {
  if (adet <= 0) return [];

  const ham = Array.from({ length: adet }, (_, i) => {
    // Kutupları tam doldurmamak için yarım adım kaydırma: (2i+1)/adet.
    const y = 1 - (2 * i + 1) / adet;
    const enlem = Math.asin(Math.min(1, Math.max(-1, y)));
    const lon = ALTIN_ACI * i;

    return {
      lon: lon * DERECE,
      egimX: -enlem * DERECE,
      egim: ((i * 37) % (EGIM_GENLIGI * 2 + 1)) - EGIM_GENLIGI,
      /** Kameraya dönüklük: 1 tam önde, −1 tam arkada. */
      yakinlik: Math.cos(enlem) * Math.cos(lon),
    };
  });

  const oncelikli = new Set(
    [...ham.keys()]
      .sort((a, b) => ham[b].yakinlik - ham[a].yakinlik)
      .slice(0, ONCELIKLI_ADET),
  );

  return ham.map((nokta, i) => ({
    lon: nokta.lon,
    egimX: nokta.egimX,
    egim: nokta.egim,
    onde: oncelikli.has(i),
  }));
}
