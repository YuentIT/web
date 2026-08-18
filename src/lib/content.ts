import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";
import type { z } from "zod";

import {
  albumlerSchema,
  anasayfaSchema,
  blogYazisiSchema,
  donemSchema,
  egitimSchema,
  etkinlikSchema,
  hakkimizdaSchema,
  hukukiSchema,
  siteSchema,
  sponsorlukSchema,
} from "@/lib/schemas";
import type {
  Album,
  Anasayfa,
  BlogYazisi,
  Donem,
  Egitim,
  Etkinlik,
  Hakkimizda,
  HukukiMetin,
  Site,
  Sponsorluk,
} from "@/types";

/**
 * İçerik okuyucuları (F3-02).
 *
 * Hepsi **sunucu tarafında** çalışır ve derleme sırasında çağrılır; dosyalar
 * statik üretim anında okunup HTML'e gömülür, çalışma anında disk erişimi yok.
 *
 * Doğrulama burada yapılır: bozuk bir dosya `Error` fırlatır ve `next build`
 * durur (F3-01 kabul kriteri). Hata mesajı hangi dosyanın hangi alanının
 * bozuk olduğunu söyler — Keystatic'ten düzenleyen kişi mesajı okuyup
 * düzeltebilsin diye.
 */

const CONTENT = path.join(process.cwd(), "content");

/** Zod hatasını, dosya adını içeren okunabilir bir mesaja çevirir. */
function ayristir<T extends z.ZodType>(
  schema: T,
  veri: unknown,
  dosya: string,
): z.infer<T> {
  const sonuc = schema.safeParse(veri);
  if (!sonuc.success) {
    const satirlar = sonuc.error.issues.map((issue) => {
      const alan = issue.path.join(".") || "(kök)";
      return `  • ${alan}: ${issue.message}`;
    });
    throw new Error(
      `İçerik dosyası şemaya uymuyor: ${dosya}\n${satirlar.join("\n")}`,
    );
  }
  return sonuc.data;
}

async function jsonOku(gorecelYol: string): Promise<unknown> {
  const tamYol = path.join(CONTENT, gorecelYol);
  let ham: string;
  try {
    ham = await readFile(tamYol, "utf8");
  } catch {
    throw new Error(`İçerik dosyası bulunamadı: content/${gorecelYol}`);
  }
  try {
    return JSON.parse(ham);
  } catch (hata) {
    throw new Error(
      `İçerik dosyası geçerli JSON değil: content/${gorecelYol}\n  ${
        hata instanceof Error ? hata.message : String(hata)
      }`,
    );
  }
}

/**
 * Bir klasördeki `.mdx` dosyalarını okur, frontmatter'ı doğrular ve gövdeyi
 * ham metin olarak yanında döndürür. Gövdenin render'ı F3-05'in işi.
 *
 * Klasör yoksa boş dizi döner — Faz 3 ilerledikçe dolacak koleksiyonlar için
 * derlemeyi kırmanın anlamı yok. Ama var olan bir dosya bozuksa hata verir.
 */
async function mdxKlasoruOku<T extends z.ZodType>(
  klasor: string,
  schema: T,
): Promise<Array<{ slug: string; veri: z.infer<T>; govde: string }>> {
  const dizin = path.join(CONTENT, klasor);

  let dosyalar: string[];
  try {
    dosyalar = await readdir(dizin);
  } catch {
    return [];
  }

  const mdx = dosyalar.filter((d) => d.endsWith(".mdx")).sort();

  return Promise.all(
    mdx.map(async (dosya) => {
      const ham = await readFile(path.join(dizin, dosya), "utf8");
      const { data, content } = matter(ham);
      return {
        slug: dosya.replace(/\.mdx$/, ""),
        veri: ayristir(schema, data, `content/${klasor}/${dosya}`),
        govde: content.trim(),
      };
    }),
  );
}

