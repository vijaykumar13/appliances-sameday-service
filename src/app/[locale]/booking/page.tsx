"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { COMPANY, SERVICES } from "@/lib/constants";
import { Phone, CheckCircle, MessageSquare } from "lucide-react";

const timeSlots = ["morning", "afternoon", "evening"] as const;

export default function BookingPage() {
  const t = useTranslations("booking");
  const tc = useTranslations("common");
  const ts = useTranslations("services");

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    const form = new FormData(e.currentTarget);
    const data = {
      name: form.get("name") as string,
      phone: form.get("phone") as string,
      email: form.get("email") as string,
      address: form.get("address") as string,
      city: form.get("city") as string,
      zip: form.get("zip") as string,
      serviceType: form.get("serviceType") as string,
      description: form.get("description") as string,
      preferredDate: form.get("preferredDate") as string,
      preferredTime: form.get("preferredTime") as string,
    };

    // Client-side validation
    const newErrors: Record<string, string> = {};
    if (!data.name) newErrors.name = "Required";
    if (!data.phone) newErrors.phone = "Required";
    if (!data.address) newErrors.address = "Required";
    if (!data.serviceType) newErrors.serviceType = "Required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/service-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const err = await res.json();
        setErrors({ form: err.error || "Something went wrong" });
      }
    } catch {
      setErrors({ form: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <>
        <section className="py-20">
          <div className="mx-auto max-w-lg px-4 text-center sm:px-6">
            <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="size-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-extrabold text-black">
              {t("successTitle")}
            </h1>
            <p className="mt-3 text-lg text-gray-500">
              {t("successMessage")}{" "}
              <a
                href={COMPANY.phone1Tel}
                className="font-bold text-[#DC2626] underline"
              >
                {COMPANY.phone1}
              </a>
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                asChild
                size="lg"
                className="bg-[#DC2626] font-bold text-white hover:bg-[#DC2626]/90"
              >
                <a href={COMPANY.phone1Tel}>
                  <Phone className="size-5" />
                  {tc("callNow")}
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="font-bold"
              >
                <a href={COMPANY.sms1}>
                  <MessageSquare className="size-5" />
                  {tc("textUs")}
                </a>
              </Button>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-[#FFD700] via-[#FFD700]/90 to-[#FFD700]/70 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-black sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-2 text-lg text-black/70">{t("subtitle")}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Phone */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">{tc("name")} *</Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-600">{errors.name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{tc("phone")} *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      aria-invalid={!!errors.phone}
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-600">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">{tc("email")}</Label>
                  <Input id="email" name="email" type="email" />
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <Label htmlFor="address">{tc("address")} *</Label>
                  <Input
                    id="address"
                    name="address"
                    required
                    aria-invalid={!!errors.address}
                  />
                  {errors.address && (
                    <p className="text-xs text-red-600">{errors.address}</p>
                  )}
                </div>

                {/* City & Zip */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="city">{tc("city")}</Label>
                    <Input id="city" name="city" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">{tc("zip")}</Label>
                    <Input id="zip" name="zip" />
                  </div>
                </div>

                {/* Service Type */}
                <div className="space-y-2">
                  <Label>{t("serviceType")} *</Label>
                  <Select name="serviceType" required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("selectService")} />
                    </SelectTrigger>
                    <SelectContent>
                      {SERVICES.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {ts(`${service.id}.name`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.serviceType && (
                    <p className="text-xs text-red-600">{errors.serviceType}</p>
                  )}
                </div>

                {/* Problem Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">
                    {t("problemDescription")}
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder={t("problemPlaceholder")}
                    rows={4}
                  />
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="preferredDate">{t("preferredDate")}</Label>
                    <Input
                      id="preferredDate"
                      name="preferredDate"
                      type="date"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("preferredTime")}</Label>
                    <div className="space-y-2">
                      {timeSlots.map((slot) => (
                        <label
                          key={slot}
                          className="flex items-center gap-2 text-sm"
                        >
                          <input
                            type="radio"
                            name="preferredTime"
                            value={slot}
                            className="accent-[#DC2626]"
                          />
                          {t(slot)}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {errors.form && (
                  <p className="rounded-md bg-red-50 p-3 text-sm text-red-600">
                    {errors.form}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#DC2626] py-3 text-base font-bold text-white hover:bg-[#DC2626]/90"
                  size="lg"
                >
                  {loading ? "..." : tc("submit")}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Or Call Us */}
          <div className="mt-10 text-center">
            <p className="text-lg font-bold text-gray-700">{t("orCallUs")}</p>
            <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-[#DC2626] font-bold text-white hover:bg-[#DC2626]/90"
              >
                <a href={COMPANY.phone1Tel}>
                  <Phone className="size-5" />
                  {COMPANY.phone1}
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-[#DC2626] font-bold text-white hover:bg-[#DC2626]/90"
              >
                <a href={COMPANY.phone2Tel}>
                  <Phone className="size-5" />
                  {COMPANY.phone2}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
