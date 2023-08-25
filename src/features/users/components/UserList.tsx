import { useState } from "react";
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
import { CreateUser } from "./CreateUser";
import { Alert } from "@components/Alert";
import { UserListItem } from "./UserListItem";

export function UserList() {
  const users = useUsers({
    config: {
      refetchIntervalInBackground: true,
      refetchInterval: 1000 * 60 * 60,
      refetchOnWindowFocus: true,
    },
  });
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
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.data.map((user) => (
            <UserListItem user={user} setSnackbarState={setSnackbarState} />
          ))}
        </TableBody>
      </Table>
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={3000}
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
          }}
        >
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
