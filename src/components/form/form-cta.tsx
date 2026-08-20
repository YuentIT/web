import { ArrowUpRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Google Forms çağrısı (F5-04).
 *
 * Sitede form **toplanmıyor**, yalnızca yönlendiriliyor: veritabanı, e-posta
 * servisi ve yönetim paneli kapsam dışı (v2 sadeleştirmesi). Bu bileşen o
 * yönlendirmenin tek biçimi — `/iletisim`, `/katil`, `/basvuru` ve `/oneri`
 * aynı görünümü paylaşsın diye.
 *
 * **Değişmez kural:** `url` boşsa buton **hiç çizilmiyor**, yerine `bosMesaj`
 * okunuyor. Çalışmayan bir butona tıklatmak, "form henüz açılmadı" demekten
 * kötüdür. `site.json → formlar` alanlarının hepsi opsiyonel olduğu için bu
 * hâl istisna değil, formlar açılana kadar (F5-01/F5-03) normal durum.
 *
 * `kimlerIcin`, `süre` ve `son tarih` alanları bilerek yok: `/iletisim`in
 * ihtiyacı olmadı. Gerçekten isteyen bir sayfa çıkarsa o zaman eklenir.
 */
export function FormCta({
  baslik,
  aciklama,
  url,
  butonMetni = "Formu Doldur",
  bosMesaj,
  className,
}: {
  baslik: string;
  aciklama?: string;
  /** `content/site.json → formlar` altındaki adres. Form açılmadıysa boş. */
  url?: string;
  butonMetni?: string;
  /** `url` boşken butonun yerine okunacak gerekçe. */
  bosMesaj: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface p-6 sm:p-8",
        className,
      )}
    >
      <h2 className="text-subsection">{baslik}</h2>

      {aciklama ? (
        <p className="mt-3 max-w-[55ch] text-sm leading-relaxed text-text-muted">
          {aciklama}
        </p>
      ) : null}

      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ size: "lg" }),
            "yuent-cta mt-6 h-12 rounded-none px-6 text-xs font-extrabold tracking-[0.08em] uppercase hover:bg-primary",
          )}
        >
          {butonMetni}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      ) : (
        <p className="mt-6 text-sm leading-relaxed text-text-subtle">
          {bosMesaj}
        </p>
      )}
    </div>
  );
}
