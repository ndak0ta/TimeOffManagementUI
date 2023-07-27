import React, { Fragment, MouseEvent, useEffect, useState } from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { IUser } from "../../utils/Interfaces";
import { getUser, getUserRole } from "../../utils/Api/UserApi";
import { InsertPageBreak } from "@mui/icons-material";
import { useSelector } from "react-redux";

function preventDefault(event: MouseEvent) {
  event.preventDefault();
}

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

  const handleUser = async () => {
    const userInfo = await getUser();

    setUser(userInfo);
    setRole(await getUserRole());
  };

  useEffect(() => {
    handleUser();
  }, []);

  return (
    <Fragment>
      <Title>
        {user.firstName} {user.lastName}
      </Title>
      <Typography component="p">
        Yıllık izin bakiyesi: {user.remainingAnnualTimeOffs} /{" "}
        {user.annualTimeOffs}
      </Typography>
      <Typography component="p">Ünvan: {role}</Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}></Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          İzin talebi oluştur
        </Link>
      </div>
    </Fragment>
  );
}
