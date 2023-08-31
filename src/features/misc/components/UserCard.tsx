import { AuthUser } from "@features/auth";
import CreateTimeOff from "@features/timeOffs/components/CreateTimeOff";
import { Button, Typography } from "@mui/material";
import { Fragment, useState } from "react";

type UserCardProps = {
  user?: AuthUser | null;
};

export default function UserCard({ user }: UserCardProps) {
  const [open, setOpen] = useState(false);

  if (!user) return null;

  return (
    <Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        {user.firstName} {user.lastName}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}></Typography>
      {user.roles?.includes("Manager") ? (
        <Typography component="p">Ünvan: {user.roles}</Typography>
      ) : (
        <Fragment>
          <Typography component="p">
            Yıllık izin bakiyesi: {user.remainingAnnualTimeOffs} /{" "}
            {user.annualTimeOffs}
          </Typography>
          <Typography component="p">Ünvan: {user.roles}</Typography>
          <div>
            <Button
              color="primary"
              variant="text"
              onClick={() => setOpen(true)}
            >
              İzin talebi oluştur
            </Button>
            <CreateTimeOff open={open} setOpen={setOpen} />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
