import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * Footer bülten kaydı (F2-07 · bağlanması F6-01).
 *
 * Kutu **her zaman** çiziliyor. Adres henüz yoksa alanlar devre dışı bırakılıp
 * durum açıkça yazılıyor — ziyaretçi doldurup gönderemediği bir forma emek
 * vermiyor, ama bültenin var olduğunu görüyor.
 *
 * `bultenKayit` dolduğunda (F0-05 kararı sonrası) kutu doğrudan o adrese giden
 * çalışır bir kayıt bağlantısına dönüşüyor; burada başka değişiklik gerekmiyor.
 */
export function NewsletterForm({ kayitUrl }: { kayitUrl?: string }) {
  const aktif = Boolean(kayitUrl);

  return (
    <section aria-labelledby="bulten-baslik" className="flex flex-col gap-3">
      <h2
        id="bulten-baslik"
        className="text-eyebrow text-text-subtle uppercase"
      >
        Bülten
      </h2>

      <p className="text-sm text-text-muted">
        {aktif
          ? "Etkinliklerimizden ve duyurularımızdan haberdar olun."
          : "Bülten kaydımız yakında açılıyor. Bu arada bize sosyal hesaplarımızdan ulaşabilirsiniz."}
      </p>

      <form
        action={kayitUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col gap-2 sm:flex-row"
      >
        <Input
          type="email"
          name="email"
          required
          disabled={!aktif}
          placeholder="E-posta adresiniz"
          aria-label="E-posta adresiniz"
          className="sm:max-w-64"
        />
        <Button type="submit" disabled={!aktif}>
          {aktif ? "Abone Ol" : "Yakında"}
        </Button>
      </form>
    </section>
  );
}
