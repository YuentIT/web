import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { ElFeneri } from "@/components/atmosfer/el-feneri";
import { IsikHuzmeleri } from "@/components/atmosfer/isik-huzmeleri";
import { IzgaraKatmani } from "@/components/atmosfer/izgara-katmani";
import { AlintiBandi } from "@/components/icerik/alinti-bandi";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { getHakkimizda, getSite } from "@/lib/content";

/**
 * Sayfa başlığı da içerikten geliyor. `generateMetadata` async olabildiği için
 * `content/site.json`u okuyabiliyor — kulüp adını buraya elle yazmak, adın
 * değiştiği gün sessizce eskiyen ikinci bir kopya oluştururdu.
 *
 * F7-01 tüm sayfalarda metadata'yı sistematik hâle getirecek; buradaki o
 * geçene kadar kök başlığın her sayfada tekrarlanmasını engelliyor.
 */
export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    title: `Hakkımızda — ${site.ad}`,
    description: site.aciklama,
  };
}

/**
 * `/hakkimizda` (F4-02).
 *
 * Akış: sayfa başlığı → hikâye → misyon/vizyon → alıntı → ekibimiz ve katıl
 * köprüleri.
 *
 * Ana sayfanın görsel dili sürüyor ama kısılmış: ızgara yalnızca sayfa
 * başlığının arkasında duruyor ve içerik başlamadan sönüyor, ışık huzmeleri
 * yalnızca alıntı bandında. Uzun metnin arkasında sürekli hareket olmaması
 * kasıtlı — hikâye sayfanın en çok okunan parçası.
 *
 * `istatistikler` şu an boş; dolduğunda buraya bir bölüm eklenmesi gerekir.
 * Boş diziyle çizim yapılmıyor, yer tutucu da konmuyor.
 *
 * Tüm metin `content/hakkimizda.json` ve `content/site.json`dan geliyor.
 */
export default async function HakkimizdaSayfasi() {
  const [site, hakkimizda] = await Promise.all([getSite(), getHakkimizda()]);

  // Hikâye tek bir uzun metin; içerikte paragraf ayrımı varsa ona saygı
  // gösteriliyor, yoksa tek paragraf olarak çiziliyor.
  const paragraflar = hakkimizda.hikaye
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  const alinti = hakkimizda.alintilar[0];

  return (
    <>
      <ElFeneri />

      <div className="relative z-10">
        {/* Başlık bölgesi — arkasında ızgara, içerik başlamadan sönüyor */}
        <div className="relative">
          <IzgaraKatmani />

          <section className="relative pt-16 pb-16 sm:pt-20 sm:pb-20">
            <Container size="wide">
              <PageHeader
                eyebrow={site.universite}
                title="Hakkımızda"
                description={site.aciklama}
              />
            </Container>
          </section>
        </div>

        {/* Hikâye */}
        <section className="pb-20 sm:pb-24">
          <Container size="wide">
            <div className="prose">
              {paragraflar.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
          </Container>
        </section>

        {/* Misyon ve vizyon */}
        <section className="pb-20 sm:pb-24">
          <Container size="wide">
            <div className="grid gap-9 border-t border-border pt-10 md:grid-cols-2">
              <div>
                <span
                  aria-hidden="true"
                  className="block h-0.5 w-8 bg-brand-accent"
                />
                <h2 className="mt-3.5 font-heading text-base font-bold tracking-[0.06em] uppercase">
                  Misyonumuz
                </h2>
                <p className="mt-3 text-sm leading-loose text-text-muted">
                  {hakkimizda.misyon}
                </p>
              </div>

              <div>
                <span
                  aria-hidden="true"
                  className="block h-0.5 w-8 bg-brand-accent"
                />
                <h2 className="mt-3.5 font-heading text-base font-bold tracking-[0.06em] uppercase">
                  Vizyonumuz
                </h2>
                <p className="mt-3 text-sm leading-loose text-text-muted">
                  {hakkimizda.vizyon}
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Alıntı — huzmelerin altında, havuz yok çünkü altında buton yok */}
        {alinti ? (
          <div className="relative overflow-hidden">
            <IsikHuzmeleri havuz={false} className="top-24" />
            <AlintiBandi
              alinti={alinti}
              className="relative pt-20 pb-20 sm:pt-24 sm:pb-24"
            />
          </div>
        ) : null}

        {/* Sayfayı bitiren iki köprü */}
        <section className="pb-24 sm:pb-28">
          <Container size="wide">
            <div className="grid gap-4 border-t border-border pt-10 sm:grid-cols-2">
              <Link
                href="/ekibimiz"
                className="group flex items-center justify-between gap-4 border border-border p-6 transition-colors hover:border-brand-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                <span>
                  <span className="block font-heading text-base font-bold tracking-[0.04em] uppercase">
                    Ekibimiz
                  </span>
                  <span className="mt-1.5 block text-sm text-text-muted">
                    Bu işi birlikte yürüten insanlar ve dönem arşivi
                  </span>
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="size-5 shrink-0 text-text-subtle transition-colors group-hover:text-brand-accent"
                />
              </Link>

              <Link
                href="/katil"
                className="group flex items-center justify-between gap-4 border border-border p-6 transition-colors hover:border-brand-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                <span>
                  <span className="block font-heading text-base font-bold tracking-[0.04em] uppercase">
                    Bize Katıl
                  </span>
                  <span className="mt-1.5 block text-sm text-text-muted">
                    {site.kisaAd} ailesine katılmak için ne gerekiyor
                  </span>
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="size-5 shrink-0 text-text-subtle transition-colors group-hover:text-brand-accent"
                />
              </Link>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
}
