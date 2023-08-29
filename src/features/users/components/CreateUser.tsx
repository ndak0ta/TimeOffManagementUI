import { useState } from "react";
import { useCreateUser } from "../api/createUser";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useSetAtom } from "jotai";
import { snackbarAtom } from "@stores/snackbar";
import { PhoneMask } from "@components/PhoneMask";

type CreateUserProps = {
  open: boolean;
  handleClose: () => void;
};

export const CreateUser = ({ open, handleClose }: CreateUserProps) => {
  const createUser = useCreateUser();
  const [values, setValues] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    dateOfBirth: new Date(),
    hireDate: new Date(),
  });
  const setSnackbarState = useSetAtom(snackbarAtom);

  const handleCreate = async () => {
    await createUser
      .mutateAsync(values)
      .catch((err) =>
        setSnackbarState({
          open: true,
          severity: "error",
          message: err.response.data.error,
        })
      )
      .finally(() => {
        if (createUser.isSuccess) {
          setSnackbarState({
            open: true,
            severity: "success",
            message: "Kullanıcı başarıyla oluşturuldu",
          });

          handleClose();
        }
      });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Kullanıcıyı oluştur</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Kullanıcı adı ve şifresi otomatik oluşturulup mail olarak
          iletilecektir.
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
          fullWidth
          variant="standard"
          InputProps={{
            inputComponent: PhoneMask as any,
          }}
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
