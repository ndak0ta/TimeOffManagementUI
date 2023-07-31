import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import { Box, Paper, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { getUserInfoAndSetUserInfo } from "../redux/userInfoThunks";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
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

    console.log(user);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
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
            defaultValue={user.firstName}
            sx={{ mb: 2 }}
          />
          <TextField
            id="lastName"
            label="Soyisim"
            variant="outlined"
            defaultValue={user.lastName}
            sx={{ mb: 2 }}
          />
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            defaultValue={user.email}
            sx={{ mb: 2 }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Doğum Tarihi"
              defaultValue={dayjs(user.dateOfBirth)}
              sx={{ mb: 2 }}
            />
            <DatePicker
              label="İşe Başlama Tarihi"
              defaultValue={dayjs(user.hireDate)}
              sx={{ mb: 2 }}
            />
          </LocalizationProvider>
          <TextField
            id="adress"
            label="Adres"
            variant="outlined"
            defaultValue={user.address}
            sx={{ mb: 2 }}
          />
          <TextField
            id="phone"
            label="Telefon"
            variant="outlined"
            defaultValue={user.phoneNumber}
            sx={{ mb: 2 }}
          />
          <TextField
            id="annualTimeOff"
            label="Yıllık İzin"
            variant="outlined"
            defaultValue={user.annualTimeOffs}
            sx={{ mb: 2 }}
          />
          <TextField
            id="remainingAnnualTimeOff"
            label="Kalan Yıllık İzin"
            variant="outlined"
            defaultValue={user.remainingAnnualTimeOffs}
            sx={{ mb: 2 }}
          />
          <TextField
            id="roles"
            label="Ünvan"
            variant="outlined"
            defaultValue={user.roles}
            sx={{ mb: 2 }}
          />
        </Box>
        <Typography>
          Bu bilgilerde bir hata olduğunu düşünüyorsanız amirinize lütfen
          bildiriniz
        </Typography>
      </Paper>
    </DashboardLayout>
  );
}
