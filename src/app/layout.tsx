import type { Metadata } from "next";

import { archivo, archivoExpanded } from "@/lib/fonts";
import "@/styles/globals.css";

// Geçici kök metadata. Sayfa bazlı özgün title/description, kanonik adres ve
// Open Graph alanları F7-01…F7-03'te gelecek; buradaki yalnızca canlı sayfanın
// "Create Next App" demesini engelliyor.
export const metadata: Metadata = {
  title: "Yeditepe Üniversitesi Liderlik ve Girişimcilik Kulübü",
  description:
    "Yeditepe Üniversitesi Liderlik ve Girişimcilik Kulübü (LGK / YUENT) resmî web sitesi. Yeni sitemiz yapım aşamasında.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // Site tek temalı: koyu. `dark` sınıfı sabit duruyor ki shadcn
    // bileşenlerindeki `dark:` varyantları da devreye girsin.
    <html
      lang="tr"
      className={`dark ${archivo.variable} ${archivoExpanded.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