/* -------------------------------------------------------------------------- */
/* Tekil dosyalar                                                             */
/* -------------------------------------------------------------------------- */

export async function getSite(): Promise<Site> {
  return ayristir(siteSchema, await jsonOku("site.json"), "content/site.json");
}

export async function getAnasayfa(): Promise<Anasayfa> {
  const anasayfa = ayristir(
    anasayfaSchema,
    await jsonOku("anasayfa.json"),
    "content/anasayfa.json",
  );

  // Öne çıkan etkinlik slug'ları gerçekten var mı? Olmayan bir slug sessizce
  // boş kart üretirdi; burada yakalanınca derleme durup sebebini söylüyor.
  const etkinlikler = await getEtkinlikler();
  const mevcut = new Set(etkinlikler.map((e) => e.slug));
  const eksik = anasayfa.oneCikanEtkinlikler.filter((s) => !mevcut.has(s));
  if (eksik.length > 0) {
    throw new Error(
      `content/anasayfa.json → oneCikanEtkinlikler: şu slug'lara ait etkinlik yok: ${eksik.join(
        ", ",
      )}`,
    );
  }

  return anasayfa;
}

export async function getHakkimizda(): Promise<Hakkimizda> {
  return ayristir(
    hakkimizdaSchema,
    await jsonOku("hakkimizda.json"),
    "content/hakkimizda.json",
  );
}

export async function getSponsorluk(): Promise<Sponsorluk> {
  return ayristir(
    sponsorlukSchema,
    await jsonOku("sponsorluk.json"),
    "content/sponsorluk.json",
  );
}

/* -------------------------------------------------------------------------- */
/* Dönemler                                                                    */
/* -------------------------------------------------------------------------- */

export async function getDonemler(): Promise<Donem[]> {
  const dizin = path.join(CONTENT, "donemler");

  let dosyalar: string[];
  try {
    dosyalar = await readdir(dizin);
  } catch {
    return [];
  }

  const donemler = await Promise.all(
    dosyalar
      .filter((d) => d.endsWith(".json"))
      .map(async (dosya) => {
        const donem = ayristir(
          donemSchema,
          JSON.parse(await readFile(path.join(dizin, dosya), "utf8")),
          `content/donemler/${dosya}`,
        );

        // Dosya adı ile slug ayrışırsa /ekibimiz/[donem] rotası 404 verir.
        const beklenen = dosya.replace(/\.json$/, "");
        if (donem.slug !== beklenen) {
          throw new Error(
            `content/donemler/${dosya}: slug "${donem.slug}" dosya adıyla ("${beklenen}") aynı olmalı`,
          );
        }
        return donem;
      }),
  );

  const guncelSayisi = donemler.filter((d) => d.guncel).length;
  if (donemler.length > 0 && guncelSayisi !== 1) {
    throw new Error(
      `content/donemler: tam olarak bir dönem "guncel": true olmalı, şu an ${guncelSayisi} tane var`,
    );
  }

  // En yeni dönem başta — dosya adları YYYY-YYYY olduğu için ters alfabetik yeter.
  return donemler.sort((a, b) => b.slug.localeCompare(a.slug));
}

export async function getDonem(slug: string): Promise<Donem | undefined> {
  const donemler = await getDonemler();
  return donemler.find((d) => d.slug === slug);
}

export async function getGuncelDonem(): Promise<Donem | undefined> {
  const donemler = await getDonemler();
  return donemler.find((d) => d.guncel);
}

/* -------------------------------------------------------------------------- */
/* Etkinlikler                                                                 */
/* -------------------------------------------------------------------------- */

