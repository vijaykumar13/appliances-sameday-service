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
import { ServiceRequestActions } from "@/components/admin/service-request-actions";

const statusColor: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  contacted: "bg-blue-100 text-blue-800",
  converted: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default async function ServiceRequestsPage() {
  const requests = await prisma.serviceRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Service Requests</h2>
        <p className="text-sm text-muted-foreground">
          Manage incoming service requests from customers
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Requests</CardTitle>
          <CardDescription>{requests.length} total</CardDescription>
        </CardHeader>
        <CardContent>
          {requests.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="mb-3 size-10 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                No service requests yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-3 pr-4 font-medium">ID</th>
                    <th className="pb-3 pr-4 font-medium">Name</th>
                    <th className="pb-3 pr-4 font-medium">Phone</th>
                    <th className="pb-3 pr-4 font-medium">Service</th>
                    <th className="pb-3 pr-4 font-medium">Status</th>
                    <th className="pb-3 pr-4 font-medium">Date</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req) => (
                    <tr key={req.id} className="border-b last:border-0">
                      <td className="py-3 pr-4 font-mono text-xs">
                        {req.id.slice(0, 8)}
                      </td>
                      <td className="py-3 pr-4">
                        <div>{req.name}</div>
                        {req.email && (
                          <div className="text-xs text-muted-foreground">
                            {req.email}
                          </div>
                        )}
                      </td>
                      <td className="py-3 pr-4">{req.phone}</td>
                      <td className="py-3 pr-4 capitalize">
                        {req.serviceType}
                      </td>
                      <td className="py-3 pr-4">
                        <Badge
                          variant="secondary"
                          className={statusColor[req.status] ?? ""}
                        >
                          {req.status}
                        </Badge>
                      </td>
                      <td className="py-3 pr-4">
                        {new Date(req.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-3">
                        <ServiceRequestActions
                          id={req.id}
                          status={req.status}
                          name={req.name}
                          phone={req.phone}
                          email={req.email}
                          address={req.address}
                          serviceType={req.serviceType}
                          description={req.description}
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
