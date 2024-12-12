import React, { useState } from "react";
import { login } from "@/axios/service/authService";
import { useRouter } from "next/navigation";
import { TextField, Button, Typography, Link } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import "./login.scss";
import { validateForm } from "@/utils/validation/validateLogin";
import ToastMessage from "@/components/shared/Inform/toastMessage";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm(username, password);
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      const userData = await login(username, password);
      setError(null);
      setSuccess("Đăng nhập thành công!");
      setToastMessage("Đăng nhập thành công");
      setToastOpen(true);
      window.dispatchEvent(new Event("storage"));

      setTimeout(() => {
        if (userData.roles.includes("ROLE_ADMIN")) {
          router.push("/admin");
        } else {
          router.push("/home");
        }
      }, 1000);
    } catch {
      setError(
        "Tên đăng nhập, mật khẩu không chính xác hoặc tài khoản đã bị xóa."
      );
    }
  };

  return (
    <div className="main-login">
      <div className="form-login">
        <form onSubmit={handleSubmit}>
          <h2>Đăng nhập</h2>
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
            Đăng nhập
          </Button>
          <Typography
            variant="body2"
            style={{ marginTop: "16px", textAlign: "center" }}
          >
            Chưa có tài khoản?{" "}
            <Link href="/home/register" underline="hover">
              Đăng ký ngay
            </Link>
          </Typography>
        </form>
      </div>
      <ToastMessage
        message={toastMessage}
        open={toastOpen}
        onClose={() => setToastOpen(false)}
      />
    </div>
  );
};

export default LoginForm;
