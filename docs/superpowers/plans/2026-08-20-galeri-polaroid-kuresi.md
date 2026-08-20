# /galeri — 3B polaroid küresi · uygulama planı

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `/galeri` rotasını aç: polaroid çerçeveli fotoğraflardan oluşan, kendiliğinden yavaşça dönen, sürüklenebilen ve tıklanınca kareyi öne uçuran bir 3B küre.

**Architecture:** Küreyi sunucu basar — her karonun küre üzerindeki yeri Fibonacci dağılımıyla derleme sırasında hesaplanıp satır içi CSS değişkeni olarak yazılır. Dönüş tek bir CSS `@keyframes`'ten gelir, yani JS olmadan da çalışır. JS yalnızca iki şey ekler: sürükleme ve odak. Otomatik dönüş ile elle çevirme **ayrı katmanlarda** durur; böylece `animation-play-state: paused/running` "bırakıldığı yerde dur, kaldığı yerden devam et" davranışını kendiliğinden verir.

**Tech Stack:** Next 16.3.1 (App Router, RSC) · React 19.2.8 · Tailwind 4.3.3 (`@theme` / `@layer components`) · TypeScript 5.9.3 · zod 4 · `next/font/local` · `next/image` · Pointer Events API

**Spec:** [`docs/superpowers/specs/2026-08-20-galeri-polaroid-kuresi-design.md`](../specs/2026-08-20-galeri-polaroid-kuresi-design.md)

## Global Constraints

Bunlar her görevin gereksinimlerine örtük olarak dahildir.

