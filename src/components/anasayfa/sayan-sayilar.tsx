import { CountingNumber } from "@/components/ui/counting-number";

export type Sayi = { deger: string; etiket: string };

/**
 * `"2000+"` → `{ rakam: 2000, sonek: "+" }`.
 *
 * İçerik şeması sayıyı sonekiyle birlikte tek metin olarak tutuyor ve öyle
 * kalması doğru: içerik yazan kişi "2000+" yazmak istiyor, iki ayrı alan
 * doldurmak değil. Ayrıştırma bu yüzden burada, şemada değil.
 *
 * Başında rakam olmayan bir değer (ör. "—") `rakam: null` dönüyor ve olduğu
 * gibi, saymadan basılıyor.
 */
function ayristir(deger: string): { rakam: number | null; sonek: string } {
  const eslesme = /^(\d+)(.*)$/.exec(deger.trim());
  if (!eslesme) return { rakam: null, sonek: deger };
  return { rakam: Number(eslesme[1]), sonek: eslesme[2] };
}

/**
 * Ana sayfadaki sayı bandı (F3-03 · 21.08.2026).
 *
 * Rakamlar `/hakkimizda`'dakilerle **aynı** — Mustafa'nın kararı. Animasyon
 * ise bilerek farklı: orada roket geçip sayıları dumandan çıkarıyor
 * (`RoketSayilar`), burada sayılar sıfırdan hedefe sayıyor. Aynı bilginin iki
 * sayfada iki ayrı sunumu olması istendi.
 *
 * Bu bileşenin kendisi sunucu bileşeni; istemciye inen tek şey `CountingNumber`
 * yaprakları. Etiketler, ızgara ve sonekler sunucuda kalıyor.
 */
export function SayanSayilar({ sayilar }: { sayilar: Sayi[] }) {
  if (sayilar.length === 0) return null;

  return (
    <dl className="grid gap-6 border-t border-border pt-7 sm:grid-cols-2 lg:grid-cols-4">
      {sayilar.map((sayi) => {
        const { rakam, sonek } = ayristir(sayi.deger);

        return (
          <div key={sayi.etiket}>
            <dt className="sr-only">{sayi.etiket}</dt>
            <dd className="font-heading text-[clamp(2.125rem,5vw,3.625rem)] leading-none font-bold tracking-[-0.04em]">
              {rakam === null ? (
                sayi.deger
              ) : (
                <>
                  <CountingNumber target={rakam} />
                  {sonek}
                </>
              )}
            </dd>
            <p className="mt-2.5 text-[0.6875rem] tracking-[0.14em] text-text-subtle uppercase">
              {sayi.etiket}
            </p>
          </div>
        );
      })}
    </dl>
  );
}
