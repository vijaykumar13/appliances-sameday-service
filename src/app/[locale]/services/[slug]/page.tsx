import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { COMPANY, BRANDS } from "@/lib/constants";
import {
  WashingMachine,
  Wind,
  Flame,
  UtensilsCrossed,
  Thermometer,
  Snowflake,
  Wrench,
  Phone,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

const serviceIcons: Record<string, React.ElementType> = {
  washer: WashingMachine,
  dryer: Wind,
  range: Flame,
  dishwasher: UtensilsCrossed,
  refrigerator: Thermometer,
  ac: Snowflake,
  plumbing: Wrench,
};

const validSlugs = [
  "washer",
  "dryer",
  "range",
  "dishwasher",
  "refrigerator",
  "ac",
  "plumbing",
] as const;

type ServiceSlug = (typeof validSlugs)[number];

export function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!validSlugs.includes(slug as ServiceSlug)) {
    notFound();
  }

  return <ServiceDetail slug={slug as ServiceSlug} />;
}

function ServiceDetail({ slug }: { slug: ServiceSlug }) {
  const t = useTranslations("services");
  const tc = useTranslations("common");

  const Icon = serviceIcons[slug];
  const problems: string[] = t.raw(`${slug}.problems`);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#FFD700] via-[#FFD700]/90 to-[#FFD700]/70 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left sm:gap-6">
            <div className="mb-4 rounded-full bg-black/10 p-5 sm:mb-0">
              <Icon className="size-12 text-black" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-black sm:text-4xl lg:text-5xl">
                {t(`${slug}.name`)}
              </h1>
              <p className="mt-3 max-w-2xl text-lg text-black/70">
                {t(`${slug}.description`)}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#DC2626] font-bold text-white hover:bg-[#DC2626]/90"
                >
                  <Link href="/booking">{tc("bookService")}</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-black font-bold"
                >
                  <a href={COMPANY.phone1Tel}>
                    <Phone className="size-5" />
                    {tc("callNow")} - {COMPANY.phone1}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Problems */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-bold text-black">
                <AlertCircle className="size-6 text-[#DC2626]" />
                Common Problems We Fix
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {problems.map((problem, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-lg bg-gray-50 p-3"
                  >
                    <CheckCircle className="size-5 shrink-0 text-green-600" />
                    <span className="text-sm font-medium text-gray-700">
                      {problem}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div>
              <h2 className="text-2xl font-bold text-black">{t("brands")}</h2>
              <p className="mt-2 text-gray-500">
                {t(`${slug}.name`)} - {t("brandList")}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {BRANDS.map((brand) => (
                  <Badge
                    key={brand}
                    variant="secondary"
                    className="bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700"
                  >
                    {brand}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coupon CTA */}
      <section className="bg-[#DC2626] py-12">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white">
            {tc("couponText")}
          </h2>
          <p className="mt-2 text-white/80">{tc("serviceArea")}</p>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-white px-8 font-bold text-[#DC2626] hover:bg-white/90"
            >
              <Link href="/booking">{tc("bookService")}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white px-8 font-bold text-white hover:bg-white/10"
            >
              <a href={COMPANY.phone1Tel}>
                <Phone className="size-5" />
                {COMPANY.phone1}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
