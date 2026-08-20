import type { Metadata } from "next";

import { ElFeneri } from "@/components/atmosfer/el-feneri";
import { IzgaraKatmani } from "@/components/atmosfer/izgara-katmani";
import { EtkinlikIzgarasi } from "@/components/icerik/etkinlik-izgarasi";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { getEtkinlikler, getSite } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    title: `Etkinlikler — ${site.ad}`,
    description: `${site.kisaAd} etkinlikleri: zirveler, yarışmalar ve geziler.`,
  };
}

/**
 * `/etkinlikler` (F4-05) — etkinliklerin tamamı.
 *
 * **Filtre ve arama yok** (20.08.2026 kararı). Plan bir kategori filtresi ile
 * arama kutusu öngörüyordu; dört etkinlik ve üç kategoriyle bunlar sayfayı
 * yönetmesi gereken bir araca çeviriyor, oysa sayfanın işi etkinlikleri
 * göstermek. Liste anlamlı ölçüde büyürse karar yeniden açılabilir — o zaman
 * bu sayfa istemci bileşenine dönüşür, ızgara olduğu yerde kalır.
 *
 * Düzen ana sayfayla aynı `EtkinlikIzgarasi`; tek fark ana sayfanın seçki,
 * buranın tam liste basması.
 */
export default async function EtkinliklerSayfasi() {
  const etkinlikler = await getEtkinlikler();

  // Kartın göstermediği MDX gövdesi taşınmıyor.
  const kartlar = etkinlikler.map((e) => ({
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
        <div className="relative">
          <IzgaraKatmani />

          <section className="relative pt-16 pb-16 sm:pt-20 sm:pb-20">
            <Container size="wide">
              {/* Özet cümlesi yok — `/ekibimiz`deki kararla aynı gerekçe:
                  kartların söylediğini bir kez daha yazmak sayfaya bir şey
                  katmıyor. */}
              <PageHeader eyebrow="Ne yapıyoruz" title="Etkinliklerimiz" />
            </Container>
          </section>
        </div>

        <section className="pb-24 sm:pb-28">
          <Container size="wide">
            <EtkinlikIzgarasi etkinlikler={kartlar} />
          </Container>
        </section>
      </div>
    </>
  );
}
