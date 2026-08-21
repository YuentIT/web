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
Tarih          : 21.08.2026 — seans sonu
Aktif faz      : Faz 4 — Sayfalar (**Faz 1, 2 ve 3 bitti.** 15 görevin 7'si bitti)
Son biten      : Ekip fotoğrafları — 77 kişinin 77'sinde fotoğraf var.
                 Mevcut sayfalarda içerik eksiği pratikte kalmadı.

╔═══════════════════════════════════════════════════════════════════════════╗
║  YARIN BURADAN DEVAM ET                                                   ║
╚═══════════════════════════════════════════════════════════════════════════╝

  Kod tarafında hiçbir şey Mustafa'yı beklemiyor. Üçü de metin gelmeden
  iskeletiyle yazılabilir, önerilen sıra:

    1. F4-12  /katil     — `FormCta` hazır; form adresi F5-03'te girilince
                           buton kendiliğinden açılır. Header'daki "Bize Katıl"
                           ve footer buraya gidiyor, **şu an 404 veriyor.**
    2. F4-13  /basvuru   — footer'da "Koordinatör Başvurusu", **404.**
    3. F4-15  not-found.tsx + error.tsx — olmayan adres gerçek HTTP 404
                           dönmeli (İTÜ'de 200 dönüyormuş, o hataya düşme).

  Sonra: F4-10 /sponsorluk (giriş metni yazılı, yalnızca onay bekliyor),
  F4-14 hukuki sayfalar (⚠️ KVKK **Faz 5'in tamamını kilitliyor**),
  F4-08 /galeri (görsel bekliyor), F4-07 ve F4-09 (önce ne olacaklarına
  karar verilmeli).

  Mustafa'dan bekleyen tek içerik: **etkinlik metinlerinin yeni konsepte göre
  gözden geçirilmesi.** 9 etkinlik Wix'ten birebir taşınmış hâlde; yenilenirse
  kart hover'ı ve /etkinlikler/[slug] düzeni turuyla birlikte ele alınacak.

  ⚠️ Doğrulanmamış tek şey: ekip fotoğraflarının **doğru kişiyle eşleştiği**.
  Eşleştirme Wix kartlarındaki isim metnine göre yapıldı ve sayılar tuttu,
  ama Mustafa yüzleri gözüyle geçirmedi. Yanlış eşleşme bildirirse tek tek
  düzeltilecek.

──────────────────────────── 21.08.2026 SEANSI ────────────────────────────

  · **/galeri GERİ ALINDI.** 20.08'de başlanan 3B polaroid küresi tasarımı ve
    yazılan kod tamamen silindi. `/galeri` yeniden 404; header ve footer'daki
    bağlantılar zaten o hâldeydi, dokunulmadı. Geriye yalnızca **Caveat font
    tercihi** bırakıldı (gerekçesi F4-08'in altında). Yeniden başlanırsa çıkış
    noktası F4-08'deki özgün tarif: düz ızgara + lightbox.

  · **Faz 3 kapandı.** F3-03 ve F3-04 bitti. /hakkimizda'daki dört değer
    Mustafa'nın metniyle değişti (İnovasyon · Gelişim · Liderlik · Sinerji).

  · **Ana sayfa metinleri onaylandı**, `anasayfa.json`da taslak kalmadı.
    Hero başlığı artık sabit "İzlemekle Kalma," + dönen satır
    [Sahneye Çık → Yön Ver → Öncü Ol → İz Bırak], ~1,7 sn arayla.
    Şemada `hero.vurgu` kalktı, `hero.donenKelimeler` geldi.

  · **`motion@13.1.1` kuruldu** — SITE_PLAN §4'teki "ilk gerçek ihtiyaçta
    kurulur" maddesi işledi. İki kullanıcısı var, ikisi de CSS'in yapamadığı
    iş: `counting-number.tsx` (ana sayfa sayacı) ve `text-loop.tsx` (hero).
    "Hareketin tamamı saf CSS" kuralı hâlâ geçerli; paket geldi diye başka
    yere serpilmiyor.

  · **Etkinlikler 4'ten 10'a çıktı.** F3-03'teki "Wix'te 4 etkinlik var" notu
    yanlışmış — 9 varmış, beşi atlanmış. Taşındı, üstüne Sosyal Sorumluluk
    Projeleri eklendi. 10'unun da kapak görseli ve ayrı sayfası var.
    Ana sayfa seçkisi 4'ten 5'e çıktı; tek kalan kart sona değil **başa**
    alındı ve 460 px'e yükseltildi.

  · **Ekip fotoğrafları tamam** — 77/77. Wix'ten 800x1000 olarak yeniden
    indirildi (verilen kopyalar 210x220 idi).

  ⚠️ **GÖRSEL TESLİMİNDE TEKRARLANAN HATA:** bu seansta gelen görsellerin
  neredeyse tamamı `.jpg` uzantılıydı ama içerikleri JPEG değildi — AVIF ve
  HEIC. HEIC olanı hiçbir tarayıcı göstermiyor ve `sharp` bile açamıyor;
  `next/image` o dosyada patlar. **Yeni görsel gelince önce ilk 3 bayta bak:
  `ff d8 ff` değilse JPEG değildir.** Türkçe karakterli ve büyük harfli dosya
  adları da ASCII'ye çevrilmeli — Vercel Linux'ta derliyor.

ONAY BEKLEYEN TEK METİN:
  · `sponsorluk.json → giris` — yazıldı, onay bekliyor. Sayfası (F4-10) henüz
    yazılmadığı için canlıda görünmüyor.

İNCELEME — 20.08.2026, Mustafa sayfaları baştan geçiyor. İşlenen geri bildirim:
  · Footer: tanım "liderlik ve girişimcilik" sırasına döndü, telefon düzeltildi
    (536 945 39 44), kısayollar iki sütuna indi — Keşfet (hakkımızda, ekibimiz,
    etkinlikler, galeri) ve Katıl ve Destekle (bize katıl, koordinatör başvurusu,
    sponsorluk, iletişim). Bülten, konum ve hukuki şerit olduğu gibi kaldı.
  · Header: açılır menüler tamamen kalktı. Etkinlikler tek sayfa olacağı için
    alt menüsü yok; Ekibimiz'e tıklayınca doğrudan güncel dönem açılıyor,
    arşive o sayfadaki dönem seçicisinden gidiliyor.
  · Ekip sayfaları: "bu dönem N kişilik ekiple çalışıyor" cümlesi kaldırıldı.
    Yönetim kurulu üyeleri artık dengeli satırlara bölünüyor (5 → 3+2, 6 → 3+3,
    7 → 4+3) ve her satır ortalanıyor; koordinatörler 4'erli satırlar hâlinde,
    artan son satır ortalı. Koordinatörlerdeki departman başlıkları kalktı,
    liste ada göre alfabetik (Türkçe sıralama).
  · Ana sayfa ve /hakkimizda: bu turda değişiklik istenmedi.
  · Etkinlikler: **filtre ve arama iptal** (F4-05'in plandaki tanımı değişti).
    Sayfa, ana sayfadakiyle aynı bento diziliminde tüm etkinlikleri gösteriyor;
    kartlar kendi sayfalarına gidiyor. Ana sayfa artık seçki basıyor.

Canlı          : https://web-yuent.vercel.app
Depo           : github.com/YuentIT/web (public, main korumalı ✓)
Kod durumu     : Next 16.3.1 · React 19.2.8 · Tailwind 4.3.3 · TS 5.9.3
                 shadcn/ui **Base UI** tabanı · MDX · zod içerik doğrulama
                 build ✓  typecheck ✓  lint ✓  format:check ✓

GÖRSEL YÖN DEĞİŞTİ (19.08.2026) — ayrıntı SITE_PLAN §4 ve §8.2:
  Editoryal brutalist. Aksan safran #D9A441 → asit sarısı #E8FE55; birincil
  buton beyaz yerine asit. Hareketin tamamı saf CSS, `motion` kurulmadı.
  Ortak atmosfer bileşenleri: src/components/atmosfer/ (el feneri, ızgara
  katmanı, ışık huzmeleri, kaydırma ipucu).

Açılan rotalar : /  /hakkimizda  /ekibimiz  /ekibimiz/[donem]
                 /etkinlikler  /etkinlikler/[slug] (4 etkinliğin dördü de)
                 /iletisim
Hâlâ 404 veren rotalar (Faz 4 boyunca açılacak):
  /egitimler /galeri /blog /sponsorluk /katil /basvuru
  /oneri /kvkk /gizlilik /kullanim-kosullari
  Header ve footer bağlantıları hazır, hedefleri yazıldıkça açılacak.
  ⚠️ 20.08 menü sadeleştirmesinden sonra /egitimler, /blog ve /oneri'ye sitede
     hiçbir yerden bağlantı kalmadı. Sayfalar yazılacaksa bir giriş noktası da
     belirlenmeli. Etkinliklerde artık kategori filtresi olmadığı için
     "eğitimler /etkinlikler içinde bir kategori olur" seçeneği de kapandı —
     eğitimler yazılacaksa kendi giriş noktasını gerektiriyor.

MUSTAFA'DAN BEKLENENLER — 21.08.2026'da tazelendi. Hiçbiri mevcut sayfaları
bozmuyor, hepsi eksik içerik. Öncelik sırasıyla:

  1. ETKİNLİK METİNLERİNİN YENİ KONSEPTE GÖRE GÖZDEN GEÇİRİLMESİ — 9 etkinliğin
     metni Wix'ten birebir taşınmış hâlde (5'i 21.08'de taşındı). Kulüp yeni
     konsept hazırlıyordu; metinler yenilenecekse hover ve detay düzeni turuyla
     (aşağıdaki "SONRADAN YENİLENECEK") birlikte ele alınmalı.

  2. GALERİ GÖRSELLERİ → `public/gorseller/galeri/` (düz liste, klasörsüz).
     F4-08'in engeli. Her karenin Türkçe alt metni de gerekiyor.

  ✅ EKİP FOTOĞRAFLARI TAMAMLANDI (21.08.2026) — 77 kişinin 77'sinde fotoğraf
     var, baş harf kartına düşen kimse kalmadı. Kaynak: Wix'teki dönem
     sayfaları. Mustafa siteden indirdiği kopyaları vermişti ama hepsi
     **210x220 px** idi (Wix'in önizleme boyutu) ve kart 256 px'te çizildiği
     için bulanık çıkardı. Bunun yerine Wix'in görsel URL'indeki boyut
     parametresi (`fill/w_...,h_...`) 800x1000'e çekilip orijinaller yeniden
     indirildi; kulübün kendi seçtiği kırpma (`/crop/`) korundu.
     Adlandırma: `public/gorseller/ekip/<donem>/<ad-soyad-slug>.jpg`, ASCII.
     Eşleştirme dosya adına göre değil, Wix kartındaki **isim metnine** göre
     yapıldı — dosya adları yalnızca ilk isimdi ve birden çok kişiye uyuyordu.

  ✅ 21.08.2026'da kapananlar:
     · Ana sayfa metinleri (hero, dönen kelimeler, açıklama, katıl bölümü)
     · /hakkimizda "Değerlerimiz" — Mustafa'nın metniyle değişti
     · Sosyal Sorumluluk Projeleri — gerçek metin ve kapak görseli geldi,
       yer tutucu kalktı
     · **10 etkinliğin 10'unun da kapak görseli var** (6'sı 21.08'de eklendi)
     · Logonun SVG'si — vazgeçildi, PNG'lerle devam
     · 2025-2026 koordinatörleri ve 2023-2024 / 2024-2025 dönemleri — eklenmeyecek

  ⚠️ GÖRSEL TESLİMİNDE DİKKAT — 21.08.2026'da yaşandı: Mustafa'nın verdiği altı
  kapağın beşi `.jpg` uzantılıydı ama **içerikleri JPEG değildi** — dördü AVIF,
  biri HEIC (iPhone'dan aktarılmışlar). HEIC olanı hiçbir tarayıcı göstermiyor
  ve `sharp` bile açamıyordu; `next/image` optimizasyonu o dosyada patlardı.
  Altısı da gerçek JPEG'e çevrildi (HEIC olan Windows'un WIC çözücüsüyle açılıp
  1200 px'e küçültüldü: 1781 KB → 208 KB). Ayrıca Türkçe karakterli iki dosya
  adı (`ihtiyaç-haritası.jpg`, `liderlik-kampı.jpg`) ASCII'ye çevrildi: Vercel
  Linux'ta derliyor ve dosya adlarında büyük/küçük harf ile Unicode
  normalizasyonu Windows'takinden farklı davranabiliyor.
  **Yeni görsel gelince önce formatını doğrula:** ilk 12 bayta bak, `ffd8ff`
  değilse JPEG değildir.

SONRADAN YENİLENECEK") birlikte ele alınmalı.

  4. GALERİ GÖRSELLERİ → `public/gorseller/galeri/` (düz liste, klasörsüz).
     F4-08'in engeli, F3-04'ün değil. Her karenin Türkçe alt metni de gerekiyor.

  5. EKİP FOTOĞRAFLARI — 77 kişi, şu an baş harf kartı. Karar zaten "baş harf"
     olduğu için bu bir eksik değil, isteğe bağlı iyileştirme.

  ✅ Kapananlar: ana sayfa metinleri (21.08 onaylandı) · /hakkimizda
     "Değerlerimiz" (21.08'de Mustafa'nın metniyle değişti) · logonun SVG'si
     (vazgeçildi, PNG'lerle devam)

SONRADAN YENİLENECEK — Mustafa'nın 20.08'deki notu:
  · **Kart hover'ında çıkan ayrıntılar** (kategori · başlık · kısa açıklama ·
    ilk iki özellik · "Detay →"). Hem ana sayfada hem /etkinlikler'de aynı
    bileşenden geliyor: src/components/icerik/etkinlik-izgarasi.tsx. Dizilim
    ve kırpma beğenildi, **yenilenecek olan hover'ın içeriği ve sunumu.**
  · **Etkinlik sayfalarının kendisi** (/etkinlikler/[slug]). Şu anki düzen
    çalışıyor ve doğrulandı ama kalıcı tasarım değil.
  İkisi de F4-05/F4-06'yı geri açmıyor: sayfalar bitti sayılıyor, bu bir
  sonraki görsel tur. Yeni etkinlik metinleri geldiğinde birlikte ele alınacak.

KAPANMIŞ KONULAR — tekrar açılmayacak:
  · **2025-2026 dönemine koordinatör eklenmeyecek** (Mustafa, 21.08.2026).
    Güncel dönem sekiz kişilik yönetim kurulundan ibaret ve bu hâliyle onaylandı.
    Arşiv dönemlerinde 10-23 koordinatör olması eksiklik göstergesi değil; karar
    `content/donemler/2025-2026.json` içine `_not` olarak da yazıldı.
  · **Logonun SVG'si** — 21.08.2026'da vazgeçildi, PNG'lerle devam ediliyor.
  · **2023-2024 ve 2024-2025 dönemleri arşive eklenmeyecek** (Mustafa,
    21.08.2026). O yıllara ait kayıt yok; Wix'te de yoktu, taşımada kaybolmadı.
    Arşiv 2022-2023'ten 2025-2026'ya atlıyor ve **bu boşluk kasıtlı.** Dönem
    seçicide iki yıllık atlama görünce eksik sanma.

BİLEREK ÇÖZÜLMEDEN BIRAKILANLAR (acil değil):
  · Ana sayfadaki seçki şu an dört etkinliğin dördünü de içeriyor, yani
    /etkinlikler ile aynı kartları gösteriyor. Bilinçli geçici durum: yeni
    etkinlikler eklendikçe ana sayfa dörtte kalacak, liste sayfası büyüyecek.
  · Ana sayfadaki `sayilarlaBiz` (4/9/4) ile /hakkimizda'daki `istatistikler`
    (2000+/35+/150+/100+) farklı şeyleri sayıyor. Mustafa "önemli değil" dedi,
    yan yana görülünce tuhaf gelirse ana sayfadakiler değiştirilebilir.
  · /hakkimizda'daki hikâye bölümü akış tarifinde yoktu ama duruyor: kulübün
    kendi anlatısı sitede başka hiçbir yerde yok. Mustafa "kalsın" dedi.
```


### Mustafa'nın yapması gerekenler

- [x] GitHub organizasyonu → **`YuentIT`** açıldı, `ASTENYAN` Owner (admin)
- [x] Depo → **`YuentIT/web`**, public, ilk commit atıldı
- [x] **Vercel hesabı aç** — Hobby, GitHub App `YuentIT`'e kuruldu, ilk dağıtım çıktı
- [x] **Vercel hesabı kulüp adına** — doğrulandı (18.08.2026)
- [x] **`main` dalını koru** (F1-10) — ruleset `main protection` aktif (18.08.2026)
- [ ] **Logonun SVG sürümünü bul** — elimizde yalnızca PNG var. Ayrıntı F2-06'da.
- [ ] Kulüp Google hesabında **paylaşılan Drive klasörü** (F0-04) — Faz 5'e kadar vakit var
- [ ] **Bülten kararı** (F0-05): Seçenek A (bülten aracı, +1 hesap) veya
      Seçenek B (Google Groups, 0 hesap). Faz 6'ya kadar ertelenebilir.
      B'yi düşünüyorsan üniversite BT'ye "Workspace'te grup açabilir miyiz" diye sor
- [ ] `yuent.co` alan adı kimin adına kayıtlı, yenileme tarihi ne? (Wix → Domains)
- [ ] Kulüp GitHub hesabı `YUENT-Yeditepe` için **2FA aç, kurtarma kodlarını kasaya koy**
      ve ikinci e-posta olarak `yuent@yeditepe.edu.tr` ekle

---

## İlerleme özeti

| Faz | Başlık | Görev | Durum |
|---|---|---|---|
| 0 | Hesaplar ve kararlar | 5 | 🟨 3/5 |
| 1 | Proje iskeleti | 10 | ✅ 10/10 |
| 2 | Tasarım sistemi | 8 | ✅ 8/8 |
| 3 | İçerik katmanı | 5 | 🟨 3/5 |
| 4 | Sayfalar | 15 | 🟨 1/15 |
| 5 | Formlar (Google Forms) | 7 | ⬜ 0/7 |
| 6 | Bülten | 4 | ⬜ 0/4 |
| 7 | SEO, performans, erişilebilirlik | 9 | ⬜ 0/9 |
| 8 | Yayına alma ve devir | 8 | ⬜ 0/8 |
| 9 | Opsiyonel modüller | — | 🔒 kapalı |
| | **Toplam** | **71** | **25/71** |

> v1'de 89 görev vardı. Veritabanı, e-posta servisi ve yönetim paneli kapsam dışına
> çıkınca 17 görev düştü ve devredilecek servis sayısı 5'ten 3'e indi.

---

# Faz 0 — Hesaplar ve kararlar

> Bu fazın tamamı 🔐. Amaç: proje ilk commit'ten önce devredilebilir olsun.

- [x] **F0-01** 🔐 **GitHub organizasyonu aç — Free plan yeterli** ✅ `YuentIT`
  Ad önerisi: `yuent` veya `lgk-yeditepe`. Birincil e-posta `yuent@yeditepe.edu.tr`.
  En az 2 kişi **Owner** (web sorumlusu + yönetim kurulu başkanı).
  Free plan bize fazlasıyla yetiyor: derlemeyi Vercel yaptığı için CI/CD dakikası
  neredeyse hiç tüketilmiyor, paket depolama kullanılmıyor. Dependabot bedava geliyor
  ve site dönemler arası bakımsız kalacağı için en değerli özellik o.
  *Bitti sayılır:* Organizasyon var, 2 owner tanımlı, kişisel hesap owner değil.

- [x] **F0-02** 🔐 **Depoyu organizasyon altında oluştur — public olarak** ✅ `YuentIT/web`
  Depo adı: `web`. **Public.** Sebebi: Free planda korumalı dal kuralları yalnızca
  public repo'larda çalışıyor ve public repo'larda Actions dakikası sınırsız.
  ⚠️ Public olduğu için repoda **hiçbir gizli anahtar bulunmayacak** — tek olası anahtar
  bülten aracınınki ve o yalnızca Vercel ortam değişkeninde durur.
  Yerel klasör (`C:\Users\musta\github\lgk`) buna bağlanacak.
  *Bitti sayılır:* `git remote -v` organizasyon URL'sini gösteriyor (kişisel değil);
  `main` dalı korumalı, doğrudan push kapalı.

- [x] **F0-03** 🔐 **Vercel hesabı aç ve GitHub org'a bağla** ✅ kulüp hesabı `yuent`, dağıtım çalışıyor
  **Hobby planı** (ücretsiz). Vercel'in "Team/Pro" planı kişi başı aylık ücretlidir —
  **açmayın.** Hobby ticari olmayan kullanım içindir, öğrenci kulübü buna girer.
  Hesap bir öğrencinin adına değil, `yuent@yeditepe.edu.tr` ile **kulüp adına** açılır;
  parola kasada durur. Vercel GitHub App'i organizasyona kurulur.
  Bir engel çıkarsa yedek plan: **Cloudflare Pages** (ücretsiz, takım kullanımına izin verir).
  *Bitti sayılır:* Proje org deposundan dağıtım yapıyor ve hesap kulüp adına.
  **Durum (18.08.2026):** Vercel GitHub App `YuentIT` organizasyonuna kuruldu
  (`repository_selection: selected`), proje import edildi, üretim dağıtımı `57e9307`
  commit'inden başarıyla çıktı. Vercel scope adı `yuent`. Hesabın kulüp adına
  açıldığı Mustafa tarafından 18.08.2026'da doğrulandı.

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

- [x] **F1-01** **Next.js projesini oluştur** ✅ Next 16.3.1 / React 19.2.8 / Tailwind 4.3.3 / TS 5.9.3, sürümler sabitlendi
  `npx create-next-app@latest` — TypeScript, ESLint, Tailwind, App Router, `src/`, alias `@/*`.
  Kurulan sürümleri `package.json`'da **sabitle** (caret `^` kaldır).
  *Bitti sayılır:* `npm run dev` çalışıyor.

- [x] **F1-02** **`.gitignore` ve `.env.example`** ✅ araştırma klasörleri de yoksayıldı (public repo)
  `.env*.local`, `.next`, `node_modules`, `.vercel` yoksayılır.
  `.env.example` yalnızca anahtar **adlarını** içerir.
  *Bitti sayılır:* `git status` hiçbir `.env.local` göstermiyor.

- [x] **F1-03** 🔐 **İlk commit ve depoya bağlanma** ✅ commit `253893c`
  `git init` + `git remote add origin` burada çalıştırılacak. **DUR** — remote'un
  F0-02'deki organizasyon deposu olduğunu doğrula.
  *Bitti sayılır:* İlk commit organizasyon deposunda görünüyor.

- [x] **F1-04** 🔐 **Vercel'e ilk dağıtım** ✅ `web-yuent.vercel.app` → HTTP 200
  *Bitti sayılır:* `*.vercel.app` adresinde boş Next.js sayfası açılıyor.
  **Not — Deployment Protection:** Hobby planında yalnızca "Standard Protection" (açık)
  veya kapalı seçeneği var; "Only Preview Deployments" Pro'ya ait. Standard Protection
  açıkken üretim dahil tüm `.vercel.app` adresleri Vercel SSO'ya yönlendiriyordu, bu
  yüzden **kapatıldı.** Risk yok: Vercel `.vercel.app` adreslerine kendiliğinden
  `X-Robots-Tag: noindex` ekliyor, repo zaten public ve sitede gizli anahtar yok.

- [x] **F1-05** **Kod kalitesi araçları** ✅ prettier 3.9.6 + plugin 0.8.1
  Prettier + `prettier-plugin-tailwindcss`, `npm run lint`, `npm run typecheck`.
  *Bitti sayılır:* Her iki komut hatasız geçiyor.
  Eklenen komutlar: `npm run format` (yazar), `npm run format:check` (denetler).
  Tailwind 4'te plugin `tailwindConfig` değil **`tailwindStylesheet`** bekliyor —
  `.prettierrc.json` içinde `./src/app/globals.css`'e bakıyor.
  **Markdown Prettier'ın dışında** (`.prettierignore`): planlama belgeleri elle
  bakılıyor, biçimlendirme her düzenlemede gürültülü diff üretiyordu.

- [x] **F1-06** **shadcn/ui kurulumu** ✅ 6 bileşen `src/components/ui/` altında
  `npx shadcn@latest init` + `button`, `dialog`, `sheet`, `dropdown-menu`, `badge`, `input`.
  (Form bileşenlerine artık ihtiyacımız yok — formlar Google'da.)
  *Bitti sayılır:* Örnek buton render oluyor.
  **Taban: Base UI** (`shadcn` CLI 4.18.0, `-b base -p nova`, `style: "base-nova"`,
  `@base-ui/react` 1.7.0). Önce Radix ile kuruldu, sonra Mustafa'nın kararıyla Base
  UI'a geçildi: Base UI shadcn'in yeni varsayılanı ve projenin gittiği yön.
  **Bedeli bilinerek kabul edildi:** bugün örnek, blog yazısı ve topluluk cevabı
  Radix'te çok daha fazla; Base UI'da takılınca çoğu zaman doğrudan resmî dokümana
  bakmak gerekecek. `radix-ui` paketi kaldırıldı.
  **API farkı — devralan kişi bunu bilmeli:** Radix'in `asChild` prop'u Base UI'da
  **yok**, yerine `render` var. Yani `<Button asChild><a/></Button>` değil,
  `<Button render={<a />}>`. İnternette bulunan shadcn örneklerinin çoğu `asChild`
  kullanır ve buraya kopyalanınca derleme hatası verir.
  `globals.css` artık `tw-animate-css` ve `shadcn/tailwind.css`'i içe aktarıyor —
  bu yüzden ikisi de `devDependencies` değil **`dependencies`** altında durmalı.
  Gelen paketlerin `^` işaretleri F1-01 gereği kaldırıldı.

- [x] **F1-07** **Klasör iskeletini kur** — `SITE_PLAN.md` §9'daki ağaç. ✅
  Kurulan: `content/{donemler,etkinlikler,egitimler,blog,galeri,hukuki}`,
  `public/{fonts,logo,dosyalar,gorseller}`,
  `src/components/{ui,layout,icerik,form,seo}`, `src/lib`, `src/types`, `src/styles`.
  Boş klasörler `.gitkeep` ile taşınıyor (git boş dizin tutmaz).
  **`globals.css` §9'a uyularak `src/app/` → `src/styles/` taşındı**; `layout.tsx`
  artık `@/styles/globals.css` içe aktarıyor, `.prettierrc.json` ve `components.json`
  aynı yolu gösteriyor.
  **§9'daki `page.tsx` dosyaları bilerek oluşturulmadı:** Next boş bir `page.tsx`'i
  rota sayar ve varsayılan dışa aktarım olmadan derleme kırılır. O dosyalar sahibi
  olan görevlerde (Faz 4) yazılacak.
  Yan etki: `lang="en"` → `lang="tr"` düzeltildi ve Next demo ana sayfası geçici bir
  yer tutucuyla değiştirildi (F4-01 tamamen değiştirecek).

- [x] **F1-08** **`README.md` yaz** ✅
  Nasıl kurulur, çalıştırılır, hangi komutlar var, hangi env değişkeni gerekli.
  *Bitti sayılır:* Projeyi hiç görmemiş biri README ile ayağa kaldırabiliyor.

- [x] **F1-09** **Güvenlik başlıkları (`next.config.ts`)** ✅ canlıda `curl -I` ile doğrulandı
  `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin`,
  `Permissions-Policy: camera=(), microphone=(), geolocation=()`.
  *Bitti sayılır:* `curl -I` ile görülüyor. *(İTÜ'de bunların hiçbiri yok.)*
  Ayrıca `poweredByHeader: false` — Next sürümünü sunucu imzası olarak sızdırmıyoruz.
  **CSP bilerek yok:** gerçek bir politika ancak gömülü içerikler (harita, YouTube,
  Spotify) belli olunca yazılabilir. Faz 7'ye bırakıldı.

- [x] **F1-10** 🔐 **`main` dalını koru** ✅ ruleset `main protection` aktif (18.08.2026)
  F0-02'den ayrıldı, çünkü GitHub var olmayan bir dalı koruyamıyor — `main`
  ancak ilk push'ta (F1-03) oluştu.

  **Kurulan (API ile doğrulandı):** branch ruleset, `enforcement: active`,
  hedef `~DEFAULT_BRANCH`, kurallar `deletion` + `non_fast_forward`,
  **bypass listesi boş**. `branches/main` artık `protected: true`.

  **İki kademeli kuruluyor:**

  1. **Şimdi — sürtünmesiz koruma:** force push ve dal silme yasak.
     Kaza eseri geçmiş silinmesini engeller, günlük çalışmayı hiç yavaşlatmaz.
  2. **Site yayına girince (Faz 8 sonrası) — PR zorunluluğu:** `main`'e doğrudan
     push kapatılır, değişiklikler pull request ile gelir.
     Şimdiden açılmıyor çünkü kurulum aşamasında tek geliştirici var ve
     inceleyecek ikinci kişi yok; her küçük değişiklik için PR açmak
     ilerlemeyi gereksiz yavaşlatır.

  *Bitti sayılır:* Kademe 1 aktif; kademe 2 için `CODE_PLAN` F8-08'e hatırlatma eklendi.

---

# Faz 2 — Tasarım sistemi

- [x] **F2-01** **Marka renklerini logodan çıkar** ✅ 14 token `SITE_PLAN.md` §8.2'de
  Ana renk, ikincil renk, nötr skalası. Tema kararı: koyu mu açık mı?
  *Bitti sayılır:* 8-10 hex'lik palet `SITE_PLAN.md` §8.2'ye yazıldı.
  **Görev yeniden yorumlandı:** Mustafa'nın kararıyla logo renkli kullanılmayacak,
  **beyaz kelime-logo** olarak duracak ve site koyu/minimal olacak. Dolayısıyla renk
  logodan *çıkarılmadı*, logoyu taşıyacak şekilde tasarlandı.
  Marka rengi beyazın kendisi (birincil buton ters kontrast), tek aksan safran/pirinç
  `#D9A441`, zemin nötr siyah değil maviye çekilmiş mürekkep `#0A0D12`.
  Kontrast oranları AA'yı geçiyor (F7-08 için önden kontrol edildi).

- [x] **F2-02** **Yazı tiplerini hazırla** ✅ 5 `.woff2`, **toplam 77 KB**
  `fonts/ArchivoExpanded-{Regular,Bold}.ttf` → WOFF2. Archivo (normal genişlik)
  Regular/Medium/SemiBold Google Fonts'tan indirilip çevrilir. Hepsi `public/fonts/`.
  *Bitti sayılır:* 5 `.woff2`, toplam < 200 KB.
  **Archivo Expanded ayrı bir aile değil:** Google Fonts'ta Archivo yalnızca
  `Archivo[wdth,wght].ttf` değişken fontu olarak var; `wdth` ekseni 62→125 ve
  Expanded o eksenin **125** ucu. Elimizdeki statik Expanded TTF'ler de aynı
  kaynağın v2.001 sürümü (834 glif, `usWidthClass 8`) — yani karışık kaynak yok.
  Düz genişlikteki üç kesit `wdth=100` üzerinde `fontTools.varLib.instancer` ile
  örneklendi; Expanded ikilisi elimizdeki TTF'lerden geldi.
  **Altküme:** Latin-1 + Latin Extended-A + tipografik noktalama + para birimi
  (₺ dahil). Fonetik ve ek Latin blokları atıldı → 834 glif 419'a indi.
  Türkçe kapsam tek tek doğrulandı: ğĞıİşŞçÇöÖüÜâÂîÎûÛ ve ₺€—""… eksiksiz.
  Üretim betiği tek seferlik; yeniden gerekirse `SITE_PLAN` §8.1'deki not yeterli.

- [x] **F2-03** **`next/font/local` ile bağla** ✅ derleme çıktısında doğrulandı
  **Google Fonts CDN linki kullanılmayacak.**
  *Bitti sayılır:* Ağ sekmesinde yalnızca kendi alan adımızdan woff2 istekleri var.
  *(İTÜ'nün B4 hatası: font tanımlı ama hiç yüklenmiyor — tekrarlanmayacak.)*
  Tanımlar `src/lib/fonts.ts`'te; `layout.tsx` yalnızca `.variable` sınıflarını
  <html>'e geçiriyor. Derlenmiş HTML'de 5 woff2 `/_next/static/media/` altından
  `rel="preload"` ile geliyor ve **dış alan adına tek istek yok** (grep ile
  doğrulandı: `fonts.googleapis.com` / `fonts.gstatic.com` sıfır eşleşme).
  Geist ve Geist Mono kaldırıldı.
  **Not (F7-07 için):** Şu an beş kesitin beşi birden preload ediliyor (77 KB).
  Kabul edilebilir ama ilk boyamada hepsi kullanılmıyor; performans geçişinde
  Medium/SemiBold için `preload: false` değerlendirilmeli.
  **Not:** Kaynak woff2'ler `public/fonts/` altında duruyor (§9'a uygun) ve
  `next/font` bunları hash'leyerek `_next/static/media`ya kopyalıyor. Yani aynı
  dosyalar iki adresten de servis ediliyor; kullanılan hash'li olan. 77 KB'lik
  bu tekrar önemsiz, ama dağıtımı inceleyen biri şaşırmasın diye yazıldı.

- [x] **F2-04** **Token'ları `globals.css`'e yaz** ✅
  *Bitti sayılır:* `grep -rE "#[0-9a-fA-F]{6}" src/components` boş dönüyor.

  **İsim çakışması — bilmeden üstüne yazmayın.** shadcn'in `--accent` token'ı
  *marka aksanı değil, hover yüzeyi* demek. §8.2'deki safranı oraya koymak
  sitedeki her hover'ı altına çevirirdi. Bu yüzden safran ayrı ad altında:
  **`--brand-accent`** (Tailwind'de `text-brand-accent`, `bg-brand-accent`).
  shadcn'in `--accent`i koyu yüzey rengi olarak bırakıldı. `--ring` safran —
  odak halkaları böylece markayla aynı renkte.

  **Site tek temalı.** Açık tema yok; `:root` ile `.dark` aynı değerleri taşıyor.
  `.dark` yine de gerekli, çünkü shadcn bileşenlerinin içinde `dark:` varyantları
  var ve onlar ancak o sınıf varken çalışıyor — sınıf `layout.tsx`'te <html>
  üzerinde sabit. `color-scheme: dark` de eklendi ki kaydırma çubuğu ve tarayıcı
  denetimleri koyu render edilsin.

  Değerler kasıtlı hex, `SITE_PLAN` §8.2 ile birebir aynı — iki dosya grep'le
  eşleşiyor. Başlıklar (`h1,h2,h3`) `font-heading` ile geniş kesite bağlandı.

- [x] **F2-05** **Tipografi ölçeği ve `prose` stilleri** — gövde satırı ~65 karakter. ✅
  Ölçek `globals.css`'te `@theme` altında: `text-display`, `text-title`,
  `text-section`, `text-subsection`, `text-lead`, `text-eyebrow`. Büyük kademeler
  `clamp()` ile akışkan — mobil için ayrı kırılım noktası gerekmiyor. Harf aralığı
  boyla ters orantılı, çünkü Archivo Expanded zaten geniş ve büyük puntoda
  sıkılmazsa başlık dağılıyor.
  **`@tailwindcss/typography` kasıtlı olarak kurulmadı:** eklenti açık tema için
  ayarlanmış onlarca token getiriyor ve tek temalı bir sitede çoğunu geri ezmek
  gerekiyor. `.prose` elle yazıldı, paletle birebir uyumlu, satır uzunluğu `65ch`.
  Faz 3'teki MDX içeriği bunun içine girecek.

- [x] **F2-06** **`SiteHeader` + `MobileMenu`** ✅
  İki açılır menü, sağda "Bize Katıl", scroll'da arka plan bulanıklığı.
  *Bitti sayılır:* Klavye ile gezilebiliyor, `Esc` menüyü kapatıyor, klavye tuzağı yok.
  Odak tuzağı ve `Esc` işini Base UI'ın Dialog/Menu primitifleri üstleniyor —
  elle klavye yönetimi yazılmadı. `<a href="#icerik">İçeriğe geç</a> ` atlama
  bağlantısı `layout.tsx`'e eklendi.
  Menü tek kaynaktan: `src/lib/navigation.ts` (§6.1'in birebir karşılığı).
  Mobilde açılır menüler düz liste olarak veriliyor — 9 bağlantı tek ekrana
  sığdığı için iki kademeli gezinme gereksiz. Menü, bağlantıya basılınca olay
  yakalamayla kapanıyor; rota değişimini effect'le izleyip `setState` çağırmak
  React'in `set-state-in-effect` kuralına takılıyor.

  ⚠️ **Bilinen eksik — F2-07 bunu kapatmalı.** Base UI açılır menü içeriğini
  ancak menü açılınca basıyor. Dolayısıyla `/etkinlikler`, `/egitimler`,
  `/sponsorluk` ve dönem sayfaları **ilk HTML'de yok**: JS kapalıyken header'dan
  erişilemiyorlar ve tarayıcı botu onları header'da göremiyor. Aynısı mobil menü
  için de geçerli (Sheet de portal). Çözüm footer: `SiteFooter` tüm rotaları düz
  `<a>` olarak listelemeli. `sitemap.xml` (F7-05) botları kurtarır ama JS'siz
  kullanıcıyı kurtarmaz — footer şart.

  **Logo kısıtları — header yazılmadan önce okunmalı.** Elimizdeki
  `public/logo/logo_white.png` (1054×477, saf `#FFFFFF`, şeffaf zemin) üç parçalı
  dikey bir kilit: LG monogramı (satır 0–262), `YEDİTEPE ÜNİVERSİTESİ` (302–375),
  `Liderlik ve Girişimcilik Kulübü` (410–476).

  1. **Güvenli alan yok.** İçerik dört kenara da değiyor (bbox = tüm görsel).
     Header'da, favicon'da ve OG görselinde boşluğu biz vereceğiz; dosyayı
     olduğu gibi kenara yaslamak sıkışık görünür.
  2. **Dikey kilit header'a girmez.** 32–48 px yüksekliğinde bir header'da üçüncü
     satır ~9 px'e düşer, okunmaz. Bu yüzden monogram ayrı kırpıldı:
     `logo_white_mark.png`, tam **262×262 kare**. Header'da bu kullanılacak,
     yanına metinle kulüp adı yazılacak.
  3. **SVG yok.** PNG 1054 px; header için fazlasıyla yeterli ama CSS ile
     renklendirilemiyor ve sponsorluk PDF'i gibi büyük kullanımlarda yetmez.
     Mustafa'dan SVG isteniyor; gelene kadar PNG ile ilerlenebilir.

- [x] **F2-07** **`SiteFooter`** ✅ — F3-01 bitince engeli kalktı
  İletişim, kısayollar, sosyal hesaplar, bülten formu (Faz 6'da bağlanacak), hukuki linkler.
  Veriler `content/site.json`'dan gelir.
  *Bitti sayılır:* Tüm sayfalarda aynı ve tek kaynaktan besleniyor.
  **Neden bekliyor:** İçeriği `content/site.json`'dan gelmesi gerekiyor, o dosya
  ise F3-01'in işi. Şimdi sabit verilerle yazmak aynı bileşeni iki kez yazmak olur.
  **Ek şart (F2-06'dan devraldı):** Footer, açılır menülerin içindeki rotaları da
  düz `<a>` olarak listelemeli — JS'siz erişilebilirlik ve taranabilirlik buna bağlı.

- [x] **F2-08** **`Container`, `Section`, `PageHeader` ilkelleri** ✅
  *Bitti sayılır:* İki farklı sayfada aynı dikey ritim.
  `src/components/layout/` altında. `Container` üç genişlik (`narrow` uzun metin,
  `default`, `wide` ızgara/header), `Section` üç dikey ritim (`tight`/`default`/
  `loose`) ve kendi Container'ını içerir (`bare` ile kapatılabilir).
  `PageHeader` üst başlık → h1 → özet sırasını dayatıyor; **sayfa başına tek h1**
  kuralı (Faz 4 ortak kriteri) bu bileşen kullanıldığı sürece kendiliğinden sağlanıyor.

---

# Faz 3 — İçerik katmanı

- [x] **F3-01** **`content/` ağacını oluştur ve şemaları yaz** ✅ zod 4.4.3
  `SITE_PLAN.md` §7 + zod şemaları (`src/lib/content.ts` içinde).
  *Bitti sayılır:* Bozuk içerik dosyası derlemeyi hata ile durduruyor.
  **Kanıtlandı:** `content/site.json`'a bozuk e-posta yazılıp `siteUrl` silinince
  `next build` durdu ve şunu yazdı:
  `İçerik dosyası şemaya uymuyor: content/site.json` + `• eposta: …` + `• siteUrl: …`
  **Şemalar `src/lib/schemas.ts`'te, okuyucular `content.ts`'te** — plan ikisini
  aynı dosyaya koyuyordu, ayrıldı: `content.ts` Node'un `fs`'ini içe aktarıyor,
  şemalar ise ileride istemci tarafında da gerekebilir; birleşik dosya `fs`'i
  istemci paketine sürüklerdi.
  **Şemaya konan iki iş kuralı** (§7'de yazmıyordu, sessiz hatayı önlüyor):
  · `durum: "kayit-acik"` ise `kayitFormUrl` zorunlu — yoksa ziyaretçi çalışmayan
    bir kayıt butonu görürdü.
  · `tarih` veya `tarihMetni`'nden biri dolu olmalı — tarihsiz etkinlik listede
    sıralanamıyor.
  Form URL'leri ve sosyal hesaplar bilerek **opsiyonel**: form açılmadan sitenin
  derlenememesi kabul edilemez (F5-04 zaten boş URL'de buton yerine gerekçe gösteriyor).

- [x] **F3-02** **Tipli içerik okuyucuları** ✅ `src/lib/content.ts`
  `getSite()`, `getAnasayfa()`, `getDonemler()`, `getDonem()`, `getEtkinlikler()`,
  `getEtkinlik()`, `getEgitimler()`, `getBlogYazilari()`, ~~`getAlbumler()`~~
  → **`getGaleri()`** (albüm modeli kaldırıldı, bkz. F4-08).
  *Bitti sayılır:* Tipli veri dönüyor, `any` yok. (grep ile doğrulandı)
  Ek olarak `getHakkimizda()`, `getSponsorluk()`, `getGuncelDonem()`,
  `getEgitim()`, `getBlogYazisi()`, `getAlbum()`, `getHukukiMetin()`.
  **Tipler elle yazılmadı**, `src/types/index.ts` şemalardan `z.infer` ile
  türetiyor — şema ile tip ayrı düşemesin diye.
  **Okuyucular şemanın göremediği tutarlılığı da denetliyor:**
  · `anasayfa.json → oneCikanEtkinlikler` içindeki her slug gerçekten var mı
  · `donemler/*.json` slug'ı dosya adıyla aynı mı (yoksa `/ekibimiz/[donem]` 404)
  · tam olarak bir dönem `guncel: true` mi
  · albümün bağlandığı etkinlik var mı (yoksa galeri filtresi boş seçenek gösterir)
  Eksik **klasör** boş dizi döner (koleksiyonlar Faz 3 boyunca dolacak), ama eksik
  **tekil dosya** ve bozuk dosya hata verir.
  Blog taslakları yalnızca `NODE_ENV=development`'ta listeleniyor.
  Geçici ana sayfa `getSite()`'ı çağırıyor — zincir böylece gerçekten kurulu,
  aksi hâlde okuyucular yazılmış ama hiç çalışmamış olurdu.

- [x] **F3-03** **Wix'teki metinleri taşı** ✅ **21.08.2026**
  Hakkımızda metni, misyon, vizyon, alıntılar, iletişim bilgileri, 4 dönemin ekip
  listeleri, etkinliklerin başlık ve açıklamaları. HTML varlıkları (`&uuml;` vb.)
  düzgün Türkçe karaktere çevrildi.
  *Bitti sayılır:* Wix'teki hiçbir metin kaybolmadı. ✅

  **Yöntem:** Wix içeriği istemci tarafında render ediliyor, ham HTML'de yok.
  Sayfalar tarayıcıda gerçekten açılıp okundu.

  ✅ Taşınanlar
  · `hakkimizda.json` — hikaye, misyon, vizyon, Emil Motycka alıntısı
  · `site.json` — e-posta, iki telefon, adres, Instagram/LinkedIn/X/Facebook
  · `donemler/*.json` — 4 dönem, **77 kişi**
  · `etkinlikler/*.mdx` — ~~4 etkinlik~~ → **21.08.2026'da 9'a çıktı, aşağıya bak**

  ❌ **BU NOT YANLIŞTI — düzeltildi 21.08.2026.** Burada şöyle yazıyordu:
  *"Plan 7 etkinlik diyordu, Wix'te 4 var. Sayfalama dahil kontrol edildi; başka
  kayıt yok. Plandaki rakam hatalıymış."* Gerçekte Wix'te **9 etkinlik** var;
  hepsi `/etkinliklerimiz` altında blog yazısı olarak duruyor ve ilk taşımada
  beşi atlanmış. Plandaki 7 rakamı hatalı değil, **eksikti.**

  Sonradan taşınan beşi (Wix metinleri birebir alındı, yeniden yazılmadı):
  How to Change the Game · YET: Yeditepe Entrepreneur Talks · LGK Liderlik Kampı
  · İhtiyaç Haritası · Sosyal Etkinlikler.

  Kampın Wix'teki adı "Olimpos Liderlik Kampı"ydı; Mustafa **"LGK Liderlik
  Kampı"** olarak değiştirdi (21.08.2026), gövde metnindeki geçiş de buna
  uyduruldu — yani "Olimpos" adı sitede artık geçmiyor.

  Ayrıca **Sosyal Sorumluluk Projeleri** eklendi: Wix'te karşılığı yok, tamamen
  yeni. Şu an `[YER TUTUCU]` metinleriyle **canlıda görünüyor** — Mustafa böyle
  istedi, gerçek metni ve kapak görselini sonra verecek.

  ✅ **`degerler` Mustafa'nın kendi metniyle değişti (21.08.2026).** Önceki dört
  değer (Cesaret · Açıklık · Gelişim · Etki) hikâye ve misyondan türetilmiş
  taslaktı; yerlerini **İnovasyon · Gelişim · Liderlik · Sinerji** aldı. İkonlar
  sırasıyla `lightbulb`, `trending-up`, `compass`, `heart-handshake` — dördü de
  `degerIkonu` enum'unda zaten vardı, şema değişmedi.

  🔲 **Devreden: Wix kaynağı OLMAYAN iki metin.** Bunlar F3-03'ü açık tutmuyor
  (görevin kabul kriteri "Wix'ten metin kaybolmadı"), ama yayın öncesi Mustafa'nın
  onayından geçmeli — ikisi de dosyalarında `_todo` ile işaretli:
  · `anasayfa.json → hero` ve `katil` — Wix ana sayfasında karşılığı yoktu,
    `hakkimizda.json`daki hikâye ve misyondan türetilerek yazıldı. **Taslak.**
  · `sponsorluk.json → giris` — yazıldı, onay bekliyor.

- [x] **F3-04** **Görselleri topla ve optimize et** ✅ **21.08.2026**
  *Bitti sayılır:* Hiçbir görsel Wix'ten sıcak bağlantı (hotlink) değil. ✅

  ✅ `public/gorseller/etkinlikler/` — 4 kapak, toplam **864 KB**, hiçbiri hotlink değil.
  `yeditepe-entrepreneurship-summit` **3176 KB PNG → 312 KB JPEG**: alfa kanalı
  tamamen opaktı ve 50 bin renkli fotografik bir görseldi, PNG orada yanlış formattı.
  ✅ `public/logo/` — beyaz kilit + header için kırpılmış 262×262 monogram.
  ✅ `public/dosyalar/yuent-tanitim-dosyasi.pdf` — Mustafa gerçek dosya olduğunu
  doğruladı (21.08.2026). Sponsorluk detay dosyası siteye **konmuyor** (18.08 kararı).
  ✅ **Logo SVG'sinden vazgeçildi (21.08.2026).** Gelen dosya boş çıkmıştı; PNG'lerle
  devam ediliyor ve bu madde kapandı. Vektör gerçekten gerekirse F7-09'da
  (`site.webmanifest` ve ikonlar) yeniden gündeme gelir.
  ✅ `create-next-app`'ten kalma 5 kullanılmayan şablon SVG'si silindi
  (`next`, `vercel`, `file`, `globe`, `window`) — hiçbiri koda bağlı değildi ama
  canlıya gidiyordu.

  🔲 **Devredenler — ikisi de başka görevin işi, F3-04'ü bekletmiyor:**
  · **Ekip fotoğrafları** — karar verildi: baş harf kartı kullanılıyor (F4-03).
    Fotoğraf gelirse ayrı bir tur olur.
  · **Galeri arşivi** — galeri sayfası 21.08.2026'da geri alındı; görseller artık
    **F4-08'in** engeli.

- [x] **F3-05** **MDX kurulumu** — `@next/mdx` + `remark-gfm`, özel bileşenler. ✅
  `@next/mdx` 16.3.1 · `remark-gfm` 4.0.1 · `remark-frontmatter` 5.0.0

  **Üç tuzağa düşüldü ve üçü de çözüldü — devralan kişi bilsin:**

  1. **Eklentiler string olarak veriliyor, fonksiyon olarak değil.** Next 16
     varsayılan olarak Turbopack kullanıyor ve JavaScript fonksiyonları Rust
     tarafına geçirilemiyor. İnternetteki örneklerin çoğu `remarkPlugins:
     [remarkGfm]` yazıyor; o yazım burada derlemeyi kırar.
  2. **`@next/mdx` frontmatter bilmiyor.** `remark-frontmatter` olmadan
     dosyanın başındaki `---` bloğu yatay çizgi + düz metin sanılıyor ve
     sayfada *"baslik: … kategori: …"* diye görünüyor. Bilfiil görüldü.
     Frontmatter zaten gray-matter ile okunup zod'dan geçtiği için eklentiden
     ayrıca dışa aktarım istenmiyor; tek işi bloğu render dışında bırakmak.
  3. **Koleksiyon başına ayrı `import()` yazılamıyor.** Derleyici her şablon
     için bağlam modülü kuruyor ve **boş klasör için bunu yapamıyor** —
     `content/egitimler`, `blog`, `hukuki` boş olduğu için dörde bölünmüş hâli
     "module not found" veriyordu. Tek şablon (`content/${koleksiyon}/${slug}.mdx`)
     tek bağlam kuruyor ve sorun kalkıyor.

  `src/mdx-components.tsx` kasıtlı olarak **kısa**: başlık/paragraf/liste/tablo
  görünümü `.prose`'dan geliyor (F2-05), aynı stilleri burada tekrarlamak iki
  ayrı doğruluk kaynağı yaratırdı. Yalnızca `a` (dahili → `next/link`, dış →
  `target="_blank" rel="noopener noreferrer"`) ve `hr` ezildi.
  **`img` bilerek ezilmedi** — gerekçe dosyanın içinde yazılı; F7-07'de ele alınacak.
  `useMDXComponents()` Next 16'da **argüman almıyor**; eski imza kopyalanırsa tip hatası verir.

  *Doğrulama:* Geçici bir rotayla `hult-prize-campus` gövdesi render edildi.
  GFM tablosu, `~~üstü çizili~~`, otomatik bağlantı ve dış bağlantıdaki
  `target="_blank"` çıktıda tek tek görüldü; frontmatter sızmadığı doğrulandı.
  Rota sonra silindi.

- ❌ **F3-06** **Keystatic kurulumu (yerel mod)** — **KAPSAM DIŞI (18.08.2026)**
- ❌ **F3-07** 🔐 **Keystatic GitHub modu** — **KAPSAM DIŞI (18.08.2026)**

  **Gerekçe (Mustafa'nın tespiti):** Keystatic'in tek değeri, kod bilmeyen
  birinin **sık sık** içerik eklemesi. Bu sitede öyle bir ihtiyaç yok:
  etkinlikler yıllarca aynı kalıyor, ekip listesi yılda bir değişiyor, kayıt
  linki eklemek tek satırlık bir düzenleme.

  **Bedeli, faydasından büyüktü:**
  · Keystatic'in şeması zod şemalarımızdan üretilemiyor; ikisi **elle** senkron
    tutulacaktı. Biri unutulursa ya alan editörde görünmez ya da editörün
    kaydettiği veri zod tarafından sessizce atılır.
  · Organizasyon altında bir GitHub App + iki Vercel ortam değişkeni →
    devredilecek listeye bir kalem daha.
  · Planın ana ilkesi **"en az devir"**; Keystatic o ilkeye ters çalışıyordu.

  **Yerine ne var:** İçerik doğrudan GitHub web arayüzünden düzenleniyor —
  dosyaya tıkla, kalem simgesi, satırı değiştir, kaydet. Vercel değişikliği
  görüp kendiliğinden yayınlıyor. Yılda birkaç düzenleme için fazlasıyla yeterli.
  Bozuk bir düzenleme yapılırsa zod derlemede yakalıyor ve **hatalı içerik
  canlıya çıkmıyor** — yani güvenlik ağı Keystatic'siz de yerinde.
  `DEVRETME.md`'ye ekran görüntülü "içerik nasıl düzenlenir" bölümü yazılacak (F8-05).

  **Geri açılırsa:** Keystatic sonradan eklenebilir; içerik dosya biçimi
  değişmiyor. Ama açılma şartı somut bir ihtiyaç olmalı — "olsa iyi olur" değil.

---

# Faz 4 — Sayfalar

> Ortak kabul kriteri: JS kapalıyken içerik okunabiliyor · tek `<h1>` · görsellerde `alt` ·
> mobilde yatay kaydırma yok.

- [x] **F4-01** **`/` Ana sayfa** ✅ canlıda
  hero → misyon/vizyon → öne çıkan etkinlikler → ~~yaklaşan etkinlikler~~ →
  alıntı → sayılarla biz → "Bize Katıl" CTA.
  **"Yaklaşan etkinlikler" bölümü kaldırıldı:** sitede tarih yayınlanmıyor
  (18.08.2026 kararı), tarihsiz bir "yaklaşanlar" listesi öne çıkanların
  birebir kopyası olurdu.
  Tüm metin `content/` altından geliyor, sayfada gömülü içerik yok.
  Doğrulandı: tek `<h1>`, `alt` eksik görsel yok, üç kart da doğru adrese gidiyor.
  **Metinler taslak** — Mustafa revize edecek: hero başlığı/açıklaması,
  kapanış kutusu metni ve `sayilarlaBiz` rakamları.
  Yanında `EventCard` yazıldı (`/etkinlikler` de kullanacak): tarih ve kayıt
  durumu göstermiyor; kapak görseli yoksa **stok fotoğraf konmuyor**, başlığın
  baş harflerinden tipografik alan çiziliyor.

- [x] **F4-02** **`/hakkimizda`** ✅ canlıda
  Akış: tam ekran "Biz Kimiz" + "Dünyayı değiştiren eylemler" girişi → hikâye →
  misyon/vizyon → Emil Motycka alıntısı → roket ve dumandan doğan sayılar →
  değerlerimiz → ekibimiz ve katıl butonları.
  Roket bölümü kaydırmaya bağlı: tek bir `--yuent-roket` (0→1) değeri roketin
  konumunu, dumanın uzunluğunu ve sayıların açılma eşiklerini sürüyor. Roket
  ekranın bir ucundan girip diğerinden çıkıyor. `prefers-reduced-motion` ve
  JS'siz durumda sayılar açık geliyor — bilgi hareketin arkasına saklanmıyor.
  Değerlerimiz düzeni `itugirisim.org/about`tan; renkler bizim paletimizden.
  **Metinler taslak** — Mustafa revize edecek: dört değerin başlık ve
  açıklamaları (kulübün kendi hikâye/misyon metninden türetildi, uydurulmadı).
  **Not:** buradaki `istatistikler` (2000+ üye, 35+ yıllık etkinlik, 150+
  konuşmacı, 100+ sponsor) ana sayfadaki `sayilarlaBiz`den kasıtlı olarak ayrı;
  farklı şeyler sayıyorlar ve ayrı alanlarda duruyorlar (19.08.2026 kararı).
  Yanında paylaşılan bileşenler çıktı: `atmosfer/` (el feneri, ızgara katmanı,
  ışık huzmeleri, kaydırma ipucu) ve `icerik/alinti-bandi.tsx`. Ana sayfa da
  bunları kullanıyor.

- [x] **F4-03** **`/ekibimiz`** ✅ canlıda — güncel dönem, gruplara ayrılmış kartlar.

- [x] **F4-04** **`/ekibimiz/[donem]`** ✅ canlıda — dönem seçici + arşiv, `generateStaticParams`.
  *Bitti sayılır:* 2020-2021'e kadar tüm dönemler açılıyor. ✅ üçü de üretiliyor.

  **Uygulama notları (19.08.2026):** İki sayfa da `EkipListesi`yi kullanıyor.
  Güncel dönem `generateStaticParams`a **girmiyor** — kanonik adresi `/ekibimiz`;
  `/ekibimiz/2025-2026` elle yazılırsa 307 ile oraya yönlendiriliyor (denendi).
  Sekmeler Base UI `Tabs` üzerine kurulu, kayan gösterge `Tabs.Indicator`ın
  `--active-tab-left/width` değişkenlerinden. Paneller `keepMounted`, yanlarında
  bir `<noscript>` stili `hidden`ı geri alıyor: JS kapalıyken sekme çalışamadığı
  için iki liste alt alta okunuyor — kabul kriteri ancak böyle sağlanıyor.
  Fotoğraf yok (F3-04 açık): 77 kişinin hepsi baş harflerden tipografik kartla
  çiziliyor, stok fotoğraf konmadı. `fotograf` alanı dolunca kart değişmeden
  görsele geçiyor.

  **Ekip sayfası düzeni (Mustafa, 18.08.2026) — F4-03 ve F4-04 aynı düzeni kullanır:**

  Listenin üstünde **kaydırmalı bir geçiş tuşu** duruyor; iki sekme arasında gidip
  geliyor: **Yönetim Kurulu** ↔ **Koordinatörler**.

  ```
  Yönetim Kurulu                 Koordinatörler
  ┌───────────────┐              ┌────┬────┬────┬────┐
  │    BAŞKAN     │  tek başına  │    │    │    │    │  departmanlarına göre
  └───────────────┘              ├────┼────┼────┼────┤  normal ızgara
  ┌───────┐ ┌───────┐            │    │    │    │    │
  │ BŞK.  │ │ GENEL │  yan yana  └────┴────┴────┴────┘
  │ YRD.  │ │ SEKR. │
  └───────┘ └───────┘
  ┌────┬────┬────┬────┐
  │    │    │    │    │  diğer üyeler, koordinatörlerle aynı ızgara
  └────┴────┴────┴────┘
  ```

  Dizilim `gorev` metninden **çıkarılmıyor** — şemada açık alanlar var:
  `takim` (`yonetim-kurulu` | `koordinatorler`) sekmeyi, `rol`
  (`baskan` | `baskan-yardimcisi` | `genel-sekreter` | `uye`) yönetim kurulundaki
  yeri belirliyor. Şema tam olarak bir başkan, en fazla bir başkan yardımcısı ve
  en fazla bir genel sekreter olmasını zorunlu tutuyor.

  **2025-2026'da koordinatör yok ve bu kasıtlı** (Mustafa teyit etti, 18.08.2026):
  o dönem 8 kişilik yönetim kuruluyla çalışıyor. Dolayısıyla geçiş tuşu koşullu
  çizilmeli — bir dönemde koordinatör yoksa **tuş hiç görünmez**, sayfa doğrudan
  yönetim kurulunu gösterir. Boş sekmeye götüren bir tuş çizilmeyecek.
  Bu geçici bir veri eksikliği değil, kalıcı bir durum: kod her iki hâli de
  desteklemeli çünkü gelecek dönemler yeniden koordinatör alabilir.

- [x] **F4-05** **`/etkinlikler`** ✅ canlıda — ~~kategori filtresi + arama, filtre
  URL'ye yazılır~~ **iptal (20.08.2026).** Dört etkinlik ve üç kategoriyle filtre,
  sayfayı göstermesi gereken şeyin önüne geçen bir araca çeviriyordu. Sayfa artık
  ana sayfayla aynı bento diziliminde tüm etkinlikleri basıyor, kartlar kendi
  sayfalarına gidiyor. Liste anlamlı ölçüde büyürse karar yeniden açılabilir.

  Izgara `EtkinlikIzgarasi` olarak `components/icerik/` altında paylaşılıyor.
  Düzen artık sabit dörtlü bir desen değil, sayıdan türetiliyor: ikişerli
  satırlar 7/5 ve 5/7 dönüşümlü, tek kalan kart tam genişlikte. Böylece hiçbir
  etkinlik sayısında satır sonu boşluğu kalmıyor.

  **Ana sayfa daraldı:** artık `oneCikanEtkinlikler`i basıyor, tümünü değil —
  etkinlik listesi büyüyeceği için iki sayfa birbirinin kopyası olacaktı.
  Şemadaki üst sınır 3'ten 4'e çıkarıldı.

- [x] **F4-06** **`/etkinlikler/[slug]`** ✅ canlıda — detay + kayıt CTA'sı
  (Faz 5'te bağlanacak).
  *Bitti sayılır:* ~~7~~ **4** etkinliğin her biri kendi adresinde açılıyor.
  **Sayfa bilgilendirme amaçlı** (18.08.2026 kararı): tarih, yer ve kayıt durumu
  gösterilmiyor. `kayitLinki` doluysa tek bir "Kayıt Formu" butonu çiziliyor,
  boşsa hiçbir kayıt öğesi görünmüyor. Tarih dahil ayrıntılar formun içinde.
  *(YTÜ'nün en iyi yaptığı iş buydu — her etkinliğe ayrı URL.)*
  Dördü de `generateStaticParams` ile derleme anında üretiliyor; olmayan slug
  gerçek 404 dönüyor. Hiçbir etkinlikte `kayitLinki` dolu olmadığı için şu an
  sayfalarda kayıt öğesi görünmüyor — beklenen davranış.

- [ ] **F4-07** **`/egitimler`**

- [ ] **F4-08** **`/galeri`** — 🔻 **sadeleşti (18.08.2026):** albüm ve etkinlik
  filtresi **yok**. Galeri, kulüpten karışık kareler gösteren tek bir showroom.
  Düz ızgara + lightbox. `content/galeri/galeri.json` içinde src+alt listesi.
  `next/image`, sayfa başına en fazla 2 `priority`, gerisi lazy.
  *(YTÜ'nün B5 hatası: 14 görsele birden `priority` — tekrarlanmayacak.)*

  **El yazısı fontu seçildi: Caveat.** 20.08.2026'daki tasarım turundan geriye
  kalan tek karar bu; turun kendisi 21.08.2026'da geri alındı ve yazılan kod
  silindi. Font tercihi duruyor çünkü seçimi Türkçe glif testine dayanıyor ve
  yeniden yapılması gereksiz iş olur.

  Test edilen glifler `ğ Ğ ı İ ş Ş ç Ç ö Ö ü Ü`; ölçüm göz kararı değil,
  `fontTools` ile doğrudan `cmap` tablosundan. **Türkçesi eksik olduğu için
  elenenler:** Satisfy · Yuji Syuku · Rock Salt · Tangerine · Reenie Beanie ·
  Niconne · Sofia (ilk altısı `ğ Ğ İ ş Ş` taşımıyor, Sofia'da ayrıca `ı` da
  yok). Bu fontlarla yazılan bir başlıkta eksik harfler yedek fonta düşer ve
  tek satırda iki ayrı yazı tipi görünür.

  **Caveat'ın seçilme gerekçesi:** küçük puntoda (11–12 px) bağlı el yazısının
  okunabilmesi için ağırlığın 600'e çekilebilmesi gerekiyordu; kısa listedeki
  diğerleri (Dancing Script · Cedarville Cursive · Marck Script) tek ağırlıklı.

  **Repoda hazır duruyor:** `public/fonts/Caveat-Variable.woff2` (77 KB,
  değişken ağırlık 400–700, Latin-1 + Latin Ext-A altkümesi),
  `src/lib/fonts.ts → caveat`, `fonts/Caveat-OFL.txt` (lisans). Google Fonts
  CDN'i kullanılmıyor (F2-03 kuralı). **Kök düzene bilerek bağlanmadı** —
  kullanacak sayfa `caveat.variable`ı kendi kapsayıcısına vermeli, yoksa
  77 KB her sayfada ön yüklenir. ⚠️ `globals.css`'teki `--font-elyazisi`
  token'ı `@theme inline` içinde: ham CSS'ten `var(--font-elyazisi)` okumak
  **boş döner**, `--font-caveat` doğrudan okunmalı.

- [ ] **F4-09** **`/blog` + `/blog/[slug]`**

- [ ] **F4-10** **`/sponsorluk`** — 🔻 **sadeleşti (18.08.2026):** kulüp sponsorluk
  detay dosyasını **siteye asla koymuyor**. Sayfada yalnızca tanıtım metni ve
  **tanıtım dosyası** indirmesi olacak; sponsorluk paketleri iletişim üzerinden
  yürüyor. `sponsorluk.json → dosyalar` tek girdi taşıyacak.

- [x] **F4-11** **`/iletisim`** ✅ canlıda — bilgiler + harita gömüsü + ~~form CTA'sı~~.

  **İletişim formu YOK (20.08.2026, Mustafa'nın kararı).** Sayfada iki sütun
  var: solda ulaşma bilgileri, sağda gömülü harita. Ulaşma yolu e-posta,
  telefon ve sosyal hesaplar. ⚠️ **Faz 5'e etkisi aşağıda, F5-01'de.**

  **Harita gömülü.** Adres `maps.google.com/maps?q=…&output=embed` ile
  çiziliyor — **API anahtarı istemeyen** biçim; Google'ın resmî Embed API'si
  bir anahtar ve dolayısıyla devredilecek listeye bir hesap daha demek olurdu.
  `z` parametresi bilerek verilmiyor: elle bir yakınlaştırma yazıldığında
  işaretçi çerçevenin dışına kayıyordu, Google kendi seçtiğinde ortalanıyor.
  `loading="lazy"` + `title` (iframe'in erişilebilir adı yalnızca ondan gelir).
  ⚠️ **F7-06'da yazılacak CSP `frame-src`e `https://maps.google.com` istisnası
  içermeli**, yoksa harita canlıda boş çerçeve olarak çıkar.

  Adresin altındaki **"Yol tarifi al"** bağlantısı ayrıca duruyor: gömü sadece
  konumu gösteriyor, tarif için yine Maps'e geçmek gerekiyor ve telefonda o
  bağlantı doğrudan Haritalar uygulamasını açıyor.

  İçeriğin tamamı `content/site.json`'dan: e-posta (`mailto:`), iki telefon
  (`tel:`, görünen metin boşluklu kalıyor ama adres yalnızca rakam), adres ve
  sosyal hesaplar. Harita da aynı `adres` alanından besleniyor — ayrıca
  enlem/boylam tutulmuyor ki ikisi birbirinden ayrı düşmesin. Sayfada gömülü
  tek bir iletişim bilgisi yok.

  Yol üstünde footer'ın sosyal bloğu `layout/sosyal-baglantilar.tsx`'e çıkarıldı
  ve iki yer paylaşıyor; `etiketli` bayrağı footer'daki ikon-only sunumla
  /iletisim'deki adlı sunumu ayırıyor. **Yan düzeltme:** elimizdeki X dosyası
  X'in siyah rozeti (siyah kare + beyaz glif) ve koyu zemine karışıp görünmez
  oluyordu — footer'da da öyleydi. Koyu zemin için `invert` ediliyor. Saydam
  zeminli beyaz bir X dosyası gelirse çevirme kaldırılır.

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

- [ ] **F5-01** 🔐 **~~5~~ 4 Google Form'u oluştur**
  Hepsi F0-04'teki **paylaşılan** klasörde, kişisel Drive'da değil.

  ⚠️ **İletişim formu kapsam dışı (20.08.2026):** `/iletisim` sayfasında form
  yok, sağdaki alanı harita dolduruyor (F4-11). Ulaşma yolu e-posta, telefon
  ve sosyal hesaplar. Dolayısıyla bu form açılmayacak, `site.json → formlar`
  altındaki `iletisim` alanı boş kalacak ve F5-05 dört değil **üç** sayfa
  bağlayacak. Alan şemadan **silinmedi**: karar geri döner ve form istenirse
  `FormCta` zaten hazır, tek satır yeter.

  | Form | Alanlar |
  |---|---|
  | ~~İletişim~~ | ❌ kapsam dışı — sayfada form yok |
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

- [x] **F5-04** **`FormCta` bileşenini yaz** ✅ **F4-11'de öne çekildi (20.08.2026)**
  Başlık, ~~kimin için, ne kadar sürer, son tarih,~~ "Formu Doldur" butonu.
  Buton `target="_blank" rel="noopener noreferrer"` ile açılır.
  URL yoksa buton yerine gerekçe gösterilir — **asla çalışmayan buton render edilmez.**
  *Bitti sayılır:* `site.json`'dan URL silinince sayfa çökmüyor, bilgi mesajı çıkıyor.
  ✅ **Şu anki gerçek durumda doğrulandı:** `formlar` nesnesi henüz tamamen boş,
  yani `/iletisim` bugün butonu değil gerekçeyi gösteriyor. Formlar F5-01'de
  açılıp adresleri F5-03'te yazılınca butonlar kendiliğinden belirecek.

  Sırası Faz 5'ti ama `/iletisim`in çağrısı için yazılmıştı. **Aynı gün
  `/iletisim`den form kalktı** (F4-11), dolayısıyla bileşen şu an hiçbir
  sayfada kullanılmıyor — ilk kullanıcısı `/katil` (F4-12) olacak. Silinmedi:
  yazılmış, doğrulanmış ve üç sayfanın bekleyen ihtiyacı.
  `src/components/form/form-cta.tsx`.
  `kimlerIcin` / `süre` / `son tarih` alanları **yazılmadı** — `/iletisim`in
  ihtiyacı olmadı. `/katil` ya da `/basvuru` gerçekten isterse o zaman eklenir.

- [ ] **F5-05** **Form CTA'larını sayfalara bağla**
  ~~`/iletisim`,~~ `/katil`, `/basvuru`, `/oneri` — **üç sayfa** (20.08.2026:
  `/iletisim`de form yok, bkz. F4-11 ve F5-01).
  *Bitti sayılır:* ~~Dört~~ **Üç** butonun üçü de doğru forma gidiyor (elle tıklanarak test edildi).

- [ ] **F5-06** **Etkinlik kayıt bağlantısı** — 🔻 **kapsam küçüldü (18.08.2026)**
  `/etkinlikler/[slug]` sayfasındaki "Kayıt Ol" butonu içerik dosyasındaki
  `kayitLinki`'ne gider. Alan boşsa **hiçbir şey gösterilmiyor** — kapanış
  metni de yok, çünkü kulüp etkinliklerin çoğunda sitede kayıt almıyor.
  *Bitti sayılır:* Bağlantısı olan ve olmayan iki etkinlikte de doğru davranış.
  Etkinlik yaklaşınca Mustafa içerik dosyasına `kayitLinki` satırını elle
  ekliyor, bitince siliyor. Etkinlik başına ayrı form şablonu (F5-01'deki
  "Etkinlik Kayıt" satırı) hâlâ geçerli, yalnızca sitedeki gösterim sadeleşti.

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
  `Organization` + `WebSite`. **Etkinliklerde `Event` YOK:** schema.org `Event`
  türü `startDate` zorunlu tutuyor, biz ise sitede bilerek tarih yayınlamıyoruz
  (18.08.2026 kararı). Tarihsiz `Event` geçersiz yapılandırılmış veri olur ve
  Search Console'da hata verir. Etkinlik sayfaları düz `WebPage` olarak kalacak.
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
| 20.08.2026 | **`/iletisim` yeniden düzenlendi (aynı gün, inceleme sonrası).** Sağdaki `FormCta` kaldırıldı, yerine **gömülü harita** kondu; sol sütun (e-posta, telefonlar, adres + yol tarifi, sosyaller) olduğu gibi kaldı. **İletişim formu artık sitede yok:** ulaşma yolu e-posta, telefon ve sosyal hesaplar. Bunun Faz 5'e sonucu işlendi — F5-01 beş değil **dört** form açacak, F5-05 dört değil **üç** sayfa bağlayacak; `formlar.iletisim` alanı şemada duruyor ki karar geri dönerse tek satırla açılsın. Harita `output=embed` ile çiziliyor (API anahtarı istemeyen biçim — anahtarlı Embed API devredilecek listeye bir hesap daha eklerdi). `z` parametresi elle verilmiyor: yazıldığında işaretçi çerçeve dışına kayıyordu, Google kendi seçince ortalanıyor. ⚠️ **F7-06'daki CSP `frame-src`e `https://maps.google.com` istisnası içermeli**, yoksa harita canlıda boş çerçeve çıkar. `FormCta` silinmedi; ilk kullanıcısı `/katil` olacak. |
| 20.08.2026 | **F4-11 tamamlandı, yanında F5-04 öne çekildi.** `/iletisim` e-posta, iki telefon, adres ve sosyal hesapları `site.json`dan okuyup basıyor; sayfada gömülü tek bir bilgi yok. **Plandan sapma:** harita gömüsü yazılmadı (Mustafa'nın kararı), yerine adresin altında Google Maps'in arama adresine giden bir "Yol tarifi al" bağlantısı var — gömü olmadığı için sayfa açılırken Google'a istek gitmiyor, F7-06'daki CSP'ye istisna gerekmiyor ve F7-07'nin Lighthouse hedefi risk altına girmiyor. `FormCta` (F5-04) sırası Faz 5'te olmasına rağmen burada yazıldı: `/iletisim`in çağrısı için gerekiyordu ve geçici bir sürümü üç sayfa sonra atmak israftı. Kabul kriteri şu anki gerçek durumda doğrulandı — `formlar` boş olduğu için sayfa butonu değil gerekçeyi gösteriyor. Footer'ın sosyal bloğu `layout/sosyal-baglantilar.tsx`'e çıkarıldı, footer ve /iletisim paylaşıyor. Yan düzeltme: X'in siyah rozeti koyu zeminde görünmüyordu, koyu zemin için `invert` ediliyor. 30/73. |
| 21.08.2026 | **Faz 3 kapandı, /galeri geri alındı, etkinlikler 4'ten 10'a çıktı.** F4-08'in 3B polaroid küresi tamamen silindi; geriye yalnızca Caveat font tercihi kaldı ve `/galeri` yine 404. F3-03/F3-04 bitti: /hakkimizda'nın dört değeri ve ana sayfanın tüm metinleri Mustafa'nın metniyle değişti, taslak kalmadı. `motion@13.1.1` kuruldu (SITE_PLAN §4'teki "ilk gerçek ihtiyaçta kurulur" maddesi işledi) — iki kullanıcısı var, ikisi de CSS'in yapamadığı iş: ana sayfa sayacı ve hero'nun dönen başlığı. Hero artık sabit "İzlemekle Kalma," + dönen [Sahneye Çık → Yön Ver → Öncü Ol → İz Bırak]; `hero.vurgu` kalkıp `hero.donenKelimeler` geldi. F3-03'teki "Wix'te 4 etkinlik var" notu **yanlışmış** — 9 varmış, beşi atlanmış; taşındı, üstüne Sosyal Sorumluluk Projeleri eklendi, 10'unun da kapağı ve ayrı sayfası var. Ana sayfa seçkisi 4'ten 5'e çıktı, tek kalan kart sona değil başa alınıp 460 px'e yükseltildi. Ekip fotoğrafları 77/77 — verilen kopyalar 210x220 olduğu için Wix'ten 800x1000 yeniden indirildi. **Üç kırpma/format hatası yakalandı:** hero maskesi `İ Ö Ü` noktalarını ve virgülü kesiyordu (`.yuent-glif-payi`), `MotionValue.set()` DOM'a yansımadığı için sayaç hedeften sıfıra sıçrıyordu, gelen görsellerin çoğu `.jpg` uzantılı ama AVIF/HEIC içerikliydi. 30/73. |
| 20.08.2026 | **F4-05 ve F4-06 tamamlandı.** `/etkinlikler` tüm etkinlikleri, `/etkinlikler/[slug]` her birinin kendi sayfasını gösteriyor; dördü de derleme anında üretiliyor. **Plandan sapma:** kategori filtresi ve arama yazılmadı (Mustafa'nın kararı) — dört etkinlik ve üç kategoriyle sayfayı yönetilmesi gereken bir araca çeviriyordu. Bento ızgarası `components/anasayfa/` → `components/icerik/` taşındı ve iki sayfanın ortak malı oldu; sabit dörtlü desen yerine sayıdan düzen türeten bir fonksiyona çevrildi (ikişerli satırlar 7/5 ve 5/7, tek kalan kart tam genişlik) — eski desen 4'ün katı olmayan sayılarda satır sonunda boşluk bırakıyordu. Sınıf adları birebir yazılıyor: Tailwind kaynağı metin olarak taradığı için `col-span-${n}` gibi çalışma anında birleşen bir adı üretmiyor. **Ana sayfa daraldı:** tümünü değil `oneCikanEtkinlikler`i basıyor (şemada `.max(3)` → `.max(4)`), yoksa liste büyüdükçe `/etkinlikler`in kopyası olacaktı; kayan şerit tüm adları okumaya devam ediyor. Kullanılmayan `EventCard` silindi. 28/73. |
| 19.08.2026 | **F4-03 ve F4-04 tamamlandı.** `/ekibimiz` güncel dönemi, `/ekibimiz/[donem]` arşivi gösteriyor; ikisi de aynı `EkipListesi`yi kullanıyor. Yönetim kurulu dizilimi plandaki gibi (başkan tek, altında yardımcı + genel sekreter, altında üyeler), koordinatörler departmana göre gruplu. Geçiş tuşu koşullu: 2025-2026'da koordinatör olmadığı için hiç çizilmiyor. Güncel dönem `generateStaticParams`a girmiyor, `/ekibimiz/2025-2026` 307 ile `/ekibimiz`e gidiyor — aynı ekip iki adreste yayınlanmıyor. **Erişilebilirlik:** sekmeli düzen JS'siz tarayıcıda ikinci listeyi gizliyordu; paneller `keepMounted` yapıldı ve bir `<noscript>` stili gizlemeyi geri alıyor. 26/73. |
| 19.08.2026 | **F4-02 `/hakkimizda` tamamlandı.** Ayrıntı görevin altında. Yol üstünde ortak `atmosfer/` bileşenleri çıkarıldı (el feneri, ızgara, ışık huzmeleri, kaydırma ipucu) ve alıntı bandı paylaşıldı; ana sayfa da onları kullanıyor. `PageHeader`'ın h1'i büyük harfe geçti — iç sayfalar ana sayfayla aynı dili konuşsun diye kural tek yerde. Sayfa metadata'sı `generateMetadata` ile içerikten okunuyor (F7-01 geçene kadarki ara çözüm). Şemaya `hakkimizda.baslik/slogan/degerler` ve kapalı bir ikon listesi eklendi: içerikte karşılığı olmayan ikon adı yazılırsa sayfa ikonsuz çıkmıyor, derleme duruyor. 24/73. |
| 19.08.2026 | **Ana sayfa yeniden tasarlandı (F4-01 v2) ve görsel dil değişti.** Yön: editoryal brutalist; aksan safran `#D9A441` → **asit sarısı `#E8FE55`**, birincil buton beyaz yerine asit (SITE_PLAN §8.2 güncellendi). Akış: tam ekran hero → misyon/vizyon → sayılarla biz → yatay etkinlik rayı → alıntı → bize katıl. Sayfanın omurgası **tek ızgara katmanı**: hero'da tam güçte, hem maskeyle kesilerek hem kaydırmayla opaklığı düşerek etkinlikler bitmeden yok oluyor; alıntı ve kapanış ızgarasız, iki ışık huzmesinin altında. İmleci takip eden el feneri sayfanın tamamında. `motion` **kurulmadı** — tasarımdaki hiçbir efekt ona ihtiyaç duymuyor, gerekçe SITE_PLAN §4'te. **Yan düzeltme:** `<Button render={<Link/>}>` kalıbı Base UI'da `<a>`ya `role="button"` ekletip bağlantıyı ekran okuyucuda "buton" diye okutuyordu; header, mobil menü ve hero'daki 5 çağrı `buttonVariants` ile stillenmiş `Link`e çevrildi. İçerik: `anasayfa.json`a `alinti` + `katil` eklendi, hero başlığı satır kırılımı (`\n`) ve `vurgu` alanı kazandı. |
| 18.08.2026 | **F3-01, F3-02 tamamlandı.** zod 4.4.3 + gray-matter 4.0.3. Şemalar `src/lib/schemas.ts`, okuyucular `src/lib/content.ts` (plan ikisini aynı dosyada öngörüyordu; `fs` istemci paketine sızmasın diye ayrıldı). Tipler `z.infer` ile türetiliyor, elle yazılmıyor. Bozuk içeriğin `next build`'i durdurduğu bilfiil denenerek kanıtlandı. Okuyucular şemanın göremediği çapraz tutarlılığı da denetliyor (öne çıkan slug var mı, dönem slug'ı dosya adıyla aynı mı, tek güncel dönem var mı, albümün etkinliği var mı). Geçici ana sayfa `getSite()`'ı çağırıyor, zincir gerçekten kurulu. 22/73. |
| 18.08.2026 | **F2-05, F2-06, F2-08 tamamlandı.** Tipografi ölçeği `@theme`'e, `.prose` elle yazıldı (`@tailwindcss/typography` kurulmadı — açık tema için ayarlı, tek temalı sitede çoğu geri ezilir). `Container`/`Section`/`PageHeader` ilkelleri. `SiteHeader` + `MobileMenu` + atlama bağlantısı; menü tek kaynaktan `src/lib/navigation.ts`. **Bilinen eksik:** Base UI açılır menü içeriğini portalda geç bastığı için alt rotalar ilk HTML'de yok — JS'siz erişilebilirlik ve taranabilirlik için F2-07 footer'ı bunları düz `<a>` olarak listelemeli. F2-07 zaten F3-01'i (`site.json`) bekliyor. 20/73. |
| 18.08.2026 | **F2-03, F2-04 tamamlandı.** Fontlar `next/font/local` ile bağlandı — 5 woff2 `_next/static/media`dan preload ediliyor, dış alan adına tek istek yok (Geist kaldırıldı). Palet `globals.css`'e yazıldı; site tek temalı koyu, `:root` = `.dark`. **İsim çakışması:** shadcn'in `--accent`i hover yüzeyi demek, marka aksanı değil — safran `--brand-accent` altında duruyor. 17/73. |
| 18.08.2026 | **Faz 1 bitti (10/10).** F1-10: `main protection` ruleset aktif, bypass listesi boş. shadcn tabanı Mustafa'nın kararıyla Radix'ten **Base UI**'a çevrildi (`@base-ui/react` 1.7.0); `asChild` yok, `render` var. **F2-01:** koyu minimal palet — marka rengi beyazın kendisi, aksan safran `#D9A441`, zemin `#0A0D12`. **F2-02:** 5 WOFF2, toplam **77 KB**; Archivo Expanded'ın ayrı aile değil `wdth=125` olduğu tespit edildi. Logo geldi (PNG, saf beyaz); header için 262×262 monogram kırpıldı, SVG hâlâ eksik. 15/73. |
| 18.08.2026 | **F0-03, F1-06, F1-07 tamamlandı.** Vercel hesabının kulüp adına olduğu doğrulandı. Klasör iskeleti §9'a göre kuruldu; `globals.css` `src/app/` → `src/styles/` taşındı. shadcn/ui **Radix tabanıyla** kuruldu (`-b radix -p nova`), 6 bileşen eklendi. §9'daki `page.tsx` dosyaları bilerek oluşturulmadı — boş `page.tsx` derlemeyi kırar, sahibi Faz 4. Next demo ana sayfası geçici yer tutucuyla değiştirildi, `lang="tr"` düzeltildi. Faz 1'de yalnızca F1-10 kaldı. 12/73. |
| 18.08.2026 | **F1-04, F1-05, F1-09 tamamlandı.** Vercel GitHub App `YuentIT` org'una kuruldu, proje import edildi, üretim dağıtımı başarılı → `web-yuent.vercel.app`. Hobby'de Deployment Protection tüm `.vercel.app` adreslerini SSO arkasına aldığı ve "Only Preview Deployments" Pro'ya ait olduğu için koruma kapatıldı. Prettier + `prettier-plugin-tailwindcss` kuruldu (markdown hariç). Güvenlik başlıkları + `poweredByHeader: false` eklendi. F0-03 `[~]`: dağıtım çalışıyor ama hesabın kulüp adına olduğu doğrulanmadı. 9/73. |
| 17.08.2026 | **F0-01, F0-02, F1-01, F1-02, F1-03, F1-08 tamamlandı.** Org `YuentIT`, depo `YuentIT/web` (public), ilk commit `253893c` push edildi. Next 16.3.1 / React 19.2.8 / Tailwind 4.3.3 / TS 5.9.3, sürümler sabit. F1-10 (dal koruması) eklendi — `main` ancak ilk push'ta oluştuğu için F0-02'den ayrıldı. 73 görev. |
| 17.08.2026 | Plan oluşturuldu. 86 görev, 10 faz. |
| 17.08.2026 | Kullanılmayan Wix modülleri (randevu, sepet, ödeme, cüzdan, abonelik, şans çarkı) kapsam dışı; bülten + toplu kampanya plana girdi. 89 görev. |
| 17.08.2026 | Plan seçimleri netleşti: GitHub **Free** yeterli ve repo **public** olacak (Free planda korumalı dal yalnızca public repo'larda çalışıyor). Vercel'de **Hobby** kullanılacak — "Team/Pro" ücretlidir, önceki sürümdeki "Vercel Team — ücretsiz" ifadesi hatalıydı. |
| 17.08.2026 | **v2 — sadeleştirme.** Tüm formlar Google Forms'a taşındı. Supabase, Resend, yönetim paneli, kimlik doğrulama ve 8 API ucu kaldırıldı. Referans sitelerin (İTÜ 5, YTÜ 3 servis) altına inildi. **72 görev, 3 yeni devredilecek servis.** |
