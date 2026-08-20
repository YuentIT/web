"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { buttonVariants } from "@/components/ui/button";
import { mainNav, primaryCta } from "@/lib/navigation";
import { cn } from "@/lib/utils";

/** Bulunulan sayfa mı? `/` yalnızca tam eşleşmede aktif sayılır. */
function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll(); // sayfa ortadan yenilenirse ilk hâli doğru olsun
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-200",
        // Sayfa başındayken header saydam duruyor; kaydırınca zemin ve alt
        // çizgi beliriyor ki içerik altından geçerken okunaklılık bozulmasın.
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <Container size="wide" className="flex h-16 items-center gap-4">
        <Logo />

        <nav
          aria-label="Ana menü"
          className="ms-auto hidden items-center gap-1 md:flex"
        >
          {mainNav.map((item) => (
            // Buton gibi görünen bir **bağlantı**: `<Button render={<Link/>}>`
            // Base UI'ı bağlantıyı buton gibi yönetmeye zorluyor ve `<a>`ya
            // `role="button"` ekleyerek ekran okuyucuda yanlış okutuyor.
            <Link
              key={item.href + item.label}
              href={item.href}
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
                className: isActive(pathname, item.href)
                  ? "text-foreground"
                  : "text-text-muted",
              })}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ms-auto flex items-center gap-2 md:ms-0">
          <Link
            href={primaryCta.href}
            className={buttonVariants({
              className: "hidden md:inline-flex",
            })}
          >
            {primaryCta.label}
          </Link>

          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
