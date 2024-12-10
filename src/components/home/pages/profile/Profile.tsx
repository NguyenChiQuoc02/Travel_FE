import { userService } from "@/axios/service";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const ProfileDetail = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCurretUser = async () => {
    try {
      const response = await userService.getCurrentUser();
      if (response.status === "ok") {
        setUser(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user data", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurretUser();
  }, []);

  const AvatarStyled = styled(Avatar)(({ theme }) => ({
    width: 120,
    height: 120,
    marginRight: 20,
    [theme.breakpoints.down("sm")]: {
      width: 100,
      height: 100,
    },
  }));

  const TypographyStyled = styled(Typography)(({ theme }) => ({
    fontSize: "18px",
    fontWeight: 500,
    color: "#333",
    marginBottom: "8px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
    },
  }));

  return (
    <Grid container justifyContent="center" style={{ marginTop: "20px" }}>
      <Grid item xs={12} sm={8} md={6}>
        <Card>
          <CardContent>
            {loading ? (
              <div style={{ textAlign: "center", padding: "20px" }}>
                <CircularProgress />
                <Typography variant="body1" style={{ marginTop: "10px" }}>
                  Đang tải thông tin người dùng...
                </Typography>
              </div>
            ) : (
              <Grid container alignItems="center">
                <Grid item>
                  <AvatarStyled src="/images/avatar.png" alt="Avatar" />
                </Grid>

                <Grid item xs>
                  <Typography variant="h5" gutterBottom>
                    Thông tin người dùng
                  </Typography>
                  <TypographyStyled variant="body1">
                    <strong>Tên:</strong> {user.name}
                  </TypographyStyled>
                  <TypographyStyled variant="body1">
                    <strong>Email:</strong> {user.email}
                  </TypographyStyled>
                  <TypographyStyled variant="body1">
                    <strong>Số điện thoại:</strong> {user.phoneNumber}
                  </TypographyStyled>
                  <TypographyStyled variant="body1">
                    <strong>Vai trò:</strong>{" "}
                    {user.roles.map((role: any) => role.name).join(", ")}
                  </TypographyStyled>
                </Grid>
              </Grid>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProfileDetail;
