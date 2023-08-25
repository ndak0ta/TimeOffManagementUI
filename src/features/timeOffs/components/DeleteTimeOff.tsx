import { useDeleteTimeOff } from "../api/deleteTimeOff";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

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

  const handleDelete = async () => {
    await deleteTimeOffMutation.mutateAsync({ id }).then(() => {
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
