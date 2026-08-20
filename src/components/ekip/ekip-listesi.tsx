"use client";

import { Tabs } from "@base-ui/react/tabs";

import { UyeKarti } from "@/components/ekip/uye-karti";
import type { Uye } from "@/types";

/**
 * Listeyi **dengeli** satırlara böler: en fazla `enFazla` sütun, satır başına
 * düşen kişi sayısı olabildiğince eşit.
 *
 * 4 → [4] · 5 → [3, 2] · 6 → [3, 3] · 7 → [4, 3] · 8 → [4, 4] · 10 → [4, 3, 3]
 *
 * Amaç, dört kişilik bir satırın altında tek başına duran beşinci kişiyi
 * önlemek: satır sayısı yine `ceil(n / enFazla)`, ama kalan kişiler alt satıra
 * itilmek yerine satırlara paylaştırılıyor.
 */
function dengeliSatirlar(liste: Uye[], enFazla = 4): Uye[][] {
  if (liste.length === 0) return [];

  const satirSayisi = Math.ceil(liste.length / enFazla);
  const taban = Math.floor(liste.length / satirSayisi);
  // Bölünmeden kalanlar baştaki satırlara birer birer dağıtılıyor; böylece
  // kalabalık satır hep üstte kalıyor ve piramit aşağı doğru daralıyor.
  const artan = liste.length % satirSayisi;

  const satirlar: Uye[][] = [];
  let indeks = 0;
  for (let i = 0; i < satirSayisi; i += 1) {
    const uzunluk = taban + (i < artan ? 1 : 0);
    satirlar.push(liste.slice(indeks, indeks + uzunluk));
    indeks += uzunluk;
  }
  return satirlar;
}

/**
 * Listeyi **dolu** satırlara böler: her satırda `enFazla` kişi, artanlar son
 * satırda. Koordinatörler böyle diziliyor — kalabalık bir listede dengeli
 * dağıtım tüm satırları seyrelttiği için orada 4-4-4 daha derli toplu duruyor.
 */
function doluSatirlar(liste: Uye[], enFazla = 4): Uye[][] {
  const satirlar: Uye[][] = [];
  for (let i = 0; i < liste.length; i += enFazla) {
    satirlar.push(liste.slice(i, i + enFazla));
  }
  return satirlar;
}

/**
 * Satırları çizer. Her satır kendi içinde ortalanıyor, yani eksik kalan son
 * satır sola yapışmıyor. Kart genişliği `.yuent-ekip-karti`den geliyor
 * (`globals.css`) — bütün satırlarda aynı.
 */
function KartSatirlari({ satirlar }: { satirlar: Uye[][] }) {
  return (
    <div className="flex flex-col gap-4">
      {satirlar.map((satir) => (
        <div key={satir[0].ad} className="flex flex-wrap justify-center gap-4">
          {satir.map((uye) => (
            <UyeKarti key={uye.ad} uye={uye} className="yuent-ekip-karti" />
          ))}
        </div>
      ))}
    </div>
  );
}

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
        <div className="mt-2 w-full">
          <KartSatirlari satirlar={dengeliSatirlar(digerleri)} />
        </div>
      ) : null}
    </div>
  );
}

/**
 * Koordinatörler: tek bir liste, ada göre alfabetik (20.08.2026 kararı).
 *
 * Departman başlıkları kaldırıldı — koordinatörlerin görevi zaten kartın
 * üstünde yazıyor ("Etkinlik Koordinatörü"), başlıklar aynı bilgiyi ikinci kez
 * söylüyor ve iki kişilik departmanlar sayfayı gereksiz yere parçalıyordu.
 * İçerikteki `grup` alanı duruyor; sadece çizilmiyor.
 *
 * Sıralama Türkçe yerelle: `localeCompare` olmadan "Ç" ve "İ" listenin sonuna
 * düşüyor.
 */
function Koordinatorler({ uyeler }: { uyeler: Uye[] }) {
  const sirali = [...uyeler].sort((a, b) => a.ad.localeCompare(b.ad, "tr"));

  return <KartSatirlari satirlar={doluSatirlar(sirali)} />;
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
