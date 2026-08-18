import type { MDXComponents } from "mdx/types";
import Link from "next/link";

/**
 * MDX'in ürettiği HTML etiketlerinin karşılıkları (F3-05).
 *
 * Buradaki liste kasıtlı olarak **kısa**. Başlık, paragraf, liste, tablo gibi
 * her şeyin görünümü `.prose` sınıfından geliyor (F2-05) — aynı stilleri bir de
 * burada tanımlamak iki ayrı doğruluk kaynağı yaratırdı. Yalnızca gerçekten
 * farklı bir React bileşeni gereken üç etiket ezildi.
 */

function MdxLink({ href = "", ...props }: React.ComponentProps<"a">) {
  const dahili = href.startsWith("/") || href.startsWith("#");

  // Dahili bağlantılar `next/link` ile: sayfa yeniden yüklenmiyor, önceden
  // getiriliyor. Dış bağlantılar yeni sekmede ve `noopener` ile açılıyor.
  if (dahili) return <Link href={href} {...props} />;

  return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
}

const components: MDXComponents = {
  a: MdxLink,
  // MDX'te yatay çizgi bölüm ayırıcı olarak kullanılıyor; anlamsal olarak
  // dekoratif, ekran okuyucuya duyurulmasına gerek yok.
  hr: (props) => <hr aria-hidden="true" {...props} />,
};

/*
 * `img` bilerek ezilmedi. `next/image` genişlik ve yükseklik ister, markdown'ın
 * `![alt](src)` sözdizimi ise bunları vermiyor; uydurulan bir varsayılan oran
 * düzen kaymasına (CLS) yol açar. Şu an hiçbir MDX gövdesinde görsel yok.
 * Görsel gerektiğinde iki yol var ve ikincisi tercih edilmeli:
 *   1. Düz markdown görseli — `.prose img` ile stillenir, optimize edilmez.
 *   2. MDX içinde doğrudan JSX: `<Image src=… width=… height=… alt=… />`
 * F7-07 "tüm görseller next/image" derken kastedilen ikincisi.
 */

/**
 * Next 16'da bu fonksiyon **argüman almıyor.** Eski sürümlerde
 * `useMDXComponents(components)` imzası vardı; internetteki örneklerin çoğu
 * hâlâ öyle yazıyor ve buraya kopyalanırsa tip hatası verir.
 */
export function useMDXComponents(): MDXComponents {
  return components;
}
