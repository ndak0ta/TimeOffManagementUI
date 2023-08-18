import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  TextField,
} from "@mui/material";
import { useChangePassword } from "../api/changePassword";
import { useState } from "react";
import { Alert } from "@components/Alert";

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
  const [errorMessage, setErrorMessage] = useState("");
  const [succesSnacbarOpen, setSuccesSnacbarOpen] = useState(false);
  const [errorSnacbarOpen, setErrorSnacbarOpen] = useState(false);

  const handleChangePassword = async () => {
    if (passwordsMatch) {
      await changePassword.mutateAsync({ id, ...values }).catch((err) => {
        setErrorMessage(err.response.data.error);
        setErrorSnacbarOpen(true);
      });
      if (changePassword.isSuccess) {
        setSuccesSnacbarOpen(true);
      }
    }
  };

  const handleSnacbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccesSnacbarOpen(false);
    setErrorSnacbarOpen(false);
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
        <Snackbar
          open={errorSnacbarOpen}
          autoHideDuration={6000}
          onClose={handleSnacbarClose}
        >
          <Alert severity="error" onClose={handleSnacbarClose}>
            {errorMessage}
          </Alert>
        </Snackbar>
        <Snackbar
          open={succesSnacbarOpen}
          onClose={handleSnacbarClose}
          autoHideDuration={3000}
        >
          <Alert severity="success" onClose={handleSnacbarClose}>
            Şifren başarıyla değiştirildi.
          </Alert>
        </Snackbar>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>İptal</Button>
        <Button onClick={handleChangePassword}>Onayla</Button>
      </DialogActions>
    </Dialog>
  );
}
