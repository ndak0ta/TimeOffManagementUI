import { useEffect, useState } from "react";
import { useUser } from "@/lib/auth";
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

type UpdateProfileProps = {
  open: boolean;
  handleClose: () => void;
};

// TODO başarılı ve başarırısız durumları için alert ekle
export function UpdateProfile({ open, handleClose }: UpdateProfileProps) {
  const [values, setValues] = useState({
    email: "",
    phoneNumber: "",
  });
  const user = useUser();
  const updateUserMutation = useUpdateUserContact();

  const handleUpdate = async () => {
    await updateUserMutation.mutateAsync({ data: values }).then(() => {
      if (updateUserMutation.isSuccess) {
        handleClose();
      }
    });
  };

  useEffect(() => {
    if (user.isFetched) {
      setValues({
        email: user.data?.email || "",
        phoneNumber: user.data?.phoneNumber || "",
      });
    }
  }, [user.data?.email, user.data?.phoneNumber, user.isFetched]);

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
