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

/**
 * Polaroid notları (F4-08). Tek dosya, değişken ağırlık 400–700.
 *
 * Not 11–12 px'te basılıyor; o boyda bağlı bir el yazısının okunabilmesi için
 * ağırlığın 600'e çekilebilmesi gerekiyordu. Aday listesindeki tek ağırlığa
 * sahip fontlarda bu imkân yok — Caveat bu yüzden seçildi.
 *
 * **Kök düzene bilerek eklenmedi.** Archivo'lar `layout.tsx`'te duruyor çünkü
 * her sayfada gerekli; bu 77 KB ise yalnızca `/galeri`'nin süsü. Değişken o
 * sayfanın kapsayıcısına veriliyor, böylece font yalnızca o rotada yükleniyor.
 *
 * Altkümede yalnızca `calt`, `liga` ve `locl` var. `calt` tek başına 31 KB
 * ama Caveat'ın harfleri birbirine bağlaması ondan geliyor — fontun seçilme
 * gerekçesi buydu. `frac`, `ordn`, `subs`, `sups`, `ss01/02`, `aalt`, `salt`
 * ve `dlig` atıldı; hiçbiri kullanılmıyor.
 */
export const caveat = localFont({
  src: [
    {
      path: "../../public/fonts/Caveat-Variable.woff2",
      weight: "400 700",
      style: "normal",
    },
  ],
  variable: "--font-caveat",
  display: "swap",
  // El yazısı yedekleri. Hiçbiri Caveat'a benzemiyor ama "elle yazılmış"
  // hissini koruyorlar; son çare genel `cursive`.
  fallback: ["Segoe Script", "Bradley Hand", "cursive"],
});
