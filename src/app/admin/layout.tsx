"use client";
import React from "react";
import SidebarAdmin from "@/components/admin/SidebarAdmin";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  useEffect(() => {
    const storedUsers = localStorage.getItem("userAuth");
    if (storedUsers !== "ROLE_ADMIN") {
      alert("Bạn không có quyền");
      router.push("/home/login");
    }
  }, [router]);
  return (
    <div style={{ display: "flex" }}>
      <SidebarAdmin />
      <div style={{ flex: 1, padding: "20px" }}>{children}</div>
    </div>
  );
}
