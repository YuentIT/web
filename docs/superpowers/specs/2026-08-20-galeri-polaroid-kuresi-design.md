# /galeri — 3B polaroid küresi · tasarım belgesi

**Görev:** F4-08 · **Tarih:** 20.08.2026 · **Durum:** onay bekliyor

> Bu belge `CODE_PLAN.md` F4-08 altındaki yarım kalmış tasarım oturumunu
> kapatır. Oradaki dört açık soru cevaplandı; teknik yön burada yazıya döküldü.
> Uygulama planı bu belge onaylandıktan sonra ayrıca yazılacak.

---

## 1. Ne yapıyoruz

`/galeri`, kulüpten karışık kareleri gösteren tek bir showroom. Albüm yok,
etkinlik filtresi yok, arama yok (18.08.2026 sadeleştirmesi). Kareler düz bir
ızgarada değil, **yavaşça dönen bir 3B küre** üzerinde polaroid çerçeveleriyle
duruyor.

**Referans:** [Collect UI — Gabriel (@gabriell\_lab)](https://collectui.com/designs/gallery-ui-design-inspiration/a1fcd655-c824-4474-80b7-c80e28738e02)
— *"A floating gallery of polaroid-style images forms a clean 3D sphere."*
Referanstaki beyaz zemin alınmıyor; küre **bizim koyu temamızın ve
`IzgaraKatmani`'nın** içinde duruyor.

## 2. Davranış — Mustafa'nın tarifi (20.08.2026)

Sayfanın tamamı bu beş cümleden türüyor:

1. Küre **kendiliğinden yavaşça döner.**
2. **Elle sürüklenerek** de döndürülebilir.
3. Sürükleyip bırakınca **bırakıldığı yerde ~1,5 saniye durur, sonra kaldığı
   yerden dönmeye devam eder.**
4. Bir kareye **tıklayınca fotoğraf öne gelir**, küre arkada durur ve kararır.
5. Fotoğraftan **çıkınca küre kendiliğinden dönmeye devam eder.**

Buna eklenen tek şart: **küre her zaman küredir.** Sayfa açılırken önce ızgara
görünüp sonra küreye dönüşmez. Düz ızgara yalnızca işletim sisteminde "hareketi
azalt" açık olan kullanıcıya gösterilir (§7).

## 3. Verilen kararlar

| # | Karar | Gerekçe |
|---|---|---|
| 1 | Düz ızgara yerine 3B polaroid küresi | 20.08 tasarım oturumu |
| 2 | Zemin: koyu tema + `IzgaraKatmani` | Küre bizim atmosferimizin içinde dursun |
| 3 | **three.js kurulmayacak** | `SITE_PLAN.md` §4: "hareketin tamamı saf CSS" |
| 4 | Polaroid'in alt kenarında el yazısıyla **tarih · etkinlik** notu | Polaroid metaforu |
| 5 | Not metinlerini Mustafa fotoğraf fotoğraf verecek | 20.08 |
| 6 | Tıklayınca kare öne uçar, küre arkada kararır | Kullanıcı sayfadan kopmuyor: küre yerinde duruyor, kare ondan ayrılıp öne geliyor. Ayrı bir "galeri gezgini" ekranı yok — bkz. §6 |
| 7 | Otomatik dönüş **her zaman geri gelir** | Mustafa, 20.08 (vitrin hissi) |
| 8 | Yedek düzen: dağınık masa — hafif eğik polaroidler | Küreyle akraba dursun |
| 9 | El yazısı fontu: **Caveat** | Tek font dosyasında değişken ağırlık 400–700; 11–12 px'te 600'e çekilip okunaklılık kurtarılabiliyor |

### 3.1 Neden başka türlü değil

**Neden three.js değil:** `SITE_PLAN.md` §4'teki karar korunuyor. Bir küre
çizmek için WebGL sahnesi, kamera ve doku yükleyici getirmek; hâlihazırda
`transform` ile çözülebilen bir şeye ~150 KB ve ayrı bir zihinsel model
eklemek olurdu.

**Neden her karede JS hesabı değil:** 40–50 karonun transform'unu
`requestAnimationFrame` içinde JS'in hesaplaması billboarding ve atalet gibi
incelikleri açardı, ama kare başına 50 stil yazımı demek — `CODE_PLAN`'in kabul
ettiği "40–50 karodan sonra mobilde akıcılık düşebilir" sınırını aşağı çeker.
Bizim tasarımımız o incelikleri istemiyor.

**Neden `<noscript>` ile ayrı bir ızgara değil:** Aynı görselleri DOM'a iki kez
koymak demek olurdu; `next/image` iki ayrı `srcset` üretir ve tarayıcı ikisini
de sıraya alabilir. Aşağıdaki çözümde ızgara ile küre **aynı DOM'dur**, aralarındaki
fark yalnızca CSS.

## 4. Mimari

### 4.1 Küre neden JS'siz de küre

CSS'in 3B dönüşümleri ve `@keyframes` animasyonu JavaScript gerektirmez. Bu
yüzden küreyi **sunucu basar**: her karonun küre üzerindeki yeri derleme
sırasında hesaplanır ve satır içi CSS değişkeni olarak yazılır. Dönüş, tek bir
CSS animasyonundan gelir.

JS yalnızca iki şey ekler: **sürükleme** ve **tıklayınca öne getirme.** İkisi de
ilerlemeli geliştirme — yoksa küre yine döner, yine bütün kareler sırayla öne
gelir.

Bunun bedeli: JS gelene kadar küre sürüklenemez. Kabul ediyoruz; sayfa o arada
da doğru görünüyor ve kendiliğinden dönüyor.

### 4.2 Katmanlar

```
.yuent-kure-sahne          perspective — 3B derinliğin kaynağı
└ .yuent-kure-otomatik     @keyframes yuent-kure-don · rotateY 0→360° · sonsuz
  └ .yuent-kure-elle       rotateY(var(--kure-elle-y)) rotateX(var(--kure-elle-x))
    └ .yuent-polaroid ×N   rotateY(var(--lon)) rotateX(var(--lat)) translateZ(var(--kure-r))
```

Dönüşün **iki ayrı katmana** bölünmesi tasarımın kilit noktası:

- **Otomatik dönüş** kendi elemanının animasyonudur. `animation-play-state:
  paused` onu bulunduğu açıda dondurur; `running` tam kaldığı yerden devam
  ettirir. Mustafa'nın 3. maddesi ("bırakıldığı yerde durur ve devam eder")
  böylece bedavaya geliyor — JS'in açıyı okuyup geri yazması gerekmiyor.
- **Elle çevirme** ayrı bir elemanın iki CSS değişkenidir. Sürükleme boyunca
  birikir ve kalıcıdır; otomatik dönüş onun üzerine biner.

Her iki katman da tek bir `transform` animasyonu çalıştırır, yani iş
compositor'da kalır — ana iş parçacığına 50 karoda bile yük binmez.

### 4.3 Karoların yerleşimi — Fibonacci küresi

Eşit aralıklı dağılım için altın açı kullanılıyor (`src/lib/kure.ts`, saf
fonksiyon):

```ts
const ALTIN_ACI = Math.PI * (3 - Math.sqrt(5)); // ≈ 2.39996 rad

// i = 0 .. N-1
const y   = 1 - (2 * i + 1) / N;      // -1 .. 1
const lat = Math.asin(y);              // enlem, -90° .. 90°
const lon = ALTIN_ACI * i;             // boylam
```

Karonun transform'u `rotateY(var(--lon)) rotateX(var(--lat)) translateZ(var(--kure-r))`.
CSS'te fazladan işaret çevirmesi olmasın diye `--lat` değişkeni **enlemin eksisi**
olarak basılır (`-lat`, derece cinsinden); `kure.ts` bunu böyle döndürür ve
alanın adı `lat` yerine `egimX` olur ki okuyanı yanıltmasın.

Sonuç: karolar küreye **teğet** durur — öndekiler düz ve büyük, kenara gidenler
açılanıp küçülür, tam da referanstaki görünüm.

Arkaya düşen karolar `backface-visibility: hidden` ile görünmez. Bu hem
aynalanmış el yazısı sorununu çözer, hem de referanstaki "yüzen kareler bulutu"
seyrekliğini verir.

Hesap sunucuda yapıldığı için deterministik — hydration uyuşmazlığı yok.

### 4.4 Ölçüler

| Değişken | Değer | Not |
|---|---|---|
| `--kure-r` | `clamp(190px, 33vmin, 400px)` | küre yarıçapı |
| polaroid genişliği | `clamp(84px, 12.5vmin, 132px)` | çerçeve dahil |
| `perspective` | `clamp(700px, 90vmin, 1200px)` | dar ekranda daha az balık gözü |
| sahne yüksekliği | `min(78vh, 720px)` | ekranı tamamen kaplamıyor (§5) |
| otomatik dönüş süresi | `84s` / tur, `linear` | fark edilir ama rahatsız etmez |

**Tasarım sınırı: en fazla ~50 kare.** Üstünde mobilde akıcılık düşer. Bugün
`content/galeri/galeri.json` boş olduğu için bu sınır teorik; aşılırsa çözüm
küreyi büyütmek değil, kare sayısını kısmaktır.

## 5. Sürükleme

`polaroid-kuresi.tsx` (istemci bileşeni), Pointer Events ile:

- `pointerdown` → sahneye `data-kure="duruyor"`, `setPointerCapture`, varsa
  bekleyen devam-zamanlayıcısı iptal.
- `pointermove` → yatay piksel farkı `--kure-elle-y`'ye, dikey fark
  `--kure-elle-x`'e eklenir. Katsayı ~0,25°/px.
  Dikey eksen **±55° ile sınırlı** — küre baş aşağı çevrilemesin.
- `pointerup` / `pointercancel` → **1500 ms** sonra `data-kure="donuyor"`.
- `touch-action: none` yalnızca sahnede; sayfanın dikey kaydırması etkilenmesin
  diye sahne yüksekliği ekranı tamamen kaplamıyor.

Atalet (momentum) **yok.** Bırakınca kare bir buçuk saniye durup kendi dönüşüne
döndüğü için ayrıca savrulmaya gerek kalmıyor; eklemek iki hareketi üst üste
bindirirdi.

## 6. Odak — tıklayınca öne gelen kare

`odak-polaroid.tsx` (istemci bileşeni).

**Açılış:**
1. Tıklanan karonun ekrandaki yeri `getBoundingClientRect()` ile okunur.
2. Sahne `data-kure="duruyor"` olur; küre durur, `opacity` düşer ve hafif
   `blur` alır — seçilen karenin dışındaki her şey geri çekilir.
3. Üstte aynı görsel büyük polaroid olarak açılır. İlk karede karonun okunan
   yerine ve boyutuna yerleştirilir, sonraki karede ortaya ve tam boyuta geçer
   (FLIP). Böylece kare *açılmış* değil, **öne uçmuş** gibi görünür.
4. Kaynak karo `visibility: hidden` olur ki görsel iki kez görünmesin.

**Kapanış:** `Esc`, zemine tıklama, kapat düğmesi veya fotoğrafa tekrar tıklama.
Aynı FLIP tersine oynar; küre duruyor olduğu için karonun yeri hâlâ geçerlidir.
Bittiğinde sahne `data-kure="donuyor"`a döner — Mustafa'nın 5. maddesi.

**Klavye ve erişilebilirlik:**
- Her karo gerçek bir `<button>`, yani `Tab` ile gezilebilir ve `Enter`
  açar.
- Odak katmanı `role="dialog"` + `aria-modal="true"`, odak içeride tutulur,
  kapanınca **açan düğmeye geri döner**, arka plan `aria-hidden` olur ve
  gövde kaydırması kilitlenir.
- `←` / `→` önceki/sonraki kareye geçer.

**Neden `ui/dialog.tsx` yeniden kullanılmıyor:** FLIP, katmanın **ilk boyanma
karesinde** belirli bir transform'la durmasını gerektiriyor; o kareyi Base UI
Dialog'un kendi giriş/çıkış geçişi yönetiyor ve ikisi çakışıyor. Bu yüzden
katman kendi bileşenimiz; yukarıdaki erişilebilirlik sözleşmesi Dialog'un
davranışının birebir aynısı olacak şekilde uygulanıyor.

## 7. Hareket kısıtı ve yedek düzen

`prefers-reduced-motion: reduce` altında dönen bir küre gösteremeyiz, ama
sayfayı da boş bırakamayız. `globals.css`'teki mevcut hareket kısıtı bloğuna
(976. satır) eklenerek **saf CSS ile** düz düzene geçilir:

- `perspective` kalkar, `transform-style: flat` olur, animasyon durur.
- Kapsayıcı `grid`e döner; karolar `position: static`.
- Her karo, indeksinden türeyen küçük bir eğim alır:
  `--egim: ((i * 37) % 9) - 4` derece, yani −4°…+4°.
  Sonuç: **masaya atılmış fotoğraflar** — küreyle akraba, ama hareketsiz.

JS tarafı `el-feneri.tsx` ile aynı deseni izler: hareket kısıtı açıksa
sürükleme dinleyicileri **hiç bağlanmaz.** Tıklayınca öne gelme çalışmaya devam
eder — o hareket değil, gezinme; FLIP'siz, doğrudan belirir.

## 8. İçerik ve şema

`galeriGorseliSchema` iki opsiyonel alanla genişliyor:

```ts
export const galeriGorseliSchema = z.object({
  src: gorselYolu,
  /** Erişilebilirlik şartı: her karenin ne gösterdiği Türkçe yazılır. */
  alt: dolu,
  /** Polaroid'in alt kenarındaki not. İkisi de opsiyonel: görseller
   *  metinlerden önce gelebilir, o zaman not satırı hiç çizilmez. */
  tarih: z.iso.date().optional(),
  etkinlik: dolu.optional(),
});
```

- `tarih` ISO olarak saklanır (blog şemasıyla aynı idiom), ekranda
  `Intl.DateTimeFormat("tr-TR", { month: "long", year: "numeric" })` ile
  **"Mart 2024"** diye basılır ve `<time dateTime>` içine sarılır. Polaroid'e
  düşülen bir nota gün bilgisi fazla; ay + yıl doğru ölçek.
- Etkinlik tarihi yayınlamama politikası (`schemas.ts` 250–262) **geçmiş
  kareler için geçerli değil** — o kural yaklaşan etkinlikleri önden duyurmamak
  içindi.
- Not satırı: `Mart 2024 · Şirket Gezisi`. Yalnızca biri varsa yalnızca o
  basılır; ikisi de yoksa satır çizilmez ama polaroid kalın alt kenarını korur.

## 9. Görseller

- Karolar `next/image`, `sizes="(max-width: 640px) 24vw, 140px"` — karo küçük
  olduğu için tarayıcı ~140–280 px genişliğinde dosya çeker.
- **2 karo `priority`, gerisi lazy.** (YTÜ'nün B5 hatası: 14 görsele birden
  `priority`. Tekrarlanmayacak.) `priority` verilenler listenin ilk ikisi
  **değil**: Fibonacci sırasında 0. ve 1. karo kutba düşer, yani ekrana teğet
  durur. `kure.ts` bunun yerine başlangıçta **izleyiciye en yakın** iki karoyu
  işaretler (`cos(lat) · cos(lon)` en büyük olan ikisi) — LCP adayı gerçekten
  onlar.
- Odak katmanı ayrı bir `<Image>` kullanır,
  `sizes="(max-width: 768px) 88vw, 520px"`.
- Küre baştan görünür alanda olduğu için lazy karolar da pratikte hemen yüklenir;
  bütçeyi koruyan şey `sizes`'ın darlığı, lazy'nin kendisi değil.

## 10. Font

**Caveat**, değişken ağırlık 400–700. Archivo ile aynı boru hattı
(`SITE_PLAN.md` §8.1): Google Fonts CDN'i **kullanılmıyor**, dosya indirilip
Latin-1 + Latin Extended-A altkümesine indiriliyor, WOFF2'ye çevrilip
`public/fonts/Caveat-Variable.woff2` olarak self-host ediliyor.

`src/lib/fonts.ts`'e `caveat` eklenir (`--font-caveat`, `display: "swap"`,
yedek yığın `["Segoe Script", "Bradley Hand", "cursive"]`), `globals.css`'teki
`@theme inline` bloğunda `--font-elyazisi` adıyla kayda geçer, `layout.tsx`'te
gövde sınıfına eklenir.

