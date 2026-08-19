/**
 * Hero'yu kapatan asit sarısı kayan şerit (F4-01 · 19.08.2026).
 *
 * `aria-hidden`: şerit dekoratif. İçindeki etkinlik adları hemen aşağıdaki
 * "Etkinliklerimiz" rayında zaten gerçek bağlantı olarak duruyor; ekran
 * okuyucuya aynı listeyi iki kez, üstelik sonsuz tekrarla okutmak zarar verir.
 *
 * Metin iki kez basılıyor ve şerit `-50%` kaydırılıyor: tam yarısında ikinci
 * kopya birincinin başladığı yere denk geldiği için döngü dikişsiz.
 */
export function KayanSerit({ metinler }: { metinler: string[] }) {
  if (metinler.length === 0) return null;

  const dizi = `${metinler.join(" · ")} · `;

  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden bg-primary py-2.5 text-primary-foreground"
    >
      <div
        data-yuent-marquee
        className="flex w-max animate-[yuent-marquee_36s_linear_infinite]"
      >
        <span className="pe-4 font-heading text-xs font-bold tracking-[0.16em] whitespace-nowrap uppercase">
          {dizi}
        </span>
        <span className="pe-4 font-heading text-xs font-bold tracking-[0.16em] whitespace-nowrap uppercase">
          {dizi}
        </span>
      </div>
    </div>
  );
}
