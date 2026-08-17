# YUENT — Web Sitesi

Yeditepe Üniversitesi Liderlik ve Girişimcilik Kulübü (LGK / YUENT) resmî web sitesi.

Canlı adres: `yuent.co` *(taşıma tamamlanınca)*

---

## Bu depoya yeni mi geldin?

Üç belgeyi bu sırayla oku:

| Dosya | Ne anlatır |
|---|---|
| [`CODE_PLAN.md`](./CODE_PLAN.md) | **Buradan başla.** Projenin hangi aşamasında olduğumuz ve sıradaki görev |
| [`SITE_PLAN.md`](./SITE_PLAN.md) | Mimari kararlar, sayfa yapısı, içerik modeli, tasarım sistemi |
| [`DEVRETME.md`](./DEVRETME.md) | Hesaplar, sahiplik ve dönem devri kontrol listesi |

---

## Kurulum

Gereken: **Node.js 20.9+** ve npm.

```bash
git clone https://github.com/YuentIT/web.git
cd web
npm install
cp .env.example .env.local     # değerleri doldur
npm run dev
```

`http://localhost:3000` açılır.

## Komutlar

| Komut | Ne yapar |
|---|---|
| `npm run dev` | Geliştirme sunucusu |
| `npm run build` | Üretim derlemesi |
| `npm run start` | Derlenmiş sürümü yerelde çalıştırır |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript kontrolü (`tsc --noEmit`) |

> `npm run typecheck`, `.next/types` altındaki üretilmiş tipleri kullanır.
> Depoyu ilk klonladığında önce bir kez `npm run build` çalıştır, sonra typecheck geçer.

## Ortam değişkenleri

[`.env.example`](./.env.example) dosyasına bak. Gerçek değerler:

- **Yerelde** → `.env.local` (gitignore'da, asla commit edilmez)
- **Yayında** → Vercel → Project → Settings → Environment Variables

⚠️ **Bu depo public.** Hiçbir API anahtarı, parola veya gizli değer koda ya da
`.env.example` içine yazılmaz.

## Teknoloji

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Vercel

## Yayın

`main` dalına birleşen her değişiklik Vercel tarafından otomatik yayına alınır.
Pull request'ler için Vercel önizleme adresi üretir.

Bir dağıtım siteyi bozarsa: Vercel → Deployments → çalışan sürüm → **Instant Rollback**.

## Katkı

1. `main`'den dal aç: `git checkout -b konu/kisa-aciklama`
2. Değişikliği yap, `npm run lint && npm run typecheck` çalıştır
3. Pull request aç
4. Birleşince otomatik yayına girer

`main` dalına doğrudan push kapalıdır.

## İçerik nasıl güncellenir?

Metin, etkinlik, ekip listesi gibi içerikler kodda değil, `content/` klasöründe
dosya olarak durur *(Faz 3'te kurulacak)*. Kod bilmeden düzenlemek için
`/keystatic` adresindeki editör kullanılır.

Formlar Google Forms üzerindedir; adresleri `content/site.json` içinde tutulur.

## Depoda olmayanlar

`örnek/`, `örnek2/` ve `inceleme raporları/` klasörleri araştırma malzemesidir ve
kasıtlı olarak yayınlanmaz — biri üçüncü kişilere ait kişisel veri içeriyor.
Bkz. [`.gitignore`](./.gitignore).

---

© Yeditepe Üniversitesi Liderlik ve Girişimcilik Kulübü
