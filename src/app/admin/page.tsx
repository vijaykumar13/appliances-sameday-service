import { prisma } from "@/lib/db";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Wrench,
  Inbox,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

const statusColor: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  assigned: "bg-yellow-100 text-yellow-800",
  in_progress: "bg-orange-100 text-orange-800",
  completed: "bg-green-100 text-green-800",
  invoiced: "bg-purple-100 text-purple-800",
  cancelled: "bg-red-100 text-red-800",
};

export default async function AdminDashboardPage() {
  const [
    totalJobs,
    newJobs,
    inProgressJobs,
    completedJobs,
    pendingRequests,
    recentJobs,
    totalInvoiceRevenue,
  ] = await Promise.all([
    prisma.job.count(),
    prisma.job.count({ where: { status: "new" } }),
    prisma.job.count({ where: { status: "in_progress" } }),
    prisma.job.count({ where: { status: "completed" } }),
    prisma.serviceRequest.count({ where: { status: "pending" } }),
    prisma.job.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
    prisma.invoice.aggregate({
      _sum: { total: true },
      where: { paymentStatus: "paid" },
    }),
  ]);

  const revenue = totalInvoiceRevenue._sum.total ?? 0;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Total Jobs</CardDescription>
            <Wrench className="size-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalJobs}</div>
            <p className="text-xs text-muted-foreground">
              {newJobs} new, {inProgressJobs} in progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Pending Requests</CardDescription>
            <Inbox className="size-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pendingRequests}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting contact
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Completed</CardDescription>
            <CheckCircle className="size-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{completedJobs}</div>
            <p className="text-xs text-muted-foreground">Jobs finished</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Revenue</CardDescription>
            <DollarSign className="size-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${revenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">From paid invoices</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Link
          href="/admin/jobs/new"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <Wrench className="size-4" />
          New Job
        </Link>
        <Link
          href="/admin/service-requests"
          className="inline-flex items-center gap-2 rounded-md border bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
        >
          <Inbox className="size-4" />
          View Requests ({pendingRequests} pending)
        </Link>
      </div>

      {/* Recent Jobs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Jobs</CardTitle>
          <CardDescription>Last 10 jobs created</CardDescription>
        </CardHeader>
        <CardContent>
          {recentJobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="mb-3 size-10 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                No jobs yet.{" "}
                <Link href="/admin/jobs/new" className="text-primary underline">
                  Create your first job
                </Link>
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-3 pr-4 font-medium">Customer</th>
                    <th className="pb-3 pr-4 font-medium">Service</th>
                    <th className="pb-3 pr-4 font-medium">Status</th>
                    <th className="pb-3 pr-4 font-medium">Scheduled</th>
                    <th className="pb-3 font-medium">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {recentJobs.map((job) => (
                    <tr key={job.id} className="border-b last:border-0">
                      <td className="py-3 pr-4">
                        {job.customerName || "N/A"}
                      </td>
                      <td className="py-3 pr-4 capitalize">
                        {job.serviceType}
                      </td>
                      <td className="py-3 pr-4">
                        <Badge
                          variant="secondary"
                          className={statusColor[job.status] ?? ""}
                        >
                          {job.status.replace("_", " ")}
                        </Badge>
                      </td>
                      <td className="py-3 pr-4">
                        {job.scheduledAt
                          ? new Date(job.scheduledAt).toLocaleDateString()
                          : "Not set"}
                      </td>
                      <td className="py-3">
                        {new Date(job.createdAt).toLocaleDateString()}
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
