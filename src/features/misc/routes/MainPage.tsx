import TimeOffList from "@features/timeOffs/components/TimeOffList";
import UserTimeOffList from "@features/timeOffs/components/UserTimeOffList";
import { useUser } from "@lib/auth";
import { ROLES } from "@lib/authorization";
import { Grid, Paper } from "@mui/material";
import UserCard from "../components/UserCard";

export function MainPage() {
  const user = useUser();

  if (user.isLoading || !user.data) {
    return <div>Loading...</div>;
  }

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
          <UserCard user={user.data} />
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
          {user?.data?.roles && user?.data?.roles.includes(ROLES.MANAGER) ? (
            <TimeOffList />
          ) : (
            <UserTimeOffList />
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}
