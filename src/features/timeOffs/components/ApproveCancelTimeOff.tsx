import { Button } from "@mui/material";
import { useApproveCancelTimeOff } from "../api/approveCancelTimeOff";
import { Fragment } from "react";

type ApproveCancelTimeOffProps = {
  timeOffId: number;
};

export const ApproveCancelTimeOff = ({
  timeOffId,
}: ApproveCancelTimeOffProps) => {
  const approveCancelTimeOffMutation = useApproveCancelTimeOff();

  const handleApproveCancelTimeOff = (isApproved: boolean) => {
    approveCancelTimeOffMutation.mutate({ timeOffId, isApproved });
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
