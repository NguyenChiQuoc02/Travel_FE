"use client";

import Link from "next/link";
import "./header.scss";
import { Container } from "@mui/material";

const AppHeader = () => {
  return (
    <div className="travel-header">
      <div className="travel-navbar">
        <div className="travel-links">
          <Link href="/home" className="travel-link">
            Trang chủ
          </Link>
          <Link href="/home/introduce" className="travel-link">
            Giới thiệu
          </Link>
          <Link href="/home/tour" className="travel-link">
            Tour du lịch
          </Link>
          <Link href="/home/destination" className="travel-link">
            Địa điểm
          </Link>
        </div>
        <div className="travel-avatar">
          <div className="travel-avatar-hi">
            <Link href="/home/login" className="travel-hi">
              Đăng nhập{" "}
            </Link>
            <Link href="/home/register" className="travel-hi">
              Đăng kí{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