Türkçe kapsam `fontTools` ile `cmap` üzerinden doğrulanmıştı: `ğ Ğ ı İ ş Ş ç Ç
ö Ö ü Ü` tam. Altküme alındıktan sonra bu doğrulama **tekrarlanacak.**

Notun boyu 11–12 px, ağırlık 600 — Caveat'ın değişken ekseni bu yüzden seçildi.

## 11. Dosyalar

**Yeni**

| Dosya | Ne yapar |
|---|---|
| `src/app/galeri/page.tsx` | RSC: içeriği okur, küre koordinatlarını hesaplar, metadata |
| `src/lib/kure.ts` | Fibonacci dağılımı — saf fonksiyon, girdisi sayı, çıktısı açı listesi |
| `src/components/galeri/polaroid.tsx` | Tek karo: çerçeve, görsel, el yazısı not |
| `src/components/galeri/polaroid-kuresi.tsx` | İstemci: sürükleme, durdur/devam et, odak durumu |
| `src/components/galeri/odak-polaroid.tsx` | İstemci: öne gelen kare, FLIP, klavye, odak yönetimi |
| `public/fonts/Caveat-Variable.woff2` | El yazısı |

**Değişen**

`src/lib/schemas.ts` (§8) · `src/types/index.ts` · `src/lib/fonts.ts` ·
`src/app/layout.tsx` · `src/styles/globals.css` (küre katmanı + hareket kısıtı
bloğuna ekleme) · `content/galeri/galeri.json`

