import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  WashingMachine,
  Wind,
  Flame,
  UtensilsCrossed,
  Thermometer,
  Snowflake,
  Wrench,
  ArrowRight,
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

export default function ServicesPage() {
  const t = useTranslations("services");
  const tc = useTranslations("common");

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-[#FFD700] via-[#FFD700]/90 to-[#FFD700]/70 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-black sm:text-4xl lg:text-5xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-lg text-black/70">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {serviceKeys.map((key) => {
              const Icon = serviceIcons[key];
              return (
                <Card
                  key={key}
                  className="group h-full transition-all hover:shadow-lg hover:border-[#FFD700]"
                >
                  <CardContent className="flex flex-col items-start">
                    <div className="mb-4 rounded-full bg-[#FFD700]/10 p-4 transition-colors group-hover:bg-[#FFD700]/20">
                      <Icon className="size-8 text-[#FFD700]" />
                    </div>
                    <h3 className="text-xl font-bold text-black">
                      {t(`${key}.name`)}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-gray-500">
                      {t(`${key}.description`)}
                    </p>
                    <Button
                      asChild
                      variant="link"
                      className="mt-4 px-0 font-bold text-[#DC2626]"
                    >
                      <Link href={`/services/${key}`}>
                        {tc("learnMore")}
                        <ArrowRight className="size-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-black">{t("brands")}</h2>
          <p className="mt-3 text-gray-500">{t("brandList")}</p>
        </div>
      </section>
    </>
  );
}
