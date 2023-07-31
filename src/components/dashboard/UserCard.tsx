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
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import { createTimeOffAndSetTimeOffs } from "../../redux/timeOffThunks";
import { AppDispatch } from "../../redux/store";
import { getUserInfoAndSetUserInfo } from "../../redux/userInfoThunks";
import TimeOffDialog from "./TimeOffDialog";

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

  const handleSendTimeOff = async (timeOff: ITimeOffRequest) => {
    handleClose();

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
        <TimeOffDialog
          openTimeOffDialog={openTimeOffDialog}
          handleClose={handleClose}
          operation={{type: "request", function: handleSendTimeOff}}
          title="İzin talebi oluştur"
          contentText="İzin talebi oluşturmak için gerekli alanları doldurunuz."
        />
      </div>
    </Fragment>
  );
}
