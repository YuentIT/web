import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ElFeneri } from "@/components/atmosfer/el-feneri";
import { IzgaraKatmani } from "@/components/atmosfer/izgara-katmani";
import { DonemSecici } from "@/components/ekip/donem-secici";
import { EkipListesi } from "@/components/ekip/ekip-listesi";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { getDonemler, getGuncelDonem, getSite } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  // `donem.baslik` zaten "2025-2026 Ekibi" biçiminde; başlığa eklemek
  // "Ekibimiz 2025-2026 Ekibi" gibi bir tekrar üretiyordu.
  const site = await getSite();
  return {
    title: `Ekibimiz — ${site.ad}`,
    description: `${site.kisaAd} yönetim kurulu ve koordinatörleri.`,
  };
}

/**
 * `/ekibimiz` (F4-03) — güncel dönemin ekibi.
 *
 * Güncel dönem `content/donemler/`de `"guncel": true` olan dosya; okuyucu
 * tam olarak bir tane olmasını zorunlu tutuyor, yani burada "hangisi güncel"
 * belirsizliği doğamıyor. Yine de dönem hiç yoksa 404 veriliyor: boş bir ekip
 * sayfası yayınlamaktansa sayfanın olmadığını söylemek doğru.
 *
 * Düzen ve sekme mantığı `EkipListesi`de; `/ekibimiz/[donem]` (F4-04) aynı
 * bileşeni kullanıyor.
 */
export default async function EkibimizSayfasi() {
  const [donemler, guncel] = await Promise.all([
    getDonemler(),
    getGuncelDonem(),
  ]);

  if (!guncel) notFound();

  return (
    <>
      <ElFeneri />

      <div className="relative z-10">
        <div className="relative">
          <IzgaraKatmani />

          <section className="relative pt-16 pb-16 sm:pt-20 sm:pb-20">
            <Container size="wide">
              {/* Özet metni yok: kişi sayısını cümleyle söylemek kartların
                  kendisiyle aynı bilgiyi tekrarlıyordu (20.08.2026 kararı). */}
              <PageHeader eyebrow={guncel.baslik} title="Ekibimiz">
                <DonemSecici
                  donemler={donemler}
                  aktifSlug={guncel.slug}
                  className="mt-2"
                />
              </PageHeader>
            </Container>
          </section>
        </div>

        <section className="pb-24 sm:pb-28">
          <Container size="wide">
            <EkipListesi uyeler={guncel.uyeler} />
          </Container>
        </section>
      </div>
    </>
  );
}
