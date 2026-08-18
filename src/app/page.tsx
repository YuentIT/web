import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getSite } from "@/lib/content";

/**
 * GEÇİCİ yer tutucu sayfa.
 *
 * Gerçek ana sayfa F4-01'de yazılacak ve bu dosyanın tamamının yerini alacak.
 * Şimdilik iki işi var: shadcn kurulumunun çalıştığını göstermek (F1-06) ve
 * içerik katmanını gerçekten tüketmek — `getSite()` burada çağrıldığı için
 * bozuk bir `content/site.json` artık **derlemeyi durduruyor** (F3-01).
 */
export default async function Home() {
  const site = await getSite();

  return (
    <Section spacing="loose" containerSize="narrow" className="flex-1">
      <div className="flex flex-col items-center gap-6 text-center">
        <Badge variant="secondary">Yapım aşamasında</Badge>

        <h1 className="text-display text-balance">{site.ad}</h1>

        <p className="max-w-prose text-lead text-text-muted">
          Yeni sitemiz yapım aşamasında. O zamana kadar bize aşağıdaki adresten
          ulaşabilirsiniz.
        </p>

        {/* Base UI'da Radix'in `asChild`i yok; bileşeni başka bir etikete
            giydirmek için `render` prop'u kullanılıyor. */}
        <Button size="lg" render={<a href={`mailto:${site.eposta}`} />}>
          {site.eposta}
        </Button>
      </div>
    </Section>
  );
}
