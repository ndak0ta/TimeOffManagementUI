import React, { Fragment, useEffect, useState } from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { ITimeOffRequest, IUserInfo } from "../../utils/Interfaces";
import { useDispatch, useSelector } from "react-redux";
import { createTimeOffAndSetTimeOffs } from "../../redux/timeOffThunks";
import { AppDispatch } from "../../redux/store";
import { getUserInfoAndSetUserInfo } from "../../redux/userInfoThunks";
import TimeOffDialog from "./TimeOffDialog";
import "dayjs/locale/tr";

export default function UserCard() {
  const [openTimeOffDialog, setOpenTimeOffDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state: any) => state.token.token);
  const user: IUserInfo = useSelector((state: any) => state.userInfo.user);
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
    dispatch(getUserInfoAndSetUserInfo(token)).then(() => {
      setLoading(false);
    });
  }, [token, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <Title>
        {user.firstName} {user.lastName}
      </Title>
      <Typography color="text.secondary" sx={{ flex: 1 }}></Typography>
      {user.roles?.includes("Manager") ? (
        <Typography component="p">Ünvan: {user.roles}</Typography>
      ) : (
        <Fragment>
          <Typography component="p">
            Yıllık izin bakiyesi: {user.remainingAnnualTimeOffs} /{" "}
            {user.annualTimeOffs}
          </Typography>
          <Typography component="p">Ünvan: {user.roles}</Typography>
          <div>
            <Link color="primary" href="#" onClick={handleClickOpen}>
              İzin talebi oluştur
            </Link>
            <TimeOffDialog
              openTimeOffDialog={openTimeOffDialog}
              handleClose={handleClose}
              operation={{ type: "request", function: handleSendTimeOff }}
              title="İzin talebi oluştur"
              contentText="İzin talebi oluşturmak için gerekli alanları doldurunuz."
            />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
