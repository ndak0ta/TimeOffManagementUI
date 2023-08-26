import { Fragment } from "react";
import { useApproveTimeOff } from "../api/approveTimeOff";
import { Button } from "@mui/material";
import { useSetAtom } from "jotai";
import { snackbarAtom } from "@stores/snackbar";

type ApproveTimeOffProps = {
  id: number;
};

export default function ApproveTimeOff({ id }: ApproveTimeOffProps) {
  const approveTimeOffMutation = useApproveTimeOff();
  const setSnacbarState = useSetAtom(snackbarAtom);

  const handleApprove = (isApproved: boolean) => {
    approveTimeOffMutation
      .mutateAsync({ timeOffId: id, isApproved })
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
          message: `İzin talebi ${isApproved ? "onaylandı" : "reddedildi"}.`,
          severity: "success",
        });
      });
  };

  return (
    <Fragment>
      <Button
        variant="text"
        color="error"
        onClick={() => handleApprove(false)}
        disabled={approveTimeOffMutation.isLoading}
      >
        Reddet
      </Button>
      <Button
        variant="text"
        color="success"
        onClick={() => handleApprove(true)}
        disabled={approveTimeOffMutation.isLoading}
      >
        Onayla
      </Button>
    </Fragment>
  );
}
