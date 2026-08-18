import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { EventCard } from "@/components/icerik/event-card";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import {
  getAnasayfa,
  getEtkinlikler,
  getHakkimizda,
  getSite,
} from "@/lib/content";

/**
 * Ana sayfa (F4-01).
 *
 * Plandaki akış: hero → misyon/vizyon → öne çıkan etkinlikler → alıntı →
 * sayılarla biz → "Bize Katıl". Plan ayrıca "yaklaşan etkinlikler" bölümü
 * öngörüyordu; **kaldırıldı**, çünkü sitede tarih yayınlanmıyor
 * (18.08.2026 kararı) ve tarihsiz bir "yaklaşanlar" listesi öne çıkanların
 * kopyası olurdu.
 *
 * Tüm metin `content/` altından geliyor; bu dosyada hiçbir içerik gömülü değil.
 */
export default async function Home() {
  const [site, anasayfa, hakkimizda, etkinlikler] = await Promise.all([
    getSite(),
    getAnasayfa(),
    getHakkimizda(),
    getEtkinlikler(),
  ]);

  const oneCikanlar = anasayfa.oneCikanEtkinlikler
    .map((slug) => etkinlikler.find((e) => e.slug === slug))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  const alinti = hakkimizda.alintilar[0];

  return (
    <>
      {/* Hero */}
      <Section spacing="loose" containerSize="default">
        <div className="flex flex-col items-start gap-6">
          {anasayfa.hero.ustBaslik ? (
            <p className="text-eyebrow text-brand-accent uppercase">
              {anasayfa.hero.ustBaslik}
            </p>
          ) : null}

          <h1 className="max-w-4xl text-display text-balance">
            {anasayfa.hero.baslik}
          </h1>

          <p className="max-w-2xl text-lead text-text-muted">
            {anasayfa.hero.aciklama}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              size="lg"
              render={<Link href={anasayfa.hero.birincilCta.href} />}
            >
              {anasayfa.hero.birincilCta.metin}
              <ArrowRight />
            </Button>

            {anasayfa.hero.ikincilCta ? (
              <Button
                size="lg"
                variant="outline"
                render={<Link href={anasayfa.hero.ikincilCta.href} />}
              >
                {anasayfa.hero.ikincilCta.metin}
              </Button>
            ) : null}
          </div>
        </div>
      </Section>

      {/* Misyon ve vizyon */}
      <Section spacing="default" containerSize="default" className="bg-surface">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="flex flex-col gap-3">
            <h2 className="text-section">Misyonumuz</h2>
            <p className="leading-relaxed text-text-muted">
              {hakkimizda.misyon}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-section">Vizyonumuz</h2>
            <p className="leading-relaxed text-text-muted">
              {hakkimizda.vizyon}
            </p>
          </div>
        </div>
      </Section>

      {/* Öne çıkan etkinlikler */}
      {oneCikanlar.length > 0 ? (
        <Section spacing="default" containerSize="wide">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-section">Etkinliklerimiz</h2>
            <Link
              href="/etkinlikler"
              className="inline-flex items-center gap-1 rounded text-sm text-brand-accent hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              Tümünü gör
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {oneCikanlar.map((etkinlik, i) => (
              <EventCard
                key={etkinlik.slug}
                etkinlik={etkinlik}
                oncelikli={i < 2}
              />
            ))}
          </div>
        </Section>
      ) : null}

      {/* Alıntı */}
      {alinti ? (
        <Section spacing="default" containerSize="narrow">
          <figure className="flex flex-col gap-4">
            <blockquote className="font-heading text-section text-balance">
              &ldquo;{alinti.metin}&rdquo;
            </blockquote>
            <figcaption className="text-sm text-text-subtle">
              — {alinti.kisi}
              {alinti.unvan ? `, ${alinti.unvan}` : ""}
            </figcaption>
          </figure>
        </Section>
      ) : null}

      {/* Sayılarla biz */}
      {anasayfa.sayilarlaBiz.length > 0 ? (
        <Section spacing="default" containerSize="wide" className="bg-surface">
          <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {anasayfa.sayilarlaBiz.map((sayi) => (
              <div key={sayi.etiket} className="flex flex-col gap-1">
                <dt className="sr-only">{sayi.etiket}</dt>
                <dd className="font-heading text-display leading-none font-bold">
                  {sayi.deger}
                </dd>
                <p className="text-sm text-text-muted">{sayi.etiket}</p>
              </div>
            ))}
          </dl>
        </Section>
      ) : null}

      {/* Kapanış çağrısı */}
      <Section spacing="loose" bare>
        <Container size="narrow">
          <div className="flex flex-col items-center gap-5 rounded-2xl border border-border bg-surface-2 p-10 text-center">
            <h2 className="text-section text-balance">
              {site.kisaAd} ailesine katıl
            </h2>
            <p className="max-w-prose text-text-muted">
              Girişimcilik ve liderlik alanında kendini geliştirmek, ekip
              çalışmasının parçası olmak ve etkinliklerimizi birlikte üretmek
              istiyorsan seni aramızda görmek isteriz.
            </p>
            <Button size="lg" render={<Link href="/katil" />}>
              Bize Katıl
              <ArrowRight />
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
