"use client";

import { Tabs } from "@base-ui/react/tabs";

import { UyeKarti } from "@/components/ekip/uye-karti";
import type { Uye } from "@/types";

/** Yönetim kurulu dizilimi: başkan tek, altında iki kişi, altında üyeler. */
function YonetimKurulu({ uyeler }: { uyeler: Uye[] }) {
  const baskan = uyeler.find((u) => u.rol === "baskan");
  const yardimci = uyeler.find((u) => u.rol === "baskan-yardimcisi");
  const sekreter = uyeler.find((u) => u.rol === "genel-sekreter");
  const digerleri = uyeler.filter((u) => u.rol === "uye");

  // Şema tam olarak bir başkan zorunlu tutuyor; yardımcı ve sekreter en fazla
  // birer tane ve **opsiyonel**, o yüzden ikisi de koşullu çiziliyor.
  const ikinciSira = [yardimci, sekreter].filter(Boolean) as Uye[];

  return (
    <div className="flex flex-col items-center gap-4">
      {baskan ? <UyeKarti uye={baskan} className="w-full max-w-60" /> : null}

      {ikinciSira.length > 0 ? (
        <div className="flex w-full flex-wrap justify-center gap-4">
          {ikinciSira.map((uye) => (
            <UyeKarti
              key={uye.ad}
              uye={uye}
              className="w-full max-w-60 sm:w-60"
            />
          ))}
        </div>
      ) : null}

      {digerleri.length > 0 ? (
        <div className="mt-2 grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {digerleri.map((uye) => (
            <UyeKarti key={uye.ad} uye={uye} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

/** Koordinatörler: departmana göre gruplanmış ızgaralar. */
function Koordinatorler({ uyeler }: { uyeler: Uye[] }) {
  // Gruplar içerikteki sırayı koruyor — alfabetik sıralamak departmanlar
  // arasında kulüpte olmayan bir hiyerarşi kurardı.
  const gruplar = new Map<string, Uye[]>();
  for (const uye of uyeler) {
    const ad = uye.grup ?? "Diğer";
    const mevcut = gruplar.get(ad);
    if (mevcut) mevcut.push(uye);
    else gruplar.set(ad, [uye]);
  }

  return (
    <div className="flex flex-col gap-12">
      {Array.from(gruplar, ([grup, kisiler]) => (
        <section key={grup}>
          <h3 className="mb-5 flex items-center gap-3 font-heading text-sm font-bold tracking-[0.14em] uppercase">
            <span aria-hidden="true" className="h-0.5 w-6 bg-brand-accent" />
            {grup}
          </h3>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {kisiler.map((uye) => (
              <UyeKarti key={uye.ad} uye={uye} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

/**
 * Dönem ekibi (F4-03 / F4-04) — iki sayfa da bu bileşeni kullanıyor.
 *
 * Sekme **koşullu**: bir dönemde koordinatör yoksa geçiş tuşu hiç çizilmiyor
 * ve sayfa doğrudan yönetim kurulunu gösteriyor. Bu geçici bir veri eksikliği
 * değil — 2025-2026 sekiz kişilik yönetim kuruluyla çalışıyor (18.08.2026
 * teyidi) — ama kalıcı da değil: gelecek dönemler yeniden koordinatör alabilir,
 * o yüzden iki hâl de destekleniyor.
 *
 * Sekmeler Base UI `Tabs` üzerine kurulu: klavye gezinimi, `role` ve
 * `aria-selected` oradan geliyor. Kayan gösterge de onun `Tabs.Indicator`ı —
 * konumu `--active-tab-left` / `--active-tab-width` ile veriliyor, stili
 * `globals.css`teki `.yuent-sekme-gostergesi`nde.
 */
export function EkipListesi({ uyeler }: { uyeler: Uye[] }) {
  const yonetim = uyeler.filter((u) => u.takim === "yonetim-kurulu");
  const koordinatorler = uyeler.filter((u) => u.takim === "koordinatorler");

  if (koordinatorler.length === 0) {
    return <YonetimKurulu uyeler={yonetim} />;
  }

  return (
    <Tabs.Root defaultValue="yonetim">
      <div className="mb-10 flex justify-center">
        <Tabs.List className="relative inline-flex rounded-full border border-border bg-surface p-1">
          <Tabs.Indicator className="yuent-sekme-gostergesi" />

          <Tabs.Tab
            value="yonetim"
            className="relative z-10 cursor-pointer rounded-full px-5 py-2.5 text-xs font-bold tracking-[0.1em] whitespace-nowrap text-text-muted uppercase transition-colors outline-none select-none focus-visible:ring-2 focus-visible:ring-ring data-[selected]:text-primary-foreground"
          >
            Yönetim Kurulu
          </Tabs.Tab>

          <Tabs.Tab
            value="koordinator"
            className="relative z-10 cursor-pointer rounded-full px-5 py-2.5 text-xs font-bold tracking-[0.1em] whitespace-nowrap text-text-muted uppercase transition-colors outline-none select-none focus-visible:ring-2 focus-visible:ring-ring data-[selected]:text-primary-foreground"
          >
            Koordinatörler
          </Tabs.Tab>
        </Tabs.List>
      </div>

      {/* `keepMounted`: iki panel de HTML'de duruyor, seçili olmayan `hidden`
          ile gizleniyor. Aşağıdaki `<noscript>` bu gizlemeyi geri alıyor —
          JS çalışmayan tarayıcıda sekme zaten çalışamayacağı için iki liste
          alt alta okunuyor. Faz 4'ün "JS kapalıyken içerik okunabiliyor"
          kriteri sekmeli bir düzende ancak böyle sağlanıyor. */}
      <Tabs.Panel value="yonetim" keepMounted data-yuent-sekme-paneli>
        <YonetimKurulu uyeler={yonetim} />
      </Tabs.Panel>

      <Tabs.Panel value="koordinator" keepMounted data-yuent-sekme-paneli>
        <Koordinatorler uyeler={koordinatorler} />
      </Tabs.Panel>

      <noscript>
        <style>{`
          [data-yuent-sekme-paneli][hidden] { display: block !important; }
          [data-yuent-sekme-paneli] + [data-yuent-sekme-paneli] { margin-top: 3rem; }
        `}</style>
      </noscript>
    </Tabs.Root>
  );
}
