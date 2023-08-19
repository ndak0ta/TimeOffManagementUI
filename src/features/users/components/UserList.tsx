import {
  Button,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useUsers } from "../api/getUsers";
import { formatDate } from "@utils/format";
import { UpdateUser } from "./UpdateUser";
import { useState } from "react";
import { DeleteUser } from "./DeleteUser";
import { CreateUser } from "./CreateUser";
import { Alert } from "@components/Alert";

export function UserList() {
  const users = useUsers({
    config: {
      refetchIntervalInBackground: true,
      refetchInterval: 1000 * 60 * 60,
      refetchOnWindowFocus: true,
    },
  });
  const [openDeleteDialog, setOpenDeleteDialog] = useState<string | null>(null);
  const [openUpdateDialog, setOpenUpdateDialog] = useState<string | null>(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [snackbarState, setSnackbarState] = useState<{
    open: boolean;
    severity: "success" | "error" | "warning" | "info" | undefined;
    message: string;
  }>({
    open: false,
    severity: "success",
    message: "",
  });

  if (users.isLoading) {
    return <div>Loading...</div>; // TODO loading component
  }

  if (!users.data) return null;

  return (
    <Paper elevation={3} sx={{ width: "100%", overflow: "hidden" }}>
      <Button
        variant="contained"
        sx={{ mt: 2, ml: 2 }}
        onClick={() => setOpenCreateDialog(true)}
      >
        Kullanıcı Ekle
      </Button>
      <CreateUser
        open={openCreateDialog}
        handleClose={() => setOpenCreateDialog(false)}
        setSnackbarState={setSnackbarState}
      />
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Ad</TableCell>
            <TableCell>Soyad</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Telefon</TableCell>
            <TableCell>Adres</TableCell>
            <TableCell>Doğum Tarihi</TableCell>
            <TableCell>İşe Alınma Tarihi</TableCell>
            <TableCell>Yıllık İzin</TableCell>
            <TableCell>Kalan İzin</TableCell>
            <TableCell>Rol</TableCell>
            <TableCell align="right">İşlemler</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.data.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>{formatDate(user.dateOfBirth)}</TableCell>
              <TableCell>{formatDate(user.hireDate)}</TableCell>
              <TableCell>{user.annualTimeOffs}</TableCell>
              <TableCell>{user.remainingAnnualTimeOffs}</TableCell>
              <TableCell>{user.roles}</TableCell>
              <TableCell align="right">
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => setOpenUpdateDialog(user.id)}
                >
                  Düzenle
                </Button>
                <Button
                  variant="text"
                  color="error"
                  onClick={() => setOpenDeleteDialog(user.id)}
                >
                  Sil
                </Button>
                <UpdateUser
                  user={user}
                  open={openUpdateDialog === user.id}
                  handleClose={() => setOpenUpdateDialog(null)}
                />
                <DeleteUser
                  id={user.id}
                  open={openDeleteDialog === user.id}
                  handleClose={() => setOpenDeleteDialog(null)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={6000}
        onClose={() => {
          setSnackbarState({
            ...snackbarState,
            open: false,
          });
        }}
      >
        <Alert
          severity={snackbarState.severity}
          onClose={() => {
            setSnackbarState({
              ...snackbarState,
              open: false,
            });
            setOpenCreateDialog(false);
          }}
        >
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
