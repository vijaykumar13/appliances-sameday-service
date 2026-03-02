import { prisma } from "@/lib/db";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default async function CustomersPage() {
  const customers = await prisma.customer.findMany({
    include: {
      user: true,
      _count: { select: { jobs: true } },
    },
    orderBy: { user: { createdAt: "desc" } },
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Customers</h2>
        <p className="text-sm text-muted-foreground">
          View registered customers
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Customers</CardTitle>
          <CardDescription>{customers.length} total</CardDescription>
        </CardHeader>
        <CardContent>
          {customers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="mb-3 size-10 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                No registered customers yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-3 pr-4 font-medium">Name</th>
                    <th className="pb-3 pr-4 font-medium">Email</th>
                    <th className="pb-3 pr-4 font-medium">Phone</th>
                    <th className="pb-3 pr-4 font-medium">Address</th>
                    <th className="pb-3 font-medium">Jobs</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((c) => (
                    <tr key={c.id} className="border-b last:border-0">
                      <td className="py-3 pr-4">{c.user.name}</td>
                      <td className="py-3 pr-4">
                        {c.user.email || "N/A"}
                      </td>
                      <td className="py-3 pr-4">
                        {c.user.phone || "N/A"}
                      </td>
                      <td className="py-3 pr-4">
                        {[c.address, c.city, c.zip]
                          .filter(Boolean)
                          .join(", ") || "N/A"}
                      </td>
                      <td className="py-3">{c._count.jobs}</td>
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
