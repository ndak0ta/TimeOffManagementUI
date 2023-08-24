import { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
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
import { DeleteUser } from "./DeleteUser";
import { CreateUser } from "./CreateUser";
import { Alert } from "@components/Alert";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
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
              <TableCell>
                <Button
                  id="basic-button"
                  color="primary"
                  aria-controls={openMenu ? "user-settings" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openMenu ? "true" : undefined}
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                >
                  <MoreHorizIcon />
                </Button>
                <Menu
                  id="user-settings"
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={() => setAnchorEl(null)}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      setOpenUpdateDialog(user.id);
                      setAnchorEl(null);
                    }}
                  >
                    Düzenle
                  </MenuItem>
                  <MenuItem
                    sx={{ color: "error.main" }}
                    onClick={() => {
                      setOpenDeleteDialog(user.id);
                      setAnchorEl(null);
                    }}
                  >
                    Sil
                  </MenuItem>
                </Menu>
                <UpdateUser
                  user={user}
                  open={openUpdateDialog === user.id}
                  handleClose={() => setOpenUpdateDialog(null)}
                  setSnackbarState={setSnackbarState}
                />
                <DeleteUser
                  id={user.id}
                  open={openDeleteDialog === user.id}
                  handleClose={() => setOpenDeleteDialog(null)}
                  setSnackbarState={setSnackbarState}
                />
              </TableCell>
            </TableRow>
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
