import { cn } from "@/lib/utils";

/**
 * Tam ekran giriş bölümlerinin altındaki "aşağı kaydır" ipucu.
 *
 * `aria-hidden`: ekran okuyucu ve klavye kullanıcısı için kaydırma zaten bir
 * bilgi değil; ipucu yalnızca "sayfa burada bitmiyor" diyen görsel bir işaret.
 *
 * Konumlandırma **çağırana ait**: ana sayfada akışın içinde kayan şeridin
 * hemen üstünde duruyor, `/hakkimizda`da ortalanmış girişin altına mutlak
 * konumla oturuyor. Ortak olan yalnızca görünüm ve hareket.
 */
export function KaydirmaIpucu({ className }: { className?: string }) {
  return (
    <p
      data-yuent-bob
      aria-hidden="true"
      className={cn(
        "text-center text-[0.6rem] tracking-[0.18em] text-text-subtle uppercase motion-safe:animate-[yuent-bob_2.6s_ease-in-out_infinite]",
        className,
      )}
    >
      ↓ Aşağı kaydır
    </p>
  );
}
