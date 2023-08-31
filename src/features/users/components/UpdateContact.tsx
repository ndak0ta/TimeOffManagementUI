import { useState } from "react";
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
import { PhoneMask } from "@components/PhoneMask";
import { useSetAtom } from "jotai";
import { snackbarAtom } from "@stores/snackbar";

type UpdateProfileProps = {
  open: boolean;
  user: AuthUser;
  handleClose: () => void;
};

export function UpdateContact({ open, user, handleClose }: UpdateProfileProps) {
  const [values, setValues] = useState({
    id: user.id,
    email: user.email,
    phoneNumber: user.phoneNumber,
  });
  const updateUserMutation = useUpdateUserContact();
  const setSnackbarState = useSetAtom(snackbarAtom);

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
          inputProps={{
            inputComponent: PhoneMask as any,
          }}
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
