import { Button } from "@mui/material";
import { useCancelTimeOff } from "../api/cancelTimeOff";

type CancelTimeOffProps = {
  id: number;
};

export default function CancelTimeOff({ id }: CancelTimeOffProps) {
  const cancelTimeOffMutation = useCancelTimeOff();

  const handleCancel = () => {
    cancelTimeOffMutation.mutateAsync({ id });
  };

  if (cancelTimeOffMutation.isLoading) {
    return <div>Loading...</div>; // TODO: replace with loading component
  }

  return (
    <Button onClick={handleCancel} disabled={cancelTimeOffMutation.isLoading}>
      İptal Talebi Gönder
    </Button>
  );
}
