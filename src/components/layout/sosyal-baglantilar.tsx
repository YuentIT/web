import { existsSync } from "node:fs";
import path from "node:path";

import { ArrowUpRight } from "lucide-react";

import { sosyalEtiketleri } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import type { Sosyal } from "@/types";

/**
 * Sosyal ikon dosyası yüklendi mi?
 *
 * Derleme sırasında diske bakılıyor; dosya yoksa düz metin gösteriliyor.
 * Böylece ikonlar hazır olmadan da liste çalışıyor, dosya eklendiği anda
 * kendiliğinden devreye giriyor ve hiçbir zaman kırık görsel simgesi çıkmıyor.
 *
 * Hem `.svg` hem `.png` kabul ediliyor: marka ikonlarının bir kısmı yalnızca
 * PNG olarak bulunabiliyor (X'in resmî SVG'si dağıtılmıyor).
 */
function ikonYolu(anahtar: string): string | null {
  for (const uzanti of ["svg", "png"]) {
    const gorecel = `/ikonlar/sosyal/${anahtar}.${uzanti}`;
    if (existsSync(path.join(process.cwd(), "public", gorecel))) return gorecel;
  }
  return null;
}

/**
 * Zemine göre çevrilmesi gereken ikonlar.
 *
 * Instagram, LinkedIn ve Facebook kendi marka renklerinde ve koyu zeminde
 * okunuyorlar. Elimizdeki X dosyası ise X'in **siyah rozeti**: siyah kare
 * içinde beyaz glif. Site tek temalı koyu (`#0A0D12`) olduğu için kare zemine
 * karışıyor ve ikon görünmez oluyordu. `invert` onu beyaz rozete çeviriyor —
 * X'in kimlik kılavuzunun koyu zeminler için verdiği sürüm bu.
 *
 * Marka renkli ikonlara uygulanmıyor: `invert` onların renklerini bozar.
 *
 * Kalıcı çözüm, saydam zeminli beyaz glifli bir X dosyası koymak; o dosya
 * geldiğinde bu kümeden `x` çıkarılır.
 */
const CEVRILECEK_IKONLAR = new Set(["x"]);

/**
 * Kulübün sosyal hesapları (F2-07'de footer için yazıldı, F4-11'de
 * `/iletisim` de kullanmaya başlayınca buraya çıkarıldı).
 *
 * Boş alanlar eleniyor: `site.json`da bir hesap yazılı değilse listede hiç
 * görünmüyor — çalışmayan bir bağlantı çizmektense hiç çizmemek doğru.
 *
 * `etiketli` iki sunumu ayırıyor: footer'da yalnızca ikonlar var (yanlarındaki
 * metin sütunlarıyla yarışmasın diye), `/iletisim`de ikonun yanında hesabın
 * adı da okunuyor — sayfanın işi zaten ulaşma yollarını saymak.
 */
export function SosyalBaglantilar({
  sosyal,
  etiketli = false,
  className,
}: {
  sosyal: Sosyal;
  etiketli?: boolean;
  className?: string;
}) {
  const girdiler = Object.entries(sosyal).filter(
    (girdi): girdi is [string, string] => Boolean(girdi[1]),
  );

  if (girdiler.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap gap-x-4 gap-y-2", className)}>
      {girdiler.map(([anahtar, url]) => {
        const etiket = sosyalEtiketleri[anahtar] ?? anahtar;
        const ikon = ikonYolu(anahtar);
        // Etiket zaten yazılıyorsa `aria-label` gereksiz; ikon tek başınayken
        // erişilebilir adı o veriyor.
        const adiIkonVeriyor = Boolean(ikon) && !etiketli;

        return (
          <li key={anahtar}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={adiIkonVeriyor ? etiket : undefined}
              title={adiIkonVeriyor ? etiket : undefined}
              className="inline-flex items-center gap-2 rounded text-sm text-text-muted transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              {ikon ? (
                // Düz <img>, `next/image` değil. İkonlar 20 px'lik statik
                // varlıklar; optimize edilecek bir şey yok. Ayrıca `next/image`
                // SVG'yi ancak `dangerouslyAllowSVG` açılırsa servis ediyor ve
                // o bayrak tüm site için SVG'yi güvenilir sayıyor — dört ikon
                // için açılacak bir kapı değil. Görünen boyutu CSS belirliyor;
                // dosyaların kendi 800×800 bildirimi bu yüzden sorun değil.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={ikon}
                  alt=""
                  width={20}
                  height={20}
                  loading="lazy"
                  decoding="async"
                  className={cn(
                    "size-5 opacity-80 transition-opacity hover:opacity-100",
                    CEVRILECEK_IKONLAR.has(anahtar) && "invert",
                  )}
                />
              ) : null}

              {!ikon || etiketli ? (
                <span className="inline-flex items-center gap-0.5">
                  {etiket}
                  {!ikon ? (
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  ) : null}
                </span>
              ) : null}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
