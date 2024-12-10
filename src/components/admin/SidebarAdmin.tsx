"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./SidebarAdmin.scss";

const SidebarAdmin: React.FC = () => {
  const pathname = usePathname();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userAuth");
  };
  return (
    <div className="sidebar-admin">
      <h2 className="admin-title">Admin</h2>
      <nav>
        <ul>
          <li>
            <Link
              href="/admin/tour"
              className={pathname === "/admin/tour" ? "active" : ""}
            >
              Tour
            </Link>
          </li>
          <li>
            <Link
              href="/admin/destination"
              className={pathname === "/admin/destination" ? "active" : ""}
            >
              Địa điểm
            </Link>
          </li>
          <li>
            <Link
              href="/admin/user"
              className={pathname === "/admin/user" ? "active" : ""}
            >
              Khách hàng
            </Link>
          </li>
          <li>
            <Link
              href="/admin/booking"
              className={pathname === "/admin/booking" ? "active" : ""}
            >
              Booking
            </Link>
          </li>
          <li>
            <Link href="/home/login" onClick={handleLogout}>
              Đăng xuất
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SidebarAdmin;
