import { Container } from "@/components/layout/container";

export type Alinti = {
  metin: string;
  kisi: string;
  unvan?: string;
};

/**
 * Ortalanmış alıntı bandı.
 *
 * Tırnak işareti **yok** (19.08.2026 kararı): tek bir açılış tırnağı asimetrik
 * duruyordu, çift tırnak ise editoryal dilde gereksiz süs kalıyor. Yerine
 * metnin üstünde ve altında ince birer çizgi var — alıntı olduğunu tipografi
 * söylüyor, noktalama değil.
 */
export function AlintiBandi({
  alinti,
  className,
}: {
  alinti: Alinti;
  className?: string;
}) {
  return (
    <section className={className}>
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
  );
}
