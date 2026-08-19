import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * Kenarında dönen ışıkla çevrili çağrı butonu.
 *
 * Syntax UI'ın "shiny button"ının uyarlaması. Görsel işin tamamı
 * `globals.css`teki `.shiny-cta` sınıfında: `@property` ile animasyonlanan
 * konik gradyan açısı global bir at-rule olduğu için bileşen içi
 * `<style jsx>` yerine orada duruyor. Özgün koddaki Google Fonts import'u
 * çıkarıldı (fontlar self-host) ve mavi vurgu asit sarısına çevrildi.
 *
 * Yazının kendi `<span>`ı şart: sınıf `z-index: -1` katmanlarına dayanıyor,
 * metin sarılmazsa dönen gradyanın altında kalıyor.
 */
export function ShinyButton({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "shiny-cta inline-block font-heading focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
        className,
      )}
    >
      <span>{children}</span>
    </Link>
  );
}
