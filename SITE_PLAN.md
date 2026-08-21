# LGK / YUENT — Yeni Web Sitesi Planı

> Yeditepe Üniversitesi Liderlik ve Girişimcilik Kulübü (LGK / YUENT) web sitesinin
> Wix'ten kendi kod tabanımıza taşınması için mimari plan.
>
> **Ne yapacağımız** burada. **Hangi sırayla yapacağımız** [`CODE_PLAN.md`](./CODE_PLAN.md).
> **Kime devredileceği** [`DEVRETME.md`](./DEVRETME.md).

**Son güncelleme:** 17.08.2026 (v2 — kapsam sadeleştirildi)
**Durum:** Planlama tamamlandı, kodlama başlamadı.

---

## 1. Neden taşıyoruz?

Site şu an `yuent.co` adresinde Wix üzerinde. Wix kötü bir araç değil; sorun şu:

1. **Devir riski.** Site, alan adı, bülten abone listesi ve tüm form kayıtları tek bir
   Wix hesabının içinde kilitli. O hesabın parolası kimdeyse site odur.
2. **Ölü ağırlık.** Ana sayfa 1,06 MB HTML indiriyor. Aynı işi yapan `ytugirisim.org` 50 KB.
3. **25 kurulu uygulama, 6'sı kullanımda.** Randevu, sepet, ödeme, cüzdan, şans çarkı —
   hepsi kurulu, hepsi boş.

Hedef hız değil, **sahiplik**: kod bizde, içerik bizde, ve gelecek yılın ekibi hiçbir
kişisel hesaba muhtaç olmadan devam edebilsin.

---

## 2. Tasarım ilkesi: en az devir

> **Her yeni servis, gelecek yıl kaybedilebilecek bir anahtar demektir.**

Bu plan, "yapılabilecek en iyi site"yi değil, **beş yıl sonra hâlâ ayakta olacak siteyi**
hedefliyor. Bunun bedeli birkaç özelliğin daha basit olması; karşılığı ise devredilecek
hesap sayısının üçe inmesi.

### 2.1 Referans sitelerin gerçekten kullandığı servisler

Her iki siteyi de teknik olarak inceledik (`inceleme raporları/`). Kullandıkları servisler:

