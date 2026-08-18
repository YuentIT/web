import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