- **three.js ve `motion` gibi hareket kütüphaneleri KURULMAZ.** `SITE_PLAN.md` §4: "hareketin tamamı saf CSS". JS yalnızca CSS değişkeni yazar ve sınıf/`data-*` değiştirir — `el-feneri.tsx`'in deseni budur. Web Animations API (`el.animate()`) de kullanılmaz.
- **Google Fonts CDN linki KULLANILMAZ.** Font indirilir, altkümesi alınır, WOFF2'ye çevrilir, `public/fonts/` altından `next/font/local` ile servis edilir (`SITE_PLAN.md` §8.1).
- **Yeni npm bağımlılığı eklenmez.**
- Kullanıcıya görünen tüm metin **Türkçe**. Kod içi yorumlar da Türkçe — projenin yerleşik dili bu.
- Dosya ve bileşen adları Türkçe kebab-case (`polaroid-kuresi.tsx`), dışa aktarılan bileşen adları Türkçe PascalCase (`PolaroidKuresi`).
- CSS `src/styles/globals.css` içinde yaşar. Sınıflar `yuent-` önekli, `@layer components` içinde; `@keyframes` adları da `yuent-` önekli, dosyanın keyframes bölümünde.
- **Sayfada en fazla 2 görsele `priority`** verilir (YTÜ'nün B5 hatası tekrarlanmayacak).
- Tasarım sınırı: **en fazla ~50 kare.**
- Türkçe glif kapsamı zorunlu: `ğ Ğ ı İ ş Ş ç Ç ö Ö ü Ü`.
- **Projede test koşucusu yok** (`package.json`'da `test` betiği yoktur ve eklenmeyecektir). Doğrulama zinciri her görevin sonunda: `npm run format:check` · `npm run lint` · `npm run typecheck` · `npm run build` — dördü de temiz geçmeli. Saf mantık içeren tek dosya (`src/lib/kure.ts`) için tek seferlik bir iddia betiği yazılıp çalıştırılır ve **aynı adımda silinir** (Görev 3).
- Sık commit: her görev kendi commit'iyle biter.

---

## Dosya haritası

**Oluşturulacak**

| Dosya | Sorumluluk |
|---|---|
| `src/lib/kure.ts` | Fibonacci küre dağılımı. Saf fonksiyon: girdi kare sayısı, çıktı açı listesi. React bilmez, DOM bilmez. |
| `src/components/galeri/polaroid.tsx` | Tek karonun görüntüsü: çerçeve, görsel, el yazısı not. Durum tutmaz. |
| `src/components/galeri/polaroid-kuresi.tsx` | İstemci bileşeni. Sahneyi kurar, sürüklemeyi ve odak durumunu yönetir. |
| `src/components/galeri/odak-polaroid.tsx` | İstemci bileşeni. Öne gelen kare: FLIP geçişi, klavye, odak tuzağı. |
| `src/app/galeri/page.tsx` | RSC. İçeriği okur, küre koordinatlarını hesaplar, metadata üretir. |
| `public/fonts/Caveat-Variable.woff2` | El yazısı fontu (altkümesi alınmış). |
| `fonts/Caveat[wght].ttf` | Font kaynağı (Archivo TTF'leri gibi depoda durur). |
| `fonts/Caveat-OFL.txt` | Caveat'ın lisansı. |
| `public/gorseller/yer-tutucu/galeri/01.jpg` … `12.jpg` | Geçici yer tutucular. Gerçek fotoğraflar gelince klasör silinir. |

**Değiştirilecek**

| Dosya | Değişiklik |
|---|---|
| `src/lib/schemas.ts` | `galeriGorseliSchema`'ya `tarih` ve `etkinlik` |
| `src/lib/fonts.ts` | `caveat` dışa aktarımı |
| `src/app/layout.tsx` | `caveat.variable` html sınıfına |
| `src/styles/globals.css` | `--font-elyazisi` token'ı · galeri `@layer components` bloğu · `@keyframes yuent-kure-don` · hareket kısıtı bloğuna ekleme |
| `content/galeri/galeri.json` | 12 yer tutucu kayıt |
| `CODE_PLAN.md` | F4-08 işaretlenir, "ŞU AN NEREDEYİZ" güncellenir |

`src/types/index.ts` **değişmez** — `GaleriGorseli` zaten `z.infer<typeof galeriGorseliSchema>` (satır 41), şema değişince tip kendiliğinden değişir.

---

## Görev 1: Caveat fontunu self-host et

Polaroid notunun el yazısı. Türkçesi `fontTools` ile doğrulanmış tek değişken ağırlıklı aday (spec §10).

**Files:**

- Create: `fonts/Caveat[wght].ttf`, `fonts/Caveat-OFL.txt`, `public/fonts/Caveat-Variable.woff2`
- Modify: `src/lib/fonts.ts`, `src/app/layout.tsx`, `src/styles/globals.css:14-22`

**Interfaces:**

- Consumes: yok (ilk görev)
- Produces: `export const caveat` (`next/font/local` dönüşü, `variable: "--font-caveat"`) · Tailwind token `--font-elyazisi`, yani sınıf olarak `font-elyazisi`

---

- [ ] **Adım 1: Fontu indir**

```bash
curl -L -o "fonts/Caveat[wght].ttf" \
  "https://github.com/google/fonts/raw/main/ofl/caveat/Caveat%5Bwght%5D.ttf"
curl -L -o "fonts/Caveat-OFL.txt" \
  "https://github.com/google/fonts/raw/main/ofl/caveat/OFL.txt"
ls -l "fonts/Caveat[wght].ttf" "fonts/Caveat-OFL.txt"
```

Beklenen: TTF ~400 KB'nin üstünde, OFL.txt boş değil. Sıfır baytlıysa indirme başarısızdır — devam etme.

- [ ] **Adım 2: Türkçe glifleri kaynak dosyada doğrula**

```bash
python -c "
from fontTools.ttLib import TTFont
f = TTFont('fonts/Caveat[wght].ttf')
cmap = set()
for t in f['cmap'].tables:
    cmap |= set(t.cmap.keys())
eksik = [c for c in 'ğĞıİşŞçÇöÖüÜ' if ord(c) not in cmap]
print('EKSIK:', eksik if eksik else 'yok')
print('eksen:', [(a.axisTag, a.minValue, a.maxValue) for a in f['fvar'].axes])
"
```

Beklenen: `EKSIK: yok` ve `eksen: [('wght', 400.0, 700.0)]`.
`EKSIK` doluysa dur — spec'teki font seçimi geçersizdir, Mustafa'ya haber ver.

- [ ] **Adım 3: Altkümesini al ve WOFF2'ye çevir**

Archivo ile aynı aralık (`SITE_PLAN.md` §8.1): Latin-1 + Latin Extended-A + tipografik noktalama + para birimi. `--flavor=woff2` brotli ister; ikisi de kurulu (fontTools 4.63.0).

```bash
python -m fontTools.subset "fonts/Caveat[wght].ttf" \
  --unicodes="U+0020-007E,U+00A0-00FF,U+0100-017F,U+2010-2027,U+2030-205E,U+20A0-20BF" \
  --layout-features="*" \
  --flavor=woff2 \
  --output-file="public/fonts/Caveat-Variable.woff2"
ls -l public/fonts/Caveat-Variable.woff2
```

Beklenen: dosya oluştu, boyut 30–60 KB arası.

- [ ] **Adım 4: Altkümesi alınmış dosyada Türkçeyi ve ağırlık eksenini tekrar doğrula**

Altküme alma glif düşürebilir; §10'un şartı bu kontrolün tekrarlanması.

```bash
python -c "
from fontTools.ttLib import TTFont
f = TTFont('public/fonts/Caveat-Variable.woff2')
cmap = set()
for t in f['cmap'].tables:
    cmap |= set(t.cmap.keys())
eksik = [c for c in 'ğĞıİşŞçÇöÖüÜ0123456789.' if ord(c) not in cmap]
print('EKSIK:', eksik if eksik else 'yok')
print('eksen:', [(a.axisTag, a.minValue, a.maxValue) for a in f['fvar'].axes])
"
```

Beklenen: `EKSIK: yok`, `eksen: [('wght', 400.0, 700.0)]`. (Rakamlar ve nokta da listede: not satırında `12.03.2024` basılacak.)

- [ ] **Adım 5: `src/lib/fonts.ts`'e ekle**

Dosyanın sonuna ekle:

```ts
/**
 * Polaroid notları (F4-08). Tek dosya, değişken ağırlık 400–700.
 *
 * Not 11–12 px'te basılıyor; o boyda bağlı bir el yazısının okunabilmesi için
 * ağırlığın 600'e çekilebilmesi gerekiyordu. Aday listesindeki tek ağırlığa
 * sahip fontlarda bu imkân yok — Caveat bu yüzden seçildi (spec §10).
 */
export const caveat = localFont({
  src: [
    {
      path: "../../public/fonts/Caveat-Variable.woff2",
      weight: "400 700",
      style: "normal",
    },
  ],
  variable: "--font-caveat",
  display: "swap",
  // El yazısı yedekleri. Hiçbiri Caveat'a benzemiyor ama en azından
  // "elle yazılmış" hissini koruyorlar; son çare genel `cursive`.
  fallback: ["Segoe Script", "Bradley Hand", "cursive"],
});
```

- [ ] **Adım 6: `src/app/layout.tsx`'te değişkeni yayına al**

İçe aktarma satırını değiştir:

```ts
import { archivo, archivoExpanded, caveat } from "@/lib/fonts";
```

`<html>` sınıfını değiştir:

```tsx
    <html
      lang="tr"
      className={`dark ${archivo.variable} ${archivoExpanded.variable} ${caveat.variable} h-full antialiased`}
    >
```

- [ ] **Adım 7: `src/styles/globals.css`'te tema token'ı olarak kaydet**

`@theme inline` bloğunda (14. satır civarı), `--font-mono` tanımının hemen altına ekle:

```css
  /* F4-08 — polaroid notlarının el yazısı. Yalnızca galeride kullanılıyor,
     gövde metnine hiçbir yerde karışmıyor. */
  --font-elyazisi: var(--font-caveat);
```

- [ ] **Adım 8: Doğrulama zinciri**

```bash
npm run format:check && npm run lint && npm run typecheck && npm run build
```

Beklenen: dördü de hatasız. `build` çıktısında `_next/static/media` altında Caveat için bir dosya hash'i görünmeli.

- [ ] **Adım 9: Commit**

```bash
git add "fonts/Caveat[wght].ttf" fonts/Caveat-OFL.txt \
  public/fonts/Caveat-Variable.woff2 src/lib/fonts.ts \
  src/app/layout.tsx src/styles/globals.css
git commit -m "F4-08: Caveat el yazısı fontu self-host edildi

Polaroid notları için (spec §10). Değişken ağırlık 400-700 korunarak
Latin-1 + Latin Ext-A + noktalama + para birimi altkümesi alındı.
Türkçe glifler (ğĞıİşŞçÇöÖüÜ) ve rakamlar altküme sonrası doğrulandı.
Google Fonts CDN'i kullanılmıyor - SITE_PLAN §8.1."
```

---

## Görev 2: Şemayı genişlet, yer tutucuları üret, içeriği doldur

Spec §8 ve §13. Yer tutucular **gerçek JPEG** olarak üretiliyor; SVG olsaydı `next/image` onları reddederdi (`dangerouslyAllowSVG` gerekirdi) ve gerçek fotoğraflar gelince kod değişmek zorunda kalırdı. JPEG'de kod hiç değişmiyor.

`sharp` `node_modules` içinde hazır (Next'in görsel iyileştiricisinin bağımlılığı) — yeni bağımlılık eklenmiyor.

**Files:**

- Create: `public/gorseller/yer-tutucu/galeri/01.jpg` … `12.jpg`
- Modify: `src/lib/schemas.ts:315-319`, `content/galeri/galeri.json`

**Interfaces:**

- Consumes: yok
- Produces: `GaleriGorseli` tipi artık `{ src: string; alt: string; tarih?: string; etkinlik?: string }`. `getGaleri()` imzası değişmiyor: `Promise<GaleriGorseli[]>`.

---

- [ ] **Adım 1: Şemayı genişlet**

`src/lib/schemas.ts` içinde `galeriGorseliSchema`'yı (315–319. satırlar) şununla değiştir:

```ts
export const galeriGorseliSchema = z.object({
  src: gorselYolu,
  /** Erişilebilirlik şartı: her karenin ne gösterdiği Türkçe yazılır. */
  alt: dolu,
  /**
   * Polaroid'in alt şeridine el yazısıyla düşülen not (F4-08).
   *
   * İkisi de **opsiyonel ve bu kasıtlı**: fotoğraflar metinlerden önce
   * gelebiliyor. Alan boşken not satırı çizilmiyor ama şerit kalınlığını
   * koruyor — polaroid'i polaroid yapan şey o boşluk.
   *
   * `tarih` ISO saklanıp ekranda `12.03.2024` diye basılıyor. Etkinliklerde
   * tarih yayınlamama kuralı (yukarıda, 250–262) burada geçerli değil: o kural
   * yaklaşan etkinlikleri önden duyurmamak içindi, bunlar geçmiş kareler.
   */
  tarih: z.iso.date().optional(),
  etkinlik: dolu.optional(),
});
```

- [ ] **Adım 2: Yer tutucu JPEG'leri üret**

Yer tutucular `public/gorseller/galeri/` altına **konmaz** — orası gerçek fotoğrafların yeri, karışmamalı (spec §13).

Betiği geçici olarak yaz, çalıştır, sil:

```bash
mkdir -p public/gorseller/yer-tutucu/galeri
cat > tmp-yer-tutucu.js <<'BETIK'
const sharp = require("sharp");
const fs = require("node:fs");

// Farklı en-boy oranları bilerek: gerçek fotoğraflar da kare değil, karonun
// `object-fit: cover` kırpması bugünden denenmiş olsun.
const olculer = [
  [400, 300], [300, 400], [400, 400], [480, 320],
  [320, 480], [400, 300], [360, 360], [300, 400],
  [400, 320], [340, 440], [420, 300], [360, 400],
];

const zeminler = ["#1B1E24", "#22262E", "#191C21", "#262A33"];

(async () => {
  for (let i = 0; i < olculer.length; i++) {
    const [g, y] = olculer[i];
    const no = String(i + 1).padStart(2, "0");
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${g}" height="${y}">
      <rect width="${g}" height="${y}" fill="${zeminler[i % zeminler.length]}"/>
      <circle cx="${g / 2}" cy="${y / 2}" r="${Math.min(g, y) * 0.32}"
              fill="#E8FE55" opacity="0.14"/>
      <text x="${g / 2}" y="${y / 2 + Math.min(g, y) * 0.13}"
            font-family="sans-serif" font-size="${Math.min(g, y) * 0.34}"
            font-weight="700" text-anchor="middle" fill="#E8FE55" opacity="0.8">${no}</text>
    </svg>`;
    const yol = `public/gorseller/yer-tutucu/galeri/${no}.jpg`;
    await sharp(Buffer.from(svg)).jpeg({ quality: 78 }).toFile(yol);
    console.log(yol, fs.statSync(yol).size, "bayt");
  }
})();
BETIK
node tmp-yer-tutucu.js
rm tmp-yer-tutucu.js
ls public/gorseller/yer-tutucu/galeri
```

Beklenen: `01.jpg` … `12.jpg`, her biri 2–8 KB, ve `tmp-yer-tutucu.js` silinmiş.

- [ ] **Adım 3: `content/galeri/galeri.json`'ı doldur**

Dosyayı tamamen şununla değiştir:

```json
{
  "_todo": "GEÇİCİ İÇERİK. Buradaki 12 kayıt yer tutucudur ve public/gorseller/yer-tutucu/galeri/ altını gösterir. Gerçek fotoğraflar public/gorseller/galeri/ altına gelince bu dosya baştan yazılacak ve yer-tutucu klasörü silinecek. Kodda hiçbir değişiklik gerekmez. Her karenin alt metni Türkçe ve betimleyici olmalı (erişilebilirlik şartı, F7-08); tarih ve etkinlik opsiyoneldir.",
  "gorseller": [
    {
      "src": "/gorseller/yer-tutucu/galeri/01.jpg",
      "alt": "Yer tutucu kare 1",
      "tarih": "2024-03-12",
      "etkinlik": "Şirket ve Girişim Ofisi Gezileri"
    },
    {
      "src": "/gorseller/yer-tutucu/galeri/02.jpg",
      "alt": "Yer tutucu kare 2",
      "tarih": "2024-04-08",
      "etkinlik": "Yeditepe Girişimcilik Zirvesi"
    },
    {
      "src": "/gorseller/yer-tutucu/galeri/03.jpg",
      "alt": "Yer tutucu kare 3",
      "tarih": "2024-05-21",
      "etkinlik": "Liderlik Atölyesi"
    },
    {
      "src": "/gorseller/yer-tutucu/galeri/04.jpg",
      "alt": "Yer tutucu kare 4",
      "etkinlik": "Kulüp Tanışma Günü"
    },
    {
      "src": "/gorseller/yer-tutucu/galeri/05.jpg",
      "alt": "Yer tutucu kare 5",
      "tarih": "2024-10-02"
    },
    {
      "src": "/gorseller/yer-tutucu/galeri/06.jpg",
      "alt": "Yer tutucu kare 6",
      "tarih": "2024-11-19",
      "etkinlik": "Mentorluk Buluşması"
    },
    {
      "src": "/gorseller/yer-tutucu/galeri/07.jpg",
      "alt": "Yer tutucu kare 7"
    },
    {
      "src": "/gorseller/yer-tutucu/galeri/08.jpg",
      "alt": "Yer tutucu kare 8",
      "tarih": "2025-02-27",
      "etkinlik": "Girişimcilik Kampı"
    },
    {
      "src": "/gorseller/yer-tutucu/galeri/09.jpg",
      "alt": "Yer tutucu kare 9",
      "tarih": "2025-03-14",
      "etkinlik": "Sunum Teknikleri Eğitimi"
    },
    {
      "src": "/gorseller/yer-tutucu/galeri/10.jpg",
      "alt": "Yer tutucu kare 10",
      "tarih": "2025-04-30",
      "etkinlik": "Yatırımcı Sohbetleri"
    },
    {
      "src": "/gorseller/yer-tutucu/galeri/11.jpg",
      "alt": "Yer tutucu kare 11",
      "tarih": "2025-05-16",
      "etkinlik": "Dönem Kapanış Buluşması"
    },
    {
      "src": "/gorseller/yer-tutucu/galeri/12.jpg",
      "alt": "Yer tutucu kare 12",
      "tarih": "2025-11-08",
      "etkinlik": "Takım Çalışması Atölyesi"
    }
  ]
}
```

4., 5. ve 7. kayıtlar bilerek eksik: not satırının üç hâli de (yalnız etkinlik, yalnız tarih, hiç yok) sayfada görünsün.

- [ ] **Adım 4: Şemanın içeriği kabul ettiğini doğrula**

`src/lib/schemas.ts` yalnızca `zod`'a bağımlı, yani doğrudan çalıştırılabiliyor. Node 24 TypeScript tiplerini kendisi soyuyor.

```bash
cat > tmp-dogrula.ts <<'BETIK'
import { readFileSync } from "node:fs";
import { galeriSchema } from "./src/lib/schemas.ts";

const ham = JSON.parse(readFileSync("content/galeri/galeri.json", "utf8"));
const sonuc = galeriSchema.safeParse(ham);

if (!sonuc.success) {
  console.error("GEÇERSİZ:", JSON.stringify(sonuc.error.issues, null, 2));
  process.exit(1);
}

console.log("kayıt:", sonuc.data.gorseller.length);
console.log("etkinliksiz:", sonuc.data.gorseller.filter((g) => !g.etkinlik).length);
console.log("tarihsiz:", sonuc.data.gorseller.filter((g) => !g.tarih).length);
console.log("ikisi de yok:", sonuc.data.gorseller.filter((g) => !g.tarih && !g.etkinlik).length);
BETIK
node tmp-dogrula.ts
rm tmp-dogrula.ts
```

Beklenen çıktı:

```
kayıt: 12
etkinliksiz: 2
tarihsiz: 2
ikisi de yok: 1
```

Betik silinmiş olmalı.

- [ ] **Adım 5: Doğrulama zinciri**

```bash
npm run format:check && npm run lint && npm run typecheck && npm run build
```

Beklenen: dördü de hatasız.

- [ ] **Adım 6: Commit**

```bash
git add src/lib/schemas.ts content/galeri/galeri.json public/gorseller/yer-tutucu
git commit -m "F4-08: galeri şemasına tarih ve etkinlik, 12 yer tutucu kare

Polaroid'in alt şeridindeki not için iki opsiyonel alan (spec §8). Alanlar
opsiyonel çünkü fotoğraflar metinlerden önce gelebiliyor.

Yer tutucular gerçek JPEG olarak üretildi (sharp ile, yeni bağımlılık yok):
SVG olsalardı next/image dangerouslyAllowSVG isterdi ve gerçek fotoğraflar
gelince kod değişmek zorunda kalırdı. Gerçek fotoğrafların klasörüne de
konmadılar - public/gorseller/yer-tutucu/galeri/ altındalar."
```

---

## Görev 3: `kure.ts` — Fibonacci dağılımı

Sayfanın tek gerçek hesabı. Saf fonksiyon: React, DOM ve Next bilmez.

**Files:**

- Create: `src/lib/kure.ts`
- Test: yok (projede koşucu yok) — Adım 3'teki tek seferlik iddia betiği ile doğrulanır

**Interfaces:**

- Consumes: yok
- Produces:
  ```ts
  export type KureNoktasi = {
    lon: number;    // derece, CSS rotateY
    egimX: number;  // derece, CSS rotateX (enlemin eksisi)
    egim: number;   // derece, -4…4, yalnız masa düzeninde
    onde: boolean;  // priority verilecek iki karo
  };
  export function kureNoktalari(adet: number): KureNoktasi[];
  ```

---

- [ ] **Adım 1: `src/lib/kure.ts`'i yaz**

```ts
/**
 * Küre üzerinde eşit aralıklı nokta dağılımı (F4-08).
 *
 * Fotoğrafları küreye rastgele serpmek kümelenme üretir: bir yerde yığılma,
 * başka yerde boşluk. Fibonacci (altın açı) dağılımı bunu deterministik olarak
 * çözüyor — hem düzgün yayılıyor hem de her çağrıda aynı sonucu veriyor.
 *
 * Determinizm burada süs değil şart: hesap sunucuda yapılıp satır içi stil
 * olarak basılıyor, istemci aynı sonucu üretmezse React hydration uyuşmazlığı
 * verir.
 *
 * Bu dosya React, DOM ve Next bilmez. Girdisi bir sayı, çıktısı açı listesi.
 */

/** Altın açı — Fibonacci küresinin boylam adımı. */
const ALTIN_ACI = Math.PI * (3 - Math.sqrt(5));

const DERECE = 180 / Math.PI;

/** Masa düzenindeki eğimin sınırı: ±4°. */
const EGIM_GENLIGI = 4;

/** `priority` verilecek karo sayısı. Fazlası YTÜ'nün B5 hatası olur. */
const ONCELIKLI_ADET = 2;

export type KureNoktasi = {
  /** Boylam, derece. CSS'te doğrudan `rotateY`. */
  lon: number;
  /**
   * Derece cinsinden dikey eğim. **Enlemin eksisi** olarak dönüyor ki CSS
   * şablonunda `calc(-1 * …)` gibi bir işaret çevirmesi kalmasın; adı bu
   * yüzden `lat` değil `egimX`.
   */
  egimX: number;
  /**
   * Masa (ızgara) düzenindeki küçük eğim, −4°…+4°. İndeksten türüyor, yani
   * rastgele değil — "masaya atılmış fotoğraflar" görünümü her yüklemede aynı.
   */
  egim: number;
  /**
   * Başlangıçta izleyiciye en yakın iki karodan biri mi. `next/image`
   * `priority`'si bunlara veriliyor: LCP adayı gerçekten onlar.
   */
  onde: boolean;
};

/**
 * `adet` karo için küre koordinatları üretir.
 *
 * Sıfır ve negatif girdide boş liste döner — çağıranın ayrıca kontrol etmesi
 * gerekmesin diye.
 */
export function kureNoktalari(adet: number): KureNoktasi[] {
  if (adet <= 0) return [];

  const ham = Array.from({ length: adet }, (_, i) => {
    // Kutupları tam doldurmamak için yarım adım kaydırma: (2i+1)/adet.
    const y = 1 - (2 * i + 1) / adet;
    const enlem = Math.asin(Math.min(1, Math.max(-1, y)));
    const lon = ALTIN_ACI * i;

    return {
      lon: lon * DERECE,
      egimX: -enlem * DERECE,
      egim: ((i * 37) % (EGIM_GENLIGI * 2 + 1)) - EGIM_GENLIGI,
      /** Kameraya dönüklük: 1 tam önde, −1 tam arkada. */
      yakinlik: Math.cos(enlem) * Math.cos(lon),
    };
  });

  const oncelikli = new Set(
    [...ham.keys()]
      .sort((a, b) => ham[b].yakinlik - ham[a].yakinlik)
      .slice(0, ONCELIKLI_ADET),
  );

  return ham.map((nokta, i) => ({
    lon: nokta.lon,
    egimX: nokta.egimX,
    egim: nokta.egim,
    onde: oncelikli.has(i),
  }));
}
```

- [ ] **Adım 2: İddia betiğini yaz**

```bash
cat > tmp-kure-dogrula.ts <<'BETIK'
import assert from "node:assert/strict";
import { kureNoktalari } from "./src/lib/kure.ts";

// Boş ve negatif girdi
assert.deepEqual(kureNoktalari(0), [], "0 karede boş liste dönmeli");
assert.deepEqual(kureNoktalari(-3), [], "negatif adette boş liste dönmeli");

// Uzunluk
assert.equal(kureNoktalari(12).length, 12);
assert.equal(kureNoktalari(1).length, 1);

const n = kureNoktalari(40);

// egimX kürenin dışına taşmamalı
for (const p of n) {
  assert.ok(p.egimX >= -90 && p.egimX <= 90, `egimX aralık dışı: ${p.egimX}`);
  assert.ok(Number.isFinite(p.lon), `lon sayı değil: ${p.lon}`);
  assert.ok(p.egim >= -4 && p.egim <= 4, `egim aralık dışı: ${p.egim}`);
  assert.ok(Number.isInteger(p.egim), `egim tam sayı değil: ${p.egim}`);
}

// Tam olarak iki karo öncelikli
assert.equal(n.filter((p) => p.onde).length, 2, "tam iki karo öncelikli olmalı");
assert.equal(kureNoktalari(1).filter((p) => p.onde).length, 1, "tek karede bir tane");

// Determinizm — hydration'ın şartı
assert.deepEqual(kureNoktalari(40), n, "iki çağrı aynı sonucu vermeli");

// Dağılım gerçekten yayılıyor mu: enlemler hem kuzeyi hem güneyi görmeli
const enKucuk = Math.min(...n.map((p) => p.egimX));
const enBuyuk = Math.max(...n.map((p) => p.egimX));
assert.ok(enKucuk < -60, `kuzey kutbuna yaklaşılmamış: ${enKucuk}`);
assert.ok(enBuyuk > 60, `güney kutbuna yaklaşılmamış: ${enBuyuk}`);

console.log("kure.ts: tüm iddialar geçti");
BETIK
```

- [ ] **Adım 3: İddia betiğini çalıştır ve sil**

```bash
node tmp-kure-dogrula.ts && rm tmp-kure-dogrula.ts
```

Beklenen: `kure.ts: tüm iddialar geçti` ve betik silinmiş.
Herhangi bir `AssertionError` çıkarsa `kure.ts` düzeltilir; betik silinmeden önce tekrar çalıştırılır.

- [ ] **Adım 4: Doğrulama zinciri**

```bash
npm run format:check && npm run lint && npm run typecheck && npm run build
```

Beklenen: dördü de hatasız. Betiğin gerçekten silindiğini `git status`'ta doğrula — takip edilmeyen `tmp-*` dosyası kalmamalı.

- [ ] **Adım 5: Commit**

```bash
git add src/lib/kure.ts
git commit -m "F4-08: kure.ts - Fibonacci küre dağılımı

Fotoğrafları küreye rastgele serpmek kümelenme üretiyor; altın açı dağılımı
düzgün yayıyor ve deterministik. Determinizm şart: hesap sunucuda yapılıp
satır içi stil olarak basılıyor, istemci aynı sonucu üretmezse hydration
uyuşmazlığı olur.

priority verilecek iki karo listenin ilk ikisi değil, başlangıçta izleyiciye
en yakın ikisi - Fibonacci sırasında 0. ve 1. karo kutba düşüyor."
```

---

## Görev 4: `Polaroid` bileşeni ve `/galeri` sayfası (masa düzeni)

Rotayı açar. Küre henüz yok — kareler düz bir ızgarada, hafif eğik duruyor. **Bu düzen atılmayacak:** Görev 8'de hareket kısıtı yedeği olarak aynen geri geliyor. Bu yüzden markup daha şimdiden küre sahnesinin yapısını kullanıyor; Görev 5 üstüne 3B kuralları ekleyecek.

**Files:**

- Create: `src/components/galeri/polaroid.tsx`, `src/app/galeri/page.tsx`
- Modify: `src/styles/globals.css` (yeni `@layer components` bloğu, dosyanın sonuna — hareket kısıtı bloğundan **önce**)

**Interfaces:**

- Consumes: `kureNoktalari(adet: number): KureNoktasi[]` ve `KureNoktasi` (Görev 3) · `getGaleri(): Promise<GaleriGorseli[]>` ve `getSite()` (`src/lib/content.ts`, mevcut) · `GaleriGorseli` (Görev 2)
- Produces: `export function Polaroid(props: { gorsel: GaleriGorseli; nokta: KureNoktasi; children?: React.ReactNode }): React.JSX.Element` — `children` karonun üstüne konacak isteğe bağlı katman içindir (Görev 7 oraya büyütme düğmesini koyacak)

---

- [ ] **Adım 1: `src/components/galeri/polaroid.tsx`'i yaz**

```tsx
import Image from "next/image";

import type { KureNoktasi } from "@/lib/kure";
import type { GaleriGorseli } from "@/types";

const TARIH_BICIMI = new Intl.DateTimeFormat("tr-TR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  // `timeZone: "UTC"` şart. `new Date("2024-03-12")` UTC gece yarısını
  // gösteriyor; saat dilimi geride olan bir tarayıcıda yerel biçimlendirme
  // günü bir geri alır ve ekrandaki tarih dosyadakiyle ayrışır.
  timeZone: "UTC",
});

