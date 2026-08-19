import { cn } from "@/lib/utils";

/**
 * İki ışık huzmesi ve altındaki ışık havuzu (F4-01 · 19.08.2026).
 *
 * Kendi konumlandırma bağlamını **kurmuyor**: `position: relative` ve
 * `overflow: hidden` çağıran bölümün işi. Böylece huzmelerin nereden nereye
 * indiği sayfa sayfa değişebiliyor — ana sayfada alıntıdan katıl butonuna,
 * başka bir sayfada tek bir bölümün içinde.
 *
 * Huzmelerin koni biçimi `clip-path`, bulanıklık ise sarmalayıcıda: tersi
 * olsaydı `clip-path` bulanıklığı da kesip koninin kenarlarını jilet gibi
 * bırakırdı. Ayrıntılar `globals.css` → `.yuent-shaft*`.
 */
export function IsikHuzmeleri({
  className,
  havuz = true,
}: {
  /** Huzme katmanının konumu. Varsayılan `top-30`, alıntı metninin hizası. */
  className?: string;
  /** Huzmelerin indiği yerdeki ışık havuzu. Orada bir buton yoksa kapatılır —
   *  aksi hâlde hiçbir şeyi aydınlatmayan bir parlaklık kalır. */
  havuz?: boolean;
}) {
  return (
    <>
      <div
        aria-hidden="true"
        className={cn(
          "yuent-shafts pointer-events-none absolute inset-x-0 top-30 bottom-0",
          className,
        )}
      >
        <span className="yuent-shaft yuent-shaft-l" />
        <span className="yuent-shaft yuent-shaft-r" />
      </div>

      {havuz ? <div aria-hidden="true" className="yuent-pool" /> : null}
    </>
  );
}
