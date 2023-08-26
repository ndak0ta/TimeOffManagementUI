import { Button } from "@mui/material";
import { useDrawCancelTimeOff } from "../api/drawCancelTimeOff";
import { useSetAtom } from "jotai";
import { snackbarAtom } from "@stores/snackbar";

type DrawCancelTimeOffProps = {
  id: number;
};

export default function DrawCancelTimeOff({ id }: DrawCancelTimeOffProps) {
  const drawCancelTimeOff = useDrawCancelTimeOff();
  const setSnacbarState = useSetAtom(snackbarAtom);

  const handleDrawCancelTimeOff = async () => {
    await drawCancelTimeOff
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
          message: "İptal talebi çekildi.",
          severity: "success",
        });
      });
  };

  return (
    <Button
      variant="text"
      color="error"
      onClick={handleDrawCancelTimeOff}
      disabled={drawCancelTimeOff.isLoading}
    >
      İptal Talebini Çek
    </Button>
  );
}
