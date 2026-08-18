"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
          {mainNav.map((item) =>
            item.children ? (
              <DropdownMenu key={item.href + item.label}>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "gap-1",
                        isActive(pathname, item.href) && "text-foreground",
                        !isActive(pathname, item.href) && "text-text-muted",
                      )}
                    />
                  }
                >
                  {item.label}
                  <ChevronDown className="size-3.5" />
                </DropdownMenuTrigger>

                <DropdownMenuContent align="start" className="min-w-44">
                  {item.children.map((child) => (
                    <DropdownMenuItem
                      key={child.href + child.label}
                      render={<Link href={child.href} />}
                    >
                      {child.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                key={item.href + item.label}
                variant="ghost"
                size="sm"
                className={cn(
                  isActive(pathname, item.href)
                    ? "text-foreground"
                    : "text-text-muted",
                )}
                render={<Link href={item.href} />}
              >
                {item.label}
              </Button>
            ),
          )}
        </nav>

        <div className="ms-auto flex items-center gap-2 md:ms-0">
          <Button
            className="hidden md:inline-flex"
            render={<Link href={primaryCta.href} />}
          >
            {primaryCta.label}
          </Button>

          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
