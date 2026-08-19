import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * Header/footer logo kilidi (F2-06).
 *
 * Elimizdeki `logo_white.png` üç parçalı **dikey** bir kilit; 40 px'lik bir
 * header'da alt satırı ~9 px'e düşüp okunmaz hâle geliyor. Bu yüzden görsel
 * olarak yalnızca 262×262'lik monogram kullanılıyor, yanına da kısa ad
 * **metinle** yazılıyor — hem okunuyor hem de gerçek metin oluyor.
 *
 * Yanındaki metin 19.08.2026'da tam addan kısa ada (`YUENT`) indi: yeni
 * görsel yönde header hero'nun üstünde saydam duruyor ve iki satırlık uzun ad
 * devasa başlıkla görsel olarak yarışıyordu. Tam ad kaybolmadı — `aria-label`
 * onu taşıyor, yani ekran okuyucu ve arama motoru için hâlâ orada.
 *
 * Görselin `alt`ı bilerek boş: `aria-label` aynı bilgiyi zaten veriyor,
 * ikisini birden okutmak ekran okuyucuda tekrara yol açar.
 */
export function Logo({
  className,
  ...props
}: Omit<React.ComponentProps<typeof Link>, "href">) {
  return (
    <Link
      href="/"
      aria-label="Ana sayfa — Yeditepe Üniversitesi Liderlik ve Girişimcilik Kulübü"
      className={cn(
        "flex items-center gap-3 rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none",
        className,
      )}
      {...props}
    >
      <Image
        src="/logo/logo_white_mark.png"
        alt=""
        width={262}
        height={262}
        priority
        className="h-9 w-9 shrink-0"
      />

      <span className="font-heading text-base font-extrabold tracking-[0.06em] text-foreground">
        YUENT
      </span>
    </Link>
  );
}
