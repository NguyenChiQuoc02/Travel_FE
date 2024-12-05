import React from "react";
import SidebarAdmin from "@/components/admin/SidebarAdmin";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex" }}>
      <SidebarAdmin />
      <div style={{ flex: 1, padding: "20px" }}>{children}</div>
    </div>
  );
}
