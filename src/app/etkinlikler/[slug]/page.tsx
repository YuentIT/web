import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ElFeneri } from "@/components/atmosfer/el-feneri";
import { IzgaraKatmani } from "@/components/atmosfer/izgara-katmani";
import { MDXContent } from "@/components/icerik/mdx-content";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { buttonVariants } from "@/components/ui/button";
import { getEtkinlik, getEtkinlikler, getSite } from "@/lib/content";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  const etkinlikler = await getEtkinlikler();
  return etkinlikler.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/etkinlikler/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const [site, etkinlik] = await Promise.all([getSite(), getEtkinlik(slug)]);

  if (!etkinlik) return {};

  return {
    title: `${etkinlik.baslik} — ${site.ad}`,
    description: etkinlik.kisaAciklama,
  };
}

/**
 * `/etkinlikler/[slug]` (F4-06) — bir etkinliğin kendi sayfası.
 *
 * **Bilgilendirme sayfası, duyuru değil** (18.08.2026 kararı): tarih, yer ve
 * kayıt durumu gösterilmiyor — bu alanlar şemada zaten yok. Geriye tek bir
 * opsiyonel `kayitLinki` kaldı; doluysa bir "Kayıt Formu" butonu çiziliyor,
 * boşsa sayfada hiçbir kayıt öğesi görünmüyor. Tarih dahil ayrıntılar formun
 * içinde açıklanıyor.
 *
 * Gövde `content/etkinlikler/<slug>.mdx` dosyasının frontmatter'ından sonraki
 * kısım; `MDXContent` onu basıyor, frontmatter'ı ise `getEtkinlik()` okuyup
 * zod'dan geçiriyor.
 */
export default async function EtkinlikSayfasi({
  params,
}: PageProps<"/etkinlikler/[slug]">) {
  const { slug } = await params;
  const etkinlik = await getEtkinlik(slug);

  if (!etkinlik) notFound();

  return (
    <>
      <ElFeneri />

      <div className="relative z-10">
        <div className="relative">
          <IzgaraKatmani />

          <section className="relative pt-16 pb-12 sm:pt-20 sm:pb-14">
            <Container>
              <PageHeader
                eyebrow={etkinlik.kategori}
                title={etkinlik.baslik}
                description={etkinlik.kisaAciklama}
              />

              {etkinlik.kayitLinki ? (
                <p className="mt-8">
                  <Link
                    href={etkinlik.kayitLinki}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "yuent-cta h-12 rounded-none px-6 text-xs font-extrabold tracking-[0.08em] uppercase hover:bg-primary",
                    )}
                  >
                    Kayıt Formu
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </p>
              ) : null}
            </Container>
          </section>
        </div>

        {etkinlik.kapakGorsel ? (
          <section className="pb-12 sm:pb-14">
            <Container>
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border bg-surface-2">
                <Image
                  src={etkinlik.kapakGorsel}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 60rem, 92vw"
                  priority
                  className="object-cover"
                />
              </div>
            </Container>
          </section>
        ) : null}

        <section className="pb-20 sm:pb-24">
          <Container>
            <MDXContent koleksiyon="etkinlikler" slug={etkinlik.slug} />

            {etkinlik.ozellikler.length > 0 ? (
              <div className="mt-12 border-t border-border pt-8">
                <h2 className="text-eyebrow text-brand-accent uppercase">
                  Öne çıkanlar
                </h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {etkinlik.ozellikler.map((ozellik) => (
                    <li key={ozellik} className="flex gap-3 text-sm">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-px w-4 shrink-0 bg-brand-accent"
                      />
                      <span className="leading-relaxed text-text-muted">
                        {ozellik}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {etkinlik.partnerler.length > 0 ? (
              <div className="mt-10 border-t border-border pt-8">
                <h2 className="text-eyebrow text-brand-accent uppercase">
                  Partnerler
                </h2>
                {/* Logo değil, ad listesi: elimizde partner logoları yok ve
                    stok görsel konmuyor (planın açık kuralı). */}
                <p className="mt-4 text-sm leading-relaxed text-text-muted">
                  {etkinlik.partnerler.join(" · ")}
                </p>
              </div>
            ) : null}

            <p className="mt-14">
              <Link
                href="/etkinlikler"
                className="yuent-parla inline-flex items-center gap-1.5 rounded text-[0.6875rem] tracking-[0.14em] text-brand-accent uppercase focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                <ArrowLeft className="size-3.5" aria-hidden="true" />
                Tüm etkinlikler
              </Link>
            </p>
          </Container>
        </section>
      </div>
    </>
  );
}
