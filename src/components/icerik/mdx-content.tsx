import { cn } from "@/lib/utils";

/**
 * `content/` altındaki bir MDX dosyasının gövdesini render eder (F3-05).
 *
 * Frontmatter buradan **okunmuyor** — onu `src/lib/content.ts` gray-matter ile
 * okuyup zod'dan geçiriyor. Bu bileşen yalnızca gövdeyi basıyor. İş bölümü
 * bilinçli: doğrulama derleme sırasında tek yerde olsun, render tarafı da
 * şemayı ikinci kez bilmek zorunda kalmasın.
 *
 * Yükleyiciler tek tek yazılmadı; `import()` şablon değişkeniyle çağrılıyor ve
 * derleyici o klasördeki tüm `.mdx` dosyaları için bir bağlam modülü üretiyor.
 * Böylece yeni bir etkinlik eklemek için `content/etkinlikler/` altına dosya
 * atmak yeterli — burada kayıt tutulmuyor.
 */

export type Koleksiyon = "etkinlikler" | "egitimler" | "blog" | "hukuki";

async function govdeyiYukle(koleksiyon: Koleksiyon, slug: string) {
  // Koleksiyon başına ayrı `import()` yazılmıyor: derleyici her şablon için
  // ayrı bir bağlam modülü kurar ve **boş klasör için bunu yapamaz.**
  // `content/egitimler`, `content/blog` ve `content/hukuki` henüz boş olduğu
  // için dörde bölünmüş hâli derlemeyi "module not found" ile kırıyordu.
  // Tek şablon `content/*/*.mdx` üzerinden tek bağlam kuruyor; içinde en az
  // bir dosya (etkinlikler) bulunduğu sürece boş koleksiyonlar sorun çıkarmıyor.
  const modul = await import(`../../../content/${koleksiyon}/${slug}.mdx`);
  return modul.default;
}

export async function MDXContent({
  koleksiyon,
  slug,
  className,
}: {
  koleksiyon: Koleksiyon;
  slug: string;
  className?: string;
}) {
  const Govde = await govdeyiYukle(koleksiyon, slug);

  return (
    <div className={cn("prose", className)}>
      <Govde />
    </div>
  );
}
