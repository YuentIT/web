# DEVRETME — LGK / YUENT Web Sitesi

> Bu dosya, web sitesinin bir dönemden diğerine **kimseye bağımlı olmadan**
> devredilebilmesi için vardır.
>
> Bir kulüp sitesi teknik sebeplerden ölmez. Siteyi yapan kişi mezun olduğunda,
> parola onunla birlikte gittiği için ölür. Bu dosyanın tek işi bunu engellemek.

**Sürüm:** v2 — 17.08.2026 (kapsam sadeleştirildi)
**Durum:** Hesaplar henüz açılmadı — tablolar Faz 0 ve Faz 8'de doldurulacak.

---

## 1. Altın kural

> **Hiçbir şey kişisel hesapta durmaz.**

- Kod, kişisel GitHub'da değil, **kulüp organizasyonunda** durur.
- Vercel'e kişisel GitHub ile değil, **organizasyon hesabıyla** girilir.
- Google Form'lar kişisel Drive'da değil, **paylaşılan kulüp klasöründe** açılır.
- Her hesabın birincil adresi **`yuent@yeditepe.edu.tr`**'dir.
- Her hesapta **en az iki kişi** tam yetkilidir. Tek kişi = tek arıza noktası.
- Parolalar WhatsApp, Discord, e-posta veya not defterinde saklanmaz.

### Neden bu kadar katıyız?

İncelediğimiz iki referans siteden `ytugirisim.org` teknik olarak çok iyi kurulmuş ama
footer'ında kişisel LinkedIn'e bağlı tek bir isim var ve o kişi ekipte *Etkinlik
Koordinatörü* olarak görünüyor — kulübün teknoloji departmanı yok. O kişi mezun
olduğunda site güncellenemez hâle gelme riski taşıyor.

`itugirisim.org` bunu daha iyi çözmüş: yönetim kurulunda bir **IT Direktörü** koltuğu ve
görev tanımında açıkça "Web Sitesi Tasarım ve Yönetimi" yazan bir **IT Departmanı** var.
Biz de bu modeli izliyoruz.

---

## 2. Devredilecek ne var?

### Özet

```
3 yeni servis  +  1 mevcut hesap  +  (opsiyonel) 1 bülten aracı
```

Karşılaştırma:

| | Servis sayısı |
|---|---|
| Eski Wix kurulumumuz | **1** — ama site, alan adı, abone listesi ve tüm form kayıtları içinde kilitliydi |
| İTÜ Girişim | 5 (GitHub, Vercel, Cloudflare, Google Workspace, Luma) |
| YTÜ Girişim | 3 (GitHub, Vercel, Hostinger) — ama sitede hiç form yok |
| **Biz** | **3 yeni + 1 mevcut** — ve formlar gerçekten çalışıyor |

Wix'te tek hesap vardı ama **hiçbir veri dışarı çıkmıyordu.** Şimdi üç hesap var ve
her birinin içindeki veri istendiği an dışa aktarılabiliyor.

### 2.1 Her servis ne işe yarıyor?

| # | Servis | Ne işe yarıyor | Kaybedilirse ne olur? |
|---|---|---|---|
| 1 | **GitHub Organization** | Sitenin kaynak kodu **ve tüm içeriği** (yazılar, ekip listeleri, etkinlikler) burada dosya olarak durur. Sitenin tek gerçek kaynağı. İçerik editörü (Keystatic) de buraya yazar. | En ağır kayıp — ama depoyu klonlamış herkeste tam kopya vardır. |
| 2 | **Vercel (Hobby)** | Kodu alıp siteyi yayınlar. GitHub'a gönderilen her değişiklik otomatik yayına girer. Ziyaret istatistikleri de burada. **Hobby teknik olarak "kişisel" bir hesaptır — bu yüzden kulüp adına açılır ve parolası kasada durur.** Team/Pro planı ücretlidir, gerekmiyor. | Site kapanır, kod durur; başka bir yere ~10 dakikada taşınır. |
| 3 | **Alan adı `yuent.co`** | Sitenin adresi. | **En sinsi kayıp.** Yenilenmezse site erişilemez olur ve alan adı başkası tarafından alınabilir. |
| 4 | **`yuent@yeditepe.edu.tr`** (Google Workspace) | **Zaten var, üniversiteye ait.** Üç işi birden yapar: (a) tüm Google Form'lar ve yanıt Sheets'leri burada, (b) yüklenen CV'ler Drive'da, (c) tüm servislerin kurtarma adresi. | Form yanıtlarına ve tüm hesapların parola sıfırlamasına erişim kapanır. En kritik tek varlık. |
| 5 | **Bülten aracı** *(yalnızca Seçenek A)* | Abone listesi + toplu kampanya gönderimi. Wix ShoutOut'un yerini alır. | Kampanya atılamaz. Liste CSV olarak yedeklendiyse başka araca taşınır. |