## 12. Doğrulama

Projede test koşucusu yok; doğrulama zinciri mevcut betiklerle ve tarayıcıda
yapılıyor.

**Otomatik:** `npm run format:check` · `npm run lint` · `npm run typecheck` ·
`npm run build` — dördü de temiz geçmeli.

**Tarayıcıda elle:**

1. Küre sayfa açılır açılmaz küre — ızgara görünüp sonra dönüşmüyor.
2. Kendiliğinden yavaşça dönüyor.
3. Sürüklenince dönüyor; bırakınca **bırakıldığı yerde duruyor**, ~1,5 sn sonra
   **kaldığı yerden** devam ediyor (başa sarmıyor).
4. Kareye tıklayınca fotoğraf öne uçuyor, küre arkada duruyor ve kararıyor.
5. Kapanınca küre kendiliğinden dönmeye devam ediyor.
6. `Tab` ile karolar geziliyor, `Enter` açıyor, `Esc` kapatıyor, odak açan
   düğmeye dönüyor, `←`/`→` kareler arasında geziyor.
7. DevTools → "Emulate prefers-reduced-motion" → dağınık masa ızgarası,
   hiçbir şey kıpırdamıyor, tıklayınca kare yine açılıyor.
8. JS kapalı → küre var ve dönüyor; sürükleme ve tıklama yok, kırık bir şey de
   yok.
