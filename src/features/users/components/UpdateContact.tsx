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

type UpdateProfileProps = {
  open: boolean;
  user: AuthUser;
  handleClose: () => void;
};

// TODO başarılı ve başarırısız durumları için alert ekle
export function UpdateContact({ open, user, handleClose }: UpdateProfileProps) {
  const [values, setValues] = useState({
    email: user.email,
    phoneNumber: user.phoneNumber,
  });
  const updateUserMutation = useUpdateUserContact();

  const handleUpdate = async () => {
    await updateUserMutation.mutateAsync({ data: values }).then(() => {
      if (updateUserMutation.isSuccess) {
        handleClose();
      }
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
