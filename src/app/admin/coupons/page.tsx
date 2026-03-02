import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { CouponActions, CreateCouponDialog } from "@/components/admin/coupon-actions";

export default async function CouponsPage() {
  const coupons = await prisma.coupon.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Coupons</h2>
          <p className="text-sm text-muted-foreground">
            Manage discount coupons
          </p>
        </div>
        <CreateCouponDialog />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Coupons</CardTitle>
          <CardDescription>{coupons.length} total</CardDescription>
        </CardHeader>
        <CardContent>
          {coupons.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="mb-3 size-10 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                No coupons yet. Create one to get started.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-3 pr-4 font-medium">Code</th>
                    <th className="pb-3 pr-4 font-medium">Description</th>
                    <th className="pb-3 pr-4 font-medium">Discount</th>
                    <th className="pb-3 pr-4 font-medium">Usage</th>
                    <th className="pb-3 pr-4 font-medium">Status</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {coupons.map((coupon) => (
                    <tr key={coupon.id} className="border-b last:border-0">
                      <td className="py-3 pr-4 font-mono font-semibold">
                        {coupon.code}
                      </td>
                      <td className="py-3 pr-4">
                        {coupon.description || "No description"}
                      </td>
                      <td className="py-3 pr-4">
                        {coupon.discountType === "flat"
                          ? `$${coupon.amount.toFixed(2)}`
                          : `${coupon.amount}%`}
                      </td>
                      <td className="py-3 pr-4">
                        {coupon.usageCount}
                        {coupon.usageLimit
                          ? ` / ${coupon.usageLimit}`
                          : " (unlimited)"}
                      </td>
                      <td className="py-3 pr-4">
                        <Badge
                          variant="secondary"
                          className={
                            coupon.active
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }
                        >
                          {coupon.active ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td className="py-3">
                        <CouponActions
                          id={coupon.id}
                          active={coupon.active}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
