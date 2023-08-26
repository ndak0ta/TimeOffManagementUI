import { Dispatch, useState } from "react";
import { useUpdateUserContact } from "../api/updateContact";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { AuthUser } from "@features/auth";

type UpdateProfileProps = {
  open: boolean;
  user: AuthUser;
  handleClose: () => void;
  setSnackbarState: Dispatch<{
    open: boolean;
    severity: "success" | "error" | "warning" | "info" | undefined;
    message: string;
  }>;
};

export function UpdateContact({
  open,
  user,
  handleClose,
  setSnackbarState,
}: UpdateProfileProps) {
  const [values, setValues] = useState({
    id: user.id,
    email: user.email,
    phoneNumber: user.phoneNumber,
  });
  const updateUserMutation = useUpdateUserContact();

  const handleUpdate = async () => {
    await updateUserMutation
      .mutateAsync(values)
      .catch((err) => {
        setSnackbarState({
          open: true,
          severity: "error",
          message: err.message,
        });
      })
      .finally(() => {
        if (updateUserMutation.isSuccess) {
          setSnackbarState({
            open: true,
            severity: "success",
            message: "Kullanıcı bilgileri güncellendi.",
          });
        }
        handleClose();
      });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Bilgilerimi Güncelle</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Bilgileriniz güncellemek üzeresiniz.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="E-posta Adresi"
          type="email"
          fullWidth
          variant="standard"
          defaultValue={values.email}
          onChange={(e) => {
            setValues({ ...values, email: e.target.value });
          }}
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Telefon Numarası"
          type="tel"
          fullWidth
          variant="standard"
          defaultValue={values.phoneNumber}
          onChange={(e) => {
            setValues({ ...values, phoneNumber: e.target.value });
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={updateUserMutation.isLoading}>
          İptal
        </Button>
        <Button onClick={handleUpdate} disabled={updateUserMutation.isLoading}>
          Onayla
        </Button>
      </DialogActions>
    </Dialog>
  );
}
