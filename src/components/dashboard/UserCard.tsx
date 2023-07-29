import React, { Fragment, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Title from "./Title";
import { ITimeOffRequest } from "../../utils/Interfaces";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { createTimeOff } from "../../utils/Api/TimeOffApi";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import { createTimeOffAndSetTimeOffs } from "../../redux/timeOffThunks";
import { AppDispatch } from "../../redux/store";
import { getUserInfoAndSetUserInfo } from "../../redux/userInfoThunks";

export default function UserCard() {
  // TODO daha sonra ismini değiştir
  const token = useSelector((state: any) => state.token.token);
  const user = useSelector((state: any) => state.userInfo);
  const [openTimeOffDialog, setOpenTimeOffDialog] = useState(false);
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const dispatch = useDispatch<AppDispatch>();

  const handleClickOpen = () => {
    setOpenTimeOffDialog(true);
  };

  const handleClose = () => {
    setOpenTimeOffDialog(false);
  };

  const handleSendTimeOff = async () => {
    setOpenTimeOffDialog(false);

    const timeOff: ITimeOffRequest = {
      description: description,
      startDate: startDate,
      endDate: endDate,
    };

    await dispatch(createTimeOffAndSetTimeOffs({ token, timeOff }));
  };

  useEffect(() => {
    dispatch(getUserInfoAndSetUserInfo(token));
  }, [token, dispatch]);

  if (user.loading) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <Title>
        {user.user.firstName} {user.user.lastName}
      </Title>
      <Typography color="text.secondary" sx={{ flex: 1 }}></Typography>
      <Typography component="p">
        Yıllık izin bakiyesi: {user.user.remainingAnnualTimeOffs} /{" "}
        {user.user.annualTimeOffs}
      </Typography>
      <Typography component="p">Ünvan: {user.user.roles}</Typography>
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
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="tr">
              <DatePicker
                label="Başlangıç tarihi"
                onChange={(date: Date | null) =>
                  date ? setStartDate(date) : null
                }
                format="DD/MM/YYYY"
                // @ts-ignore
                defaultValue={dayjs(new Date())}
                sx={{ marginBottom: "8px", width: "100%" }}
              />
              <DatePicker
                label="Bitiş tarihi"
                onChange={(date: Date | null) =>
                  date ? setEndDate(date) : null
                }
                format="DD/MM/YYYY"
                // @ts-ignore
                defaultValue={dayjs(
                  new Date().setDate(new Date().getDate() + 1)
                )}
                sx={{ width: "100%" }}
              />
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>İptal</Button>
            <Button onClick={handleSendTimeOff}>Gönder</Button>
          </DialogActions>
        </Dialog>
      </div>
    </Fragment>
  );
}
