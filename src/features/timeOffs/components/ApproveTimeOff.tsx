import { Fragment } from "react";
import { useApproveTimeOff } from "../api/approveTimeOff";
import { Button } from "@mui/material";

type ApproveTimeOffProps = {
  id: number;
};

export default function ApproveTimeOff({ id }: ApproveTimeOffProps) {
  const approveTimeOffMutation = useApproveTimeOff();

  const handleApprove = (isApproved: boolean) => {
    approveTimeOffMutation.mutateAsync({ timeOffId: id, isApproved });
  };

  if (approveTimeOffMutation.isLoading) {
    return <div>Loading...</div>; // TODO: replace with loading component
  }

  return (
    <Fragment>
      <Button variant="text" color="error" onClick={() => handleApprove(false)} disabled={approveTimeOffMutation.isLoading}>Reddet</Button>
      <Button variant="text" color="success" onClick={() => handleApprove(true)} disabled={approveTimeOffMutation.isLoading}>Onayla</Button>
    </Fragment>
  );
}
