"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mainNav, primaryCta } from "@/lib/navigation";

/**
 * Mobil menü (F2-06).
 *
 * Menü header'ın birebir aynısı: altı bağlantı, tek kademe. Açılır menüler
 * 20.08.2026'da tamamen kaldırıldığı için burada da alt liste kalmadı.
 *
 * Odak tuzağı, `Esc` ile kapanma ve arka planı inert yapma işini Base UI'ın
 * Dialog primitifi üstleniyor; elle klavye yönetimi yazılmadı.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon-lg"
            className="md:hidden"
            aria-label="Menüyü aç"
          />
        }
      >
        <Menu />
      </SheetTrigger>

      <SheetContent side="right" className="w-full max-w-sm">
        <SheetHeader>
          <SheetTitle className="font-heading">Menü</SheetTitle>
        </SheetHeader>

        {/* Bir bağlantıya basılınca menü kapansın. Rota değişimini effect ile
            izleyip setState çağırmak yerine olayı burada yakalıyoruz — React'in
            `set-state-in-effect` uyarısına girmeden aynı sonucu veriyor. */}
        <nav
          aria-label="Mobil menü"
          className="flex flex-col gap-1 px-4 pb-6"
          onClick={(event) => {
            if ((event.target as HTMLElement).closest("a")) setOpen(false);
          }}
        >
          {mainNav.map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              className="rounded-lg px-3 py-2.5 text-base font-medium hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              {item.label}
            </Link>
          ))}

          <Link
            href={primaryCta.href}
            className={buttonVariants({
              size: "lg",
              className: "mt-4 w-full",
            })}
          >
            {primaryCta.label}
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