| | İTÜ Girişim | YTÜ Girişim | **Bizim planımız** |
|---|---|---|---|
| Kod | GitHub | GitHub | GitHub |
| Barındırma | Vercel | Vercel | Vercel |
| Alan adı / DNS | Cloudflare | Hostinger | (mevcut kayıt firması) |
| Kurumsal mail | Google Workspace | Hostinger Mail (kullanılmıyor, gmail'e düşülmüş) | Google Workspace — **zaten var** |
| Form / başvuru | **Google Forms** | ❌ hiç yok (sadece mailto) | **Google Forms** |
| Etkinlik kayıt | **Luma** | ❌ yok | **Google Forms** |
| Veritabanı | ❌ yok | ❌ yok | ❌ yok |
| CMS | ❌ yok (içerik kodda) | ❌ yok (içerik kodda) | Keystatic (GitHub App, ayrı servis değil) |
| E-posta servisi | ❌ yok | ❌ yok | ❌ yok |
| Dosya depolama | ❌ yok | Vercel Blob (Vercel'in parçası) | Google Drive — **zaten var** |
| Analitik | ❌ yok | ❌ yok | Vercel Analytics (Vercel'in parçası) |
| **Toplam servis** | **5** | **3** | **3 yeni + 1 mevcut** |

**Sonuç:** Hiçbiri veritabanı, CMS aboneliği veya e-posta servisi kullanmıyor. İkisi de
formu ya dışarıya (Google Forms / Luma) atmış ya da hiç koymamış. Biz de aynısını
yapacağız — ama YTÜ'nün aksine formlar **gerçekten çalışacak**, İTÜ'nün aksine
**sahte form olmayacak**.

### 2.2 Bu kararın somut sonuçları

**Yok:** veritabanı (Supabase), e-posta servisi (Resend), yönetim paneli (`/yonetim`),
kullanıcı girişi, API uçları, dosya yükleme altyapısı, oran sınırlama, RLS politikaları,
ödeme sağlayıcısı.

**Yerine:** Google Forms → yanıtlar Google Sheets'e düşer → Sheets **zaten** yönetim
panelidir. Herkes nasıl kullanılacağını biliyor, devir eğitimi gerektirmiyor, CSV/Excel
dışa aktarma hazır geliyor.

> Not: Yeditepe'nin maili Google Workspace üzerinde çalışıyor (MX kayıtları doğrulandı),
> yani `yuent@yeditepe.edu.tr` zaten bir Google hesabı. Forms, Sheets ve Drive
> **yeni hesap açmadan** kullanılabiliyor. Bu, planın en şanslı kısmı.

---

## 3. Mevcut sitenin tam envanteri (yuent.co)

### 3.1 Taşınacak özellikler

| # | Mevcut özellik | Wix'te | Yeni sitede |
|---|---|---|---|
| 1 | Ana sayfa: hero, misyon/vizyon, öne çıkan 3 etkinlik, alıntı, yaklaşan etkinlikler, "Bize Katılın" | `/anasayfa` | `/` |
| 2 | Hakkımızda: kulüp metni, misyon, vizyon | `/hakkımızda` | `/hakkimizda` |
| 3 | Güncel ekip (8 kişi) | `/ekibimiz` | `/ekibimiz` |
| 4 | Dönem arşivi: 2025-26, 2022-23, 2021-22, 2020-21 | `/20252026` vb. | `/ekibimiz/[donem]` |
| 5 | Etkinlik listesi + arama (7 etkinlik) | `/etkinliklerimiz` | `/etkinlikler` |
| 6 | Etkinliğe özel sayfalar (SED'24, YES'24) | `/sed24`, `/yes24` | `/etkinlikler/[slug]` |
| 7 | Etkinlik kaydı | Wix Events | **Google Form** → etkinlik sayfasındaki buton |
| 8 | Eğitim sayfası | `/egitim` | `/egitimler` |
| 9 | Tanıtım ve sponsorluk + PDF indirme | `/tanitim` | `/sponsorluk` |
| 10 | Koordinatör başvurusu | `/basvuru` | **Google Form** → `/basvuru` sayfasındaki buton |
| 11 | Üyelik / Bize Katılın | `/kayit` | **Google Form** → `/katil` |
| 12 | İletişim formu (İsim/Soyisim/Email/Konu/Mesaj) | `/i-letişim` | **Google Form** → `/iletisim` |
| 13 | İstek ve öneri | `/i-stek-ve-öneri` | **Google Form** → `/oneri` |
| 14 | Form gönderilerinin kutusu (Wix Contacts) | Wix paneli | **Google Sheets** |
| 15 | Bülten aboneliği | Footer | Footer → bülten aracı |
| 16 | Toplu pazarlama maili | Wix ShoutOut | Bülten aracı (bkz. §5) |
| 17 | Foto galeri | Wix Pro Gallery | `/galeri` |
| 18 | 404 | `/error404` | `not-found.tsx` |
| 19 | Kullanım Koşulları / Gizlilik | Footer | `/kullanim-kosullari`, `/gizlilik`, `/kvkk` |
| 20 | Sosyal hesaplar (@7yuent) | Footer | Footer + JSON-LD |
| 21 | İletişim bilgileri | Footer | `content/site.json` (tek kaynak) |

### 3.2 Kullanılmadığı teyit edilen Wix uygulamaları → taşınmıyor

Kulüp yönetimiyle teyit edildi (17.08.2026):

❌ Wix Bookings (randevu, takvim) · ❌ Checkout & Orders (sepet, ödeme, teşekkür sayfası) ·
❌ My Wallet (cüzdan) · ❌ My Subscriptions (abonelikler) · ❌ Smartarget Lucky Wheel (şans çarkı) ·
❌ Wix Chat (cevaplayan yoksa kötü deneyim) · ❌ Wix Members Area (üye girişi)

### 3.3 Diğer kurulu uygulamalar

| Uygulama | Karar |
|---|---|
| Wix Blog | `/blog` olarak taşınıyor (şu an içerik yok, altyapı kuruluyor) |
| Wix Video / Live Video | YouTube gömme yeterli |
| Wix Podcast Player | Spotify gömme yeterli |
| Easy Polls & Surveys | Google Forms yeterli |

---

## 4. Teknik kararlar

| Karar | Seçim | Neden |
|---|---|---|
| Çatı | **Next.js (App Router) + TypeScript** | Sunucu render'ı SEO'yu baştan çözer. YTÜ bu kalıpla çalışıyor; İTÜ'nün SPA tercihi bulunabilirliği bitirmiş |
| Barındırma | **Vercel** | GitHub'a push = yayın |
| Stil | **Tailwind CSS + shadcn/ui** | Her iki referans site de bunu kullanıyor |
| Animasyon | **Saf CSS** (+ 2 küçük `requestAnimationFrame` dinleyicisi) | 19.08.2026'da güncellendi (aşağı bak). 3D/Spline **yok** — İTÜ'de tek başına ~2 MB |
| İkon | **lucide-react** | |
| Yazı tipi | **Archivo Expanded** (başlık) + **Archivo** (gövde), `next/font/local` | `fonts/` klasöründe Expanded var. İTÜ fontu hiç yüklememiş, YTÜ tek aileyle yetinmiş |
| İçerik | **Dosya tabanlı** (`content/*.json` + MDX) + **Keystatic** paneli | Ayrı servis değil — GitHub App. Keystatic çökse bile içerik dosyaları elimizde |
| **Formlar** | **Google Forms** (hepsi) | Yanıtlar Sheets'e düşer, ekip zaten biliyor, yeni hesap yok, KVKK sorumluluğu basitleşir. İTÜ de aynısını yapıyor |
| **Veritabanı** | **YOK** | Form yanıtları Sheets'te. Referans sitelerin ikisinde de veritabanı yok |
| **E-posta servisi** | **YOK** | Google Forms bildirim ve onay mailini kendi gönderiyor |
| Dosya (CV, PDF) | **Google Drive** | Forms'un dosya yükleme alanı doğrudan Drive'a yazar |
| Bülten | **Tek araç** (§5) | Hem abone listesi hem kampanya gönderimi tek yerde |
| Ölçüm | **Vercel Analytics** | Vercel'in parçası, ayrı hesap yok, çerez istemez |
| Dil | TR (varsayılan) + EN altyapısı hazır | İTÜ'nün tek sözlük yaklaşımı doğru ve ucuz |

> **Animasyon kararı — 19.08.2026 revizyonu.** Plan başta `motion`
> (framer-motion) öngörüyordu ve Mustafa bunun kurulmasını onayladı. Ana sayfa
> tasarımı bittiğinde ortaya çıkan gerçek şu oldu: tasarımdaki hiçbir efekt
> `motion`a ihtiyaç duymuyor. Gezinen ışık lekeleri, ışık huzmeleri, kayan
> şerit, satır satır açılan başlık, kart hover'ı ve butonun dönen kenarı —
> hepsi `@keyframes` ve `@property` ile çıkıyor. Geriye yalnızca iki küçük
> `requestAnimationFrame` dinleyicisi kalıyor: el fenerinin imleci takibi ve
> ızgaranın kaydırmaya bağlı sönmesi (ikisi de ~20'şer satır).
>
> Bu yüzden paket **kurulmadı**: kullanılmayan 34 KB'lık bir bağımlılık, "karar
> verilmişti" diye taşınacak bir yük değil. Hazır bileşen kaynağı olarak
> **Animate UI** seçildi (Motion + Base UI tabanlı, shadcn kayıt defterinden
> kuruluyor, projedeki `@base-ui/react` ile birebir uyumlu); ilk gerçek
> ihtiyaçta hem o hem `motion` kurulur. Aceternity/Magic UI bileşenleri Tailwind
> v3 + Radix varsayıyor, bizde v4 + Base UI var — oradan bir şey alınırsa elle
> uyarlanır.

> **Güncelleme — 21.08.2026: kapı açıldı, `motion` kuruldu (`13.1.1`).** Yukarıdaki
> "ilk gerçek ihtiyaçta kurulur" maddesi işledi. İhtiyaç: ana sayfadaki sayı
> bandının sıfırdan hedefe sayması. Bu, `@keyframes` ile çıkmıyor — sayının
> **metin içeriği** her karede değişmeli, CSS ise metin üretmiyor.
>
> Kaynak Animate UI'ın `counting-number` bileşeni; projeye uyarlanmış hâli
> `src/components/ui/counting-number.tsx`. **Şimdilik tek kullanıcısı o bant.**
> Paket geldiği için başka yere serbestçe `motion` serpilmiyor: buradaki
> "hareketin tamamı saf CSS" kuralı hâlâ geçerli, `motion` yalnızca CSS'in
> yapamadığı iş için açılıyor.
>
> Uyarlamada üç tuzak çıktı, ikisi kaynağın kendi hatası:
> 1. Kaynak bileşen sunucuda `0` basıyor — JS çalışmazsa sayfada temelli sıfır
>    kalırdı. Bizde sunucu son rakamı basıyor.
> 2. Sayma `mount`'ta başlıyordu; bant ilk ekranın altında olduğu için kullanıcı
>    oraya varmadan bitiyordu. Artık `IntersectionObserver` ile başlıyor.
> 3. `MotionValue.set()` **ekrana yansımıyor**: `motion` değeri DOM'a kendi kare
>    döngüsünde yazıyor ve o döngü yalnızca aktif animasyon varken dönüyor.
>    Başlangıç değeri bu yüzden DOM'a doğrudan yazılıyor; yoksa sayaç başlarken
>    rakam hedeften sıfıra sıçrıyor.

### 4.1 Bilerek yapmadıklarımız

- 3D / Spline yok · Harici CMS aboneliği yok · Stok fotoğraf yok
- **Sahte form yok** — her buton gerçekten çalışan bir Google Form'a gider
- Kendi form altyapımızı yazmıyoruz — bakımı ve devri bize kalırdı

---

## 5. Bülten ve toplu mail

Bu, veritabanı olmadan çözülemeyen tek gereksinim — o yüzden ayrı bir aracı hak ediyor.
İki seçenek var, **karar Faz 0'da verilecek**:

### Seçenek A — Ücretsiz bülten aracı (önerilen)
MailerLite / Brevo gibi ücretsiz bir araç. Abone listesini **o tutar**, kayıt formunu
**o verir**, kampanya editörü ve abonelikten çıkma yönetimi hazır gelir.
- ➕ Kod bilmeyen biri tarayıcıdan kampanya hazırlayıp gönderebilir
- ➕ Bizde veritabanı gerektirmez
- ➖ Devredilecek listeye **+1 hesap**

### Seçenek B — Google Groups (sıfır yeni hesap)
Yeditepe zaten Google Workspace kullanıyor. Bir grup adresi açılır, aboneler ona eklenir,
o adrese atılan mail herkese gider.
- ➕ Devredilecek listeye **hiçbir şey eklemez**
- ➖ Tasarımlı bülten yok (düz mail), abonelik yönetimi ilkel, açılma oranı ölçülemez
- ➖ Üniversitenin Workspace ayarları grup açmaya izin vermeyebilir — **önce sorulmalı**

> **Önerim:** Seçenek A. Ayda bir atılan tasarımlı bir duyuru maili için tek hesap makul
> bir bedel. Ama "tek bir hesap bile fazla" denirse B çalışır ve site tarafında hiçbir şey
> değişmez — footer formu sadece başka bir yere bağlanır.
>
> Her iki durumda da: **abone listesinin CSV yedeği her dönem devrinde alınır.**

---

## 6. Bilgi mimarisi — rota haritası

```
/                                  Ana sayfa
/hakkimizda                        Hakkımızda
/ekibimiz                          Güncel dönem ekibi
/ekibimiz/[donem]                  Dönem arşivi (2025-2026 | 2022-2023 | 2021-2022 | 2020-2021)
/etkinlikler                       Etkinlik listesi (kategori filtresi + arama)
/etkinlikler/[slug]                Etkinlik detay  → "Kayıt Ol" butonu Google Form'a gider
/egitimler                         Eğitim programları
/galeri                            Foto galeri (etkinliğe göre filtreli)
/blog                              Blog listesi
/blog/[slug]                       Blog yazısı
/sponsorluk                        Tanıtım ve sponsorluk + PDF indirme
/katil                             Üyelik başvurusu (açıklama + Google Form butonu)
/basvuru                           Koordinatör başvurusu (açıklama + Google Form butonu)
/iletisim                          İletişim bilgileri + harita + Google Form butonu
/oneri                             İstek ve öneri (Google Form butonu)
/kvkk · /gizlilik · /kullanim-kosullari
/keystatic                         🔒 İçerik editörü (GitHub hesabıyla giriş)
not-found                          404
```

**API uçları:** yalnızca **bir** tane.

```
POST /api/bulten     Footer'daki bülten formunu bülten aracına iletir
GET  /sitemap.xml    Otomatik üretim
GET  /robots.txt     Otomatik üretim
GET  /opengraph-image
```

> Seçenek B (Google Groups) seçilirse bu tek uç da düşer; footer formu doğrudan
> grubun kayıt sayfasına bağlanır ve sitede **hiç API ucu kalmaz.**

### 6.1 Menü

```
Anasayfa · Hakkımızda · Etkinlikler ▾ · Ekibimiz ▾ · Galeri · İletişim   [Bize Katıl]
                        ├ Tüm Etkinlikler        ├ Güncel Ekip
                        ├ Eğitimler              ├ 2025-2026
                        └ Sponsorluk             ├ 2022-2023
                                                 ├ 2021-2022
                                                 └ 2020-2021
```

Wix'teki "Daha Fazlası…" çöp menüsü kaldırılıyor.

---

## 7. İçerik modeli

Tüm içerik depoda dosya olarak durur. Keystatic bu dosyaları düzenleyen bir arayüzdür.

```
content/
├── site.json                  Kulüp adı, e-posta, telefonlar, adres, sosyal hesaplar, form URL'leri
├── anasayfa.json              Hero, CTA'lar, öne çıkan etkinlik slug'ları
├── hakkimizda.json            Hikaye, misyon, vizyon, alıntılar, istatistikler
├── donemler/
│   ├── 2025-2026.json  2022-2023.json  2021-2022.json  2020-2021.json
├── etkinlikler/               7 adet .mdx
├── egitimler/*.mdx
├── blog/*.mdx
├── galeri/albumler.json
├── sponsorluk.json
└── hukuki/kvkk.mdx · gizlilik.mdx · kullanim-kosullari.mdx
```

### 7.1 Formlar tek yerden yönetilir

```jsonc
// content/site.json
{
  "formlar": {
    "iletisim":    "https://forms.gle/...",
    "katil":       "https://forms.gle/...",
    "basvuru":     "https://forms.gle/...",
    "oneri":       "https://forms.gle/...",
    "bultenKayit": "https://..."          // Seçenek B ise grup kayıt adresi
  }
}
```

Bir form değiştiğinde **tek bir satır** güncellenir; kod değişmez.
Keystatic'ten kod bilmeden düzenlenebilir.

### 7.2 Etkinlik şeması

```ts
{
  baslik, kisaAciklama, kategori, durum: "yaklasan"|"kayit-acik"|"gecmis",
  tarih?, tarihMetni?, yer?, kapakGorsel, galeriAlbum?,
  kayitFormUrl?,          // Google Form bağlantısı — yoksa kayıt butonu çıkmaz
  kayitKapanisMetni?,     // "Kontenjan doldu" / "Kayıtlar 12 Kasım'da açılıyor"
  ozellikler: string[], partnerler?: string[]
}
```

---

## 8. Tasarım sistemi

### 8.1 Tipografi

| Rol | Aile | Kaynak |
|---|---|---|
| Display (h1–h3, rozetler) | **Archivo Expanded** Bold | `fonts/` ✓ elimizde |
| Gövde | **Archivo** Regular / Medium / SemiBold | Google Fonts (OFL), indirilecek |
| Sayısal | sistem monospace | — |

Hepsi WOFF2'ye çevrilip `next/font/local` ile self-host edilecek.
**Google Fonts CDN linki kullanılmayacak.**

**Archivo Expanded ayrı bir aile değil.** Google Fonts'ta Archivo tek bir değişken
font olarak yayınlanıyor: `Archivo[wdth,wght].ttf`, `wdth` ekseni 62→125,
`wght` ekseni 100→900. "Expanded" dediğimiz şey `wdth=125`. Yeni bir kesit
gerekirse (ör. Archivo Bold) aynı dosyadan `fontTools.varLib.instancer` ile
örneklenir — başka yerden font indirmeye gerek yok.

Üretilen dosyalar (`public/fonts/`, toplam **77 KB**):

| Dosya | Kaynak |
|---|---|
| `Archivo-Regular.woff2` | değişken font, `wdth=100 wght=400` |
| `Archivo-Medium.woff2` | değişken font, `wdth=100 wght=500` |
| `Archivo-SemiBold.woff2` | değişken font, `wdth=100 wght=600` |
| `ArchivoExpanded-Regular.woff2` | `fonts/ArchivoExpanded-Regular.ttf` |
| `ArchivoExpanded-Bold.woff2` | `fonts/ArchivoExpanded-Bold.ttf` |

Altküme Latin-1 + Latin Extended-A + tipografik noktalama + para birimi (₺ dahil);
834 glif 419'a indi. Türkçe kapsam eksiksiz.

### 8.2 Renk

**Yön (19.08.2026 revizyonu):** Site koyu ve **editoryal brutalist**. Devasa
geniş kesitli tipografi, sert çizgiler, keskin köşeler ve tek bir yüksek
enerjili aksan. Logo yine renkli değil, **beyaz** kullanılıyor.

**Temel karar: aksan asit sarısı ve birincil butonu o dolduruyor.**
Önceki sürümde marka rengi beyazın kendisiydi ve aksan safran/pirinçti
(`#D9A441`); ikisi de değişti. Gerekçe: 18.08 kararı "minimal ve ağırbaşlı" bir
site varsayıyordu, 19.08'de seçilen yön "ilk saniyede çarpan" bir ana sayfa.
Beyaz buton bu dilde nötr kalıyor, safran ise asit sarısının yanında sönük
duruyordu. Asit sarısı üzerine mürekkep yazı **17:1** kontrast veriyor, yani
en yüksek enerjili seçenek aynı zamanda en okunaklısı.

**Dürüst not:** önceki sürüm safranı seçerken gerekçe olarak "koyu temaların
iki klişesinden (asit yeşili, vermilyon) kaçınmak" demişti. Asit sarısı o
uyarının tam sınırında ve bu bilinerek seçildi — üç aksan yan yana görülüp
karşılaştırıldı (19.08.2026).

**Zemin nötr siyah değil, mavi tarafa çekilmiş mürekkep.** Bu karar korundu:
`#000000` ve nötr gri skalası koyu temaların hazır cevabı; birkaç puan mavi
kaydırmak ekranda ucuz görünmeyi engelliyor.

```css
/* Zemin ve yapı — soğuk mürekkep skalası */
--bg:            #08090B;
--surface:       #0E1015;
--surface-2:     #14171D;
--border:        #1C1F25;
--border-strong: #2C3037;

/* Yazı */
--text:          #F5F7FA;   /* 18:1 — gövde */
--text-muted:    #9AA0AA;   /* 8.4:1 — ikincil */
--text-subtle:   #7D838D;   /* 5.1:1 — etiket, üst başlık (AA sınırının üstünde) */

/* Marka ve aksan — ikisi de aynı asit sarısı */
--brand:         #E8FE55;   /* birincil buton zemini, kayan şerit, vurgu */
--brand-fg:      #08090B;   /* birincil buton yazısı — 17:1 */
--accent:        #E8FE55;   /* bağlantı, odak halkası, küçük işaret */

/* Anlamsal */
--success:       #4FA97E;
--warning:       #E08A3C;
--danger:        #D9614F;

--radius:        0.75rem;
```

**Aksan artık nadir değil, ama dar.** Butonu, kayan şeridi, kategori etiketini
ve odak halkasını dolduruyor; gövde metninde **hiç** kullanılmıyor. Işık
efektleri (hero'daki gezinen lekeler, kapanıştaki huzmeler) de aynı sarının
%3–%30 opaklıklı hâlleri — yani sayfadaki tüm renk tek bir token'dan türüyor.

**Not:** Sitede form yok — hepsi Google Forms'ta. Bu yüzden `--success` /
`--warning` / `--danger` pratikte neredeyse hiç görünmeyecek; palet okunabilirlik
ve tek bir çağrı butonu için optimize edildi.

Kural: bileşenler **her zaman** token kullanır, asla `#hex` yazmaz.
(İTÜ'de `#A41034` bileşenlerin içine elle yazılmış.)

### 8.3 Bileşen envanteri

```
Layout   SiteHeader, MobileMenu, SiteFooter, Container, Section, PageHeader
İçerik   EventCard, EventGrid, TeamMemberCard, TeamGroup, DonemSecici, StatCounter,
         Timeline, QuoteBlock, MissionVisionPair, SponsorTier, GalleryGrid, Lightbox,
         BlogCard, MDXContent, FileDownloadCard
Form     FormCta            ← Google Form'a götüren açıklamalı kart/buton
         NewsletterForm     ← footer bülten kaydı
Yardımcı SeoJsonLd, ShareButtons, EmptyState, Skeleton
```

`FormCta` bileşeni tüm başvuru sayfalarında kullanılır: başlık, kimin için olduğu,
ne kadar sürdüğü, son tarih, ve "Formu Doldur" butonu. Form kapalıysa buton yerine
gerekçe gösterilir.

---

## 9. Dizin yapısı

```
lgk/
├── CODE_PLAN.md · DEVRETME.md · SITE_PLAN.md · README.md
├── .env.example                 ← tek değişken: bülten aracı anahtarı (Seçenek A ise)
├── .gitignore · next.config.ts · tailwind.config.ts · tsconfig.json
├── keystatic.config.ts · components.json
│
├── content/                     ← bkz. §7
├── public/
│   ├── fonts/ · logo/ · dosyalar/ · gorseller/
│   ├── favicon.ico · icon.png · apple-icon.png · og-default.png
│   └── site.webmanifest
│
├── src/
│   ├── app/
│   │   ├── layout.tsx · page.tsx · not-found.tsx · error.tsx
│   │   ├── sitemap.ts · robots.ts · opengraph-image.tsx
│   │   ├── hakkimizda/page.tsx
│   │   ├── ekibimiz/page.tsx · ekibimiz/[donem]/page.tsx
│   │   ├── etkinlikler/page.tsx · etkinlikler/[slug]/page.tsx
│   │   ├── etkinlikler/[slug]/opengraph-image.tsx
│   │   ├── egitimler/page.tsx · galeri/page.tsx
│   │   ├── blog/page.tsx · blog/[slug]/page.tsx
│   │   ├── sponsorluk/page.tsx
│   │   ├── katil/page.tsx · basvuru/page.tsx · iletisim/page.tsx · oneri/page.tsx
│   │   ├── (hukuki)/kvkk/page.tsx · gizlilik/page.tsx · kullanim-kosullari/page.tsx
│   │   ├── keystatic/[[...params]]/page.tsx
│   │   └── api/bulten/route.ts        ← sitedeki TEK API ucu
│   │
│   ├── components/ ui/ · layout/ · icerik/ · form/ · seo/
│   ├── lib/ content.ts · seo.ts · utils.ts
│   ├── styles/globals.css
│   └── types/index.ts
│
└── inceleme raporları/
```

`src/lib/` içinde artık `supabase/`, `mail/`, `validation/`, `rate-limit.ts` **yok**.

---

## 10. Devredilecek hesaplar

Ayrıntı ve devir adımları: [`DEVRETME.md`](./DEVRETME.md).

**3 yeni servis + 1 mevcut hesap.**

| # | Servis | Ne işe yarıyor | Durum |
|---|---|---|---|
| 1 | **GitHub Organization** (Free plan) | Kod + tüm içerik | Yeni açılacak — **repo public olacak** (bkz. §10.1) |
| 2 | **Vercel Hobby** (kulüp hesabı) | Barındırma, yayın, ziyaret istatistikleri | Yeni açılacak — Team/Pro **değil**, ücretli olur |
| 3 | **Alan adı `yuent.co`** | Sitenin adresi (şu an Wix DNS'inde) | Mevcut, kulüp adına geçecek |
| 4 | **`yuent@yeditepe.edu.tr`** (Google Workspace) | Forms, Sheets, Drive, tüm hesapların kurtarma adresi | **Zaten var**, üniversiteye ait |
| 5 | Bülten aracı | Abone listesi + kampanya | Sadece **Seçenek A** seçilirse |

**Ayrı hesap değil:** Keystatic (GitHub App) · Vercel Analytics (Vercel'in parçası) ·
Google Maps gömüsü (anahtar istemiyor).

**Geçici:** Wix hesabı — abone listesi ve içerik yedeklenene kadar (bkz. `CODE_PLAN.md` F8-05).

### 10.1 Plan seçimleri ve neden ücretsiz kademeler yetiyor

**GitHub Free (organizasyon)** — yeterli. Sınırsız repo, sınırsız üye, Dependabot
güvenlik ve sürüm güncellemeleri, Issues & Projects. CI/CD dakikası neredeyse hiç
tüketilmiyor çünkü **derlemeyi Vercel yapıyor, GitHub Actions değil.** Paket depolama
kullanılmıyor.

> **Repo public olacak.** Sebebi: Free planda korumalı dal (branch protection / ruleset)
> kuralları yalnızca public repo'larda çalışıyor, ve public repo'larda Actions dakikası
> sınırsız. Bir kulüp sitesi için zaten doğru tercih.
>
> **Şart:** Repoda hiçbir gizli anahtar bulunmayacak. Bu planda zaten veritabanı ve
> e-posta servisi yok; tek olası anahtar bülten aracınınki ve o **yalnızca Vercel ortam
> değişkeninde** durur, kodda değil. Google Form adresleri sitede zaten herkese açık.

**Vercel Hobby** — yeterli, **ücretsiz.** Dikkat: Vercel'in "Team/Pro" planı kişi başı
aylık ücretlidir; bize gerekmiyor. Hobby ticari olmayan kullanım içindir, öğrenci kulübü
buna girer.

> Hobby teknik olarak "kişisel" bir hesaptır. Bu yüzden hesap **bir öğrencinin adına
> değil, `yuent@yeditepe.edu.tr` ile kulüp adına** açılır ve parolası kasada durur.
> Devir, hesabın kendisinin devri demektir.
>
> Kurulumda teyit edilecek: Hobby hesabı GitHub **organizasyon** deposundan dağıtım
> yapabiliyor mu (Vercel GitHub App'i org'a kurularak). Bir engel çıkarsa yedek plan
> **Cloudflare Pages** — ücretsiz kademesi takım kullanımına ve ticari kullanıma izin verir.

**Vercel Analytics** — Hobby planında sınırlı bir ücretsiz kotayla gelir. Kulüp
ölçeğinde fazlasıyla yeter; aşılırsa Plausible/Umami gibi ücretsiz alternatiflere geçilir.

---

## 11. Bu sadeleştirmenin bedeli — dürüst liste

Hiçbir karar bedelsiz değil. Google Forms'a geçmenin kaybettirdikleri:

| Kayıp | Gerçek etkisi |
|---|---|
| Formlar site tasarımıyla aynı görünmüyor | Kullanıcı Google Forms sayfasına gidiyor. İTÜ de aynısını yapıyor; kimse şikayet etmiyor |
| Sitede "kaç kişi kayıt oldu" sayacı gösterilemiyor | Sheets'ten bakılıp elle yazılabilir |
| Mükerrer kayıt otomatik engellenemiyor | Google Forms'ta "yanıtı 1 ile sınırla" seçeneği var (giriş ister) veya Sheets'te elle temizlenir |
| Özel tasarımlı onay maili yok | Google Forms'un standart onay maili gider |
| Tüm başvurular tek panelde toplanmıyor | Her formun kendi Sheets'i var; bir klasörde toplanır |

**Karşılığında:** 2 servis, ~25 kodlama görevi, bir güvenlik yüzeyi (veritabanı + kimlik
doğrulama) ve kişisel veriyi kendi sunucumuzda tutmanın KVKK sorumluluğu ortadan kalkıyor.
Kulüp ölçeğinde bu takas net şekilde doğru.

---

## 12. Kabul kriterleri (site "bitti" ne demek?)

- [ ] Lighthouse mobil: Performance ≥ 90, SEO = 100, Accessibility ≥ 95
- [ ] Her sayfa sunucudan tam HTML ile geliyor (JS kapalıyken içerik okunabiliyor)
- [ ] `sitemap.xml` gerçek; 404 gerçekten HTTP 404
- [ ] Her form butonu çalışan bir Google Form'a gidiyor — **çalışmayan buton yok**
- [ ] Form yanıtları kulüp Drive'ındaki ortak klasöre düşüyor, en az 2 kişi erişebiliyor
- [ ] Bülten kaydı çalışıyor, Wix'teki mevcut abone listesi taşındı
- [ ] KVKK metni yayında; her Google Form'da onay sorusu ve metne bağlantı var
- [ ] `og:image` mutlak URL, sosyal önizleme çalışıyor
- [ ] İçerik değişikliği için kod bilmek gerekmiyor (Keystatic'ten denendi)
- [ ] Form adresi değiştirmek için kod değişikliği gerekmiyor (`site.json`)
- [ ] `DEVRETME.md` eksiksiz; tek bir kişisel hesap bağlı değil
