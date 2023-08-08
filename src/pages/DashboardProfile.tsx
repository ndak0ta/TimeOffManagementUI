import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import { Box, Paper, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { getUserInfoAndSetUserInfo } from "../redux/userInfoThunks";
import dayjs from "dayjs";

export default function DashboardProfile() {
  const [loading, setLoading] = useState(true);
  const token = useSelector((state: any) => state.token.token);
  const user = useSelector((state: any) => state.userInfo.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUserInfoAndSetUserInfo(token)).then(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            minHeight: 240,
          }}
        >
          Loading...
        </Paper>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          minHeight: 240,
        }}
      >
        <Typography variant="h3">Profil</Typography>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            width: 250,
          }}
        >
          <TextField
            id="firstName"
            label="İsim"
            variant="outlined"
            value={user.firstName}
            sx={{ mb: 2 }}
          />
          <TextField
            id="lastName"
            label="Soyisim"
            variant="outlined"
            value={user.lastName}
            sx={{ mb: 2 }}
          />
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            value={user.email}
            sx={{ mb: 2 }}
          />
          <TextField
            id="dateOfBirth"
            label="Doğum Tarihi"
            variant="outlined"
            value={dayjs(user.dateOfBirth).format("DD/MM/YYYY")}
            sx={{ mb: 2 }}
          />
          <TextField
            id="hireDate"
            label="İşe Giriş Tarihi"
            variant="outlined"
            value={dayjs(user.hireDate).format("DD/MM/YYYY")}
            sx={{ mb: 2 }}
          />
          <TextField
            id="adress"
            label="Adres"
            variant="outlined"
            value={user.address}
            sx={{ mb: 2 }}
          />
          <TextField
            id="phone"
            label="Telefon"
            variant="outlined"
            value={user.phoneNumber}
            sx={{ mb: 2 }}
          />
          <TextField
            id="annualTimeOff"
            label="Yıllık İzin"
            variant="outlined"
            value={user.annualTimeOffs}
            sx={{ mb: 2 }}
          />
          <TextField
            id="remainingAnnualTimeOff"
            label="Kalan Yıllık İzin"
            variant="outlined"
            value={user.remainingAnnualTimeOffs}
            sx={{ mb: 2 }}
          />
          <TextField
            id="roles"
            label="Ünvan"
            variant="outlined"
            value={user.roles}
            sx={{ mb: 2 }}
          />
        </Box>
        <Typography>
          Bu bilgilerde bir hata olduğunu düşünüyorsanız amirinize bildiriniz
        </Typography>
      </Paper>
    </DashboardLayout>
  );
}
