import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Phone, Clock, MapPin } from "lucide-react";
import { COMPANY } from "@/lib/constants";

const serviceLinks = [
  { key: "washer", href: "/services/washer" },
  { key: "dryer", href: "/services/dryer" },
  { key: "range", href: "/services/range" },
  { key: "dishwasher", href: "/services/dishwasher" },
  { key: "refrigerator", href: "/services/refrigerator" },
  { key: "ac", href: "/services/ac" },
  { key: "plumbing", href: "/services/plumbing" },
] as const;

const quickLinks = [
  { key: "home", href: "/" },
  { key: "services", href: "/services" },
  { key: "booking", href: "/booking" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

export function Footer() {
  const t = useTranslations("common");
  const ts = useTranslations("services");

  return (
    <footer className="border-t bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-extrabold">
              <span className="text-[#FFD700]">SAME DAY</span>{" "}
              <span className="text-white">SERVICE</span>
            </h3>
            <p className="mt-2 text-sm text-gray-400">{t("tagline")}</p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="size-4 text-[#FFD700]" />
                <a
                  href={COMPANY.phone1Tel}
                  className="hover:text-[#FFD700] transition-colors"
                >
                  {COMPANY.phone1}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="size-4 text-[#FFD700]" />
                <a
                  href={COMPANY.phone2Tel}
                  className="hover:text-[#FFD700] transition-colors"
                >
                  {COMPANY.phone2}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="size-4 text-[#FFD700]" />
                <span>{t("hoursLabel")}: {t("hours")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="size-4 text-[#FFD700]" />
                <span>{t("serviceArea")}</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              {t("services")}
            </h3>
            <ul className="mt-4 space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-[#FFD700]"
                  >
                    {ts(`${link.key}.name`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-[#FFD700]"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              {t("contact")}
            </h3>
            <div className="mt-4 space-y-3">
              <a
                href={COMPANY.phone1Tel}
                className="flex items-center gap-2 rounded-md bg-[#DC2626] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#DC2626]/90"
              >
                <Phone className="size-4" />
                {t("callNow")}: {COMPANY.phone1}
              </a>
              <a
                href={COMPANY.sms1}
                className="flex items-center gap-2 rounded-md border border-[#FFD700] px-4 py-2.5 text-sm font-bold text-[#FFD700] transition-colors hover:bg-[#FFD700]/10"
              >
                {t("textUs")}: {COMPANY.phone1}
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} {COMPANY.name}. All rights
          reserved. {t("serviceArea")}.
        </div>
      </div>
    </footer>
  );
}
