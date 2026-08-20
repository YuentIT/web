import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";

import { ElFeneri } from "@/components/atmosfer/el-feneri";
import { IzgaraKatmani } from "@/components/atmosfer/izgara-katmani";
import { FormCta } from "@/components/form/form-cta";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { SosyalBaglantilar } from "@/components/layout/sosyal-baglantilar";
import { getSite } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    title: `İletişim — ${site.ad}`,
    description: `${site.kisaAd} iletişim bilgileri: e-posta, telefon, adres ve sosyal hesaplar.`,
  };
}

/**
 * Telefon numarasını `tel:` adresine çevirir.
 *
 * `site.json`daki numaralar okunabilirlik için boşluklu yazılı
 * ("+90 536 945 39 44"); `tel:` ise boşluk kabul etmiyor, artı işareti dışında
 * yalnızca rakam istiyor. Görünen metin dosyadaki hâliyle kalıyor, değişen
 * sadece bağlantı.
 */
function telAdresi(numara: string): string {
  return `tel:${numara.replace(/[^\d+]/g, "")}`;
}

/**
 * Adresi Google Maps'in arama adresine yollar.
 *
 * Bilerek **gömü değil bağlantı** (20.08.2026 kararı): sayfa açılırken Google'a
 * hiçbir istek gitmiyor, Faz 7'de yazılacak CSP'ye harita istisnası gerekmiyor
 * ve Lighthouse performans hedefi (F7-07, ≥90) bir iframe yüzünden düşmüyor.
 * Telefonda bağlantı doğrudan Haritalar uygulamasını açıyor.
 */
function yolTarifiAdresi(adres: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(adres)}`;
}

/**
 * `/iletisim` (F4-11) — ulaşma yolları.
 *
 * İçeriğin tamamı `content/site.json`'dan geliyor; sayfada gömülü bilgi yok.
 * Bir numara ya da adres değişince tek dosya güncelleniyor ve hem burası hem
 * footer aynı anda doğruya dönüyor.
 */
export default async function IletisimSayfasi() {
  const site = await getSite();

  return (
    <>
      <ElFeneri />

      <div className="relative z-10">
        <div className="relative">
          <IzgaraKatmani />

          <section className="relative pt-16 pb-12 sm:pt-20 sm:pb-14">
            <Container>
              <PageHeader eyebrow="Bize ulaşın" title="İletişim" />
            </Container>
          </section>
        </div>

        <section className="pb-20 sm:pb-24">
          <Container>
            <div className="grid gap-10 md:grid-cols-2">
              <div className="flex flex-col gap-7">
                <div>
                  <h2 className="text-eyebrow text-brand-accent uppercase">
                    E-posta
                  </h2>
                  <p className="mt-3 flex items-start gap-2.5">
                    <Mail
                      className="mt-0.5 size-4 shrink-0 text-text-subtle"
                      aria-hidden="true"
                    />
                    <a
                      href={`mailto:${site.eposta}`}
                      className="rounded text-sm text-text-muted transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                    >
                      {site.eposta}
                    </a>
                  </p>
                </div>

                {site.telefonlar.length > 0 ? (
                  <div>
                    <h2 className="text-eyebrow text-brand-accent uppercase">
                      Telefon
                    </h2>
                    <ul className="mt-3 flex flex-col gap-2">
                      {site.telefonlar.map((numara) => (
                        <li key={numara} className="flex items-start gap-2.5">
                          <Phone
                            className="mt-0.5 size-4 shrink-0 text-text-subtle"
                            aria-hidden="true"
                          />
                          <a
                            href={telAdresi(numara)}
                            className="rounded text-sm text-text-muted transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                          >
                            {numara}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {site.adres ? (
                  <div>
                    <h2 className="text-eyebrow text-brand-accent uppercase">
                      Adres
                    </h2>
                    <p className="mt-3 flex items-start gap-2.5">
                      <MapPin
                        className="mt-0.5 size-4 shrink-0 text-text-subtle"
                        aria-hidden="true"
                      />
                      <span className="text-sm leading-relaxed text-text-muted">
                        {site.adres}
                      </span>
                    </p>
                    <p className="mt-3 pl-6.5">
                      <a
                        href={yolTarifiAdresi(site.adres)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="yuent-parla inline-flex items-center gap-1.5 rounded text-[0.6875rem] tracking-[0.14em] text-brand-accent uppercase focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                      >
                        Yol tarifi al
                        <ArrowUpRight className="size-3.5" aria-hidden="true" />
                      </a>
                    </p>
                  </div>
                ) : null}

                <div>
                  <h2 className="text-eyebrow text-brand-accent uppercase">
                    Sosyal hesaplar
                  </h2>
                  <SosyalBaglantilar
                    sosyal={site.sosyal}
                    etiketli
                    className="mt-3 flex-col gap-y-3"
                  />
                </div>
              </div>

              <FormCta
                baslik="Bize yazın"
                aciklama="Soru, iş birliği teklifi ya da aklınıza takılan herhangi bir şey için iletişim formunu doldurun; en kısa sürede dönüş yapıyoruz."
                url={site.formlar.iletisim}
                butonMetni="İletişim Formu"
                bosMesaj="İletişim formu henüz açılmadı. O zamana kadar yukarıdaki e-posta adresinden ya da sosyal hesaplarımızdan bize ulaşabilirsiniz."
                className="h-fit"
              />
            </div>
          </Container>
        </section>
      </div>
    </>
  );
}
