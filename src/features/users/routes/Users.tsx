import { useState } from "react";
import { Authorization, ROLES } from "@lib/authorization";
import { UserList } from "../components/UserList";
import DashboardLayout from "@components/DashboardLayout";
import { Button, Paper } from "@mui/material";
import { CreateUser } from "../components/CreateUser";

export function Users() {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  return (
    <Authorization
      forbiddenFallback={<h1>Sadece Manager görebilir</h1>}
      allowedRoles={[ROLES.MANAGER]}
    >
      <DashboardLayout>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <Button
            variant="contained"
            sx={{ m: 2 }}
            onClick={() => setOpenCreateDialog(true)}
          >
            Kullanıcı Ekle
          </Button>
          <CreateUser
            open={openCreateDialog}
            handleClose={() => setOpenCreateDialog(false)}
          />
          <UserList />
        </Paper>
      </DashboardLayout>
    </Authorization>
  );
}
