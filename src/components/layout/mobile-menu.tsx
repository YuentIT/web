"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
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
 * Açılır menüler burada açılır-kapanır değil, **düz liste** olarak veriliyor:
 * dokunmatik ekranda iki kademeli menü gezinmeyi yavaşlatıyor ve alt başlıklar
 * zaten toplam 9 bağlantı — hepsi tek ekrana sığıyor.
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
            <div key={item.href + item.label} className="flex flex-col">
              <Link
                href={item.href}
                className="rounded-lg px-3 py-2.5 text-base font-medium hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                {item.label}
              </Link>

              {item.children ? (
                <div className="ms-3 flex flex-col border-s border-border ps-3">
                  {item.children.map((child) => (
                    <Link
                      key={child.href + child.label}
                      href={child.href}
                      className="rounded-lg px-3 py-2 text-sm text-text-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}

          <Button
            size="lg"
            className="mt-4 w-full"
            render={<Link href={primaryCta.href} />}
          >
            {primaryCta.label}
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
