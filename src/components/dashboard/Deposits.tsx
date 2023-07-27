import React, { Fragment, MouseEvent, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Title from "./Title";
import { IUser } from "../../utils/Interfaces";
import { getUser, getUserRole } from "../../utils/Api/UserApi";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

export default function Deposits() {
  const [user, setUser] = useState<IUser>({
    id: 0,
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    hireDate: new Date(),
    phoneNumber: "",
    address: "",
    annualTimeOffs: 0,
    remainingAnnualTimeOffs: 0,
  });
  const [role, setRole] = useState<string>("");
  const [openTimeOffDialog, setOpenTimeOffDialog] = useState(false);
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleUser = async () => {
    const userInfo = await getUser();

    setUser(userInfo);
    setRole(await getUserRole());
  };

  const handleClickOpen = () => {
    setOpenTimeOffDialog(true);
  };

  const handleClose = () => {
    setOpenTimeOffDialog(false);
  };

  const handleSendTimeOff = () => {
    setOpenTimeOffDialog(false);

    console.log(description);
    console.log(startDate);
    console.log(endDate);
  };

  useEffect(() => {
    handleUser();
  }, []);

  return (
    <Fragment>
      <Title>
        {user.firstName} {user.lastName}
      </Title>
      <Typography color="text.secondary" sx={{ flex: 1 }}></Typography>
      <Typography component="p">
        Yıllık izin bakiyesi: {user.remainingAnnualTimeOffs} /{" "}
        {user.annualTimeOffs}
      </Typography>
      <Typography component="p">Ünvan: {role}</Typography>
      <div>
        <Link color="primary" href="#" onClick={handleClickOpen}>
          İzin talebi oluştur
        </Link>
        <Dialog open={openTimeOffDialog} onClose={handleClose}>
          <DialogTitle>İzin talebi oluştur</DialogTitle>
          <DialogContent>
            <DialogContentText>
              İzin talebi oluşturmak için başlangıç ve bitiş tarihlerini
              giriniz.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="description"
              label="Açıklama"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setDescription(e.target.value)}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Gün Ay Yıl Seçiniz"
                onChange={(date: Date | null) =>
                  date ? setStartDate(date) : null
                }
                format="DD/MM/YYYY"
              />
            </LocalizationProvider>
            <TextField
              margin="dense"
              id="endDate"
              label="Bitiş Tarihi"
              type="date"
              fullWidth
              variant="standard"
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setEndDate(new Date(e.target.value))}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>iptal</Button>
            <Button onClick={handleSendTimeOff}>Gönder</Button>
          </DialogActions>
        </Dialog>
      </div>
    </Fragment>
  );
}
