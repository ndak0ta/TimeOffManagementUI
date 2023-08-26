import { Button } from "@mui/material";
import { useApproveCancelTimeOff } from "../api/approveCancelTimeOff";
import { Fragment } from "react";
import { useSetAtom } from "jotai";
import { snackbarAtom } from "@stores/snackbar";

type ApproveCancelTimeOffProps = {
  timeOffId: number;
};

export const ApproveCancelTimeOff = ({
  timeOffId,
}: ApproveCancelTimeOffProps) => {
  const approveCancelTimeOffMutation = useApproveCancelTimeOff();
  const setSnacbarState = useSetAtom(snackbarAtom);

  const handleApproveCancelTimeOff = async (isApproved: boolean) => {
    await approveCancelTimeOffMutation
      .mutateAsync({ timeOffId, isApproved })
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
          message: `İzin iptal talebi ${
            isApproved ? "onaylandı" : "reddedildi"
          }.`,
          severity: "success",
        });
      });
  };

  return (
    <Fragment>
      <Button
        variant="text"
        color="error"
        onClick={() => handleApproveCancelTimeOff(false)}
      >
        Reddet
      </Button>
      <Button
        variant="text"
        color="success"
        onClick={() => handleApproveCancelTimeOff(true)}
      >
        Onayla
      </Button>
    </Fragment>
  );
};
