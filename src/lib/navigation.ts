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

/**
 * Header menüsü — **düz liste, açılır menü yok** (20.08.2026 kararı).
 *
 * "Etkinlikler" tek bir sayfa: eğitimler ve sponsorluk için ayrı üst menü
 * girdisi yok. "Ekibimiz" de üstüne gelince menü açmıyor, tıklanınca doğrudan
 * güncel dönem açılıyor; arşiv dönemlerine o sayfadaki dönem seçicisinden
 * gidiliyor.
 */
export const mainNav: NavLink[] = [
  { label: "Anasayfa", href: "/" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Etkinlikler", href: "/etkinlikler" },
  { label: "Ekibimiz", href: "/ekibimiz" },
  { label: "Galeri", href: "/galeri" },
  { label: "İletişim", href: "/iletisim" },
];

/** Header'ın sağındaki birincil çağrı. */
export const primaryCta: NavLink = {
  label: "Bize Katıl",
  href: "/katil",
};

/**
 * Footer sütunları — iki kısa liste (20.08.2026 kararı).
 *
 * "Keşfet" header'ın kısayolu; "Katıl ve Destekle" ise header'da hiç olmayan
 * dört adrese tek giriş noktası (başvurular, sponsorluk, iletişim). Uzun dizin
 * mantığı bırakıldı: açılır menüler kalktığı için header zaten ilk HTML'de tüm
 * ana bağlantıları basıyor, footer'ın onları tekrar sayması gerekmiyor.
 */
export const footerNav: Array<{ baslik: string; links: NavLink[] }> = [
  {
    baslik: "Keşfet",
    links: [
      { label: "Hakkımızda", href: "/hakkimizda" },
      { label: "Ekibimiz", href: "/ekibimiz" },
      { label: "Etkinlikler", href: "/etkinlikler" },
      { label: "Galeri", href: "/galeri" },
    ],
  },
  {
    baslik: "Katıl ve Destekle",
    links: [
      { label: "Bize Katıl", href: "/katil" },
      { label: "Koordinatör Başvurusu", href: "/basvuru" },
      { label: "Sponsorluk", href: "/sponsorluk" },
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
