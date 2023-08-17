import { Button } from "@mui/material";
import { useDrawCancelTimeOff } from "../api/drawCancelTimeOff";

type DrawCancelTimeOffProps = {
  id: number;
};

export default function DrawCancelTimeOff({ id }: DrawCancelTimeOffProps) {
  const drawCancelTimeOff = useDrawCancelTimeOff();

  const handleDrawCancelTimeOff = async () => {
    await drawCancelTimeOff.mutateAsync({ id });
  };

  return (
    <Button variant="text" color="error" onClick={handleDrawCancelTimeOff} disabled={drawCancelTimeOff.isLoading}>
      İptal Talebini Çek
    </Button>
  );
}
