import { useUser } from "@lib/auth";
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

type DeleteuserProps = {
  id: string;
  open: boolean;
  handleClose: () => void;
};
// TODO authentication için geri dön
export const DeleteUser = ({ id, open, handleClose }: DeleteuserProps) => {
  const user = useUser();
  const deleteUserMutation = useDeleteUser();
  const theme = useTheme();
  // @ts-ignore
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleDelete = () => {
    deleteUserMutation.mutate({ id });
  };

  if (user?.data?.id === id) return null;

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
