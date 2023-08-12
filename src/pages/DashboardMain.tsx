import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import UserCard from "../components/dashboard/UserCard";
import TimeOffs from "../components/dashboard/TimeOffs";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { IUserInfo } from "../utils/Interfaces";
import { AppDispatch } from "../redux/store";
import { getUserInfoAndSetUserInfo } from "../redux/userInfoThunks";
import TimeOffsManager from "../components/dashboard/TimeOffsManager";

export default function DashboardMain() {
  const [loading, setLoading] = useState(true);
  const token = useSelector((state: any) => state.token.token);
  const user: IUserInfo = useSelector((state: any) => state.userInfo.user);
  const dispat = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (token === null) {
      navigate("/login");
    }
    dispat(getUserInfoAndSetUserInfo(token)).then(() => {
      setLoading(false);
    });
  }, [token, navigate]);

  const employeeDashboard = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <UserCard />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          ></Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <TimeOffs />
          </Paper>
        </Grid>
      </Grid>
    );
  };

  const managerDashboard = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <UserCard />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          ></Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <TimeOffsManager />
          </Paper>
        </Grid>
      </Grid>
    );
  };

  if (loading) {
    return (
      <DashboardLayout>
        <h1>Loading...</h1>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {user.roles?.includes("Manager")
        ? managerDashboard()
        : employeeDashboard()}
    </DashboardLayout>
  );
}
