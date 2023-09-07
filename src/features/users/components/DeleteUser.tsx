import { useDeleteUser } from "../api/deleteUser";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { useSetAtom } from "jotai";
import { snackbarAtom } from "@stores/snackbar";
import { User } from "../types";

type DeleteuserProps = {
  user: User;
  open: boolean;
  handleClose: () => void;
};

export const DeleteUser = ({ user, open, handleClose }: DeleteuserProps) => {
  const deleteUserMutation = useDeleteUser();
  const theme = useTheme();
  // @ts-ignore
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const setSnackbarState = useSetAtom(snackbarAtom);

  const handleDelete = async () => {
    handleClose();
    await deleteUserMutation
      .mutateAsync({ id: user.id })
      .catch((err) => {
        setSnackbarState({
          open: true,
          severity: "error",
          message: err.response.data.error,
        });
      })
      .finally(() => {
        if (deleteUserMutation.isSuccess) { // FIXME başarılı işlemde false dönüyor
          setSnackbarState({
            open: true,
            severity: "success",
            message: "Kullanıcı başarıyla silindi",
          });
        }
      });
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {"Kullanıcıyı Sil"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {user.firstName + " " + user.lastName} kullanıcısını silmek
          üzeresiniz. Emin misiniz?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={handleClose}
          disabled={deleteUserMutation.isLoading}
        >
          İptal
        </Button>
        <Button
          onClick={handleDelete}
          color="error"
          autoFocus
          disabled={deleteUserMutation.isLoading}
        >
          Sil
        </Button>
      </DialogActions>
    </Dialog>
  );
};
