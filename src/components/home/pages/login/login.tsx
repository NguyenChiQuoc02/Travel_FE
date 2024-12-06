import React, { useState } from "react";
import { login } from "../../../../axios/service/authService";
import { useRouter } from "next/navigation";
import { TextField, Button, Typography, Link } from "@mui/material";
import "./login.scss";
const LoginForm: () => JSX.Element = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const userData = await login(username, password);
      alert("Đăng nhập thành công!");

      if (userData.roles.includes("ROLE_ADMIN")) {
        router.push("/admin/tour");
      } else {
        router.push("/home");
      }
    } catch (err) {
      setError("Tên đăng nhập hoặc mật khẩu không chính xác.");
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
          {error && <Typography color="error">{error}</Typography>}
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
    </div>
  );
};

export default LoginForm;
