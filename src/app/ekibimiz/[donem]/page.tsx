import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { ElFeneri } from "@/components/atmosfer/el-feneri";
import { IzgaraKatmani } from "@/components/atmosfer/izgara-katmani";
import { DonemSecici } from "@/components/ekip/donem-secici";
import { EkipListesi } from "@/components/ekip/ekip-listesi";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { getDonem, getDonemler, getSite } from "@/lib/content";

/**
 * Arşivdeki her dönem derleme anında üretiliyor. Güncel dönem **listeye
 * girmiyor**: onun adresi `/ekibimiz` ve aynı ekibi iki adreste yayınlamanın
 * anlamı yok. Yine de biri elle `/ekibimiz/2025-2026` yazarsa sayfa 404
 * vermiyor, `/ekibimiz`e yönlendiriyor (aşağıda).
 */
export async function generateStaticParams() {
  const donemler = await getDonemler();
  return donemler.filter((d) => !d.guncel).map((d) => ({ donem: d.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/ekibimiz/[donem]">): Promise<Metadata> {
  const { donem: slug } = await params;
  const [site, donem] = await Promise.all([getSite(), getDonem(slug)]);

  if (!donem) return {};

  // `donem.baslik` zaten "2022-2023 Ekibi" biçiminde; sonuna "Ekibi" eklemek
  // "2022-2023 Ekibi Ekibi" gibi bir tekrar üretiyordu.
  return {
    title: `${donem.baslik} — ${site.ad}`,
    description: `${site.kisaAd} ${donem.baslik.replace(/\s*Ekibi$/u, "")} dönemi yönetim kurulu ve koordinatörleri.`,
  };
}

/**
 * `/ekibimiz/[donem]` (F4-04) — arşivdeki bir dönemin ekibi.
 *
 * Düzen `/ekibimiz` ile birebir aynı; ikisi de `EkipListesi`yi kullanıyor.
 * Tek fark başlıktaki dönem adı ve seçicideki aktif düğme.
 */
export default async function DonemEkibiSayfasi({
  params,
}: PageProps<"/ekibimiz/[donem]">) {
  const { donem: slug } = await params;
  const [site, donemler, donem] = await Promise.all([
    getSite(),
    getDonemler(),
    getDonem(slug),
  ]);

  if (!donem) notFound();

  // Güncel dönemin kanonik adresi `/ekibimiz`. Buraya elle gelinirse aynı
  // içeriği ikinci bir adreste yayınlamak yerine oraya yönlendiriliyor.
  if (donem.guncel) redirect("/ekibimiz");

  return (
    <>
      <ElFeneri />

      <div className="relative z-10">
        <div className="relative">
          <IzgaraKatmani />

          <section className="relative pt-16 pb-16 sm:pt-20 sm:pb-20">
            <Container size="wide">
              <PageHeader
                eyebrow="Arşiv"
                title={donem.baslik}
                description={`${site.kisaAd} bu dönem ${donem.uyeler.length} kişilik bir ekiple çalıştı.`}
              >
                <DonemSecici
                  donemler={donemler}
                  aktifSlug={donem.slug}
                  className="mt-2"
                />
              </PageHeader>
            </Container>
          </section>
        </div>

        <section className="pb-24 sm:pb-28">
          <Container size="wide">
            <EkipListesi uyeler={donem.uyeler} />
          </Container>
        </section>
      </div>
    </>
  );
}
