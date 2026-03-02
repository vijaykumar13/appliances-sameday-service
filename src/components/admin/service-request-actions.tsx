"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ServiceRequestActionsProps {
  id: string;
  status: string;
  name: string;
  phone: string;
  email: string | null;
  address: string;
  serviceType: string;
  description: string | null;
}

export function ServiceRequestActions({
  id,
  status,
  name,
  phone,
  email,
  address,
  serviceType,
  description,
}: ServiceRequestActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  async function updateStatus(newStatus: string) {
    setLoading(newStatus);
    try {
      await fetch("/api/admin/service-requests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      router.refresh();
    } finally {
      setLoading(null);
    }
  }

  async function convertToJob() {
    setLoading("convert");
    try {
      // Create the job
      await fetch("/api/admin/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name,
          customerPhone: phone,
          customerEmail: email,
          customerAddress: address,
          serviceType,
          description,
        }),
      });
      // Mark request as converted
      await fetch("/api/admin/service-requests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "converted" }),
      });
      router.refresh();
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="flex items-center gap-1">
      {status === "pending" && (
        <>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => updateStatus("contacted")}
            disabled={loading !== null}
          >
            {loading === "contacted" && (
              <Loader2 className="size-3 animate-spin" />
            )}
            Contacted
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={convertToJob}
            disabled={loading !== null}
            className="text-green-600 hover:text-green-700"
          >
            {loading === "convert" && (
              <Loader2 className="size-3 animate-spin" />
            )}
            Convert to Job
          </Button>
        </>
      )}
      {status === "contacted" && (
        <Button
          variant="ghost"
          size="sm"
          onClick={convertToJob}
          disabled={loading !== null}
          className="text-green-600 hover:text-green-700"
        >
          {loading === "convert" && (
            <Loader2 className="size-3 animate-spin" />
          )}
          Convert to Job
        </Button>
      )}
      {(status === "pending" || status === "contacted") && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => updateStatus("cancelled")}
          disabled={loading !== null}
          className="text-red-600 hover:text-red-700"
        >
          {loading === "cancelled" && (
            <Loader2 className="size-3 animate-spin" />
          )}
          Cancel
        </Button>
      )}
    </div>
  );
}
