import createMDX from "@next/mdx";
import type { NextConfig } from "next";

/**
 * Tüm yollara uygulanan güvenlik başlıkları (F1-09).
 * Content-Security-Policy bilerek burada yok: gerçek bir politika ancak
 * gömülü içerikler (harita, YouTube, Spotify) belli olunca yazılabilir — Faz 7'de.
 */
const securityHeaders = [
  // Siteyi başka bir alan adının iframe'ine gömmeyi engeller (clickjacking).
  { key: "X-Frame-Options", value: "DENY" },
  // Tarayıcının Content-Type'ı tahmin etmesini kapatır.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Dış sitelere tam URL değil yalnızca alan adı sızar.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Sitenin ihtiyacı olmayan cihaz izinlerini baştan kapatır.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  // Next.js sürümünü sunucu imzası olarak sızdırmayı bırak.
  poweredByHeader: false,

  // MDX'in rota olarak da çalışabilmesi için (F3-05). `app/` altında .mdx
  // dosyamız yok; içerik `content/` altında duruyor ve oradan içe aktarılıyor.
  pageExtensions: ["ts", "tsx", "mdx"],

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

/**
 * Eklentiler **string olarak** veriliyor, içe aktarılmış fonksiyon olarak değil.
 * Next 16 varsayılan olarak Turbopack kullanıyor ve JavaScript fonksiyonları
 * Rust tarafına geçirilemiyor — `remarkPlugins: [remarkGfm]` yazımı derlemede
 * kırılır. Dokümanın "Using Plugins with Turbopack" bölümü bunu söylüyor.
 */
const withMDX = createMDX({
  options: {
    remarkPlugins: [
      // `@next/mdx` frontmatter'ı **bilmiyor**: bu eklenti olmadan dosyanın
      // başındaki `---` bloğu yatay çizgi + düz metin sanılıp sayfada
      // "baslik: … kategori: …" diye görünüyor. Eklenti bloğu ayrı bir düğüm
      // olarak ayrıştırıyor ve render dışında bırakıyor.
      // Frontmatter'ın kendisi zaten gray-matter ile okunup zod'dan geçiyor
      // (`src/lib/content.ts`); buradan ayrıca dışa aktarılmasına gerek yok.
      "remark-frontmatter",
      "remark-gfm",
    ],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
