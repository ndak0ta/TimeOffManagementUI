import { useSetAtom } from "jotai";
import { useDeleteTimeOff } from "../api/deleteTimeOff";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { snackbarAtom } from "@stores/snackbar";

type DeleteTimeOffProps = {
  id: number;
  open: boolean;
  handleClose: () => void;
};

export default function DeleteTimeOff({
  id,
  open,
  handleClose,
}: DeleteTimeOffProps) {
  const deleteTimeOffMutation = useDeleteTimeOff();
  const setSnacbarState = useSetAtom(snackbarAtom);

  const handleDelete = async () => {
    await deleteTimeOffMutation
      .mutateAsync({ timeOffId: id })
      .catch((error) => {
        setSnacbarState({
          open: true,
          message: error.response.data.message || "Bir hata oluştu.",
          severity: "error",
        });
      })
      .finally(() => {
        setSnacbarState({
          open: true,
          message: "İzin talebi silindi.",
          severity: "success",
        });
        handleClose();
      });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">İzin talebi silinecek</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          İzin talebi silinecek devam etmek istiyor musunuz?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          disabled={deleteTimeOffMutation.isLoading}
        >
          İptal
        </Button>
        <Button
          onClick={handleDelete}
          autoFocus
          disabled={deleteTimeOffMutation.isLoading}
        >
          Onayla
        </Button>
      </DialogActions>
    </Dialog>
  );
}
