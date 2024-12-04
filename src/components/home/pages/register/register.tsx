"use client";
import React, { useState } from "react";
import { register } from "@/axios/service/authService";
// import { login } from "../../../../axios/service/authService";// Gọi hàm register từ service
import { useRouter } from "next/navigation";
import { TextField, Button, Typography, Link } from "@mui/material";
import "./register.scss";
const RegisterForm: () => JSX.Element = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await register(username, password, email, phoneNumber);
      alert("Đăng ký thành công!");
      router.push("/home/login");
    } catch (err) {
      setError("Đăng ký thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="form-register">
      <form onSubmit={handleSubmit}>
        <h2>Đăng ký</h2>
        <div style={{ marginBottom: "16px" }}>
          <TextField
            label="Tên đăng nhập"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "16px" }}>
          <TextField
            label="Mật khẩu"
            variant="outlined"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "16px" }}>
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "16px" }}>
          <TextField
            label="Số điện thoại"
            variant="outlined"
            type="tel"
            fullWidth
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        {error && <Typography color="error">{error}</Typography>}
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Đăng ký
        </Button>
        <Typography
          variant="body2"
          style={{ marginTop: "16px", textAlign: "center" }}
        >
          Đã có tài khoản?{" "}
          <Link href="/home/login" underline="hover">
            Đăng nhập ngay
          </Link>
        </Typography>
      </form>
    </div>
  );
};

export default RegisterForm;
