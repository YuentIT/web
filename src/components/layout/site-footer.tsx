import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { SosyalBaglantilar } from "@/components/layout/sosyal-baglantilar";
import { getSite } from "@/lib/content";
import { footerNav, hukukiNav } from "@/lib/navigation";

/**
 * Site altbilgisi (F2-07).
 *
 * Tüm verisi `content/site.json`'dan geliyor — kabul kriteri "tüm sayfalarda
 * aynı ve tek kaynaktan besleniyor". Sunucu bileşeni olduğu için okuma derleme
 * anında yapılıyor, istemciye JavaScript inmiyor.
 *
 * Bülten formu **koşullu**: `formlar.bultenKayit` boşsa hiç çizilmiyor.
 * Çalışmayan bir abonelik kutusu göstermektense hiç göstermemek doğru — aynı
 * ilke `FormCta`'da da geçerli (F5-04).
 */
export async function SiteFooter() {
  const site = await getSite();

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <Container size="wide" className="py-14">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_repeat(2,minmax(0,1fr))]">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-text-muted">
              {site.aciklama}
            </p>

            <SosyalBaglantilar sosyal={site.sosyal} className="pt-1" />
          </div>

          {footerNav.map((sutun) => (
            <nav key={sutun.baslik} aria-label={sutun.baslik}>
              <h2 className="mb-3 text-eyebrow text-text-subtle uppercase">
                {sutun.baslik}
              </h2>
              <ul className="flex flex-col gap-2">
                {sutun.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="rounded text-sm text-text-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <NewsletterForm kayitUrl={site.formlar.bultenKayit} />
        </div>

        <div className="mt-10 grid gap-6 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-3">
          <p className="flex items-start gap-2 text-sm text-text-muted">
            <Mail className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <a
              href={`mailto:${site.eposta}`}
              className="rounded hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              {site.eposta}
            </a>
          </p>

          {site.telefonlar.length > 0 ? (
            <p className="flex items-start gap-2 text-sm text-text-muted">
              <Phone className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span className="flex flex-col gap-1">
                {site.telefonlar.map((telefon) => (
                  <a
                    key={telefon}
                    // Çevirici numarayı boşluksuz ister; görünen metin okunaklı kalıyor.
                    href={`tel:${telefon.replace(/\s/g, "")}`}
                    className="rounded hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    {telefon}
                  </a>
                ))}
              </span>
            </p>
          ) : null}

          {site.adres ? (
            <p className="flex items-start gap-2 text-sm text-text-muted">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>{site.adres}</span>
            </p>
          ) : null}
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-text-subtle">
            © {new Date().getFullYear()} {site.ad}
          </p>

          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {hukukiNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded text-sm text-text-subtle hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
