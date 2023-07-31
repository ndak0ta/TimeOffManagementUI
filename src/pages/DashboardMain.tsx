import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import UserCard from "../components/dashboard/UserCard";
import TimeOffs from "../components/dashboard/TimeOffs";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../redux/store";
import { Grid } from "@mui/material";

export default function DashboardMain() {
  const token = useSelector((state: any) => state.token.token);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (token === null) {
      navigate("/login");
    }
  }, [token, navigate, dispatch]);

  return (
    <DashboardLayout>
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
    </DashboardLayout>
  );
}
