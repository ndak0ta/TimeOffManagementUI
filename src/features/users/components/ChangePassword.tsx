import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useChangePassword } from "../api/changePassword";
import { useState } from "react";
import { useSetAtom } from "jotai";
import { snackbarAtom } from "@stores/snackbar";

type ChangePasswordProps = {
  id: string;
  open: boolean;
  handleClose: () => void;
};

export default function ChangePassword({
  id,
  open,
  handleClose,
}: ChangePasswordProps) {
  const changePassword = useChangePassword();
  const [values, setValues] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const setSnackbarState = useSetAtom(snackbarAtom);

  const handleChangePassword = async () => {
    if (passwordsMatch) {
      await changePassword
        .mutateAsync({ id, ...values })
        .catch((err) => {
          setSnackbarState({
            open: true,
            severity: "error",
            message: err.response.data.message,
          });
        })
        .finally(() => {
          if (changePassword.isSuccess) {
            setSnackbarState({
              open: true,
              severity: "success",
              message: "Şifre değiştirildi.",
            });
          }
          handleClose();
        });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Şifreni değiştir</DialogTitle>
      <DialogContent>
        <DialogContentText>Şifreni değiştirmek üzeresin.</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="oldPassword"
          label="Mevcut Şifre"
          type="password"
          fullWidth
          variant="standard"
          onChange={(e) =>
            setValues({ ...values, oldPassword: e.target.value })
          }
        />
        <TextField
          margin="dense"
          id="newPassword"
          label="Yeni Şifre"
          type="password"
          fullWidth
          variant="standard"
          onChange={(e) =>
            setValues({ ...values, newPassword: e.target.value })
          }
        />
        <TextField
          error={!passwordsMatch}
          margin="dense"
          id="newPassword"
          label="Yeni Şifre Tekrar"
          type="password"
          fullWidth
          variant="standard"
          onChange={(e) => {
            setPasswordsMatch(e.target.value === values.newPassword);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>İptal</Button>
        <Button onClick={handleChangePassword}>Onayla</Button>
      </DialogActions>
    </Dialog>
  );
}
