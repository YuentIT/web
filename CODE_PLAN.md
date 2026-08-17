# CODE_PLAN — LGK / YUENT Web Sitesi

> Bu dosya projenin **tek gerçek ilerleme kaydıdır.** Bir görev bitince kutu işaretlenir
> ve "ŞU AN NEREDEYİZ" bloğu güncellenir. Projeye yeni katılan biri yalnızca ilk iki
> bölümü okuyarak nerede olduğumuzu ve sırada ne olduğunu anlayabilmelidir.
>
> Mimari gerekçeler: [`SITE_PLAN.md`](./SITE_PLAN.md) · Devir: [`DEVRETME.md`](./DEVRETME.md)

**Sürüm:** v2 — 17.08.2026 (kapsam sadeleştirildi: veritabanı, e-posta servisi ve
yönetim paneli kaldırıldı; tüm formlar Google Forms'a taşındı)

---

## Nasıl kullanılır

| İşaret | Anlamı |
|---|---|
| `[ ]` | Başlanmadı |
| `[~]` | Devam ediyor |
| `[x]` | Bitti ve kabul kriteri karşılandı |
| `[!]` | Bloke — karar veya erişim bekliyor |
| 🔐 | **Hesap/erişim gerektirir. DUR.** Bir hesaba giriş yapmadan, bir servise kaydolmadan veya bir depoyu bağlamadan önce Mustafa'ya haber ver. Hiçbir bağlantı kişisel hesap üzerinden kurulmayacak. |

**Kurallar**
1. Fazlar sıralıdır; bir faz bitmeden sonraki başlamaz.
2. Görevin altındaki **Bitti sayılır** satırı karşılanmadan kutu işaretlenmez.
3. 🔐 satırında iş durur, hesap kulüp adına açılır/paylaşılır, sonra devam edilir.
4. Bu dosya her çalışma seansının sonunda güncellenir ve commit edilir.

---

## ŞU AN NEREDEYİZ

```
Tarih          : 17.08.2026
Aktif faz      : Faz 0 — Hesaplar ve kararlar
Aktif görev    : F0-01 (GitHub organizasyonu) — başlanmadı
Blokaj         : Faz 0'ın tamamı Mustafa'nın hesap açmasına ve bülten kararına bağlı
Bir sonraki adım: Aşağıdaki "Mustafa'nın yapması gerekenler" listesi
Kod durumu     : Henüz kod yok. Depo başlatılmadı (git init çalıştırılmadı).
```

### Mustafa'nın yapması gerekenler (Faz 0 kilidi)

1. GitHub'da bir **organizasyon** aç (kişisel hesap değil), **Free plan yeterli**,
   birincil e-posta `yuent@yeditepe.edu.tr`, en az 2 kişi Owner. Repo **public** olacak.
2. `yuent@yeditepe.edu.tr` Google hesabına erişimi olan kişiyi belirle — **tüm formlar
   ve Sheets bu hesapta olacak.**
3. **Bülten kararını ver:** Seçenek A (ücretsiz bülten aracı, +1 hesap) veya
   Seçenek B (Google Groups, 0 hesap). Detay: `SITE_PLAN.md` §5.
   B'yi düşünüyorsan önce üniversite BT'ye "grup açabilir miyiz" diye sor.
4. `yuent.co` alan adının kimin adına kayıtlı olduğunu ve yenileme tarihini öğren.

---

## İlerleme özeti

| Faz | Başlık | Görev | Durum |
|---|---|---|---|
| 0 | Hesaplar ve kararlar | 5 | ⬜ 0/5 |
| 1 | Proje iskeleti | 9 | ⬜ 0/9 |
| 2 | Tasarım sistemi | 8 | ⬜ 0/8 |
| 3 | İçerik katmanı | 7 | ⬜ 0/7 |
| 4 | Sayfalar | 15 | ⬜ 0/15 |
| 5 | Formlar (Google Forms) | 7 | ⬜ 0/7 |
| 6 | Bülten | 4 | ⬜ 0/4 |
| 7 | SEO, performans, erişilebilirlik | 9 | ⬜ 0/9 |
| 8 | Yayına alma ve devir | 8 | ⬜ 0/8 |
| 9 | Opsiyonel modüller | — | 🔒 kapalı |
| | **Toplam** | **72** | **0/72** |

> v1'de 89 görev vardı. Veritabanı, e-posta servisi ve yönetim paneli kapsam dışına
> çıkınca 17 görev düştü ve devredilecek servis sayısı 5'ten 3'e indi.

---

# Faz 0 — Hesaplar ve kararlar

> Bu fazın tamamı 🔐. Amaç: proje ilk commit'ten önce devredilebilir olsun.

- [ ] **F0-01** 🔐 **GitHub organizasyonu aç — Free plan yeterli**
  Ad önerisi: `yuent` veya `lgk-yeditepe`. Birincil e-posta `yuent@yeditepe.edu.tr`.
  En az 2 kişi **Owner** (web sorumlusu + yönetim kurulu başkanı).
  Free plan bize fazlasıyla yetiyor: derlemeyi Vercel yaptığı için CI/CD dakikası
  neredeyse hiç tüketilmiyor, paket depolama kullanılmıyor. Dependabot bedava geliyor
  ve site dönemler arası bakımsız kalacağı için en değerli özellik o.
  *Bitti sayılır:* Organizasyon var, 2 owner tanımlı, kişisel hesap owner değil.

- [ ] **F0-02** 🔐 **Depoyu organizasyon altında oluştur — public olarak**
  Depo adı: `web`. **Public.** Sebebi: Free planda korumalı dal kuralları yalnızca
  public repo'larda çalışıyor ve public repo'larda Actions dakikası sınırsız.
  ⚠️ Public olduğu için repoda **hiçbir gizli anahtar bulunmayacak** — tek olası anahtar
  bülten aracınınki ve o yalnızca Vercel ortam değişkeninde durur.
  Yerel klasör (`C:\Users\musta\github\lgk`) buna bağlanacak.
  *Bitti sayılır:* `git remote -v` organizasyon URL'sini gösteriyor (kişisel değil);
  `main` dalı korumalı, doğrudan push kapalı.

- [ ] **F0-03** 🔐 **Vercel hesabı aç ve GitHub org'a bağla**
  **Hobby planı** (ücretsiz). Vercel'in "Team/Pro" planı kişi başı aylık ücretlidir —
  **açmayın.** Hobby ticari olmayan kullanım içindir, öğrenci kulübü buna girer.
  Hesap bir öğrencinin adına değil, `yuent@yeditepe.edu.tr` ile **kulüp adına** açılır;
  parola kasada durur. Vercel GitHub App'i organizasyona kurulur.
  Bir engel çıkarsa yedek plan: **Cloudflare Pages** (ücretsiz, takım kullanımına izin verir).
  *Bitti sayılır:* Proje org deposundan dağıtım yapıyor ve hesap kulüp adına.

- [ ] **F0-04** 🔐 **Google Drive'da ortak form klasörü**
  `yuent@yeditepe.edu.tr` hesabında **paylaşılan** bir klasör (`YUENT Web / Formlar`).
  Tüm Google Form'lar ve yanıt Sheets'leri burada duracak. En az 2 kişiye düzenleme yetkisi.
  Kişisel Drive'da form açılmayacak — açılırsa o kişi mezun olunca yanıtlar gider.
  *Bitti sayılır:* Klasör var, paylaşımlı, en az 2 düzenleyici.

- [ ] **F0-05** 🔐 **Bülten kararı ve hesabı**
  Seçenek A → aracı seç, kulüp e-postasıyla kaydol.
  Seçenek B → üniversite BT'den grup aç.
  *Bitti sayılır:* Karar `SITE_PLAN.md` §5'e yazıldı, hesap/grup hazır.

---

# Faz 1 — Proje iskeleti

- [ ] **F1-01** **Next.js projesini oluştur**
  `npx create-next-app@latest` — TypeScript, ESLint, Tailwind, App Router, `src/`, alias `@/*`.
  Kurulan sürümleri `package.json`'da **sabitle** (caret `^` kaldır).
  *Bitti sayılır:* `npm run dev` çalışıyor.

- [ ] **F1-02** **`.gitignore` ve `.env.example`**
  `.env*.local`, `.next`, `node_modules`, `.vercel` yoksayılır.
  `.env.example` yalnızca anahtar **adlarını** içerir.
  *Bitti sayılır:* `git status` hiçbir `.env.local` göstermiyor.

- [ ] **F1-03** 🔐 **İlk commit ve depoya bağlanma**
  `git init` + `git remote add origin` burada çalıştırılacak. **DUR** — remote'un
  F0-02'deki organizasyon deposu olduğunu doğrula.
  *Bitti sayılır:* İlk commit organizasyon deposunda görünüyor.

- [ ] **F1-04** 🔐 **Vercel'e ilk dağıtım**
  *Bitti sayılır:* `*.vercel.app` adresinde boş Next.js sayfası açılıyor.

- [ ] **F1-05** **Kod kalitesi araçları**
  Prettier + `prettier-plugin-tailwindcss`, `npm run lint`, `npm run typecheck`.
  *Bitti sayılır:* Her iki komut hatasız geçiyor.

- [ ] **F1-06** **shadcn/ui kurulumu**
  `npx shadcn@latest init` + `button`, `dialog`, `sheet`, `dropdown-menu`, `badge`, `input`.
  (Form bileşenlerine artık ihtiyacımız yok — formlar Google'da.)
  *Bitti sayılır:* Örnek buton render oluyor.

- [ ] **F1-07** **Klasör iskeletini kur** — `SITE_PLAN.md` §9'daki ağaç.

- [ ] **F1-08** **`README.md` yaz**
  Nasıl kurulur, çalıştırılır, hangi komutlar var, hangi env değişkeni gerekli.
  *Bitti sayılır:* Projeyi hiç görmemiş biri README ile ayağa kaldırabiliyor.

- [ ] **F1-09** **Güvenlik başlıkları (`next.config.ts`)**
  `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin`,
  `Permissions-Policy: camera=(), microphone=(), geolocation=()`.
  *Bitti sayılır:* `curl -I` ile görülüyor. *(İTÜ'de bunların hiçbiri yok.)*

---

# Faz 2 — Tasarım sistemi

- [ ] **F2-01** **Marka renklerini logodan çıkar**
  Ana renk, ikincil renk, nötr skalası. Tema kararı: koyu mu açık mı?
  *Bitti sayılır:* 8-10 hex'lik palet `SITE_PLAN.md` §8.2'ye yazıldı.

- [ ] **F2-02** **Yazı tiplerini hazırla**
  `fonts/ArchivoExpanded-{Regular,Bold}.ttf` → WOFF2. Archivo (normal genişlik)
  Regular/Medium/SemiBold Google Fonts'tan indirilip çevrilir. Hepsi `public/fonts/`.
  *Bitti sayılır:* 5 `.woff2`, toplam < 200 KB.

- [ ] **F2-03** **`next/font/local` ile bağla**
  **Google Fonts CDN linki kullanılmayacak.**
  *Bitti sayılır:* Ağ sekmesinde yalnızca kendi alan adımızdan woff2 istekleri var.
  *(İTÜ'nün B4 hatası: font tanımlı ama hiç yüklenmiyor — tekrarlanmayacak.)*

- [ ] **F2-04** **Token'ları `globals.css`'e yaz**
  *Bitti sayılır:* `grep -rE "#[0-9a-fA-F]{6}" src/components` boş dönüyor.

- [ ] **F2-05** **Tipografi ölçeği ve `prose` stilleri** — gövde satırı ~65 karakter.

- [ ] **F2-06** **`SiteHeader` + `MobileMenu`**
  İki açılır menü, sağda "Bize Katıl", scroll'da arka plan bulanıklığı.
  *Bitti sayılır:* Klavye ile gezilebiliyor, `Esc` menüyü kapatıyor, klavye tuzağı yok.

- [ ] **F2-07** **`SiteFooter`**
  İletişim, kısayollar, sosyal hesaplar, bülten formu (Faz 6'da bağlanacak), hukuki linkler.
  Veriler `content/site.json`'dan gelir.
  *Bitti sayılır:* Tüm sayfalarda aynı ve tek kaynaktan besleniyor.

- [ ] **F2-08** **`Container`, `Section`, `PageHeader` ilkelleri**
  *Bitti sayılır:* İki farklı sayfada aynı dikey ritim.

---

# Faz 3 — İçerik katmanı

- [ ] **F3-01** **`content/` ağacını oluştur ve şemaları yaz**
  `SITE_PLAN.md` §7 + zod şemaları (`src/lib/content.ts` içinde).
  *Bitti sayılır:* Bozuk içerik dosyası derlemeyi hata ile durduruyor.

- [ ] **F3-02** **Tipli içerik okuyucuları**
  `getSite()`, `getAnasayfa()`, `getDonemler()`, `getDonem()`, `getEtkinlikler()`,
  `getEtkinlik()`, `getEgitimler()`, `getBlogYazilari()`, `getAlbumler()`.
  *Bitti sayılır:* Tipli veri dönüyor, `any` yok.

- [ ] **F3-03** **Wix'teki metinleri taşı**
  Hakkımızda metni, misyon, vizyon, alıntılar, iletişim bilgileri, 4 dönemin ekip
  listeleri, 7 etkinliğin başlık ve açıklamaları. HTML varlıkları (`&uuml;` vb.)
  düzgün Türkçe karaktere çevrilecek.
  *Bitti sayılır:* Wix'teki hiçbir metin kaybolmadı.

- [ ] **F3-04** **Görselleri topla ve optimize et**
  Ekip fotoğrafları, etkinlik kapakları, galeri arşivi, logo, sponsorluk PDF'leri.
  Wix medya kütüphanesinden indirilecek. **Stok fotoğraf yok** — görseli olmayan
  etkinlik tipografik kartla temsil edilir.
  *Bitti sayılır:* Hiçbir görsel Wix'ten sıcak bağlantı (hotlink) değil.

- [ ] **F3-05** **MDX kurulumu** — `@next/mdx` + `remark-gfm`, özel bileşenler.

- [ ] **F3-06** **Keystatic kurulumu (yerel mod)**
  `keystatic.config.ts` — her koleksiyon için Türkçe etiketli alan tanımları.
  **`site.json` içindeki form URL'leri de düzenlenebilir alan olacak.**
  *Bitti sayılır:* `/keystatic` açılıyor, düzenleme `content/` dosyasını değiştiriyor.

- [ ] **F3-07** 🔐 **Keystatic GitHub modu**
  Kulüp organizasyonu altında bir GitHub App oluşturulacak. **DUR** — organizasyon
  yetkisi ister. Ayrı bir servis değildir, GitHub'ın parçasıdır.
  *Bitti sayılır:* Kod bilmeyen biri tarayıcıdan içerik düzenleyip kaydedebiliyor.

---

# Faz 4 — Sayfalar

> Ortak kabul kriteri: JS kapalıyken içerik okunabiliyor · tek `<h1>` · görsellerde `alt` ·
> mobilde yatay kaydırma yok.

- [ ] **F4-01** **`/` Ana sayfa** — hero → misyon/vizyon → öne çıkan etkinlikler →
  yaklaşan etkinlikler → alıntı → sayılarla biz → "Bize Katıl" CTA.

- [ ] **F4-02** **`/hakkimizda`**

- [ ] **F4-03** **`/ekibimiz`** — güncel dönem, gruplara ayrılmış kartlar.

- [ ] **F4-04** **`/ekibimiz/[donem]`** — dönem seçici + arşiv, `generateStaticParams`.
  *Bitti sayılır:* 2020-2021'e kadar tüm dönemler açılıyor.

- [ ] **F4-05** **`/etkinlikler`** — kategori filtresi + arama, filtre URL'ye yazılır.

- [ ] **F4-06** **`/etkinlikler/[slug]`** — detay + kayıt CTA'sı (Faz 5'te bağlanacak).
  *Bitti sayılır:* 7 etkinliğin her biri kendi adresinde açılıyor.
  *(YTÜ'nün en iyi yaptığı iş buydu — her etkinliğe ayrı URL.)*

- [ ] **F4-07** **`/egitimler`**

- [ ] **F4-08** **`/galeri`** — albüm grid + lightbox, etkinliğe göre filtre.
  `next/image`, sayfa başına en fazla 2 `priority`, gerisi lazy.
  *(YTÜ'nün B5 hatası: 14 görsele birden `priority` — tekrarlanmayacak.)*

- [ ] **F4-09** **`/blog` + `/blog/[slug]`**

- [ ] **F4-10** **`/sponsorluk`** — paketler + PDF indirme kartları
  (YES'23 Sponsorluk Detay Dosyası, Tanıtım Dosyası).

- [ ] **F4-11** **`/iletisim`** — bilgiler + harita gömüsü + form CTA'sı.

- [ ] **F4-12** **`/katil`** — üyeliğin ne getirdiğini anlatan sayfa + form CTA'sı.

- [ ] **F4-13** **`/basvuru`** — koordinatör başvurusu: departmanlar, süreç, takvim + form CTA'sı.

- [ ] **F4-14** **`/oneri`** + hukuki sayfalar (`/kvkk`, `/gizlilik`, `/kullanim-kosullari`).
  KVKK metni **form toplamaya başlamadan önce** yayında olmalı.

- [ ] **F4-15** **`not-found.tsx` ve `error.tsx`**
  *Bitti sayılır:* Olmayan adres gerçek **HTTP 404** döndürüyor.
  *(İTÜ'de 404 yerine 200 dönüyor.)*

---

# Faz 5 — Formlar (Google Forms)

> Veritabanı, API ucu, kimlik doğrulama ve yönetim paneli **yok**. Bu fazın tamamı
> Google Forms hazırlamak ve siteye doğru bağlamaktan ibaret.

- [ ] **F5-01** 🔐 **5 Google Form'u oluştur**
  Hepsi F0-04'teki **paylaşılan** klasörde, kişisel Drive'da değil.

  | Form | Alanlar |
  |---|---|
  | İletişim | Ad, Soyad, E-posta, Konu, Mesaj, KVKK onayı |
  | Üyelik (Bize Katıl) | Ad Soyad, E-posta, Telefon, Öğrenci No, Bölüm, Sınıf, İlgi alanları, Neden katılmak istiyorsun, KVKK |
  | Koordinatör Başvurusu | + Departman 1. ve 2. tercih, Motivasyon, Deneyim, **CV yükleme**, KVKK |
  | İstek ve Öneri | Kategori, Mesaj, (opsiyonel) İletişim — anonim seçeneği |
  | Etkinlik Kayıt (şablon) | Ad Soyad, E-posta, Telefon, Üniversite, Bölüm, Sınıf, KVKK. Her etkinlik için kopyalanır |

  *Bitti sayılır:* 5 form da paylaşılan klasörde, her birinin yanıt Sheets'i açık.

- [ ] **F5-02** **Form ayarlarını yapılandır**
  Her formda: yanıt bildirimi e-postası açık, onay mesajı Türkçe yazılmış,
  KVKK sorusu **zorunlu** ve aydınlatma metnine bağlantı içeriyor.
  Koordinatör formunda dosya yükleme sınırı (PDF, max 10 MB).
  *Bitti sayılır:* Test gönderimi yapıldı, bildirim maili kulüp adresine düştü.

- [ ] **F5-03** **Form URL'lerini `content/site.json`'a yaz**
  Kod içine URL gömülmeyecek — tek kaynaktan okunacak.
  *Bitti sayılır:* Bir formun adresi değiştiğinde tek satır güncellemek yetiyor.

- [ ] **F5-04** **`FormCta` bileşenini yaz**
  Başlık, kimin için, ne kadar sürer, son tarih, "Formu Doldur" butonu.
  Buton `target="_blank" rel="noopener noreferrer"` ile açılır.
  URL yoksa buton yerine gerekçe gösterilir — **asla çalışmayan buton render edilmez.**
  *Bitti sayılır:* `site.json`'dan URL silinince sayfa çökmüyor, bilgi mesajı çıkıyor.

- [ ] **F5-05** **Form CTA'larını sayfalara bağla**
  `/iletisim`, `/katil`, `/basvuru`, `/oneri`.
  *Bitti sayılır:* Dört butonun dördü de doğru forma gidiyor (elle tıklanarak test edildi).

- [ ] **F5-06** **Etkinlik kayıt bağlantısı**
  `/etkinlikler/[slug]` sayfasındaki "Kayıt Ol" butonu içerik dosyasındaki
  `kayitFormUrl`'e gider. URL yoksa `kayitKapanisMetni` gösterilir
  ("Kontenjan doldu" / "Kayıtlar 12 Kasım'da açılıyor").
  *Bitti sayılır:* Kayıt açık ve kapalı iki etkinlikte de doğru davranış.

- [ ] **F5-07** **Form envanteri belgesi**
  `DEVRETME.md`'ye tablo: hangi form hangi sayfada, Sheets bağlantısı, kim erişebiliyor.
  *Bitti sayılır:* Tablo dolduruldu.

---

# Faz 6 — Bülten

- [ ] **F6-01** **Footer bülten formunu bağla**
  Seçenek A → `POST /api/bulten` küçük bir route handler, aracın API'sine iletir
  (tek env değişkeni, veritabanı yok).
  Seçenek B → doğrudan grubun kayıt sayfasına bağlantı, **API ucu bile yok.**
  *Bitti sayılır:* Test adresi listeye düşüyor.

- [ ] **F6-02** **Onay ve çıkış akışı**
  Çift onay (double opt-in) açık; her mailin altında çalışan çıkış bağlantısı.
  *Bitti sayılır:* Çıkış linki tıklanınca adres bir daha mail almıyor.

- [ ] **F6-03** 🔐 **Wix abone listesini aktar**
  Wix → Contacts / Subscribers → CSV dışa aktar → yeni araca içe aktar.
  **Bu liste geri kazanılamaz.** İlk kampanyada "Wix sitemizden abone olmuştunuz"
  notu ve çıkış linki konur.
  *Bitti sayılır:* Abone sayısı Wix'teki sayıyla eşleşiyor.

- [ ] **F6-04** **Kampanya gönderimini ekibe göster**
  Tanıtım/marketing sorumlusuna kampanya hazırlama ve gönderme adım adım gösterilir.
  *Bitti sayılır:* Ekipten biri gözetimsiz bir test kampanyası gönderebiliyor.

---

# Faz 7 — SEO, performans, erişilebilirlik

- [ ] **F7-01** **Sayfa bazlı metadata** — her sayfada özgün `title` + `description`.

- [ ] **F7-02** **Open Graph ve Twitter kartları**
  `og:image` **mutlak URL**, 1200×630, `og:url`, `og:locale: tr_TR`.
  *Bitti sayılır:* WhatsApp ve LinkedIn önizlemesi görsel gösteriyor.
  *(İTÜ'de `og:image` göreli olduğu için önizleme kırık.)*

- [ ] **F7-03** **Dinamik OG görselleri** — etkinlik sayfaları için `opengraph-image.tsx`.

- [ ] **F7-04** **JSON-LD**
  `Organization` + `WebSite`, etkinliklerde `Event`.
  **Tüm alanlar `content/` dosyalarından türetilir, elle yazılmaz.**
  *Bitti sayılır:* Rich Results Test hatasız; kuruluş yılı sitedeki metinle aynı.
  *(YTÜ'nün B2 hatası: JSON-LD 2014, sayfa 2015 diyor.)*

- [ ] **F7-05** **`sitemap.ts` ve `robots.ts`**
  *Bitti sayılır:* `/sitemap.xml` gerçek XML döndürüyor.
  *(İTÜ'de bu adres HTML döndürüyor — sitemap yok.)*

- [ ] **F7-06** **Kanonik adres disiplini**
  `www` var mı yok mu — **bir** biçim seçilir, diğeri **308** ile yönlendirilir.
  `canonical`, `og:url`, sitemap ve JSON-LD'de hep aynı biçim.
  *Bitti sayılır:* Canonical adres yönlendirme olmadan 200 dönüyor.
  *(YTÜ'nün B3 hatası: canonical yönlendirilen adresi gösteriyor.)*

- [ ] **F7-07** **Görsel ve font performansı**
  Tüm görseller `next/image`, `sizes` tanımlı, sayfa başına en fazla 2 `priority`.
  *Bitti sayılır:* Lighthouse mobil Performance ≥ 90.

- [ ] **F7-08** **Erişilebilirlik geçişi**
  Klavye gezinimi, görünür odak halkaları, AA kontrast, `prefers-reduced-motion`.
  *Bitti sayılır:* Lighthouse Accessibility ≥ 95, axe kritik hata yok.

- [ ] **F7-09** **`site.webmanifest` ve ikonlar**
  `name` ve `short_name` **dolu**, tema rengi siteyle uyumlu, maskable ikon.
  *Bitti sayılır:* Telefona eklendiğinde doğru ad ve ikon görünüyor.
  *(YTÜ'nün B4 hatası: manifest adı boş, tema rengi siteyle zıt.)*

---

# Faz 8 — Yayına alma ve devir

- [ ] **F8-01** **Vercel Analytics + Speed Insights** — tek satır, ayrı hesap yok.
  *Bitti sayılır:* Panelde ziyaret verisi görünüyor. *(İki referans sitede de ölçüm yok.)*

- [ ] **F8-02** 🔐 **Alan adını Vercel'e yönlendir**
  Wix isim sunucularından (`ns12/ns13.wixdns.net`) çıkış. **Kesinti riski var** —
  hafta içi mesai saatinde, duyuru yaparak, Wix sitesi hâlâ ayaktayken yapılır.
  Geri dönüş planı yazılı olacak.
  ⚠️ Yeditepe'nin maili Google Workspace'te ve `yuent.co`'nun MX kaydı yok —
  yani DNS değişimi **e-postayı etkilemiyor.** Yine de kayıtlar önce not edilir.
  *Bitti sayılır:* `yuent.co` yeni siteyi gösteriyor.

- [ ] **F8-03** 🔐 **Wix'ten veri çıkarma — iptalden ÖNCE (bloke edici)**
  1. Bülten abone listesi (F6-03'te yapıldıysa ✓)
  2. Wix Contacts'taki mevcut form gönderileri → CSV
  3. Medya kütüphanesi (görseller + PDF'ler)
  4. Sayfa metinlerinin kopyası
  *Bitti sayılır:* Yedek klasörü kulüp Drive'ında, en az 2 kişide erişim.
  **Bu görev bitmeden Wix aboneliği iptal edilmez.**

- [ ] **F8-04** **Wix aboneliğini iptal et** — yalnızca F8-02 ve F8-03 bittikten sonra.

- [ ] **F8-05** **`DEVRETME.md`'yi doldur**
  Tüm hesaplar, sahipler, yenileme tarihleri, form envanteri.

- [ ] **F8-06** **Ekip eğitimi**
  Keystatic'ten içerik ekleme, Google Sheets'ten başvuru okuma, bülten gönderme.
  1 sayfalık görsel rehber yazılır.
  *Bitti sayılır:* Ekipten biri gözetimsiz bir etkinlik ekleyebiliyor.

- [ ] **F8-07** **Google Search Console** — 🔐 kulüp Google hesabıyla, sitemap gönderimi.

- [ ] **F8-08** **Yayın sonrası kontrol listesi**
  Lighthouse (mobil + masaüstü) · tüm form butonlarının canlıda testi ·
  sosyal önizleme testi · 404 kontrolü · gerçek telefonda test.

---

# Faz 9 — Opsiyonel modüller 🔒

> Faz 8 bitmeden hiçbiri açılmaz.

### Kapsam dışı — kullanılmadığı teyit edildi (17.08.2026)
❌ Randevu/takvim · ❌ Sepet, ödeme, teşekkür sayfası · ❌ Cüzdan · ❌ Abonelikler ·
❌ Şans çarkı · ❌ Üye girişi · ❌ Canlı sohbet

Sonuç: ödeme sağlayıcısı hesabı yok, sitede kullanıcı girişi yok.

### 9-A · İngilizce sürüm
`/en` altında ikinci dil. Altyapı Faz 3'te hazır.
**Açılma şartı:** Çeviri metinlerinin hazır olması. Yarım çeviri, çeviri olmamasından kötüdür.

### 9-B · Kendi form altyapımız
Ancak Google Forms gerçekten yetersiz kalırsa. **Bedeli:** veritabanı + e-posta servisi
+ yönetim paneli = devredilecek listeye +2 hesap ve kalıcı bakım yükü.
**Açılma şartı:** Somut bir ihtiyaç (ör. sitede canlı kontenjan sayacı zorunlu hâle gelmesi).

### 9-C · Podcast / video arşivi
Spotify ve YouTube gömüleri yeterli; ayrı modül gerekmiyor.

---

## Değişiklik kaydı

| Tarih | Ne değişti |
|---|---|
| 17.08.2026 | Plan oluşturuldu. 86 görev, 10 faz. |
| 17.08.2026 | Kullanılmayan Wix modülleri (randevu, sepet, ödeme, cüzdan, abonelik, şans çarkı) kapsam dışı; bülten + toplu kampanya plana girdi. 89 görev. |
| 17.08.2026 | Plan seçimleri netleşti: GitHub **Free** yeterli ve repo **public** olacak (Free planda korumalı dal yalnızca public repo'larda çalışıyor). Vercel'de **Hobby** kullanılacak — "Team/Pro" ücretlidir, önceki sürümdeki "Vercel Team — ücretsiz" ifadesi hatalıydı. |
| 17.08.2026 | **v2 — sadeleştirme.** Tüm formlar Google Forms'a taşındı. Supabase, Resend, yönetim paneli, kimlik doğrulama ve 8 API ucu kaldırıldı. Referans sitelerin (İTÜ 5, YTÜ 3 servis) altına inildi. **72 görev, 3 yeni devredilecek servis.** |
