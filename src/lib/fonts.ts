import localFont from "next/font/local";

/**
 * Yazı tipleri (F2-03). Kaynak dosyalar `public/fonts/` altında, üretimleri
 * `SITE_PLAN.md` §8.1'de anlatılıyor.
 *
 * Google Fonts CDN'i kullanılmıyor — `next/font/local` dosyaları derleme
 * sırasında `_next/static/media`ya hash'leyerek kopyalıyor, böylece tarayıcı
 * yalnızca kendi alan adımıza istek atıyor.
 */

/** Gövde metni. Archivo, normal genişlik. */
export const archivo = localFont({
  src: [
    {
      path: "../../public/fonts/Archivo-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Archivo-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Archivo-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-archivo",
  display: "swap",
  // Archivo yüklenene kadar gösterilecek yığın. Yedekler de geniş değil dar
  // olduğu için düzen kayması (CLS) düşük kalıyor.
  fallback: ["system-ui", "Segoe UI", "Roboto", "Helvetica Neue", "sans-serif"],
});

/** Başlıklar ve rozetler. Archivo'nun `wdth=125` ucu. */
export const archivoExpanded = localFont({
  src: [
    {
      path: "../../public/fonts/ArchivoExpanded-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/ArchivoExpanded-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-archivo-expanded",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Roboto", "Helvetica Neue", "sans-serif"],
});
