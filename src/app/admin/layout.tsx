import { AdminSidebar } from "@/components/admin/sidebar";

export const metadata = {
  title: "Admin - Same Day Service",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 items-center border-b bg-white px-6 shadow-sm">
          <h1 className="text-lg font-semibold text-gray-800">
            Same Day Service &mdash; Admin
          </h1>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
