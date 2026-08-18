import { z } from "zod";

/**
 * İçerik şemaları (F3-01) — `SITE_PLAN.md` §7'nin makine tarafından okunabilir hâli.
 *
 * Bu dosya sitenin sözleşmesi. `content/` altındaki her dosya buradan geçiyor;
 * geçemezse **derleme hata ile duruyor** (F3-01'in kabul kriteri). Böylece bozuk
 * bir içerik dosyası canlıya çıkamıyor — Keystatic'ten (F3-06) düzenleyen kişi
 * yanlış bir şey yazarsa sorun yayına değil, derlemeye düşüyor.
 *
 * Tipler bu şemalardan `z.infer` ile türetiliyor (`src/types/index.ts`), elle
 * yazılmıyor — şema ile tip birbirinden ayrı düşemesin diye.
 */

/** Boş bırakılamayan metin. `.min(1)` olmadan `""` her yerden sızıyor. */
const dolu = z.string().min(1);

/** Dosya adına ve URL'e girebilecek sadeleştirilmiş ad. */
export const slugSchema = z
  .string()
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug yalnızca küçük harf, rakam ve tire içerebilir (örn. yes-2023)",
  );

/** Sitedeki her görsel `public/` altından mutlak yolla verilir. */
const gorselYolu = z
  .string()
  .startsWith("/", "Görsel yolu / ile başlamalı (örn. /gorseller/ekip.jpg)");

const httpsUrl = z.url().startsWith("https://", "Adres https:// olmalı");

/* -------------------------------------------------------------------------- */
/* site.json — §7.1                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Form adresleri. Hepsi opsiyonel ve bu **kasıtlı**: bir form henüz açılmadıysa
 * alan boş kalır, `FormCta` (F5-04) buton yerine gerekçe gösterir. Zorunlu
 * yapmak, form hazır olmadan sitenin derlenememesi demek olurdu.
 */
export const formlarSchema = z.object({
  iletisim: httpsUrl.optional(),
  katil: httpsUrl.optional(),
  basvuru: httpsUrl.optional(),
  oneri: httpsUrl.optional(),
  bultenKayit: httpsUrl.optional(),
});

export const sosyalSchema = z.object({
  instagram: httpsUrl.optional(),
  linkedin: httpsUrl.optional(),
  x: httpsUrl.optional(),
  facebook: httpsUrl.optional(),
  youtube: httpsUrl.optional(),
  spotify: httpsUrl.optional(),
});

export const siteSchema = z.object({
  ad: dolu,
  kisaAd: dolu,
  universite: dolu,
  aciklama: dolu,
  eposta: z.email(),
  /** §7 "telefonlar" diyor ve sitede gerçekten iki numara var. */
  telefonlar: z.array(dolu).default([]),
  adres: z.string().optional(),
  /** Kanonik adres — F7-06 bunu tek biçim olarak kullanacak. */
  siteUrl: httpsUrl,
  sosyal: sosyalSchema,
  formlar: formlarSchema,
});

/* -------------------------------------------------------------------------- */
/* anasayfa.json                                                               */
/* -------------------------------------------------------------------------- */

const ctaSchema = z.object({
  metin: dolu,
  href: dolu,
});

export const anasayfaSchema = z.object({
  hero: z.object({
    ustBaslik: z.string().optional(),
    baslik: dolu,
    aciklama: dolu,
    birincilCta: ctaSchema,
    ikincilCta: ctaSchema.optional(),
  }),
  /** Ana sayfada öne çıkarılacak etkinlikler. Doğrulaması F3-02'de. */
  oneCikanEtkinlikler: z.array(slugSchema).max(3),
  sayilarlaBiz: z
    .array(z.object({ deger: dolu, etiket: dolu }))
    .max(4)
    .default([]),
});

/* -------------------------------------------------------------------------- */
/* hakkimizda.json                                                             */
/* -------------------------------------------------------------------------- */

export const hakkimizdaSchema = z.object({
  hikaye: dolu,
  misyon: dolu,
  vizyon: dolu,
  alintilar: z
    .array(z.object({ metin: dolu, kisi: dolu, unvan: z.string().optional() }))
    .default([]),
  istatistikler: z.array(z.object({ deger: dolu, etiket: dolu })).default([]),
});

/* -------------------------------------------------------------------------- */
/* donemler/*.json                                                             */
/* -------------------------------------------------------------------------- */

/**
 * Yönetim kurulu hiyerarşisi. Sayfadaki dizilim buradan türetiliyor:
 * başkan tek başına en üstte, altında başkan yardımcısı + genel sekreter,
 * onların altında üyeler ızgarada.
 *
 * `gorev` metninden çıkarım yapılmıyor — "Medyadan Sorumlu YK Üyesi" gibi
 * serbest yazılmış unvanlar bu çıkarımı ilk yıl bozardı.
 */
export const yonetimRolu = z.enum([
  "baskan",
  "baskan-yardimcisi",
  "genel-sekreter",
  "uye",
]);

export const uyeSchema = z
  .object({
    ad: dolu,
    gorev: dolu,
    /** Dönem sayfasındaki iki sekmeden hangisi — F4-03/F4-04. */
    takim: z.enum(["yonetim-kurulu", "koordinatorler"]),
    /** Yalnızca yönetim kurulunda anlamlı; dizilimi belirliyor. */
    rol: yonetimRolu.optional(),
    /** Yalnızca koordinatörlerde anlamlı: departman adı. */
    grup: z.string().optional(),
    fotograf: gorselYolu.optional(),
    linkedin: httpsUrl.optional(),
  })
  .refine((u) => u.takim !== "yonetim-kurulu" || Boolean(u.rol), {
    path: ["rol"],
    message: "yönetim kurulu üyesinde rol zorunlu",
  })
  .refine((u) => u.takim !== "koordinatorler" || Boolean(u.grup), {
    path: ["grup"],
    message: "koordinatörde grup (departman) zorunlu",
  });

