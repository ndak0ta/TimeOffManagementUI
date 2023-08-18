import { useState } from "react";
import { useCreateUser } from "../api/createUser";
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
import { DatePicker } from "@mui/x-date-pickers";
import { Alert } from "@components/Alert";

type CreateUserProps = {
  open: boolean;
  handleClose: () => void;
};

export const CreateUser = ({ open, handleClose }: CreateUserProps) => {
  const createUser = useCreateUser();
  const [values, setValues] = useState({
    id: "",
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    dateOfBirth: new Date(),
    hireDate: new Date(),
  });

  const handleCreate = async () => {
    await createUser.mutateAsync(values);
    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Kullanıcıyı oluştur</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Kullanıcıyı oluşturmak üzeresiniz. Kullanıcı şifresi rastgele
          oluşturulup mail olarak iletilecektir.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="firstname"
          label="Ad"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => {
            setValues({ ...values, firstName: e.target.value });
          }}
        />
        <TextField
          autoFocus
          margin="dense"
          id="lastname"
          label="Soyad"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => {
            setValues({ ...values, lastName: e.target.value });
          }}
        />
        <TextField
          autoFocus
          margin="dense"
          id="username"
          label="Kullanıcı Adı"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => {
            setValues({ ...values, userName: e.target.value });
          }}
        />
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="E-posta Adresi"
          type="email"
          fullWidth
          variant="standard"
          onChange={(e) => {
            setValues({ ...values, email: e.target.value });
          }}
        />
        <TextField
          autoFocus
          margin="dense"
          id="phoneNumber"
          label="Telefon Numarası"
          type="tel"
          fullWidth
          variant="standard"
          onChange={(e) => {
            setValues({ ...values, phoneNumber: e.target.value });
          }}
        />
        <TextField
          autoFocus
          margin="dense"
          id="address"
          label="Adres"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => {
            setValues({ ...values, address: e.target.value });
          }}
          sx={{ mb: 2 }}
        />
        <DatePicker
          autoFocus
          label="Doğum Tarihi"
          sx={{ width: "100%", mb: 2 }}
          // @ts-ignore
          onChange={(date: Date | null) => {
            setValues({ ...values, dateOfBirth: date ? date : new Date() });
          }}
        />
        <DatePicker
          autoFocus
          label="İşe Giriş Tarihi"
          // @ts-ignore
          onChange={(date: Date | null) => {
            setValues({ ...values, hireDate: date ? date : new Date() });
          }}
          sx={{ width: "100%" }}
        />
        <Snackbar>
            <Alert severity="success">Kullanıcı başarıyla oluşturuldu.</Alert>
        </Snackbar>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={createUser.isLoading}>
          İptal
        </Button>
        <Button onClick={handleCreate} disabled={createUser.isLoading}>
          Oluştur
        </Button>
      </DialogActions>
    </Dialog>
  );
};
