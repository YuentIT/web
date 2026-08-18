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

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
