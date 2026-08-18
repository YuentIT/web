import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/**
 * GEÇİCİ yer tutucu sayfa.
 *
 * Tek işi iki şeyi kanıtlamak: (1) shadcn/ui kurulumu çalışıyor — F1-06'nın
 * kabul kriteri "örnek buton render oluyor", (2) canlıdaki adres artık
 * Next.js demo sayfasını göstermiyor.
 *
 * Gerçek ana sayfa F4-01'de yazılacak ve bu dosyanın tamamının yerini alacak.
 */
export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <Badge variant="secondary">Yapım aşamasında</Badge>

      <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-balance">
        Yeditepe Üniversitesi Liderlik ve Girişimcilik Kulübü
      </h1>

      <p className="max-w-prose text-lg text-muted-foreground">
        Yeni sitemiz yapım aşamasında. O zamana kadar bize aşağıdaki adresten
        ulaşabilirsiniz.
      </p>

      {/* Base UI'da Radix'in `asChild`i yok; bileşeni başka bir etikete
          giydirmek için `render` prop'u kullanılıyor. */}
      <Button size="lg" render={<a href="mailto:yuent@yeditepe.edu.tr" />}>
        yuent@yeditepe.edu.tr
      </Button>
    </main>
  );
}
