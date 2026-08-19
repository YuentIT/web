import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { ElFeneri } from "@/components/atmosfer/el-feneri";
import { IzgaraKatmani } from "@/components/atmosfer/izgara-katmani";
import { Degerler } from "@/components/hakkimizda/degerler";
import { RoketSayilar } from "@/components/hakkimizda/roket-sayilar";
import { AlintiBandi } from "@/components/icerik/alinti-bandi";
import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { getHakkimizda, getSite } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Sayfa başlığı da içerikten geliyor. `generateMetadata` async olabildiği için
 * `content/site.json`u okuyabiliyor — kulüp adını buraya elle yazmak, adın
 * değiştiği gün sessizce eskiyen ikinci bir kopya oluştururdu.
 *
 * F7-01 tüm sayfalarda metadata'yı sistematik hâle getirecek.
 */
export async function generateMetadata(): Promise<Metadata> {
  const [site, hakkimizda] = await Promise.all([getSite(), getHakkimizda()]);
  return {
    title: `${hakkimizda.baslik ?? "Hakkımızda"} — ${site.ad}`,
    description: site.aciklama,
  };
}

/** Alt köprü butonları — hero'daki ikincil çağrıyla aynı ölçü ve davranış. */
const KOPRU_SINIFI =
  "yuent-cta-outline inline-flex h-12 shrink-0 items-center justify-center gap-2 border border-border-strong px-6 text-xs font-extrabold tracking-[0.08em] whitespace-nowrap text-text-muted uppercase outline-none select-none hover:border-brand-accent hover:text-brand-accent focus-visible:border-brand-accent focus-visible:text-brand-accent focus-visible:ring-3 focus-visible:ring-ring/50";

/**
 * `/hakkimizda` (F4-02).
 *
 * Akış: tam ekran "Biz Kimiz" girişi → hikâye → misyon/vizyon → alıntı →
 * roket ve dumandan doğan sayılar → değerlerimiz → ekibimiz ve katıl butonları.
 *
 * Ana sayfanın görsel dili sürüyor ama kısılmış: ızgara yalnızca giriş
 * ekranının arkasında duruyor ve içerik başlamadan sönüyor, ışık huzmeleri hiç
 * yok (19.08.2026 kararı — alıntı bandından kaldırıldı). Uzun metnin arkasında
 * sürekli hareket bilerek yok; sayfadaki tek süregelen hareket el feneri.
 *
 * **Hikâye bölümü akış tarifinde geçmiyordu ama duruyor:** kulübün kendi
 * anlatısı sitede başka hiçbir yerde yok, düşürülürse Wix'ten taşınan metin
 * hiçbir sayfada görünmez hâle gelir. Fazla geldiyse tek bir `<section>`
 * silmek yeterli.
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
        {/* Giriş — ilk ekranda yalnızca burası görünüyor */}
        <div className="relative">
          <IzgaraKatmani />

          <section className="relative flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center px-5 pb-16 text-center">
            <h1 className="font-heading text-[clamp(2.25rem,7vw,5rem)] leading-[0.9] font-bold tracking-[-0.042em] text-balance uppercase">
              {hakkimizda.baslik ?? "Hakkımızda"}
            </h1>

            {hakkimizda.slogan ? (
              <p className="mt-6 max-w-3xl font-heading text-[clamp(1.125rem,2.6vw,1.875rem)] leading-tight font-bold tracking-[-0.02em] text-balance text-text-muted">
                {hakkimizda.slogan}
              </p>
            ) : null}
          </section>
        </div>

        {/* Hikâye */}
        <section className="pt-4 pb-20 sm:pb-24">
          <Container size="wide">
            {/* İki yana yaslı — Word'deki "İki Yana Yasla" ile aynı.
                `hyphens-auto` şart: yaslama tek başına Türkçe gibi uzun
                kelimeli bir dilde satır içinde büyük boşluklar açıyor,
                heceleme onları kapatıyor. Dil `<html lang="tr">`den geliyor. */}
            <div className="prose mx-auto text-justify hyphens-auto">
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

        {/* Alıntı — ışık huzmeleri kaldırıldı (19.08.2026), düz zeminde */}
        {alinti ? (
          <AlintiBandi
            alinti={alinti}
            className="pt-20 pb-20 sm:pt-24 sm:pb-24"
          />
        ) : null}

        {/* Roket ve dumandan doğan sayılar.
            `Container` bilerek yok: roket ekranın bir ucundan girip diğer
            ucundan çıkıyor, kapsayıcının kenarında kaybolmuyor. Sayılar kendi
            kapsayıcısını bileşenin içinde alıyor. */}
        {hakkimizda.istatistikler.length > 0 ? (
          <section className="pb-24 sm:pb-28">
            <RoketSayilar istatistikler={hakkimizda.istatistikler} />
          </section>
        ) : null}

        {/* Değerlerimiz */}
        {hakkimizda.degerler.length > 0 ? (
          <section className="pb-20 sm:pb-24">
            <Container size="wide">
              <h2 className="mb-10 text-center font-heading text-[clamp(1.5rem,3.4vw,2.375rem)] leading-none font-bold tracking-[-0.03em] uppercase">
                Değerlerimiz
              </h2>

              <Degerler degerler={hakkimizda.degerler} />
            </Container>
          </section>
        ) : null}

        {/* Sayfayı bitiren iki buton */}
        <section className="pb-24 sm:pb-28">
          <Container size="wide">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/ekibimiz" className={KOPRU_SINIFI}>
                Ekibimiz
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>

              <Link
                href="/katil"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "yuent-cta h-12 rounded-none px-6 text-xs font-extrabold tracking-[0.08em] uppercase hover:bg-primary",
                )}
              >
                {site.kisaAd} ailesine katıl
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
}
