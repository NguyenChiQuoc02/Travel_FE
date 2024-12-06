"use client";

import Link from "next/link";
import "./header.scss";
import { useEffect, useState } from "react";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useRouter } from "next/navigation";
import { bookingService } from "@/axios/service/index";
const AppHeader = () => {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const router = useRouter();
  const [total, setTotal] = useState<number>(0);
  const storedUsers = localStorage.getItem("userInfo");
  const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  useEffect(() => {
    if (storedUsers && JSON.parse(storedUsers).roles[0] == "ROLE_CUSTOMER") {
      setUser(JSON.parse(storedUsers));
    }
  }, []);

  useEffect(() => {
    const fetchTotal = async () => {
      const response = await bookingService.fetchTotalBooking();

      if (response) {
        const data = parseInt(response.data, 10);
        setTotal(data);
      }
    };
    fetchTotal();
  }, []);

  const handlelogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userInfo");
  };

  const gotoCart = () => {
    router.push("/home/cart");
  };
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
          {user ? (
            <div className="travel-avatar-hi">
              <IconButton aria-label="cart" onClick={gotoCart}>
                <StyledBadge badgeContent={total} color="secondary">
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
              <div className="travel-hi">Xin chào {user.username}</div>

              <Link
                href="/home/login"
                onClick={handlelogout}
                className="travel-hi"
              >
                Đăng xuất
              </Link>
            </div>
          ) : (
            <div className="travel-avatar-hi">
              <Link href="/home/login" className="travel-hi">
                Đăng nhập
              </Link>
              <Link href="/home/register" className="travel-hi">
                Đăng kí
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
