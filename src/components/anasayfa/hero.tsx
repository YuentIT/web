import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { KaydirmaIpucu } from "@/components/atmosfer/kaydirma-ipucu";
import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Anasayfa } from "@/types";

/**
 * Hero çağrıları `Button` yerine `buttonVariants` ile stillenmiş `Link`.
 *
 * `<Button render={<Link/>}>` Base UI'ı bir bağlantıyı buton gibi yönetmeye
 * zorluyor: `nativeButton` uyarısı veriyor, `nativeButton={false}` dendiğinde
 * de `<a>`ya `role="button"` ekliyor — yani gezinen bir bağlantı ekran
 * okuyucuda "buton" diye okunuyor. Gerçekte bunlar buton değil, buton gibi
 * görünen bağlantılar; `buttonVariants` tam bu iş için dışa aktarılmış.
 *
 * Ölçü sistemin `lg`sinden büyük: bu hero'da başlık 68 px'e çıkıyor ve
 * sistemin 36 px'lik butonu yanında kayboluyordu.
 */
const CTA_SINIFI =
  "h-12 px-6 text-xs font-extrabold tracking-[0.08em] uppercase";

/**
 * Bir başlık satırını, `vurgu` geçtiği yerde aksan rengine boyayarak çizer.
 * Geçmiyorsa satır olduğu gibi döner — vurgu görünüm meselesi, metnin kendisi
 * her hâlükârda eksiksiz kalıyor.
 */
function VurguluSatir({ satir, vurgu }: { satir: string; vurgu?: string }) {
  if (!vurgu) return <>{satir}</>;

  const konum = satir.indexOf(vurgu);
  if (konum === -1) return <>{satir}</>;

  return (
    <>
      {satir.slice(0, konum)}
      <span className="text-brand-accent">{vurgu}</span>
      {satir.slice(konum + vurgu.length)}
    </>
  );
}

/**
 * Ana sayfa hero'su (F4-01 · 19.08.2026 görsel yön).
 *
 * Tam ekran: header 4rem sabit yükseklikte olduğu için hero `100svh - 4rem`
 * alıyor, ikisi birlikte ilk ekranı tam dolduruyor. Header'ı `fixed` yapıp
 * hero'ya `100svh` vermek de mümkündü ama o, henüz yazılmamış diğer sayfaların
 * hepsine üst boşluk borcu bırakırdı.
 *
 * `svh` kullanılıyor, `vh` değil: mobil tarayıcılarda adres çubuğu görünürken
 * `100vh` ekrandan taşıyor ve kayan şerit ilk ekranda görünmüyor.
 *
 * Başlık satırları içerikten geliyor (`\n`), her satır kendi maskesinin
 * içinden 130 ms arayla yükseliyor. Animasyon `style` ile veriliyor çünkü
 * gecikme satır sırasına bağlı; azaltılmış harekette `globals.css` bunu
 * `!important` ile kapatıyor.
 */
export function Hero({
  hero,
  serit,
}: {
  hero: Anasayfa["hero"];
  /** Hero'nun alt kenarına oturan kayan şerit. Ayrı bir kardeş olarak
   *  konsaydı ilk ekran `100svh`i aşar ve şerit ancak kaydırınca görünürdü. */
  serit?: React.ReactNode;
}) {
  const satirlar = hero.baslik.split("\n");

  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] flex-col">
      {/* Gezinen ışık lekeleri */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <i className="yuent-orb yuent-orb-1" />
        <i className="yuent-orb yuent-orb-2" />
        <i className="yuent-orb yuent-orb-3" />
        <i className="yuent-orb yuent-orb-4" />
      </div>

      <Container
        size="wide"
        className="relative flex flex-1 flex-col justify-center py-20"
      >
        {hero.ustBaslik ? (
          <p className="text-eyebrow text-text-muted uppercase">
            {hero.ustBaslik}
          </p>
        ) : null}

        <h1
          data-yuent-rise
          className="mt-6 font-heading text-[clamp(1.875rem,5.6vw,4.25rem)] leading-[0.9] font-bold tracking-[-0.042em] uppercase"
        >
          {satirlar.map((satir, i) => (
            // Dış span maske, iç span hareket eden yüzey: `overflow-hidden`
            // olmadan satır yukarıdan değil boşluktan gelmiş gibi görünür.
            <span key={satir} className="block overflow-hidden">
              <span
                className="block"
                style={{
                  animation: `yuent-rise 1s cubic-bezier(0.16, 1, 0.3, 1) ${
                    0.05 + i * 0.13
                  }s backwards`,
                }}
              >
                <VurguluSatir satir={satir} vurgu={hero.vurgu} />
              </span>
            </span>
          ))}
        </h1>

        <p className="mt-6 max-w-lg leading-relaxed text-text-muted">
          {hero.aciklama}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href={hero.birincilCta.href}
            className={cn(
              buttonVariants({ size: "lg" }),
              CTA_SINIFI,
              "yuent-cta rounded-none hover:bg-primary",
            )}
          >
            {hero.birincilCta.metin}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>

          {hero.ikincilCta ? (
            // Bilerek `buttonVariants({variant:"outline"})` kullanılmıyor:
            // o varyantın `hover:text-foreground` ve `dark:border-input`
            // sınıfları Tailwind'in *utilities* katmanında, `.yuent-cta-outline`
            // ise *components* katmanında. Utilities her zaman kazandığı için
            // aksana dönme hiç uygulanmıyordu. Renk bu yüzden burada, yalnızca
            // kalkma hareketi sınıfta.
            <Link
              href={hero.ikincilCta.href}
              className={cn(
                "yuent-cta-outline inline-flex shrink-0 items-center justify-center gap-1.5 border border-border-strong whitespace-nowrap text-text-muted outline-none select-none",
                "hover:border-brand-accent hover:text-brand-accent focus-visible:border-brand-accent focus-visible:text-brand-accent focus-visible:ring-3 focus-visible:ring-ring/50",
                CTA_SINIFI,
              )}
            >
              {hero.ikincilCta.metin}
            </Link>
          ) : null}
        </div>
      </Container>

      <KaydirmaIpucu className="relative pb-7" />

      {serit}
    </section>
  );
}
