import type { z } from "zod";

import type {
  albumSchema,
  anasayfaSchema,
  blogYazisiSchema,
  donemSchema,
  egitimSchema,
  etkinlikSchema,
  formlarSchema,
  hakkimizdaSchema,
  hukukiSchema,
  siteSchema,
  sosyalSchema,
  sponsorlukSchema,
  uyeSchema,
} from "@/lib/schemas";

/**
 * Site genelinde paylaşılan tipler (F3-02).
 *
 * Hiçbiri elle yazılmıyor: hepsi `src/lib/schemas.ts` içindeki zod şemalarından
 * `z.infer` ile türetiliyor. Böylece şema değişince tip de değişiyor, ikisi
 * birbirinden ayrı düşemiyor.
 *
 * MDX'ten gelen koleksiyonlara iki alan ekleniyor: dosya adından türeyen `slug`
 * ve frontmatter'dan sonraki ham metin olan `govde`.
 */

export type Site = z.infer<typeof siteSchema>;
export type Sosyal = z.infer<typeof sosyalSchema>;
export type Formlar = z.infer<typeof formlarSchema>;

export type Anasayfa = z.infer<typeof anasayfaSchema>;
export type Hakkimizda = z.infer<typeof hakkimizdaSchema>;
export type Sponsorluk = z.infer<typeof sponsorlukSchema>;

export type Uye = z.infer<typeof uyeSchema>;
export type Donem = z.infer<typeof donemSchema>;

export type Album = z.infer<typeof albumSchema>;

export type Etkinlik = z.infer<typeof etkinlikSchema> & {
  slug: string;
  govde: string;
};

export type Egitim = z.infer<typeof egitimSchema> & {
  slug: string;
  govde: string;
};

export type BlogYazisi = z.infer<typeof blogYazisiSchema> & {
  slug: string;
  govde: string;
};

export type HukukiMetin = z.infer<typeof hukukiSchema> & {
  slug: string;
  govde: string;
};
