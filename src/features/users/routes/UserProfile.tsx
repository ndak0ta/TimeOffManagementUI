import { useState } from "react";
import { useUser } from "@lib/auth";
import { formatDate } from "@utils/format";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { UpdateContact } from "../components/UpdateContact";
import ChangePassword from "../components/ChangePassword";
import DashboardLayout from "@components/DashboardLayout";

export function UserProfile() {
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openChangePasswordDialog, setOpenChangePasswordDialog] =
    useState(false);
  const user = useUser({
    refetchOnMount: false,
  }).data || {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: new Date(),
    hireDate: new Date(),
    address: "",
    phoneNumber: "",
    annualTimeOffs: 0,
    remainingAnnualTimeOffs: 0,
    roles: [""],
  };

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
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" sx={{ mb: 3 }}>
                Kişisel Bilgiler
              </Typography>
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
                id="dateOfBirth"
                label="Doğum Tarihi"
                variant="outlined"
                value={formatDate(user.dateOfBirth)}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" sx={{ mb: 3 }}>
                İletişim Bilgileri
              </Typography>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                value={user.email}
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
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" sx={{ mb: 3 }}>
                İş Bilgileri
              </Typography>
              <TextField
                id="hireDate"
                label="İşe Giriş Tarihi"
                variant="outlined"
                value={formatDate(user.hireDate)}
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
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" sx={{ mb: 3 }}>
                İşlemler
              </Typography>
              <Button
                variant="contained"
                color="warning"
                onClick={() => setOpenChangePasswordDialog(true)}
              >
                Şifreni değiştir
              </Button>
              <Button
                variant="contained"
                onClick={() => setOpenUpdateDialog(true)}
                sx={{ mr: 2 }}
              >
                İletişim bilgilerini güncelle
              </Button>
              <UpdateContact
                open={openUpdateDialog}
                user={user}
                handleClose={() => setOpenUpdateDialog(false)}
              />
              <ChangePassword
                id={user.id}
                open={openChangePasswordDialog}
                handleClose={() => setOpenChangePasswordDialog(false)}
              />
            </Grid>
          </Grid>
        </Box>
        <Typography>
          Bu bilgilerde bir hata olduğunu düşünüyorsanız amirinize bildiriniz
        </Typography>
      </Paper>
    </DashboardLayout>
  );
}
