import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { COMPANY } from "@/lib/constants";
import {
  WashingMachine,
  Wind,
  Flame,
  UtensilsCrossed,
  Thermometer,
  Snowflake,
  Wrench,
  Phone,
  CalendarCheck,
  Truck,
  CheckCircle,
  Star,
  Shield,
  DollarSign,
  Clock,
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

const serviceKeys = [
  "washer",
  "dryer",
  "range",
  "dishwasher",
  "refrigerator",
  "ac",
  "plumbing",
] as const;

export default function HomePage() {
  const t = useTranslations("home");
  const tc = useTranslations("common");
  const ts = useTranslations("services");

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FFD700] via-[#FFD700]/90 to-[#FFD700]/70 py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,0,0,0.05),transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Badge className="mb-4 bg-black text-[#FFD700] hover:bg-black/90 text-sm px-4 py-1">
            {tc("couponText")}
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight text-black sm:text-5xl lg:text-6xl">
            {t("heroTitle")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-black/70 sm:text-xl">
            {t("heroSubtitle")}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-[#DC2626] px-8 text-base font-bold text-white hover:bg-[#DC2626]/90"
            >
              <Link href="/booking">{t("heroCta")}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-black bg-transparent px-8 text-base font-bold text-black hover:bg-black hover:text-[#FFD700]"
            >
              <a href={COMPANY.phone1Tel}>
                <Phone className="size-5" />
                {tc("callNow")} - {COMPANY.phone1}
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-black sm:text-4xl">
              {t("servicesTitle")}
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {serviceKeys.map((key) => {
              const Icon = serviceIcons[key];
              return (
                <Link key={key} href={`/services/${key}`}>
                  <Card className="group h-full cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 hover:border-[#FFD700]">
                    <CardContent className="flex flex-col items-center text-center">
                      <div className="mb-3 rounded-full bg-[#FFD700]/10 p-4 transition-colors group-hover:bg-[#FFD700]/20">
                        <Icon className="size-8 text-[#FFD700]" />
                      </div>
                      <h3 className="text-lg font-bold text-black">
                        {ts(`${key}.name`)}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                        {ts(`${key}.description`)}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-extrabold text-black sm:text-4xl">
            {t("howItWorksTitle")}
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              {
                icon: CalendarCheck,
                title: t("step1Title"),
                desc: t("step1Desc"),
                step: "1",
              },
              {
                icon: Truck,
                title: t("step2Title"),
                desc: t("step2Desc"),
                step: "2",
              },
              {
                icon: CheckCircle,
                title: t("step3Title"),
                desc: t("step3Desc"),
                step: "3",
              },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="rounded-full bg-[#FFD700] p-5">
                    <item.icon className="size-8 text-black" />
                  </div>
                  <span className="absolute -top-2 -right-2 flex size-8 items-center justify-center rounded-full bg-[#DC2626] text-sm font-bold text-white">
                    {item.step}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-black">
                  {item.title}
                </h3>
                <p className="mt-2 text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-extrabold text-black sm:text-4xl">
            {t("whyUsTitle")}
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Clock, text: t("reason1") },
              { icon: Shield, text: t("reason2") },
              { icon: DollarSign, text: t("reason3") },
              { icon: Star, text: t("reason4") },
            ].map((item, i) => (
              <Card key={i} className="border-0 bg-gray-50">
                <CardContent className="flex flex-col items-center text-center">
                  <div className="rounded-full bg-[#FFD700]/15 p-3">
                    <item.icon className="size-7 text-[#FFD700]" />
                  </div>
                  <p className="mt-3 font-bold text-black">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-black py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#FFD700] sm:text-4xl">
            {t("ctaTitle")}
          </h2>
          <p className="mt-3 text-lg text-gray-300">{t("ctaSubtitle")}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-[#DC2626] px-8 text-base font-bold text-white hover:bg-[#DC2626]/90"
            >
              <a href={COMPANY.phone1Tel}>
                <Phone className="size-5" />
                {COMPANY.phone1}
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-[#DC2626] px-8 text-base font-bold text-white hover:bg-[#DC2626]/90"
            >
              <a href={COMPANY.phone2Tel}>
                <Phone className="size-5" />
                {COMPANY.phone2}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
