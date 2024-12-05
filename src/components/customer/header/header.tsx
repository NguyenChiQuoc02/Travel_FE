"use client";

import Link from "next/link";
import "./header.scss";

const CHeader = () => {
  return (
    <div className="customer-header">
      <div className="customer-navbar">
        <div className="customer-links">
          <Link href="/home" className="customer-link">
            Trang chủ
          </Link>
          <Link href="/home/introduce" className="customer-link">
            Giới thiệu
          </Link>
          <Link href="/home/tour" className="customer-link">
            Tour du lịch
          </Link>
          <Link href="/home/destination" className="customer-link">
            Địa điểm
          </Link>
        </div>
        <div className="customer-avatar">
          <div className="customer-avatar-hi">Xin chào name</div>
        </div>
      </div>
    </div>
  );
};

export default CHeader;
