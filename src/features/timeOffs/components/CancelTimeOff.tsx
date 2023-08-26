import { Button, CircularProgress } from "@mui/material";
import { useCancelTimeOff } from "../api/cancelTimeOff";
import { useSetAtom } from "jotai";
import { snackbarAtom } from "@stores/snackbar";

type CancelTimeOffProps = {
  id: number;
};

export default function CancelTimeOff({ id }: CancelTimeOffProps) {
  const cancelTimeOffMutation = useCancelTimeOff();
  const setSnacbarState = useSetAtom(snackbarAtom);

  const handleCancel = async () => {
    await cancelTimeOffMutation
      .mutateAsync({ id })
      .catch((err) => {
        setSnacbarState({
          open: true,
          message: err.response.data.message || "Bir hata oluştu.",
          severity: "error",
        });
      })
      .finally(() => {
        setSnacbarState({
          open: true,
          message: "İzin iptali talebi gönderildi.",
          severity: "success",
        });
      });
  };

  if (cancelTimeOffMutation.isLoading) {
    return <CircularProgress />;
  }

  return (
    <Button onClick={handleCancel} disabled={cancelTimeOffMutation.isLoading}>
      İptal Talebi Gönder
    </Button>
  );
}
