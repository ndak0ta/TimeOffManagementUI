import { useState } from "react";
import { useUser } from "@lib/auth";
import { formatDate } from "@utils/format";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { UpdateContact } from "../components/UpdateContact";

export function UserProfile() {
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const user = useUser().data || {
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

  const handleUpdateDialogOpen = () => {
    setOpenUpdateDialog(true);
  };

  const handleUpdateDialogClose = () => {
    setOpenUpdateDialog(false);
  };

  return (
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
          value={formatDate(user.dateOfBirth)}
          sx={{ mb: 2 }}
        />
        <TextField
          id="hireDate"
          label="İşe Giriş Tarihi"
          variant="outlined"
          value={formatDate(user.hireDate)}
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
        <Button variant="contained" onClick={handleUpdateDialogOpen}>
          İletişim bilgilerini güncelle
        </Button>
        <UpdateContact
          open={openUpdateDialog}
          user={user}
          handleClose={handleUpdateDialogClose}
        />
      </Box>
      <Typography>
        Bu bilgilerde bir hata olduğunu düşünüyorsanız amirinize bildiriniz
      </Typography>
    </Paper>
  );
}
