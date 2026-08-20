import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { ElFeneri } from "@/components/atmosfer/el-feneri";
import { Hero } from "@/components/anasayfa/hero";
import { IsikBolgesi } from "@/components/anasayfa/isik-bolgesi";
import { IzgaraKatmani } from "@/components/atmosfer/izgara-katmani";
import { KayanSerit } from "@/components/anasayfa/kayan-serit";
import { Container } from "@/components/layout/container";
import { EtkinlikIzgarasi } from "@/components/icerik/etkinlik-izgarasi";
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
 * Izgara yalnızca `content/anasayfa.json → oneCikanEtkinlikler`i gösteriyor
 * (20.08.2026). Bir süre tüm etkinlikleri basıyordu; etkinlik listesi büyümeye
 * başlayınca ana sayfa `/etkinlikler`in kopyası hâline gelecekti. Şimdi ana
 * sayfa seçki, `/etkinlikler` ise tam liste. Sıralama da o listeden geliyor:
 * hangisinin önce görüneceği editoryal bir karar, `sira` alanının işi değil.
 *
 * Kayan şerit **tüm** etkinliklerin adlarını okumaya devam ediyor — o bir
 * içindekiler listesi değil, hero'nun altındaki atmosfer.
 *
 * Tüm metin `content/` altından geliyor; bu dosyada hiçbir içerik gömülü değil.
 */
export default async function Home() {
  const [anasayfa, hakkimizda, etkinlikler] = await Promise.all([
    getAnasayfa(),
    getHakkimizda(),
    getEtkinlikler(),
  ]);

  // Öne çıkanlar, `oneCikanEtkinlikler`deki sırayla. Slug'ların gerçekten bir
  // etkinliğe karşılık geldiğini `getAnasayfa()` derleme anında denetliyor, o
  // yüzden burada eksik bir eşleşme kalamaz; yine de tip düzeyinde ayıklanıyor.
  //
  // Kartın göstermediği MDX gövdesi taşınmıyor, ihtiyaç duyulan alanlara
  // indirgeniyor.
  const slugaGore = new Map(etkinlikler.map((e) => [e.slug, e]));
  const etkinlikKartlari = anasayfa.oneCikanEtkinlikler
    .map((slug) => slugaGore.get(slug))
    .filter((e) => e !== undefined)
    .map((e) => ({
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

            {/* Etkinlikler — seçki boşsa başlık da çizilmiyor: kartsız bir
                "Etkinliklerimiz" bandı sayfada bir şeyin bozulduğunu düşündürür. */}
            {etkinlikKartlari.length > 0 ? (
              <section className="pt-20 pb-24 sm:pt-24 sm:pb-28">
                <Container size="wide">
                  <div className="mb-10 flex flex-col items-center text-center">
                    <h2 className="font-heading text-[clamp(1.75rem,4vw,3rem)] leading-none font-bold tracking-[-0.03em] uppercase">
                      Etkinliklerimiz
                    </h2>

                    <Link
                      href="/etkinlikler"
                      className="yuent-parla mt-4 inline-flex items-center gap-1.5 rounded text-[0.6875rem] tracking-[0.14em] text-brand-accent uppercase focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                    >
                      Tümünü gör
                      <ArrowRight className="size-3.5" aria-hidden="true" />
                    </Link>
                  </div>

                  <EtkinlikIzgarasi etkinlikler={etkinlikKartlari} />
                </Container>
              </section>
            ) : null}
          </div>
        </div>

        {/* Izgarasız kapanış: alıntı + bize katıl */}
        <IsikBolgesi alinti={anasayfa.alinti} katil={anasayfa.katil} />
      </div>
    </>
  );
}
