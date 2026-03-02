"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { Phone, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { COMPANY } from "@/lib/constants";

const navItems = [
  { key: "home", href: "/" },
  { key: "services", href: "/services" },
  { key: "booking", href: "/booking" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

export function Header() {
  const t = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const otherLocale = locale === "en" ? "es" : "en";

  function switchLanguage() {
    router.replace(pathname, { locale: otherLocale });
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-extrabold tracking-tight">
            <span className="text-[#FFD700]">SAME DAY</span>{" "}
            <span className="text-black">SERVICE</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-[#FFD700]/10 hover:text-black ${
                pathname === item.href
                  ? "bg-[#FFD700]/15 text-black"
                  : "text-gray-600"
              }`}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Language Toggle */}
          <button
            onClick={switchLanguage}
            className="rounded-md border px-2.5 py-1 text-xs font-bold transition-colors hover:bg-gray-100"
          >
            {otherLocale === "es" ? "ES" : "EN"}
          </button>

          {/* Call Now Button */}
          <Button
            asChild
            className="bg-[#DC2626] font-bold text-white hover:bg-[#DC2626]/90"
            size="sm"
          >
            <a href={COMPANY.phone1Tel}>
              <Phone className="size-4" />
              {t("callNow")}
            </a>
          </Button>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          <Button
            asChild
            className="bg-[#DC2626] font-bold text-white hover:bg-[#DC2626]/90"
            size="sm"
          >
            <a href={COMPANY.phone1Tel}>
              <Phone className="size-4" />
            </a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="size-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>
                  <span className="text-[#FFD700]">SAME DAY</span>{" "}
                  <span className="text-black">SERVICE</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.key}>
                    <Link
                      href={item.href}
                      className={`rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-[#FFD700]/10 ${
                        pathname === item.href
                          ? "bg-[#FFD700]/15 font-semibold text-black"
                          : "text-gray-600"
                      }`}
                    >
                      {t(item.key)}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-4 flex flex-col gap-3 border-t px-4 pt-4">
                <Button
                  asChild
                  className="w-full bg-[#DC2626] font-bold text-white hover:bg-[#DC2626]/90"
                >
                  <a href={COMPANY.phone1Tel}>
                    <Phone className="size-4" />
                    {t("callNow")} - {COMPANY.phone1}
                  </a>
                </Button>
                <button
                  onClick={() => {
                    switchLanguage();
                    setOpen(false);
                  }}
                  className="rounded-md border px-3 py-2 text-sm font-bold transition-colors hover:bg-gray-100"
                >
                  {otherLocale === "es" ? "Espa\u00f1ol" : "English"}
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Coupon Banner */}
      <div className="bg-[#DC2626] py-1.5 text-center text-sm font-bold text-white">
        {t("couponText")} &mdash; {t("callNow")}: {COMPANY.phone1}
      </div>
    </header>
  );
}