9. Dar ekran (390 px) ve geniş ekran (1440 px) — küre taşmıyor, sayfa yatay
   kaydırma üretmiyor.
10. El yazısı notunda `ğ Ğ ı İ ş Ş ç Ç ö Ö ü Ü` doğru basılıyor, yedek fonta
    düşen harf yok.

## 13. Bugün bloke olan yerler

Bunlar tasarımı değil, **sayfanın dolmasını** bekletiyor. Uygulama bunlar
olmadan da bitirilebilir; sayfa boş durumda anlamlı bir metin gösterir.

- `public/gorseller/galeri/` **boş** — hiç görsel yok.
- `content/galeri/galeri.json` **boş** (`gorseller: []`).
- Not metinleri (tarih · etkinlik) Mustafa'dan fotoğraf fotoğraf gelecek.

Geliştirme sırasında geçici yer tutucu karelerle çalışılacak; içerik gelince
yalnızca JSON doldurulacak, kod değişmeyecek.

## 14. Kapsam dışı

- Albüm, etkinlik filtresi, arama — 18.08.2026'da kaldırıldı.
- Sürüklemede atalet/savrulma (§5).
- Sonsuz kaydırma, sayfalama, görsel indirme.
- `/etkinlikler` ile çapraz bağlantı — galeri bir arşiv değil, showroom.
