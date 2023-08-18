import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useUpdateUser } from "../api/updateUser";
import { useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { User } from "../types";

type UpdateUserProps = {
  open: boolean;
  user: User;
  handleClose: () => void;
};

export const UpdateUser = ({ open, user, handleClose }: UpdateUserProps) => {
  const updateUser = useUpdateUser();
  const [values, setValues] = useState({
    id: user.id,
    userName: user.userName,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    address: user.address,
    dateOfBirth: user.dateOfBirth,
    hireDate: user.hireDate,
  });

  const handleUpdate = async () => {
    await updateUser.mutateAsync(values);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Kullanıcıyı güncelle</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Kullanıcıyı güncellemek üzeresiniz.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="firstname"
          label="Ad"
          type="text"
          fullWidth
          variant="standard"
          defaultValue={user.firstName}
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
          defaultValue={user.lastName}
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
          defaultValue={user.userName}
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
          defaultValue={user.email}
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
          defaultValue={user.phoneNumber}
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
          defaultValue={user.address}
          onChange={(e) => {
            setValues({ ...values, address: e.target.value });
          }}
        />
        <DateTimePicker
          autoFocus
          label="Doğum Tarihi"
          // @ts-ignore
          defaultValue={dayjs(user.dateOfBirth)}
          onChange={(date: Date | null) => {
            setValues({ ...values, dateOfBirth: date ? date : new Date() });
          }}
        />
        <DateTimePicker
          autoFocus
          label="İşe Giriş Tarihi"
          // @ts-ignore
          defaultValue={dayjs(user.hireDate)}
          onChange={(date: Date | null) => {
            setValues({ ...values, hireDate: date ? date : new Date() });
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={updateUser.isLoading}>
          İptal
        </Button>
        <Button onClick={handleUpdate} disabled={updateUser.isLoading}>
          Güncelle
        </Button>
      </DialogActions>
    </Dialog>
  );
};