/** `2024-03-12` → `12.03.2024`. */
function tarihMetni(iso: string): string {
  return TARIH_BICIMI.format(new Date(`${iso}T00:00:00Z`));
}

/**
 * Tek bir polaroid karosu (F4-08).
 *
 * Durum tutmaz, olay dinlemez — yalnız görünüş. Küre üzerindeki yeri satır içi
 * CSS değişkenleriyle geliyor; karo o değişkenleri nasıl kullanacağını bilmiyor,
 * bunu `globals.css` içindeki sahne kuralları belirliyor. Aynı bileşen hem
 * küre üzerinde hem düz masa düzeninde bu yüzden değişmeden çalışıyor.
 *
 * Not satırı iki parçalı: etkinlik adı üstte (en fazla iki satır), tarih
 * altında. İkisi de opsiyonel; hiçbiri yoksa şerit boş kalıyor ama
 * kalınlığını koruyor — polaroid'i polaroid yapan şey o boşluk.
 */
export function Polaroid({
  gorsel,
  nokta,
  children,
}: {
  gorsel: GaleriGorseli;
  nokta: KureNoktasi;
  children?: React.ReactNode;
}) {
  const notVar = Boolean(gorsel.etkinlik || gorsel.tarih);

  return (
    <figure
      className="yuent-polaroid"
      style={
        {
          "--lon": `${nokta.lon}deg`,
          "--egim-x": `${nokta.egimX}deg`,
          "--egim": `${nokta.egim}deg`,
        } as React.CSSProperties
      }
    >
      <div className="yuent-polaroid-cerceve">
        <Image
          src={gorsel.src}
          alt={gorsel.alt}
          fill
          // Karo küçük: tarayıcı 4K dosya değil ~140-280 px genişliğinde bir
          // kesit çeksin. Bütçeyi koruyan şey bu satır, lazy'nin kendisi değil
          // (küre baştan görünür alanda, hepsi hemen yükleniyor).
          sizes="(max-width: 640px) 24vw, 176px"
          priority={nokta.onde}
          className="object-cover"
        />
      </div>

      {notVar ? (
        <figcaption className="yuent-polaroid-not">
          {gorsel.etkinlik ? (
            <span className="yuent-polaroid-etkinlik">{gorsel.etkinlik}</span>
          ) : null}
          {gorsel.tarih ? (
            <time dateTime={gorsel.tarih} className="yuent-polaroid-tarih">
              {tarihMetni(gorsel.tarih)}
            </time>
          ) : null}
        </figcaption>
      ) : null}

      {children}
    </figure>
  );
}
```

- [ ] **Adım 2: CSS'i ekle**

`src/styles/globals.css` içinde, **hareket kısıtı bloğundan önce** (yani "Hareket kısıtı (F7-08'in ön ödemesi)" yorumunun hemen üstüne) yeni bir blok ekle:

```css
/* ---------------------------------------------------------------------------
   Galeri — polaroid küresi (F4-08)

   Sahne yapısı üç katman:
     .yuent-kure-sahne     → perspektif, ölçüler, sürükleme yüzeyi
     .yuent-kure-otomatik  → kendiliğinden dönen katman
     .yuent-kure-elle      → elle çevrilen katman + karoların kapsayıcısı

   Bu dosyadaki temel kurallar **masa düzenini** tanımlıyor: düz ızgara, hafif
   eğik kareler. 3B kuralları bunun üstüne biniyor. Hareketi azaltılmış
   kullanıcıda 3B geri sökülüyor ve buradaki masa düzeni yeniden ortaya
   çıkıyor — iki düzen ayrı ayrı yazılmadı, aynı kuralların iki hâli.
--------------------------------------------------------------------------- */
@layer components {
  .yuent-kure-sahne {
    /* Masa düzenindeki karo genişliği. Küre kuralları bunu küçültüyor. */
    --polaroid-w: clamp(120px, 22vw, 176px);
    position: relative;
  }

  .yuent-kure-elle {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(9.5rem, 1fr));
    gap: clamp(1rem, 3vw, 2.25rem);
    justify-items: center;
  }

  .yuent-polaroid {
    position: relative;
    inline-size: var(--polaroid-w);
    /* Alt şerit iki satırlık nota göre kalın. Not yoksa da kalıyor. */
    padding: 0.4rem 0.4rem 2.35rem;
    /* Fotoğraf kartonu. Paletin dışında ve bu kasıtlı: polaroid çerçevesi
       marka rengi değil, malzeme — kırık beyaz olmazsa kâğıt gibi durmuyor. */
    background: #f2efe6;
    box-shadow: 0 12px 26px -14px rgb(0 0 0 / 0.8);
    rotate: var(--egim, 0deg);
    /* `figure`ün tarayıcı varsayılanı olan yatay margin'i ızgarada boşluğu
       iki kez sayardı. */
    margin: 0;
  }

  .yuent-polaroid-cerceve {
    position: relative;
    aspect-ratio: 1;
    overflow: hidden;
    /* Görsel yüklenene kadar boşluk beyaz parlamasın. */
    background: #1b1e24;
  }

  .yuent-polaroid-not {
    position: absolute;
    inset-inline: 0.55rem;
    inset-block-end: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.05rem;
    font-family: var(--font-elyazisi);
    /* 11-12 px'te bağlı el yazısının okunabilmesi için ağırlık 600.
       Caveat'ın değişken ekseni tam bunun için seçildi. */
    font-weight: 600;
    line-height: 1.12;
    color: #2b2924;
  }

  .yuent-polaroid-etkinlik {
    font-size: 0.75rem;
    /* Uzun etkinlik adları şeridi taşırmasın. */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .yuent-polaroid-tarih {
    font-size: 0.68rem;
    color: #6b6559;
  }
}
```

- [ ] **Adım 3: `src/app/galeri/page.tsx`'i yaz**

```tsx
import type { Metadata } from "next";

