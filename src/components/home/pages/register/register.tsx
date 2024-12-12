"use client";
import React, { useState } from "react";
import { register } from "@/axios/service/authService";
import { useRouter } from "next/navigation";
import { TextField, Button, Typography, Link } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import "./register.scss";
import { validateForm } from "@/utils/validation/validateRegister";
import ToastMessage from "@/components/shared/Inform/toastMessage";

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    setSuccess(null);

    const validationError = validateForm(
      username,
      password,
      email,
      phoneNumber
    );
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await register(username, password, email, phoneNumber);
      const data = JSON.stringify(response);

      if (data.includes("Thành công")) {
        setTimeout(() => {
          router.push("/home/login");
        }, 1000);
        setToastMessage("Đăng kí thành công");
        setToastOpen(true);
      } else if (data.includes("Username đã tồn tại")) {
        setError("Tên đăng nhập đã tồn tại.");
      } else if (data.includes("Email đã tồn tại")) {
        setError("Email đã tồn tại.");
      } else {
        setError("Đăng ký thất bại. Vui lòng thử lại.");
      }
    } catch {
      setError("Lỗi khi kết nối tới server. Vui lòng thử lại.");
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
          />
        </div>
        {error && (
          <Alert severity="error" style={{ marginBottom: "16px" }}>
            <AlertTitle sx={{ marginTop: "-5px" }}></AlertTitle>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" style={{ marginBottom: "16px" }}>
            <AlertTitle sx={{ marginTop: "-5px" }}></AlertTitle>
            {success}
          </Alert>
        )}
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
      <ToastMessage
        message={toastMessage}
        open={toastOpen}
        onClose={() => setToastOpen(false)}
      />
    </div>
  );
};

export default RegisterForm;
