import { Dispatch, useState } from "react";
import { ROLES } from "@lib/authorization";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useAddUserToRole } from "../api/addUserToRole";

type AddUserToRoleProps = {
  open: boolean;
  handleClose: () => void;
  setSnackbarState: Dispatch<{
    open: boolean;
    severity: "success" | "error" | "warning" | "info" | undefined;
    message: string;
  }>;
  userId: string;
};

export default function AddUserToRole({
  open,
  handleClose,
  setSnackbarState,
  userId,
}: AddUserToRoleProps) {
  const [role, setRole] = useState("");
  const addUserToRole = useAddUserToRole();

  const handleAddUserToRole = async () => {
    await addUserToRole
      .mutateAsync({ userId, role })
      .catch((err) =>
        setSnackbarState({
          open: true,
          severity: "error",
          message: err.response.data.error,
        })
      )
      .finally(() => {
        if (addUserToRole.isSuccess) {
          setSnackbarState({
            open: true,
            severity: "success",
            message: "Rol başarıyla değiştirildi.",
          });

          handleClose();
        }
      });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Kullanıcı rolünü değiştir.</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Kullanıcıyı hangi rolü vermek istiyorsunuz?
        </DialogContentText>
        <InputLabel id="role-select-label">Rol</InputLabel>
        <Select
          id="role-select"
          labelId="role-select-label"
          value={role}
          label="Rol"
          onChange={(e) => setRole(e.target.value as string)}
        >
          {(Object.keys(ROLES) as Array<keyof typeof ROLES>).map(
            (role, index) => (
              <MenuItem key={index} value={ROLES[role]}>
                {ROLES[role]}
              </MenuItem>
            )
          )}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>İptal</Button>
        <Button onClick={handleAddUserToRole}>Onayla</Button>
      </DialogActions>
    </Dialog>
  );
}
