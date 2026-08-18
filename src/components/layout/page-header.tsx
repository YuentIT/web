import { cn } from "@/lib/utils";

/**
 * Sayfa başlığı bloğu (F2-08).
 *
 * Her iç sayfa buradan açılır: üst başlık → h1 → özet. Sayfa başına **tek h1**
 * kuralı (Faz 4 ortak kabul kriteri) bu bileşen kullanıldığı sürece kendiliğinden
 * sağlanır — başlığı elle yazan kimse ikinci bir h1 açamaz.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<"header">, "title"> & {
  /** Küçük üst etiket — bölüm adı, kategori, tarih. */
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
}) {
  return (
    <header
      data-slot="page-header"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    >
      {eyebrow ? (
        <p className="text-eyebrow text-brand-accent uppercase">{eyebrow}</p>
      ) : null}

      <h1 className="text-title text-balance">{title}</h1>

      {description ? (
        <p className="max-w-[55ch] text-lead text-text-muted">{description}</p>
      ) : null}

      {children}
    </header>
  );
}
