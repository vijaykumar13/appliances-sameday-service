"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { COMPANY } from "@/lib/constants";
import {
  Phone,
  MessageSquare,
  Clock,
  MapPin,
  CheckCircle,
} from "lucide-react";

export default function ContactPage() {
  const t = useTranslations("contact");
  const tc = useTranslations("common");

  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    // Simulate send (in production, this would call an API)
    await new Promise((r) => setTimeout(r, 1000));
    setSent(true);
    setLoading(false);
  }

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

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            {/* Contact Info */}
            <div className="space-y-6">
              {/* Phone Numbers */}
              <Card>
                <CardContent className="space-y-4">
                  <h2 className="text-xl font-bold text-black">
                    {t("callUs")}
                  </h2>
                  <div className="space-y-3">
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <Button
                        asChild
                        className="flex-1 bg-[#DC2626] font-bold text-white hover:bg-[#DC2626]/90"
                      >
                        <a href={COMPANY.phone1Tel}>
                          <Phone className="size-4" />
                          {tc("callNow")}: {COMPANY.phone1}
                        </a>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="flex-1 font-bold"
                      >
                        <a href={COMPANY.sms1}>
                          <MessageSquare className="size-4" />
                          {t("textUs")}: {COMPANY.phone1}
                        </a>
                      </Button>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <Button
                        asChild
                        className="flex-1 bg-[#DC2626] font-bold text-white hover:bg-[#DC2626]/90"
                      >
                        <a href={COMPANY.phone2Tel}>
                          <Phone className="size-4" />
                          {tc("callNow")}: {COMPANY.phone2}
                        </a>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="flex-1 font-bold"
                      >
                        <a href={COMPANY.sms2}>
                          <MessageSquare className="size-4" />
                          {t("textUs")}: {COMPANY.phone2}
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Hours */}
              <Card>
                <CardContent className="flex items-start gap-4">
                  <div className="rounded-full bg-[#FFD700]/15 p-3">
                    <Clock className="size-6 text-[#FFD700]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-black">
                      {t("businessHours")}
                    </h2>
                    <p className="mt-1 text-gray-600">{t("hoursDetail")}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Service Area */}
              <Card>
                <CardContent className="flex items-start gap-4">
                  <div className="rounded-full bg-[#FFD700]/15 p-3">
                    <MapPin className="size-6 text-[#FFD700]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-black">
                      {t("serviceAreaTitle")}
                    </h2>
                    <p className="mt-1 text-gray-600">
                      {t("serviceAreaDetail")}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <div className="overflow-hidden rounded-lg border bg-gray-100">
                <div className="flex h-64 items-center justify-center text-gray-400">
                  <div className="text-center">
                    <MapPin className="mx-auto size-10 text-gray-300" />
                    <p className="mt-2 text-sm">
                      Queens, Nassau &amp; Suffolk County, NY
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card>
                <CardContent>
                  <h2 className="mb-6 text-xl font-bold text-black">
                    {t("sendMessage")}
                  </h2>
                  {sent ? (
                    <div className="py-8 text-center">
                      <CheckCircle className="mx-auto size-12 text-green-600" />
                      <p className="mt-4 text-lg font-medium text-gray-700">
                        {t("sent")}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="contact-name">{tc("name")}</Label>
                        <Input id="contact-name" name="name" required />
                      </div>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="contact-email">{tc("email")}</Label>
                          <Input
                            id="contact-email"
                            name="email"
                            type="email"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contact-phone">{tc("phone")}</Label>
                          <Input
                            id="contact-phone"
                            name="phone"
                            type="tel"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-message">{tc("message")}</Label>
                        <Textarea
                          id="contact-message"
                          name="message"
                          placeholder={t("messagePlaceholder")}
                          rows={5}
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#DC2626] font-bold text-white hover:bg-[#DC2626]/90"
                        size="lg"
                      >
                        {loading ? "..." : tc("submit")}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
