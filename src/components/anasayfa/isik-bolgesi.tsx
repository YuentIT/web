import { Container } from "@/components/layout/container";
import { ShinyButton } from "@/components/ui/shiny-button";
import type { Anasayfa } from "@/types";

/**
 * Sayfayı kapatan ışık bölgesi: alıntı + "bize katıl" (F4-01 · 19.08.2026).
 *
 * İki bölüm **tek** bir arka planı paylaşıyor. Ayrı olsalardı aralarında bir
 * dikiş görünürdü; böyle olunca iki huzme alıntının hizasında ince ve parlak
 * başlayıp aşağı doğru genişleyerek soluyor ve butonun hemen üstünde kesişiyor.
 *
 * Huzmelerin koni biçimi `clip-path`, bulanıklık ise sarmalayıcıda: tersi
 * olsaydı `clip-path` bulanıklığı da kesip koninin kenarlarını jilet gibi
 * bırakırdı.
 */
export function IsikBolgesi({
  alinti,
  katil,
}: {
  alinti?: Anasayfa["alinti"];
  katil?: Anasayfa["katil"];
}) {
  if (!alinti && !katil) return null;

  return (
    <div className="relative overflow-hidden">
      {/* `top-30` (7.5rem) alıntı metninin hizası: bölüm `pt-24` + üst çizgi +
          blockquote'un `my-7` üst boşluğu ≈ 125 px. Huzmeler bu yüzden
          alıntının üstünde başlamıyor, tam onun hizasından iniyor. */}
      <div
        aria-hidden="true"
        className="yuent-shafts pointer-events-none absolute inset-x-0 top-30 bottom-0"
      >
        <span className="yuent-shaft yuent-shaft-l" />
        <span className="yuent-shaft yuent-shaft-r" />
      </div>
      <div aria-hidden="true" className="yuent-pool" />

      {alinti ? (
        <section className="relative pt-24 sm:pt-28">
          <Container size="default">
            <figure className="flex flex-col items-center text-center">
              <span aria-hidden="true" className="h-px w-13 bg-border-strong" />

              <blockquote className="my-7 font-heading text-[clamp(1.25rem,3vw,2rem)] leading-snug font-bold tracking-[-0.025em] text-balance">
                {alinti.metin}
              </blockquote>

              <span aria-hidden="true" className="h-px w-13 bg-border-strong" />

              <figcaption className="mt-5 text-[0.6875rem] tracking-[0.2em] text-text-subtle uppercase">
                {alinti.kisi}
                {alinti.unvan ? `, ${alinti.unvan}` : ""}
              </figcaption>
            </figure>
          </Container>
        </section>
      ) : null}

      {katil ? (
        <section className="relative pt-11 pb-24 sm:pb-28">
          <Container size="default">
            <div className="flex flex-col items-center text-center">
              {katil.ustBaslik ? (
                <p className="text-eyebrow text-brand-accent uppercase">
                  {katil.ustBaslik}
                </p>
              ) : null}

              <h2 className="mt-5 font-heading text-[clamp(1.75rem,5vw,2.875rem)] leading-none font-bold tracking-[-0.035em] text-balance uppercase">
                {katil.baslik}
              </h2>

              <p className="mt-5 max-w-xl leading-relaxed text-text-muted">
                {katil.aciklama}
              </p>

              <ShinyButton href={katil.cta.href} className="mt-8">
                {katil.cta.metin}
              </ShinyButton>
            </div>
          </Container>
        </section>
      ) : null}
    </div>
  );
}
