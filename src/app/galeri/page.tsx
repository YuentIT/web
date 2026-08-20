import type { Metadata } from "next";

import { IzgaraKatmani } from "@/components/atmosfer/izgara-katmani";
import { Polaroid } from "@/components/galeri/polaroid";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { getGaleri, getSite } from "@/lib/content";
import { caveat } from "@/lib/fonts";
import { kureNoktalari } from "@/lib/kure";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    title: `Galeri — ${site.ad}`,
    description: `${site.kisaAd} etkinliklerinden kareler.`,
  };
}

/**
 * `/galeri` (F4-08) — kulüpten karışık kareler.
 *
 * Albüm, etkinlik filtresi ve arama **yok** (18.08.2026 sadeleştirmesi):
 * galeri "hangi etkinlikten" diye ayrılan bir arşiv değil, bir showroom.
 *
 * Küre koordinatları burada, sunucuda hesaplanıyor ve karolara satır içi CSS
 * değişkeni olarak iniyor. Böylece küre JavaScript olmadan da küre — CSS'in
 * 3B'si ve dönüş animasyonu JS istemiyor.
 *
 * El yazısı fontunun değişkeni kök düzende değil **burada** veriliyor: 77 KB'lık
 * dosya yalnızca bu rotanın süsü, her sayfada ön yüklenmesinin anlamı yok.
 *
 * `ElFeneri` bu sayfada bilerek yok: imleci takip eden ışık, imleçle sürüklenen
 * bir küreyle aynı anda iki farklı şey vaat ediyor.
 */
export default async function GaleriSayfasi() {
  const gorseller = await getGaleri();
  const noktalar = kureNoktalari(gorseller.length);

  return (
    <div className={`${caveat.variable} relative z-10`}>
      <div className="relative">
        <IzgaraKatmani />

        <section className="relative pt-16 pb-10 sm:pt-20 sm:pb-12">
          <Container>
            <PageHeader
              eyebrow="Kulüpten kareler"
              title="Galeri"
              description="Etkinliklerimizden, atölyelerimizden ve gezilerimizden kalanlar."
            />
          </Container>
        </section>
      </div>

      <section className="pb-20 sm:pb-24">
        <Container size="wide">
          {gorseller.length === 0 ? (
            <p className="text-sm text-text-muted">
              Galeri henüz boş. Etkinliklerden kareler eklendikçe burada
              görünecek.
            </p>
          ) : (
            <div className="yuent-kure-sahne">
              <div className="yuent-kure-otomatik">
                <div className="yuent-kure-elle">
                  {gorseller.map((gorsel, i) => (
                    <Polaroid
                      key={gorsel.src}
                      gorsel={gorsel}
                      nokta={noktalar[i]}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