### 2.2 Yanlışlıkla listeye eklenmesin

Bunlar **ayrı hesap değildir**, devredilecek bir şey yoktur:

- **Keystatic** (içerik editörü) → GitHub organizasyonu altındaki bir GitHub App
- **Vercel Analytics** → Vercel'in içinde
- **Google Forms / Sheets / Drive** → 4 numaralı Google hesabının parçası
- **Google Maps gömüsü** → API anahtarı gerektirmiyor
- **Veritabanı** → **Yok.** Form yanıtları Google Sheets'te
- **E-posta servisi** → **Yok.** Bildirim maillerini Google Forms gönderiyor
- **Ödeme sağlayıcısı** → **Yok.** Ödeme almıyoruz

### 2.3 Parola kasası

Zorunlu bir servis değil ama şiddetle önerilir: **Bitwarden ücretsiz organizasyon kasası.**
Üç hesabın parolası zaten `yuent@yeditepe.edu.tr` ile sıfırlanabildiği için kasa
kaybedilse bile felaket olmaz — ama günlük kullanımı çok kolaylaştırır.

### 2.4 Geçici: Wix hesabı

Yeni site yayına girdikten sonra hemen kapatılmaz. Önce (`CODE_PLAN.md` F8-03):

- [ ] Bülten abone listesi (CSV) — **geri kazanılamaz, en kritik veri**
- [ ] Wix Contacts'taki mevcut form gönderileri
- [ ] Medya kütüphanesi (görseller, sponsorluk/tanıtım PDF'leri)
- [ ] Sayfa metinlerinin kopyası
- [ ] Alan adının Wix DNS'inden çıkarılması

Bu beşi tamamlanmadan **abonelik iptal edilmez.**

### 2.5 Site projesinin parçası değil, ama devir listesinde olmalı

Sosyal medya hesapları: Instagram, LinkedIn, X, Facebook (`@7yuent`).

---

## 3. Doldurulacak tablolar

### 3.1 Hesaplar

| # | Servis | Hesap adı / URL | Birincil e-posta | Tam yetkili kişiler | Ücret | Yenileme |
|---|---|---|---|---|---|---|
| 1 | GitHub Organization (**Free**, repo public) | | yuent@yeditepe.edu.tr | | Ücretsiz | — |
| 2 | Vercel (**Hobby**, Team/Pro değil) | | yuent@yeditepe.edu.tr | | Ücretsiz | — |
| 3 | Alan adı `yuent.co` | | | | Yıllık | |
| 4 | Google (yuent@yeditepe.edu.tr) | | — | | Üniversite | — |
| 5 | Bülten aracı (varsa) | | yuent@yeditepe.edu.tr | | Ücretsiz | — |
| 6 | Bitwarden org kasası | | yuent@yeditepe.edu.tr | | Ücretsiz | — |
| 7 | Wix (geçici, iptal edilecek) | | | | | |
| 8 | Sosyal medya | @7yuent | | | Ücretsiz | — |

### 3.2 Google Form envanteri

> Faz 5'te doldurulacak. Hepsi paylaşılan kulüp klasöründe olmalı.

| Form | Sitedeki sayfa | Form bağlantısı | Yanıt Sheets | Erişimi olanlar |
|---|---|---|---|---|
| İletişim | `/iletisim` | | | |
| Üyelik (Bize Katıl) | `/katil` | | | |
| Koordinatör Başvurusu | `/basvuru` | | | |
| İstek ve Öneri | `/oneri` | | | |
| Etkinlik Kayıt (şablon) | `/etkinlikler/[slug]` | | | |

> Form adresleri kodun içinde değil, `content/site.json` dosyasında durur.
> Bir form değiştiğinde tek satır güncellenir.

### 3.3 Alan adı hakkında bilinenler (17.08.2026)

```
Alan adı        : yuent.co
İsim sunucuları : ns12.wixdns.net, ns13.wixdns.net   → DNS şu an Wix'te
MX kaydı        : yok  → alan adına bağlı posta kutusu yok
Kulüp e-postası : yuent@yeditepe.edu.tr  → Google Workspace, üniversiteye ait (iyi)
```

**Öğrenilecekler:** Alan adı kimin adına kayıtlı? Yenileme tarihi? Ücretini kim ödüyor?

> ⚠️ Alan adı bir öğrencinin kendi kartıyla yenileniyorsa, o kişi mezun olduğunda alan
> adı düşer. Bu, kulüp sitelerinin en sık ölüm sebebidir.
>
> ✅ İyi haber: `yuent.co`'nun MX kaydı olmadığı için DNS'i taşımak **e-postayı
> etkilemiyor.** Mail üniversitenin Google Workspace'inde.

---

## 4. Rol tanımı: Web Sorumlusu

Kulüp yapısına kalıcı bir görev olarak eklenmesi önerilir.

**Sorumluluklar**
- Sitenin ayakta kalması, yıllık bağımlılık güncellemeleri
- Yeni dönem ekip listesinin ve etkinliklerin siteye girilmesi
- Etkinlik başına yeni Google Form açılması ve site içeriğine bağlanması
- Google Sheets'e düşen başvuruların ilgili departmanlara yönlendirilmesi
- Dönem sonunda halefini yetiştirmek ve bu dosyayı güncellemek

**Devralma şartı:** Bir **Web Sorumlusu** ve bir **Yedek Web Sorumlusu** olur;
ikisinin de tüm hesaplara erişimi vardır.

---

## 5. Dönem devri kontrol listesi

> Her yıl, yeni yönetim kurulu seçildikten sonra (öneri: Haziran–Temmuz).
> Eski ve yeni sorumlu **birlikte oturarak** tamamlar.

### 5.1 Erişim devri

- [ ] Yeni Web Sorumlusu ve yedeği belirlendi, isimleri bu dosyaya yazıldı
- [ ] GitHub organizasyonuna yeni kişiler **Owner** olarak eklendi
- [ ] Vercel hesabının parolası kasada güncel ve yeni sorumlu giriş yapabildiğini doğruladı
      (Hobby tek girişli bir hesaptır — üye eklenmez, hesabın kendisi devredilir)
- [ ] `yuent@yeditepe.edu.tr` Google hesabına erişim devredildi
- [ ] Paylaşılan Drive form klasörüne yeni kişiler düzenleyici olarak eklendi
- [ ] Bülten aracına erişim verildi (varsa)
- [ ] Alan adı yönetim paneline erişim verildi
- [ ] Parola kasası organizasyonuna yeni kişiler davet edildi
- [ ] **Mezun olan kişiler tüm hesaplardan çıkarıldı**
- [ ] Parolalar döndürüldü (rotate)

### 5.2 Veri yedeği

- [ ] Tüm Google Form yanıt Sheets'leri Excel/CSV olarak indirildi ve arşivlendi
- [ ] Bülten abone listesinin CSV yedeği alındı
- [ ] Yedekler kulüp Drive'ında ayrı bir arşiv klasöründe

### 5.3 İçerik devri

- [ ] `content/donemler/` altına yeni dönem dosyası eklendi, `aktif: true`
- [ ] Bir önceki dönem `aktif: false` yapıldı (arşive düştü)
- [ ] Ekip fotoğrafları güncellendi
- [ ] Geçmiş etkinliklerin durumu `gecmis` olarak işaretlendi
- [ ] Yeni dönem etkinlik takvimi ve kayıt formları girildi

### 5.4 Bilgi devri

- [ ] Yeni sorumlu `README.md` ile projeyi kendi bilgisayarında ayağa kaldırdı
- [ ] Yeni sorumlu `CODE_PLAN.md`'yi okudu
- [ ] Yeni sorumlu gözetim altında **bir değişiklik yapıp yayına aldı**
- [ ] Yeni sorumlu bir Google Form açıp siteye bağladı
- [ ] Bu dosyadaki tüm tablolar güncellendi ve commit edildi

---

## 6. Yeni Web Sorumlusu — ilk gün

1. Bu dosyayı baştan sona oku.
2. Her hesaba tek tek gir ve girebildiğini doğrula.
3. `README.md` ile projeyi çalıştır (`npm install && npm run dev`).
4. `SITE_PLAN.md` ile mimariyi öğren.
5. `CODE_PLAN.md`'den nerede kalındığını gör.
6. Küçük bir değişiklik yap (ör. footer'daki telefon numarası), commit et,
   pull request aç, birleştir, Vercel'de yayına çıktığını gör.
   **Bu turu tamamlamadan devir bitmiş sayılmaz.**

---

## 7. Acil durum senaryoları

| Sorun | Ne yapılır |
|---|---|
| **Site açılmıyor** | Vercel → Deployments → çalışan sürüm → "Instant Rollback". Kod değişikliği gerekmez. |
| **Son değişiklik siteyi bozdu** | Aynı şekilde bir önceki dağıtıma dön. |
| **Alan adı erişilemez** | DNS kayıtlarını kontrol et; süresi dolduysa kayıt firmasından hemen yenile. |
| **Form butonu çalışmıyor** | `content/site.json` içindeki form adresini kontrol et. Form Google'da silinmiş veya yanıt almayı kapatmış olabilir. |
| **Form yanıtları görünmüyor** | Formun kişisel Drive'da açılmadığını doğrula. Paylaşılan klasöre taşı. |
| **Kimse hesaplara giremiyor** | `yuent@yeditepe.edu.tr` erişimi olan kişi tüm servislerde parola sıfırlayabilir. Bu adres bu yüzden hayati. |
| **Web sorumlusu ulaşılamıyor** | Yedek sorumlu devralır. Yedek de yoksa kod ve içerik depoda olduğu için sıfırdan devralınabilir. |

---

## 8. Neden Wix'ten çıktık? (gelecek ekipler için not)

Bu teknik bir tercih değil, bir **dayanıklılık** kararıydı.

Wix'te site, alan adı, bülten listesi ve form kayıtları tek bir hesabın içindeydi. Kod dışa
aktarılamıyordu, yani devir demek "parolayı söylemek" demekti; devredilmediğinde
yapılabilecek hiçbir şey yoktu.

Yeni kurulumda:
- **Kod ve içerik** GitHub organizasyonunda, herkesin kopyalayabileceği bir depoda
- **Form yanıtları** Google Sheets'te — istendiği an Excel'e aktarılır
- **Yayın** GitHub'a bağlı; Vercel kaybedilse bile başka bir yere 10 dakikada taşınır
- **Hiçbir yerde** kendi yazdığımız, bakımı bize kalan bir veritabanı veya form altyapısı yok

En kötü senaryoda kaybedilen şey birkaç saatlik kurulum işidir, sitenin kendisi değil.

---

## 9. İmzalar

| Dönem | Devreden | Devralan | Tarih | Kontrol listesi tamam mı? |
|---|---|---|---|---|
| 2025-2026 → 2026-2027 | | | | |
| | | | | |
