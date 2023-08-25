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
import { Dispatch } from "react";

type DeleteuserProps = {
  id: string;
  open: boolean;
  handleClose: () => void;
  setSnackbarState: Dispatch<{
    open: boolean;
    severity: "success" | "error" | "warning" | "info" | undefined;
    message: string;
  }>;
};
// TODO authentication için geri dön
export const DeleteUser = ({
  id,
  open,
  handleClose,
  setSnackbarState,
}: DeleteuserProps) => {
  const deleteUserMutation = useDeleteUser();
  const theme = useTheme();
  // @ts-ignore
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleDelete = async () => {
    await deleteUserMutation
      .mutateAsync({ id })
      .catch((err) => {
        setSnackbarState({
          open: true,
          severity: "error",
          message: err.response.data.error,
        });
      })
      .finally(() => {
        if (deleteUserMutation.isSuccess) {
          setSnackbarState({
            open: true,
            severity: "success",
            message: "Kullanıcı başarıyla silindi",
          });

          handleClose();
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
          Kullanıcı hesabını silmek üzeresiniz. Emin misiniz?
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
