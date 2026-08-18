import type { Metadata } from "next";

import { SiteHeader } from "@/components/layout/site-header";
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
      <body className="flex min-h-full flex-col">
        {/* Klavye ve ekran okuyucu kullanıcıları menüyü her sayfada
            baştan geçmek zorunda kalmasın (F7-08'in ön koşulu). */}
        <a
          href="#icerik"
          className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-100 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          İçeriğe geç
        </a>

        <SiteHeader />

        <div id="icerik" className="flex flex-1 flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
