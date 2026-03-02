import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { COMPANY } from "@/lib/constants";
import {
  Zap,
  Star,
  Heart,
  Award,
  Phone,
} from "lucide-react";

const valueIcons = [Zap, Star, Heart, Award];

export default function AboutPage() {
  const t = useTranslations("about");
  const tc = useTranslations("common");

  const values = [
    { icon: Zap, title: t("value1Title"), desc: t("value1Desc") },
    { icon: Star, title: t("value2Title"), desc: t("value2Desc") },
    { icon: Heart, title: t("value3Title"), desc: t("value3Desc") },
    { icon: Award, title: t("value4Title"), desc: t("value4Desc") },
  ];

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

      {/* Story */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-lg leading-relaxed text-gray-600">
            {t("story")}
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-black">{t("mission")}</h2>
          <p className="mt-4 text-lg text-gray-600">{t("missionText")}</p>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-extrabold text-black">
            {t("values")}
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((val, i) => (
              <Card key={i} className="text-center">
                <CardContent className="flex flex-col items-center">
                  <div className="rounded-full bg-[#FFD700]/15 p-4">
                    <val.icon className="size-8 text-[#FFD700]" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-black">
                    {val.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">{val.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#FFD700]">
            {tc("getEstimate")}
          </h2>
          <p className="mt-3 text-gray-300">{tc("serviceArea")}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-[#DC2626] px-8 font-bold text-white hover:bg-[#DC2626]/90"
            >
              <Link href="/booking">{tc("bookService")}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-[#DC2626] px-8 font-bold text-white hover:bg-[#DC2626]/90"
            >
              <a href={COMPANY.phone1Tel}>
                <Phone className="size-5" />
                {tc("callNow")}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