import { IzgaraKatmani } from "@/components/atmosfer/izgara-katmani";
import { Polaroid } from "@/components/galeri/polaroid";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { getGaleri, getSite } from "@/lib/content";
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
 * 3B'si ve dönüş animasyonu JS istemiyor. `ElFeneri` bu sayfada bilerek yok:
 * imleci takip eden ışık, imleçle sürüklenen bir küreyle aynı anda iki farklı
 * şey vaat ediyor.
 */
export default async function GaleriSayfasi() {
  const gorseller = await getGaleri();
  const noktalar = kureNoktalari(gorseller.length);

  return (
    <div className="relative z-10">
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
```

- [ ] **Adım 4: Doğrulama zinciri**

```bash
npm run format:check && npm run lint && npm run typecheck && npm run build
```

Beklenen: dördü de hatasız. `build` çıktısında `/galeri` rotası listelenmeli.

- [ ] **Adım 5: Tarayıcıda kontrol**

```bash
npm run dev
```

`http://localhost:3000/galeri` adresinde:

1. Sayfa 404 vermiyor, başlık "Galeri" görünüyor.
2. 12 polaroid düz bir ızgarada, her biri hafifçe farklı açıda eğik.
3. Fotoğraflar kare kırpılmış (kaynak 4:3 ve 3:4 olanlar dahil), taşma yok.
4. Not satırı el yazısıyla; `12.03.2024` biçiminde ve `Şirket ve Girişim Ofisi Gezileri` iki satıra sığdırılmış.
5. Türkçe harfler doğru: `Ş`, `ğ`, `İ`, `ç` — yedek fonta düşen harf yok (harflerin biçimi diğerlerinden farklıysa font yüklenmemiştir).
6. 4., 5. ve 7. karolarda not satırının eksik hâlleri görünüyor; 7. karoda hiç not yok ama alt şerit yine kalın.
7. DevTools → Network → görsel isteklerinde genişlik 176 px veya altı (4K dosya çekilmiyor).

- [ ] **Adım 6: Commit**

```bash
git add src/components/galeri/polaroid.tsx src/app/galeri/page.tsx src/styles/globals.css
git commit -m "F4-08: /galeri rotası ve Polaroid bileşeni (masa düzeni)

Rota açıldı. Küre henüz yok - kareler düz ızgarada, hafif eğik. Bu düzen
atılmıyor: Görev 8'de hareketi azaltılmış kullanıcının yedeği olarak aynen
kalıyor. Markup bu yüzden şimdiden küre sahnesinin yapısını kullanıyor.

Tarih UTC'de biçimleniyor: yerel biçimlendirme saat dilimi geride olan
tarayıcıda günü bir geri alıyordu."
```

---

## Görev 5: Küre — 3B yerleşim ve otomatik dönüş

Sahneyi masa düzeninden küreye çevirir. **Hiç JavaScript eklenmiyor** — bu görevin sonunda küre, JS kapalı bir tarayıcıda da dönüyor olacak.

**Files:**

- Modify: `src/styles/globals.css` (Görev 4'te eklenen galeri bloğuna ekleme + keyframes bölümüne yeni `@keyframes`)

**Interfaces:**

- Consumes: `.yuent-kure-sahne` / `.yuent-kure-otomatik` / `.yuent-kure-elle` / `.yuent-polaroid` sınıfları ve `--lon` / `--egim-x` değişkenleri (Görev 4)
- Produces: `data-kure="duruyor"` sözleşmesi — sahne elemanında bu değer varken otomatik dönüş duruyor. Görev 6 ve 7 bu özniteliği yazacak.

---

- [ ] **Adım 1: `@keyframes`'i ekle**

`src/styles/globals.css` içindeki keyframes bölümüne (`@keyframes yuent-drift-r` tanımının hemen altına) ekle:

```css
/* Polaroid küresinin kendiliğinden dönüşü (F4-08). Tek bir eleman, tek bir
   `transform` — iş compositor'da kalıyor, 50 karoda bile ana iş parçacığına
   yük binmiyor. `linear`, çünkü bir vitrin turunda hızlanma/yavaşlama
   dikkat çeker. */
@keyframes yuent-kure-don {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
}
```

- [ ] **Adım 2: Küre kurallarını ekle**

Görev 4'te eklenen `@layer components` bloğunun **içine**, `.yuent-polaroid-tarih` kuralından sonra ekle:

```css
  /* --- Küre ------------------------------------------------------------- */

  .yuent-kure-sahne {
    /* Küre üzerindeki karo, masadakinden küçük. */
    --polaroid-w: clamp(84px, 12.5vmin, 132px);
    --kure-r: clamp(190px, 33vmin, 400px);
    /* Sürüklemenin yazacağı iki değişken. JS gelmezse ikisi de 0 kalır ve
       küre yalnızca kendiliğinden döner. */
    --kure-elle-y: 0deg;
    --kure-elle-x: 0deg;

    block-size: min(78vh, 720px);
    perspective: clamp(700px, 90vmin, 1200px);
    /* Sürüklerken sayfa dikey kaymasın ve metin seçilmesin. Sahne ekranı
       tamamen kaplamadığı için sayfanın kendisi yine kaydırılabiliyor. */
    touch-action: none;
    user-select: none;
  }

  .yuent-kure-otomatik,
  .yuent-kure-elle {
    position: absolute;
    inset: 0;
    transform-style: preserve-3d;
  }

  .yuent-kure-otomatik {
    animation: yuent-kure-don 84s linear infinite;
  }

  /* Duraklatma kaldığı açıyı koruyor ve `running` tam oradan devam ediyor.
     "Bırakıldığı yerde dur, kaldığı yerden devam et" davranışı bu satırdan
     geliyor - JS'in açıyı okuyup geri yazmasına gerek yok. */
  .yuent-kure-sahne[data-kure="duruyor"] .yuent-kure-otomatik {
    animation-play-state: paused;
  }

  .yuent-kure-elle {
    /* Izgara kuralları burada anlamsızlaşıyor (çocuklar mutlak konumlu);
       hareket kısıtı altında geri devreye giriyorlar. */
    transform: rotateX(var(--kure-elle-x)) rotateY(var(--kure-elle-y));
  }

  .yuent-kure-sahne .yuent-polaroid {
    position: absolute;
    inset-block-start: 50%;
    inset-inline-start: 50%;
    /* Sıra önemli: önce eleman küre merkezine oturuyor, sonra dönüşler o
       merkez etrafında oluyor, en son yarıçap kadar dışarı itiliyor. */
    transform:
      translate(-50%, -50%) rotateY(var(--lon)) rotateX(var(--egim-x))
      translateZ(var(--kure-r));
    /* Arkaya düşen karolar görünmüyor. Hem aynalanmış el yazısını önlüyor,
       hem referanstaki "yüzen kareler bulutu" seyrekliğini veriyor. */
    backface-visibility: hidden;
    rotate: none;
  }
```

- [ ] **Adım 3: Doğrulama zinciri**

```bash
npm run format:check && npm run lint && npm run typecheck && npm run build
```

Beklenen: dördü de hatasız.

- [ ] **Adım 4: Tarayıcıda kontrol**

`npm run dev` → `http://localhost:3000/galeri`:

1. Kareler artık ızgarada değil, bir küre üzerinde.
2. Küre kendiliğinden yavaşça dönüyor (bir tur ~84 saniye; 10 saniye izlemek fark etmeye yeter).
3. Öndeki kareler büyük ve düz, kenara gidenler açılanıp küçülüyor.
4. Arkaya dönen kareler görünmüyor (aynalanmış yazı yok).
5. Küre sayfanın dışına taşmıyor; **yatay kaydırma çubuğu çıkmıyor.**
6. 390 px genişlikte ve 1440 px genişlikte ayrı ayrı bak — ikisinde de küre ekrana sığıyor.
7. **JS'i kapat** (DevTools → Command Menu → "Disable JavaScript") ve sayfayı yenile: küre yine var ve yine dönüyor. Sürüklenemiyor ama kırık bir şey de yok.
8. DevTools → Performance ile 5 saniye kaydet: dönüş sırasında ana iş parçacığında kayda değer iş görünmemeli (compositor'da kalmalı).

- [ ] **Adım 5: Commit**

```bash
git add src/styles/globals.css
git commit -m "F4-08: küre - 3B yerleşim ve otomatik dönüş

Hiç JavaScript eklenmedi: CSS'in 3B'si ve keyframes animasyonu JS istemiyor,
yani küre JS kapalı tarayıcıda da dönüyor.

Dönüş iki katmana bölündü. Otomatik dönüş kendi elemanının animasyonu;
animation-play-state: paused onu bulunduğu açıda donduruyor, running tam
oradan devam ettiriyor. 'Bırakıldığı yerde dur, kaldığı yerden devam et'
davranışı bu ayrımdan bedavaya geliyor.

data-kure=\"duruyor\" sözleşmesi kuruldu; sürükleme ve odak bunu yazacak."
```

---

## Görev 6: Sürükleme

Sahneyi istemci bileşenine taşır ve elle çevirmeyi ekler.

**Files:**

- Create: `src/components/galeri/polaroid-kuresi.tsx`
- Modify: `src/app/galeri/page.tsx`

**Interfaces:**

- Consumes: `Polaroid` (Görev 4) · `KureNoktasi`, `kureNoktalari` (Görev 3) · `GaleriGorseli` (Görev 2) · `data-kure` sözleşmesi (Görev 5)
- Produces: `export function PolaroidKuresi(props: { gorseller: GaleriGorseli[]; noktalar: KureNoktasi[] }): React.JSX.Element` — Görev 7 bu dosyayı odak durumuyla genişletecek

---

- [ ] **Adım 1: `src/components/galeri/polaroid-kuresi.tsx`'i yaz**

```tsx
"use client";

import { useEffect, useRef } from "react";

import { Polaroid } from "@/components/galeri/polaroid";
import type { KureNoktasi } from "@/lib/kure";
import type { GaleriGorseli } from "@/types";

/** Bir piksel yatay sürükleme kaç derece çeviriyor. */
const DERECE_PER_PIKSEL = 0.25;

/** Dikey eğimin sınırı — küre baş aşağı çevrilemesin. */
const EGIM_SINIRI = 55;

/** Bırakıldıktan sonra otomatik dönüşün geri gelme süresi (ms). */
const DEVAM_GECIKMESI = 1500;

/**
 * Polaroid küresi (F4-08) — sürükleme katmanı.
 *
 * Sahnenin tamamı burada kuruluyor ama **karoları yine sunucudan gelen veri
 * çiziyor**: bu bileşen yalnızca olay dinliyor ve iki CSS değişkeni yazıyor.
 * `el-feneri.tsx` ile aynı desen — hareketin kendisi CSS'te kalıyor
 * (`SITE_PLAN.md` §4).
 *
 * Açı React durumunda değil `useRef`te tutuluyor: sürükleme sırasında saniyede
 * onlarca güncelleme oluyor ve her biri yeniden render tetiklerse 12 karo
 * boşuna yeniden çizilir. Yazılan şey `transform` olduğu için düzen de yeniden
 * hesaplanmıyor.
 *
 * Atalet (savrulma) bilerek yok: bırakınca kare bir buçuk saniye durup kendi
 * dönüşüne döndüğü için savrulma iki hareketi üst üste bindirirdi.
 */
export function PolaroidKuresi({
  gorseller,
  noktalar,
}: {
  gorseller: GaleriGorseli[];
  noktalar: KureNoktasi[];
}) {
  const sahneRef = useRef<HTMLDivElement>(null);
  const aci = useRef({ x: 0, y: 0 });
  const surukleme = useRef<{ id: number; x: number; y: number } | null>(null);
  const zamanlayici = useRef<number | null>(null);

  useEffect(() => {
    const sahne = sahneRef.current;
    if (!sahne) return;

    // Hareketi azaltılmış kullanıcıda küre zaten düz ızgaraya düşüyor
    // (globals.css). Çevrilecek bir şey yok, dinleyici de bağlanmıyor —
    // `el-feneri.tsx` ile aynı karar.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const zamanlayiciyiIptalEt = () => {
      if (zamanlayici.current !== null) {
        window.clearTimeout(zamanlayici.current);
        zamanlayici.current = null;
      }
    };

    const bas = (e: PointerEvent) => {
      if (surukleme.current) return;
      surukleme.current = { id: e.pointerId, x: e.clientX, y: e.clientY };
      sahne.setPointerCapture(e.pointerId);
      zamanlayiciyiIptalEt();
      sahne.dataset.kure = "duruyor";
    };

    const kaydir = (e: PointerEvent) => {
      const s = surukleme.current;
      if (!s || s.id !== e.pointerId) return;

      const dx = e.clientX - s.x;
      const dy = e.clientY - s.y;
      s.x = e.clientX;
      s.y = e.clientY;

      aci.current.y += dx * DERECE_PER_PIKSEL;
      // Eksi: aşağı sürüklerken kürenin üstü izleyiciye doğru gelsin.
      // `rotateX(+deg)` üst kenarı geriye yatırıyor, biz tersini istiyoruz.
      aci.current.x = Math.min(
        EGIM_SINIRI,
        Math.max(-EGIM_SINIRI, aci.current.x - dy * DERECE_PER_PIKSEL),
      );

      sahne.style.setProperty("--kure-elle-y", `${aci.current.y}deg`);
      sahne.style.setProperty("--kure-elle-x", `${aci.current.x}deg`);
    };

    const birak = (e: PointerEvent) => {
      const s = surukleme.current;
      if (!s || s.id !== e.pointerId) return;
      surukleme.current = null;
      if (sahne.hasPointerCapture(e.pointerId)) {
        sahne.releasePointerCapture(e.pointerId);
      }

      zamanlayici.current = window.setTimeout(() => {
        zamanlayici.current = null;
        sahne.dataset.kure = "donuyor";
      }, DEVAM_GECIKMESI);
    };

    sahne.addEventListener("pointerdown", bas);
    sahne.addEventListener("pointermove", kaydir);
    sahne.addEventListener("pointerup", birak);
    sahne.addEventListener("pointercancel", birak);

    return () => {
      sahne.removeEventListener("pointerdown", bas);
      sahne.removeEventListener("pointermove", kaydir);
      sahne.removeEventListener("pointerup", birak);
      sahne.removeEventListener("pointercancel", birak);
      zamanlayiciyiIptalEt();
    };
  }, []);

  return (
    // `data-kure` bilerek JSX'te yok: yokluğu "dönüyor" demek (CSS yalnızca
    // `[data-kure="duruyor"]` gördüğünde duraklatıyor). Öznitelik JSX'te
    // sabitlenseydi her yeniden render sürüklemenin yazdığı değeri ezerdi.
    <div ref={sahneRef} className="yuent-kure-sahne">
      <div className="yuent-kure-otomatik">
        <div className="yuent-kure-elle">
          {gorseller.map((gorsel, i) => (
            <Polaroid key={gorsel.src} gorsel={gorsel} nokta={noktalar[i]} />
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Adım 2: Sayfayı bileşene devret**

`src/app/galeri/page.tsx` içinde `Polaroid` içe aktarmasını `PolaroidKuresi` ile değiştir:

```ts
import { PolaroidKuresi } from "@/components/galeri/polaroid-kuresi";
```

(`Polaroid` içe aktarması bu dosyadan **kalkıyor** — artık `polaroid-kuresi.tsx` çiziyor.)

Sahne bloğunun tamamını (`<div className="yuent-kure-sahne">` … `</div>`) şununla değiştir:

```tsx
            <PolaroidKuresi gorseller={gorseller} noktalar={noktalar} />
```

- [ ] **Adım 3: Doğrulama zinciri**

```bash
npm run format:check && npm run lint && npm run typecheck && npm run build
```

Beklenen: dördü de hatasız. Kullanılmayan `Polaroid` içe aktarması kaldıysa `lint` bunu yakalar.

- [ ] **Adım 4: Tarayıcıda kontrol**

`npm run dev` → `http://localhost:3000/galeri`:

1. Küre hâlâ kendiliğinden dönüyor.
2. Fareyle tutup sürükleyince küre **elinle aynı yöne** dönüyor (sağa sürükle → sağa döner; aşağı sürükle → üstü sana doğru gelir).
3. Bırakınca küre **bıraktığın açıda duruyor**, başa sarmıyor.
4. Yaklaşık 1,5 saniye sonra **kaldığı yerden** dönmeye devam ediyor (sıçrama yok).
5. Sürükleme sırasında sayfa dikey kaymıyor; metin seçilmiyor.
6. Sürüklerken imleci pencerenin dışına çıkar ve bırak — küre takılı kalmıyor, zamanlayıcı çalışıyor (pointer capture sayesinde).
7. Dokunmatik cihazda (DevTools → cihaz emülasyonu) parmakla çevirmek çalışıyor.
8. Konsolda hata yok, hydration uyarısı yok.

- [ ] **Adım 5: Commit**

```bash
git add src/components/galeri/polaroid-kuresi.tsx src/app/galeri/page.tsx
git commit -m "F4-08: küreyi elle çevirme

Sahne istemci bileşenine taşındı. Bileşen yalnızca olay dinleyip iki CSS
değişkeni yazıyor; hareketin kendisi CSS'te kalıyor (el-feneri deseni).

Açı useState değil useRef'te: sürüklemede saniyede onlarca güncelleme oluyor,
her biri render tetiklerse karolar boşuna yeniden çiziliyor.

Bırakınca 1,5 sn sonra data-kure=donuyor'a dönülüyor; CSS'in
animation-play-state'i dönüşü kaldığı yerden sürdürüyor.

Atalet bilerek yok - bırakıştan sonra zaten kendi dönüşü başlıyor."
```

---

## Görev 7: Odak — tıklayınca öne gelen kare

Spec §6. Karoya tıklayınca fotoğraf küreden ayrılıp öne uçuyor, küre arkada durup kararıyor; kapanınca küre kendiliğinden dönmeye devam ediyor.

FLIP geçişi **saf CSS**: JS yalnızca üç sayı yazıyor (`--flip-dx`, `--flip-dy`, `--flip-olcek`), geçişi CSS `transition` yapıyor. `el.animate()` (Web Animations API) kullanılmıyor — `SITE_PLAN.md` §4.

**Files:**

- Create: `src/components/galeri/odak-polaroid.tsx`
- Modify: `src/components/galeri/polaroid-kuresi.tsx`, `src/styles/globals.css`

**Interfaces:**

- Consumes: `Polaroid` (Görev 4) · `PolaroidKuresi` (Görev 6) · `GaleriGorseli` (Görev 2)
- Produces:
  ```ts
  export function OdakPolaroid(props: {
    gorsel: GaleriGorseli;
    baslangicKutusu: DOMRect | null;
    onKapat: () => void;
    onOnceki: () => void;
    onSonraki: () => void;
  }): React.JSX.Element;
  ```

---

- [ ] **Adım 1: `src/components/galeri/odak-polaroid.tsx`'i yaz**

```tsx
"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";

const TARIH_BICIMI = new Intl.DateTimeFormat("tr-TR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: "UTC",
});

import type { GaleriGorseli } from "@/types";

/**
 * Öne gelen kare (F4-08).
 *
 * Görsel olarak "küreden ayrılıp öne uçan polaroid", teknik olarak kendi
 * erişilebilirlik sözleşmesini taşıyan bir kalıcı katman.
 *
 * **Neden `ui/dialog.tsx` yeniden kullanılmıyor:** FLIP, katmanın ilk boyanma
 * karesinde belirli bir `transform`la durmasını gerektiriyor; o kareyi Base UI
 * Dialog'un kendi giriş/çıkış geçişi yönetiyor ve ikisi çakışıyor. Bu yüzden
 * katman kendi bileşenimiz, ama Dialog'un davranış sözleşmesi birebir
 * uygulanıyor: `role="dialog"` + `aria-modal`, odak tuzağı, kapanınca odağın
 * açan düğmeye dönmesi, `Escape`, gövde kaydırma kilidi.
 *
 * FLIP'in kendisi saf CSS: burada yalnızca üç sayı yazılıyor, geçişi
 * `globals.css` içindeki `transition` yapıyor.
 */
export function OdakPolaroid({
  gorsel,
  baslangicKutusu,
  onKapat,
  onOnceki,
  onSonraki,
}: {
  gorsel: GaleriGorseli;
  /** Tıklanan karonun ekrandaki yeri. Yoksa FLIP atlanır, kart olduğu yerde belirir. */
  baslangicKutusu: DOMRect | null;
  onKapat: () => void;
  onOnceki: () => void;
  onSonraki: () => void;
}) {
  const katmanRef = useRef<HTMLDivElement>(null);
  const kartRef = useRef<HTMLDivElement>(null);
  const kapatRef = useRef<HTMLButtonElement>(null);

  // FLIP: kartı önce karonun yerine ve boyutuna koy, sonraki karede bırak.
  useEffect(() => {
    const kart = kartRef.current;
    if (!kart || !baslangicKutusu) return;

    const hedef = kart.getBoundingClientRect();
    if (hedef.width === 0 || hedef.height === 0) return;

    const olcek = baslangicKutusu.width / hedef.width;
    const dx =
      baslangicKutusu.left +
      baslangicKutusu.width / 2 -
      (hedef.left + hedef.width / 2);
    const dy =
      baslangicKutusu.top +
      baslangicKutusu.height / 2 -
      (hedef.top + hedef.height / 2);

    kart.style.setProperty("--flip-dx", `${dx}px`);
    kart.style.setProperty("--flip-dy", `${dy}px`);
    kart.style.setProperty("--flip-olcek", String(olcek));
    kart.dataset.flip = "baslangic";

    // İki kare bekleniyor: birincisinde tarayıcı başlangıç transform'unu
    // boyuyor, ikincisinde öznitelik kalkınca `transition` devreye giriyor.
    // Tek kare yetmiyor — bazı tarayıcılar ikisini aynı stil hesabında
    // birleştirip geçişi atlıyor.
    let ikinci = 0;
    const ilk = requestAnimationFrame(() => {
      ikinci = requestAnimationFrame(() => {
        delete kart.dataset.flip;
      });
    });

    return () => {
      cancelAnimationFrame(ilk);
      cancelAnimationFrame(ikinci);
    };
  }, [baslangicKutusu]);

  // Klavye, odak tuzağı, kaydırma kilidi, odağın geri dönmesi.
  useEffect(() => {
    const katman = katmanRef.current;
    if (!katman) return;

    const oncekiOdak = document.activeElement as HTMLElement | null;
    kapatRef.current?.focus();

    const eskiOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const tus = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onKapat();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        onOnceki();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        onSonraki();
        return;
      }
      if (e.key !== "Tab") return;

      const odaklanabilir = katman.querySelectorAll<HTMLElement>("button");
      if (odaklanabilir.length === 0) return;
      const ilk = odaklanabilir[0];
      const son = odaklanabilir[odaklanabilir.length - 1];

      if (e.shiftKey && document.activeElement === ilk) {
        e.preventDefault();
        son.focus();
      } else if (!e.shiftKey && document.activeElement === son) {
        e.preventDefault();
        ilk.focus();
      }
    };

    document.addEventListener("keydown", tus);

    return () => {
      document.removeEventListener("keydown", tus);
      document.body.style.overflow = eskiOverflow;
      oncekiOdak?.focus();
    };
  }, [onKapat, onOnceki, onSonraki]);

  const notVar = Boolean(gorsel.etkinlik || gorsel.tarih);

  return (
    <div
      ref={katmanRef}
      role="dialog"
      aria-modal="true"
      aria-label={gorsel.alt}
      className="yuent-odak-katman"
    >
      {/* Zemine tıklamak kapatıyor. Klavye kullanıcısının buna ihtiyacı yok
          (Escape ve kapat düğmesi var), o yüzden odaklanabilir değil. */}
      <div
        className="yuent-odak-zemin"
        onClick={onKapat}
        aria-hidden="true"
      />

      <div ref={kartRef} className="yuent-odak-kart">
        <div className="yuent-odak-cerceve">
          <Image
            src={gorsel.src}
            alt={gorsel.alt}
            fill
            sizes="(max-width: 768px) 88vw, 520px"
            className="object-cover"
          />
        </div>

        {notVar ? (
          <p className="yuent-odak-not">
            {gorsel.etkinlik ? (
              <span className="yuent-odak-etkinlik">{gorsel.etkinlik}</span>
            ) : null}
            {gorsel.tarih ? (
              <time dateTime={gorsel.tarih} className="yuent-odak-tarih">
                {TARIH_BICIMI.format(new Date(`${gorsel.tarih}T00:00:00Z`))}
              </time>
            ) : null}
          </p>
        ) : null}
      </div>

      <div className="yuent-odak-kontroller">
        <button
          type="button"
          onClick={onOnceki}
          className="yuent-odak-dugme"
          aria-label="Önceki kare"
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>

        <button
          ref={kapatRef}
          type="button"
          onClick={onKapat}
          className="yuent-odak-dugme"
          aria-label="Kapat"
        >
          <X className="size-5" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={onSonraki}
          className="yuent-odak-dugme"
          aria-label="Sonraki kare"
        >
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Adım 2: `polaroid-kuresi.tsx`'i odak durumuyla genişlet**

Dosyanın başındaki içe aktarmaları şununla değiştir:

```tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { OdakPolaroid } from "@/components/galeri/odak-polaroid";
import { Polaroid } from "@/components/galeri/polaroid";
import type { KureNoktasi } from "@/lib/kure";
import type { GaleriGorseli } from "@/types";
```

Sabitlere ekle:

```tsx
/** Bu kadar pikselden fazla hareket eden basış tıklama sayılmıyor. */
const SURUKLEME_ESIGI = 6;
```

Bileşenin gövdesinde, `zamanlayici` ref'inden sonra ekle:

```tsx
  const [odak, setOdak] = useState<number | null>(null);
  const baslangicKutusu = useRef<DOMRect | null>(null);
  /** Sürükleme tıklamaya dönüşmesin diye: basıştan beri kat edilen mesafe. */
  const suruklendi = useRef(false);

  const kapat = useCallback(() => setOdak(null), []);

  const onceki = useCallback(
    () =>
      setOdak((o) =>
        o === null ? o : (o - 1 + gorseller.length) % gorseller.length,
      ),
    [gorseller.length],
  );

  const sonraki = useCallback(
    () => setOdak((o) => (o === null ? o : (o + 1) % gorseller.length)),
    [gorseller.length],
  );

  const ac = useCallback((i: number, dugme: HTMLElement) => {
    // Sürükleme sonrası gelen tıklamayı yut.
    if (suruklendi.current) return;
    baslangicKutusu.current = dugme.getBoundingClientRect();
    setOdak(i);
  }, []);
```

`useEffect` (sürükleme) içindeki `bas` fonksiyonuna, `zamanlayiciyiIptalEt()` çağrısından **önce** ekle:

```tsx
      suruklendi.current = false;
```

`kaydir` fonksiyonunda, `s.y = e.clientY;` satırından **sonra** ekle:

```tsx
      if (Math.abs(dx) + Math.abs(dy) > SURUKLEME_ESIGI) {
        suruklendi.current = true;
      }
```

Sürükleme `useEffect`inin **altına** yeni bir efekt ekle:

```tsx
  // Odak açıkken küre duruyor; kapanınca kendiliğinden dönmeye devam ediyor.
  // Sürüklemenin "1,5 saniye sonra devam et" zamanlayıcısı burada iptal
  // ediliyor, yoksa odak kapanmadan küre yeniden dönmeye başlardı.
  useEffect(() => {
    const sahne = sahneRef.current;
    if (!sahne) return;

    if (zamanlayici.current !== null) {
      window.clearTimeout(zamanlayici.current);
      zamanlayici.current = null;
    }

    sahne.dataset.kure = odak !== null ? "duruyor" : "donuyor";
  }, [odak]);
```

Dönüş (`return`) bloğunu tamamen şununla değiştir:

```tsx
  return (
    <>
      <div
        ref={sahneRef}
        className="yuent-kure-sahne"
        data-odakli={odak !== null ? "" : undefined}
        // Odak açıkken küre yardımcı teknolojiden gizleniyor: katman modal,
        // arkasındaki karolar okunacak içerik değil.
        aria-hidden={odak !== null ? "true" : undefined}
      >
        <div className="yuent-kure-otomatik">
          <div className="yuent-kure-elle">
            {gorseller.map((gorsel, i) => (
              <Polaroid key={gorsel.src} gorsel={gorsel} nokta={noktalar[i]}>
                <button
                  type="button"
                  className="yuent-polaroid-dugme"
                  onClick={(e) => ac(i, e.currentTarget)}
                  tabIndex={odak !== null ? -1 : undefined}
                >
                  <span className="sr-only">{gorsel.alt} — büyüt</span>
                </button>
              </Polaroid>
            ))}
          </div>
        </div>
      </div>

      {odak !== null ? (
        <OdakPolaroid
          gorsel={gorseller[odak]}
          baslangicKutusu={baslangicKutusu.current}
          onKapat={kapat}
          onOnceki={onceki}
          onSonraki={sonraki}
        />
      ) : null}
    </>
  );
```

- [ ] **Adım 3: CSS'i ekle**

`src/styles/globals.css` içindeki galeri `@layer components` bloğunun sonuna ekle:

```css
  /* --- Odak ------------------------------------------------------------- */

  /* Karonun tamamını kaplayan görünmez düğme. `figure` içine `button`
     yerleştirmek geçerli HTML değil (button yalnız phrasing content alır),
     bu yüzden düğme karonun üstünde ayrı bir katman. */
  .yuent-polaroid-dugme {
    position: absolute;
    inset: 0;
    cursor: zoom-in;
  }

  .yuent-polaroid-dugme:focus-visible {
    outline: 2px solid var(--ring);
    outline-offset: 3px;
  }

  /* Odak açıkken küre geri çekiliyor. */
  .yuent-kure-sahne[data-odakli] {
    filter: blur(2px) brightness(0.45);
    transition:
      filter 300ms ease-out,
      opacity 300ms ease-out;
  }

  .yuent-odak-katman {
    position: fixed;
    inset: 0;
    z-index: 60;
    display: grid;
    place-items: center;
    padding: clamp(1rem, 5vw, 3rem);
  }

  .yuent-odak-zemin {
    position: absolute;
    inset: 0;
    background: rgb(8 9 11 / 0.72);
    cursor: zoom-out;
  }

  /* Öne uçan polaroid. FLIP burada: JS üç sayıyı yazıyor, geçişi bu
     `transition` yapıyor. `data-flip="baslangic"` varken kart karonun yerinde
     ve boyutunda duruyor; öznitelik kalkınca kendi yerine akıyor. */
  .yuent-odak-kart {
    position: relative;
    inline-size: min(88vw, 520px);
    padding: 0.9rem 0.9rem 3.4rem;
    background: #f2efe6;
    box-shadow: 0 30px 70px -30px rgb(0 0 0 / 0.9);
    transform-origin: center;
    transition:
      transform 380ms cubic-bezier(0.22, 1, 0.36, 1),
      opacity 380ms ease-out;
  }

  .yuent-odak-kart[data-flip="baslangic"] {
    transform: translate(var(--flip-dx), var(--flip-dy)) scale(var(--flip-olcek));
    opacity: 0.55;
    transition: none;
  }

  .yuent-odak-cerceve {
    position: relative;
    aspect-ratio: 1;
    overflow: hidden;
    background: #1b1e24;
  }

  .yuent-odak-not {
    position: absolute;
    inset-inline: 1.1rem;
    inset-block-end: 0.9rem;
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    font-family: var(--font-elyazisi);
    font-weight: 600;
    line-height: 1.15;
    color: #2b2924;
  }

  .yuent-odak-etkinlik {
    font-size: 1.35rem;
  }

  .yuent-odak-tarih {
    font-size: 1.05rem;
    color: #6b6559;
  }

  .yuent-odak-kontroller {
    position: absolute;
    inset-block-end: clamp(1rem, 4vh, 2.5rem);
    display: flex;
    gap: 0.5rem;
  }

  .yuent-odak-dugme {
    display: grid;
    place-items: center;
    inline-size: 2.75rem;
    block-size: 2.75rem;
    border: 1px solid var(--border);
    border-radius: 9999px;
    background: rgb(8 9 11 / 0.7);
    color: var(--foreground);
    transition:
      background-color 150ms ease-out,
      color 150ms ease-out;
  }

  .yuent-odak-dugme:hover {
    background: var(--primary);
    color: var(--primary-foreground);
  }

  .yuent-odak-dugme:focus-visible {
    outline: 2px solid var(--ring);
    outline-offset: 2px;
  }
```

- [ ] **Adım 4: Doğrulama zinciri**

```bash
npm run format:check && npm run lint && npm run typecheck && npm run build
```

Beklenen: dördü de hatasız.

- [ ] **Adım 5: Tarayıcıda kontrol**

`npm run dev` → `http://localhost:3000/galeri`:

1. Bir kareye tıkla: fotoğraf **karonun bulunduğu yerden** büyüyerek ortaya uçuyor (aniden ortada belirmiyor).
2. Küre arkada duruyor, kararıyor ve hafif bulanıklaşıyor.
3. Alt şeritte etkinlik adı ve tarih büyük punto el yazısıyla okunuyor.
4. `←` / `→` ile diğer karelere geçiliyor.
5. `Escape`, zemine tıklama ve `×` düğmesi kapatıyor.
6. Kapanınca küre **hemen** kendiliğinden dönmeye devam ediyor.
7. Odak açıkken `Tab` katmandan dışarı çıkmıyor; üç düğme arasında dönüyor.
8. Kapanınca odak **tıklanan karoya** geri dönüyor (`Tab`'a bas, sıradaki karo odaklanmalı).
9. Küreyi 20–30 piksel sürükleyip bırak — fotoğraf **açılmıyor** (sürükleme tıklamaya dönüşmüyor).
10. Küreye tıkla (sürüklemeden) — fotoğraf açılıyor.
11. Klavyeyle: `Tab` ile bir karoya git, odak halkası görünüyor, `Enter` açıyor.
12. Konsolda hata yok.

- [ ] **Adım 6: Commit**

```bash
git add src/components/galeri/odak-polaroid.tsx \
  src/components/galeri/polaroid-kuresi.tsx src/styles/globals.css
git commit -m "F4-08: odak - tıklayınca öne gelen kare

Kare küreden ayrılıp öne uçuyor (FLIP), küre arkada durup kararıyor,
kapanınca kendiliğinden dönmeye devam ediyor.

FLIP saf CSS: JS üç sayı yazıyor (--flip-dx/-dy/-olcek), geçişi CSS
transition yapıyor. el.animate() kullanılmadı - SITE_PLAN §4.

ui/dialog.tsx yeniden kullanılmadı: FLIP katmanın ilk boyanma karesinde
belirli bir transform'la durmasını istiyor, o kareyi Base UI Dialog'un kendi
geçişi yönetiyor. Dialog'un davranış sözleşmesi (role/aria-modal, odak
tuzağı, odağın geri dönmesi, Escape, kaydırma kilidi) elle uygulandı.

Düğme figure'ün içine değil üstüne konuldu: figure içinde button geçerli
HTML değil.

6 pikselden uzun basışlar tıklama sayılmıyor - sürükleyince fotoğraf
açılmasın."
```

---

## Görev 8: Hareket kısıtı yedeği

Spec §7. `prefers-reduced-motion: reduce` altında dönen küre gösterilemez; sahne saf CSS ile masa düzenine dönüyor. Yeni kural yazılmıyor — Görev 4'teki masa kuralları zaten orada, burada yalnızca 3B sökülüyor.

**Files:**

- Modify: `src/styles/globals.css` (mevcut `@media (prefers-reduced-motion: reduce)` bloğu, ~976. satır)

**Interfaces:**

- Consumes: Görev 4, 5 ve 7'nin tüm sınıfları
- Produces: yok

---

- [ ] **Adım 1: Hareket kısıtı bloğuna galeri kurallarını ekle**

Mevcut `@media (prefers-reduced-motion: reduce)` bloğunun **içine**, `.yuent-sekme-gostergesi` kuralından sonra ekle:

```css
  /* Galeri (F4-08): dönen küre yerine dağınık masa.
     Masa kuralları zaten `.yuent-kure-elle` ve `.yuent-polaroid` üzerinde
     yazılı; burada yalnızca üstlerine binen 3B katmanı söküyoruz. İki düzen
     ayrı ayrı yazılmadı — aynı kuralların iki hâli. */
  .yuent-kure-sahne {
    --polaroid-w: clamp(120px, 22vw, 176px);
    block-size: auto;
    perspective: none;
    touch-action: auto;
    user-select: auto;
  }
  .yuent-kure-otomatik,
  .yuent-kure-elle {
    position: static;
    animation: none !important;
    transform: none !important;
    transform-style: flat;
  }
  .yuent-kure-sahne .yuent-polaroid {
    position: static;
    /* Masaya atılmış fotoğraflar: her karo indeksinden türeyen küçük bir
       açıda. Deterministik, yani her yüklemede aynı. */
    transform: none;
    rotate: var(--egim, 0deg);
    backface-visibility: visible;
  }
  /* Öne gelen kare hareketsiz beliriyor; FLIP geçişi kapalı. */
  .yuent-odak-kart {
    transition: none !important;
  }
  .yuent-kure-sahne[data-odakli] {
    transition: none !important;
  }
```

- [ ] **Adım 2: Doğrulama zinciri**

```bash
npm run format:check && npm run lint && npm run typecheck && npm run build
```

Beklenen: dördü de hatasız.

- [ ] **Adım 3: Tarayıcıda kontrol**

`npm run dev` → `http://localhost:3000/galeri`, DevTools → Command Menu (`Ctrl+Shift+P`) → "Emulate CSS prefers-reduced-motion: reduce":

1. Küre yok; kareler düz bir ızgarada, her biri hafif farklı açıda eğik.
2. **Hiçbir şey kıpırdamıyor.**
3. Kareler tıklanabiliyor; fotoğraf öne geliyor ama **uçmadan**, olduğu yerde beliriyor.
4. `Escape` ve `←`/`→` çalışıyor.
5. Sürükleme dinleyicisi bağlanmamış: ızgarada sürüklemek metin seçimini engellemiyor, sayfa normal kayıyor.
6. Yatay kaydırma çubuğu yok.
7. Emülasyonu kapat, sayfayı yenile → küre geri geliyor ve dönüyor.

- [ ] **Adım 4: Commit**

```bash
git add src/styles/globals.css
git commit -m "F4-08: hareket kısıtı yedeği - dağınık masa düzeni

prefers-reduced-motion: reduce altında sahne saf CSS ile düz ızgaraya
dönüyor. Yeni kural yazılmadı: masa kuralları zaten yerinde, burada
yalnızca üstlerine binen 3B katmanı sökülüyor.

Tıklayınca büyütme kapatılmadı - o hareket değil, gezinme. Yalnızca FLIP
geçişi kalkıyor, kare olduğu yerde beliriyor."
```

---

## Görev 9: Son doğrulama ve plan güncellemesi

**Files:**

- Modify: `CODE_PLAN.md`

**Interfaces:**

- Consumes: Görev 1–8
- Produces: yok

---

- [ ] **Adım 1: Tam doğrulama zinciri**

```bash
npm run format:check && npm run lint && npm run typecheck && npm run build
```

Beklenen: dördü de hatasız. Çıktıyı oku ve **gerçekten geçtiğini gör** — "geçmiş olmalı" yeterli değil.

- [ ] **Adım 2: Geçici dosya kalmadığını doğrula**

```bash
git status --short
ls tmp-* 2>/dev/null || echo "geçici dosya yok"
```

Beklenen: `tmp-yer-tutucu.js`, `tmp-dogrula.ts`, `tmp-kure-dogrula.ts` **yok**; takip edilmeyen dosya yok.

- [ ] **Adım 3: Spec §12'nin elle test listesinin tamamını geçir**

`npm run dev` → `http://localhost:3000/galeri`. Spec'in 12. bölümündeki 10 maddenin **hepsini** sırayla dene. Herhangi biri geçmezse görev burada durur ve ilgili görevin koduna dönülür.

Özellikle atlanmaması gerekenler:

- JS kapalı: küre var ve dönüyor.
- `prefers-reduced-motion`: masa düzeni, hiçbir şey kıpırdamıyor.
- 390 px ve 1440 px: yatay kaydırma yok.
- `ğ Ğ ı İ ş Ş ç Ç ö Ö ü Ü` doğru basılıyor.

- [ ] **Adım 4: `CODE_PLAN.md`'yi güncelle**

Üç yer:

1. **F4-08 satırı** — `- [ ] **F4-08**` → `- [x] **F4-08**`, başına `✅ canlıda` işareti. Altındaki "🎨 Tasarım oturumu — KOD YAZILMADI, TASARIM AÇIK" başlığını `### 🎨 Tasarım oturumu — 20.08.2026 · tamamlandı` olarak değiştir ve "Cevaplanmamış sorular" bölümünü **verilen cevaplarla** değiştir:
   - Tıklayınca kare öne uçar, küre arkada durup kararır.
   - Küre kendiliğinden döner; sürükleyip bırakınca bırakıldığı yerde ~1,5 sn durup kaldığı yerden devam eder.
   - JS kapalıyken küre yine döner; düz masa düzeni yalnızca `prefers-reduced-motion` altında.
   - Font: Caveat.
     Ayrıca tasarım ve plan belgelerine bağlantı ver.

2. **"Açılan rotalar"** listesine `/galeri` ekle; **"Hâlâ 404 veren rotalar"** listesinden `/galeri`'yi çıkar.

3. **"ŞU AN NEREDEYİZ"** bloğu:
   - `Son biten` → `F4-08 — /galeri canlıda (3B polaroid küresi)`
   - `Sıradaki` → `F4-12 (/katil), F4-13 (/basvuru), sonra F4-15 (404/error)`
   - "MUSTAFA'DAN BEKLENENLER" altındaki `Galeri görselleri` maddesini güncelle: sayfa hazır ve yer tutucularla çalışıyor; gerçek fotoğraflar `public/gorseller/galeri/` altına gelince `content/galeri/galeri.json` yeniden yazılacak ve `public/gorseller/yer-tutucu/` silinecek, **kod değişmeyecek.**
   - Değişiklik günlüğüne 20.08.2026 girdisi ekle.

- [ ] **Adım 5: Biçimlendir ve commit**

```bash
npm run format
npm run format:check
git add CODE_PLAN.md
git commit -m "CODE_PLAN: F4-08 /galeri bitti

3B polaroid küresi canlıda. Tasarım oturumunun dört açık sorusu cevaplandı
ve F4-08 bölümüne işlendi; ayrıntı tasarım ve plan belgelerinde.

/galeri açılan rotalara geçti. Sıradaki: F4-12 (/katil), F4-13 (/basvuru).

Galeri görselleri hâlâ Mustafa'dan bekleniyor ama sayfayı bloke etmiyor:
yer tutucularla çalışıyor, gerçek fotoğraflar gelince yalnızca JSON
değişecek."
```

- [ ] **Adım 6: Uzağa gönder**

```bash
git push origin main
git log --oneline -9
```

Beklenen: 9 commit (Görev 1–9) uzakta.

---

## Not: bu plandan sonra ne kalıyor

- **Gerçek fotoğraflar.** Mustafa `public/gorseller/galeri/` altına koyunca `content/galeri/galeri.json` baştan yazılır ve `public/gorseller/yer-tutucu/` silinir. Kodda değişiklik yok.
- **CSP** (F7-06) yazılırken galeri ek bir istisna gerektirmiyor — dış kaynak yok.
- Spec §14'teki kapsam dışı maddeler (albüm, filtre, arama, atalet, sonsuz kaydırma) bu planın konusu değil.