export const donemSchema = z
  .object({
    /** Dosya adıyla aynı olmalı — F3-02 bunu kontrol ediyor. */
    slug: slugSchema,
    baslik: dolu,
    /** Güncel dönem tek olmalı; F3-02 birden fazlasında hata veriyor. */
    guncel: z.boolean().default(false),
    uyeler: z.array(uyeSchema).min(1),
  })
  // Başkan tek başına en üstte duracağı için tam olarak bir tane olmalı;
  // iki başkan sayfayı sessizce bozar, sıfır başkan üst sırayı boş bırakır.
  .refine(
    (d) => d.uyeler.filter((u) => u.rol === "baskan").length === 1,
    "Dönemde tam olarak bir başkan olmalı",
  )
  .refine(
    (d) => d.uyeler.filter((u) => u.rol === "baskan-yardimcisi").length <= 1,
    "Dönemde en fazla bir başkan yardımcısı olabilir",
  )
  .refine(
    (d) => d.uyeler.filter((u) => u.rol === "genel-sekreter").length <= 1,
    "Dönemde en fazla bir genel sekreter olabilir",
  );

/* -------------------------------------------------------------------------- */
/* etkinlikler/*.mdx — §7.2                                                    */
/* -------------------------------------------------------------------------- */

export const etkinlikDurumu = z.enum(["yaklasan", "kayit-acik", "gecmis"]);

export const etkinlikSchema = z
  .object({
    baslik: dolu,
    kisaAciklama: dolu,
    kategori: dolu,
    durum: etkinlikDurumu,
    /** Makine tarihi — sıralama ve JSON-LD (F7-04) bunu kullanır. */
    tarih: z.iso.date().optional(),
    /** İnsan tarihi — "12 Kasım 2025, 18.00" gibi. Tarih belirsizse bu yeter. */
    tarihMetni: z.string().optional(),
    yer: z.string().optional(),
    kapakGorsel: gorselYolu.optional(),
    galeriAlbum: slugSchema.optional(),
    /** Yoksa kayıt butonu çizilmez — F5-06. */
    kayitFormUrl: httpsUrl.optional(),
    /** "Kontenjan doldu" / "Kayıtlar 12 Kasım'da açılıyor" */
    kayitKapanisMetni: z.string().optional(),
    ozellikler: z.array(dolu).default([]),
    partnerler: z.array(dolu).default([]),
  })
  .refine((e) => e.durum !== "kayit-acik" || Boolean(e.kayitFormUrl), {
    // Kaydı açık görünen ama kaydolunamayan bir etkinlik, ziyaretçiyi
    // butona tıklatıp hiçbir yere götürmez — sessiz kalmasındansa derleme dursun.
    path: ["kayitFormUrl"],
    message: "durum 'kayit-acik' ise kayitFormUrl zorunlu",
  })
  .refine((e) => Boolean(e.tarih ?? e.tarihMetni), {
    path: ["tarih"],
    message: "tarih veya tarihMetni alanlarından biri dolu olmalı",
  });

/* -------------------------------------------------------------------------- */
/* egitimler/*.mdx · blog/*.mdx                                                */
/* -------------------------------------------------------------------------- */

export const egitimSchema = z.object({
  baslik: dolu,
  kisaAciklama: dolu,
  seviye: z.enum(["baslangic", "orta", "ileri"]).optional(),
  sure: z.string().optional(),
  kapakGorsel: gorselYolu.optional(),
  kayitFormUrl: httpsUrl.optional(),
});

export const blogYazisiSchema = z.object({
  baslik: dolu,
  ozet: dolu,
  tarih: z.iso.date(),
  yazar: dolu,
  kapakGorsel: gorselYolu.optional(),
  etiketler: z.array(dolu).default([]),
  /** Taslaklar listede ve sitemap'te görünmez. */
  taslak: z.boolean().default(false),
});

/* -------------------------------------------------------------------------- */
/* galeri/albumler.json · sponsorluk.json                                      */
/* -------------------------------------------------------------------------- */

export const albumSchema = z.object({
  slug: slugSchema,
  baslik: dolu,
  /** Hangi etkinliğe ait — galeri filtresi bunu kullanıyor (F4-08). */
  etkinlikSlug: slugSchema.optional(),
  tarihMetni: z.string().optional(),
  gorseller: z.array(z.object({ src: gorselYolu, alt: dolu })).min(1),
});

export const albumlerSchema = z.object({
  albumler: z.array(albumSchema).default([]),
});

export const sponsorlukSchema = z.object({
  giris: dolu,
  paketler: z
    .array(
      z.object({
        ad: dolu,
        aciklama: dolu,
        kazanimlar: z.array(dolu).min(1),
      }),
    )
    .default([]),
  dosyalar: z
    .array(
      z.object({
        baslik: dolu,
        /** `public/dosyalar/` altındaki PDF. */
        href: gorselYolu,
        boyut: z.string().optional(),
      }),
    )
    .default([]),
});

/* -------------------------------------------------------------------------- */
/* hukuki/*.mdx                                                                */
/* -------------------------------------------------------------------------- */

export const hukukiSchema = z.object({
  baslik: dolu,
  guncellemeTarihi: z.iso.date(),
});