export async function getEtkinlikler(): Promise<Etkinlik[]> {
  const kayitlar = await mdxKlasoruOku("etkinlikler", etkinlikSchema);

  return kayitlar
    .map(({ slug, veri, govde }) => ({ slug, ...veri, govde }))
    .sort((a, b) => {
      // Sitede tarih yayınlanmadığı için doğal bir sıra yok. `sira` verilmiş
      // olanlar önce ve küçükten büyüğe; verilmeyenler alfabetik olarak sona.
      const sa = a.sira ?? Number.MAX_SAFE_INTEGER;
      const sb = b.sira ?? Number.MAX_SAFE_INTEGER;
      if (sa !== sb) return sa - sb;
      return a.baslik.localeCompare(b.baslik, "tr");
    });
}

export async function getEtkinlik(slug: string): Promise<Etkinlik | undefined> {
  const etkinlikler = await getEtkinlikler();
  return etkinlikler.find((e) => e.slug === slug);
}

/* -------------------------------------------------------------------------- */
/* Eğitimler                                                                   */
/* -------------------------------------------------------------------------- */

export async function getEgitimler(): Promise<Egitim[]> {
  const kayitlar = await mdxKlasoruOku("egitimler", egitimSchema);
  return kayitlar.map(({ slug, veri, govde }) => ({ slug, ...veri, govde }));
}

export async function getEgitim(slug: string): Promise<Egitim | undefined> {
  const egitimler = await getEgitimler();
  return egitimler.find((e) => e.slug === slug);
}

/* -------------------------------------------------------------------------- */
/* Blog                                                                        */
/* -------------------------------------------------------------------------- */

/** Taslaklar yalnızca geliştirmede görünür; üretimde listeye girmez. */
export async function getBlogYazilari(): Promise<BlogYazisi[]> {
  const kayitlar = await mdxKlasoruOku("blog", blogYazisiSchema);

  return kayitlar
    .map(({ slug, veri, govde }) => ({ slug, ...veri, govde }))
    .filter((y) => !y.taslak || process.env.NODE_ENV === "development")
    .sort((a, b) => b.tarih.localeCompare(a.tarih));
}

export async function getBlogYazisi(
  slug: string,
): Promise<BlogYazisi | undefined> {
  const yazilar = await getBlogYazilari();
  return yazilar.find((y) => y.slug === slug);
}

/* -------------------------------------------------------------------------- */
/* Galeri                                                                      */
/* -------------------------------------------------------------------------- */

export async function getAlbumler(): Promise<Album[]> {
  const { albumler } = ayristir(
    albumlerSchema,
    await jsonOku("galeri/albumler.json"),
    "content/galeri/albumler.json",
  );

  // Albüm bir etkinliğe bağlıysa o etkinlik gerçekten olmalı — yoksa galeri
  // filtresi hiçbir sonuç dönmeyen bir seçenek gösterir.
  const etkinlikler = await getEtkinlikler();
  const mevcut = new Set(etkinlikler.map((e) => e.slug));
  for (const album of albumler) {
    if (album.etkinlikSlug && !mevcut.has(album.etkinlikSlug)) {
      throw new Error(
        `content/galeri/albumler.json → "${album.slug}" albümü olmayan bir etkinliğe bağlı: ${album.etkinlikSlug}`,
      );
    }
  }

  return albumler;
}

export async function getAlbum(slug: string): Promise<Album | undefined> {
  const albumler = await getAlbumler();
  return albumler.find((a) => a.slug === slug);
}

/* -------------------------------------------------------------------------- */
/* Hukuki metinler                                                             */
/* -------------------------------------------------------------------------- */

export async function getHukukiMetin(
  slug: "kvkk" | "gizlilik" | "kullanim-kosullari",
): Promise<HukukiMetin> {
  const dosya = `content/hukuki/${slug}.mdx`;
  let ham: string;
  try {
    ham = await readFile(path.join(CONTENT, "hukuki", `${slug}.mdx`), "utf8");
  } catch {
    throw new Error(`İçerik dosyası bulunamadı: ${dosya}`);
  }

  const { data, content } = matter(ham);
  return {
    slug,
    ...ayristir(hukukiSchema, data, dosya),
    govde: content.trim(),
  };
}
