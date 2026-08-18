import { cn } from "@/lib/utils";

/**
 * Yatay sınırlayıcı (F2-08).
 *
 * Sayfa genişliğini ve kenar boşluğunu tek yerden yönetir. Sayfalarda elle
 * `max-w-* mx-auto px-*` yazılmaz — iki sayfa arasında birkaç piksel fark
 * bırakmanın en kolay yolu odur.
 */
export function Container({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & {
  /** `narrow` uzun metin için, `wide` galeri/ızgara için. */
  size?: "narrow" | "default" | "wide";
}) {
  return (
    <div
      data-slot="container"
      className={cn(
        "mx-auto w-full px-5 sm:px-6 lg:px-8",
        size === "narrow" && "max-w-3xl",
        size === "default" && "max-w-5xl",
        size === "wide" && "max-w-7xl",
        className,
      )}
      {...props}
    />
  );
}
