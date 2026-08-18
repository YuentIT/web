import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * Header/footer logo kilidi (F2-06).
 *
 * Elimizdeki `logo_white.png` üç parçalı **dikey** bir kilit; 40 px'lik bir
 * header'da alt satırı ~9 px'e düşüp okunmaz hâle geliyor. Bu yüzden görsel
 * olarak yalnızca 262×262'lik monogram kullanılıyor, kulüp adı yanına **metinle**
 * yazılıyor — hem okunuyor hem de arama motoru ve ekran okuyucu için gerçek
 * metin oluyor.
 *
 * Görselin `alt`ı bilerek boş: hemen yanındaki metin aynı bilgiyi zaten
 * veriyor, ikisini birden okutmak ekran okuyucuda tekrara yol açar.
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

      <span className="hidden leading-tight sm:block">
        <span className="block text-[0.625rem] tracking-[0.14em] text-text-subtle uppercase">
          Yeditepe Üniversitesi
        </span>
        <span className="block font-heading text-sm font-bold text-foreground">
          Liderlik ve Girişimcilik Kulübü
        </span>
      </span>
    </Link>
  );
}
