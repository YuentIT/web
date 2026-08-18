import { cn } from "@/lib/utils";

import { Container } from "./container";

/**
 * Dikey ritim (F2-08).
 *
 * Sayfalardaki bölüm aralığı buradan gelir. Kabul kriteri "iki farklı sayfada
 * aynı dikey ritim" olduğu için boşluk değeri tek yerde durur.
 *
 * Kendi <Container>'ını içerir; ızgara gibi tam genişlik gereken durumlarda
 * `bare` ile kapatılıp içeride ayrı Container kullanılabilir.
 */
export function Section({
  className,
  containerSize = "default",
  spacing = "default",
  bare = false,
  children,
  ...props
}: React.ComponentProps<"section"> & {
  containerSize?: React.ComponentProps<typeof Container>["size"];
  /** `tight` art arda gelen bölümler için, `loose` sayfa açılışı için. */
  spacing?: "tight" | "default" | "loose";
  /** Container'ı atla — içeride kendin sarmalayacaksan. */
  bare?: boolean;
}) {
  return (
    <section
      data-slot="section"
      className={cn(
        spacing === "tight" && "py-10 sm:py-12",
        spacing === "default" && "py-16 sm:py-20",
        spacing === "loose" && "py-20 sm:py-28",
        className,
      )}
      {...props}
    >
      {bare ? children : <Container size={containerSize}>{children}</Container>}
    </section>
  );
}
