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
    /**
     * Satır sonları (`\n`) **anlamlı**: hero başlığı satır satır maskeden
     * yükseldiği için kırılma noktaları içerikten geliyor, tarayıcının
     * sarmasına bırakılmıyor. Bu metni bir yerde tek satır olarak kullanacak
     * olan (ör. `<title>`) boşlukları kendisi sadeleştirmeli.
     */
    baslik: dolu,
    /**
     * `baslik` içinde aksan rengiyle gösterilecek kelime/öbek. Metinde
     * geçmiyorsa sessizce yok sayılır — vurgu, başlığın okunmasını değil
     * yalnızca görünümünü etkiliyor.
     */
    vurgu: z.string().optional(),
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
  /**
   * Ana sayfanın alıntı bandı. `hakkimizda.json`daki `alintilar`dan **ayrı**
   * duruyor (19.08.2026 kararı): oradaki liste Hakkımızda sayfasının kendi
   * alıntıları, buradaki tek alıntı yalnızca ana sayfaya ait. Ortak bir havuzdan
   * çekilseydi Hakkımızda'daki bir düzenleme ana sayfayı da sessizce değiştirirdi.
   */
  alinti: z
    .object({ metin: dolu, kisi: dolu, unvan: z.string().optional() })
    .optional(),
  /** Sayfayı kapatan çağrı bandı. */
  katil: z
    .object({
      ustBaslik: z.string().optional(),
      baslik: dolu,
      aciklama: dolu,
      cta: ctaSchema,
    })
    .optional(),
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

/**
 * Etkinlikler **bilgilendirme amaçlı** (Mustafa'nın kararı, 18.08.2026).
 *
 * Sitede tarih yayınlanmıyor — kulüp tarihleri önden duyurmuyor. Kayıt da
 * sitede toplanmıyor: yalnızca YES ve FUN gibi büyük etkinliklerde bir Google
 * Forms bağlantısı paylaşılıyor ve tarih dahil ayrıntılar o formda açıklanıyor.
 *
 * Bu yüzden `durum`, `tarih`, `tarihMetni`, `yer` ve `kayitKapanisMetni`
 * alanları **kaldırıldı.** Geriye tek bir opsiyonel `kayitLinki` kaldı:
 * etkinlik yaklaşınca içerik dosyasına elle ekleniyor, bitince siliniyor.
 * Alan boşken sayfada kayıt butonu hiç çizilmiyor.
 */
export const etkinlikSchema = z.object({
  baslik: dolu,
  kisaAciklama: dolu,
  kategori: dolu,
  kapakGorsel: gorselYolu.optional(),
  /** Kayıt formu bağlantısı. Yalnızca kayıt açıkken dolu olur. */
  kayitLinki: httpsUrl.optional(),
  /**
   * Listede elle sıralama; küçük sayı önce gelir. Tarih olmadığı için doğal
   * bir sıra kalmadı. Verilmezse başlığa göre alfabetik sıralanır.
   */
  sira: z.number().int().optional(),
  ozellikler: z.array(dolu).default([]),
  partnerler: z.array(dolu).default([]),
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

/**
 * Galeri tek ve düz bir liste (Mustafa'nın kararı, 18.08.2026).
 *
 * Önce etkinliğe bağlı albümler olarak modellenmişti; kaldırıldı. Galeri
 * "hangi etkinlikten" diye ayrılan bir arşiv değil, kulüpten karışık kareler
 * gösteren bir showroom. Albüm, etkinlik bağı ve filtre kavramları bu yüzden
 * yok — olmayan bir yapıyı modellemek sayfayı da gereksiz karmaşıklaştırırdı.
 */
export const galeriGorseliSchema = z.object({
  src: gorselYolu,
  /** Erişilebilirlik şartı: her karenin ne gösterdiği Türkçe yazılır. */
  alt: dolu,
});

export const galeriSchema = z.object({
  gorseller: z.array(galeriGorseliSchema).default([]),
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
