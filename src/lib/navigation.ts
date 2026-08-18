/**
 * Site menüsü — `SITE_PLAN.md` §6.1'in tek kaynağı (F2-06).
 *
 * Header ve footer aynı diziyi okur. Menüye bir sayfa eklemek isteyen kişi
 * yalnızca burayı değiştirir; iki ayrı yerde güncellemeyi unutma ihtimali yok.
 *
 * Wix'teki "Daha Fazlası…" çöp menüsü kasıtlı olarak taşınmadı.
 */

export type NavLink = {
  label: string;
  href: string;
};

export type NavItem = NavLink & {
  /** Doluysa açılır menü olarak çizilir; `href` yine de tıklanabilir kalır. */
  children?: NavLink[];
};

export const mainNav: NavItem[] = [
  { label: "Anasayfa", href: "/" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  {
    label: "Etkinlikler",
    href: "/etkinlikler",
    children: [
      { label: "Tüm Etkinlikler", href: "/etkinlikler" },
      { label: "Eğitimler", href: "/egitimler" },
      { label: "Sponsorluk", href: "/sponsorluk" },
    ],
  },
  {
    label: "Ekibimiz",
    href: "/ekibimiz",
    children: [
      { label: "Güncel Ekip", href: "/ekibimiz" },
      { label: "2025-2026", href: "/ekibimiz/2025-2026" },
      { label: "2022-2023", href: "/ekibimiz/2022-2023" },
      { label: "2021-2022", href: "/ekibimiz/2021-2022" },
      { label: "2020-2021", href: "/ekibimiz/2020-2021" },
    ],
  },
  { label: "Galeri", href: "/galeri" },
  { label: "İletişim", href: "/iletisim" },
];

/** Header'ın sağındaki birincil çağrı. */
export const primaryCta: NavLink = {
  label: "Bize Katıl",
  href: "/katil",
};

/**
 * Footer sütunları — sitenin **tam dizini**.
 *
 * Bu liste header'ın kopyası değil, tamamlayıcısı ve bir açığı kapatıyor:
 * Base UI açılır menülerin içeriğini ancak menü açıldığında basıyor, yani
 * `/etkinlikler`, `/egitimler`, `/sponsorluk` ve dönem sayfaları ilk HTML'de
 * hiç yok. JS kapalıyken header'dan erişilemiyor, tarayıcı botu da onları
 * header'da göremiyor. Footer düz `<a>` listesi olduğu için her iki durumu da
 * çözüyor. Buradan bir bağlantı silinirse o açık geri gelir.
 */
export const footerNav: Array<{ baslik: string; links: NavLink[] }> = [
  {
    baslik: "Kulüp",
    links: [
      { label: "Hakkımızda", href: "/hakkimizda" },
      { label: "Ekibimiz", href: "/ekibimiz" },
      { label: "2025-2026 Ekibi", href: "/ekibimiz/2025-2026" },
      { label: "2022-2023 Ekibi", href: "/ekibimiz/2022-2023" },
      { label: "2021-2022 Ekibi", href: "/ekibimiz/2021-2022" },
      { label: "2020-2021 Ekibi", href: "/ekibimiz/2020-2021" },
    ],
  },
  {
    baslik: "Etkinlikler",
    links: [
      { label: "Tüm Etkinlikler", href: "/etkinlikler" },
      { label: "Eğitimler", href: "/egitimler" },
      { label: "Galeri", href: "/galeri" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    baslik: "Katıl ve Destekle",
    links: [
      { label: "Bize Katıl", href: "/katil" },
      { label: "Koordinatör Başvurusu", href: "/basvuru" },
      { label: "Sponsorluk", href: "/sponsorluk" },
      { label: "İstek ve Öneri", href: "/oneri" },
      { label: "İletişim", href: "/iletisim" },
    ],
  },
];

/** Footer'ın alt şeridindeki hukuki metinler. */
export const hukukiNav: NavLink[] = [
  { label: "KVKK Aydınlatma Metni", href: "/kvkk" },
  { label: "Gizlilik Politikası", href: "/gizlilik" },
  { label: "Kullanım Koşulları", href: "/kullanim-kosullari" },
];

/**
 * `site.json` içindeki sosyal hesap anahtarlarının görünen adları.
 *
 * İkon yok, metin var: `lucide-react` 1.31 marka ikonlarını kaldırdı
 * (Instagram, LinkedIn, Facebook, YouTube). Paketteki `X` ikonu "kapat"
 * anlamında, Twitter/X logosu değil. Dört glif için ayrı bir ikon paketi
 * eklemek ya da tescilli logoları elle SVG olarak taşımak orantısız kaçıyor.
 */
export const sosyalEtiketleri: Record<string, string> = {
  instagram: "Instagram",
  linkedin: "LinkedIn",
  x: "X",
  facebook: "Facebook",
  youtube: "YouTube",
  spotify: "Spotify",
};
