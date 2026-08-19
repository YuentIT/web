import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { ElFeneri } from "@/components/anasayfa/el-feneri";
import { EtkinlikRayi } from "@/components/anasayfa/etkinlik-rayi";
import { Hero } from "@/components/anasayfa/hero";
import { IsikBolgesi } from "@/components/anasayfa/isik-bolgesi";
import { IzgaraKatmani } from "@/components/anasayfa/izgara-katmani";
import { KayanSerit } from "@/components/anasayfa/kayan-serit";
import { Container } from "@/components/layout/container";
import { getAnasayfa, getEtkinlikler, getHakkimizda } from "@/lib/content";

/**
 * Ana sayfa (F4-01 · görsel yön 19.08.2026).
 *
 * Akış: hero → misyon/vizyon → sayılarla biz → etkinlik rayı → alıntı →
 * bize katıl.
 *
 * Sayfanın omurgası **tek bir ızgara katmanı**. Hero'da tam güçte, aşağı
 * indikçe hem maskeyle kesilerek hem opaklığı düşerek zayıflıyor ve etkinlikler
 * bölümü bitmeden tamamen yok oluyor. Alıntı ve kapanış bandı ızgarasız,
 * kendi ışık huzmelerinin altında duruyor — bölüm değişimi böylece ani bir
 * kesme değil, ışığın el değiştirmesi oluyor.
 *
 * Ray **tüm** etkinlikleri gösteriyor, `oneCikanEtkinlikler`i değil: kartlar
 * yatayda kaydırılabildiği için üçle sınırlamanın bir karşılığı kalmadı.
 * Alan `content/anasayfa.json`da duruyor, `/etkinlikler` sayfası (F5) onu
 * kullanacak.
 *
 * Tüm metin `content/` altından geliyor; bu dosyada hiçbir içerik gömülü değil.
 */
export default async function Home() {
  const [anasayfa, hakkimizda, etkinlikler] = await Promise.all([
    getAnasayfa(),
    getHakkimizda(),
    getEtkinlikler(),
  ]);

  // MDX gövdesi istemci bileşenine serileşmesin diye rayın ihtiyacı olan
  // alanlara indirgeniyor.
  const rayKartlari = etkinlikler.map((e) => ({
    slug: e.slug,
    baslik: e.baslik,
    kisaAciklama: e.kisaAciklama,
    kategori: e.kategori,
    kapakGorsel: e.kapakGorsel,
    ozellikler: e.ozellikler,
  }));

  return (
    <>
      <ElFeneri />

      <div className="relative z-10">
        {/* Izgara bölgesi: hero'dan etkinliklerin sonuna kadar */}
        <div className="relative">
          <IzgaraKatmani />

          <div className="relative">
            <Hero
              hero={anasayfa.hero}
              serit={<KayanSerit metinler={etkinlikler.map((e) => e.baslik)} />}
            />

            {/* Misyon ve vizyon */}
            <section className="pt-20 sm:pt-24">
              <Container size="wide">
                <div className="grid gap-9 md:grid-cols-2">
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

            {/* Sayılarla biz */}
            {anasayfa.sayilarlaBiz.length > 0 ? (
              <section className="pt-13">
                <Container size="wide">
                  <dl className="grid gap-6 border-t border-border pt-7 sm:grid-cols-2 lg:grid-cols-3">
                    {anasayfa.sayilarlaBiz.map((sayi) => (
                      <div key={sayi.etiket}>
                        <dt className="sr-only">{sayi.etiket}</dt>
                        <dd className="font-heading text-[clamp(2.125rem,5vw,3.625rem)] leading-none font-bold tracking-[-0.04em]">
                          {sayi.deger}
                        </dd>
                        <p className="mt-2.5 text-[0.6875rem] tracking-[0.14em] text-text-subtle uppercase">
                          {sayi.etiket}
                        </p>
                      </div>
                    ))}
                  </dl>
                </Container>
              </section>
            ) : null}

            {/* Etkinlik rayı */}
            <section className="pt-20 pb-24 sm:pt-24 sm:pb-28">
              <Container size="wide">
                <div className="mb-7 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-4">
                  <h2 className="font-heading text-[clamp(1.5rem,3.4vw,2.375rem)] leading-none font-bold tracking-[-0.03em] uppercase">
                    Etkinliklerimiz
                  </h2>

                  <Link
                    href="/etkinlikler"
                    className="inline-flex items-center gap-1.5 border border-brand-accent/35 px-3.5 py-2 text-[0.6875rem] tracking-[0.12em] text-brand-accent uppercase transition-colors hover:bg-brand-accent hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    Tümünü gör
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </Container>

              <Container size="wide">
                <EtkinlikRayi etkinlikler={rayKartlari} />
              </Container>
            </section>
          </div>
        </div>

        {/* Izgarasız kapanış: alıntı + bize katıl */}
        <IsikBolgesi alinti={anasayfa.alinti} katil={anasayfa.katil} />
      </div>
    </>
  );
}
