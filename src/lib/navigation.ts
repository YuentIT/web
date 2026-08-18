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
