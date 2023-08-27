import { Button, TableCell, TableRow } from "@mui/material";
import { formatDate, formatDateWithDay } from "@utils/format";
import { TimeOff, TimeOffStates } from "../types";
import CancelTimeOff from "./CancelTimeOff";
import DrawCancelTimeOff from "./DrawCancelTimeOff";
import { Fragment, ReactElement, useEffect, useState } from "react";
import UpdateTimeOff from "./UpdateTimeOff";
import DeleteTimeOff from "./DeleteTimeOff";

type UserTimeOffListItemProps = {
  timeOff: TimeOff;
};

export default function UserTimeOffListItem({
  timeOff,
}: UserTimeOffListItemProps) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState<boolean>(false);
  const [timeOffStateInTR, setTimeOffStateInTR] = useState<{
    label: string;
    content: ReactElement;
  }>({ label: timeOff.status, content: <></> });

  useEffect(() => {
    if (timeOff) {
      switch (timeOff.status) {
        case TimeOffStates.APPROVED:
          setTimeOffStateInTR({
            label: "Onaylandı",
            content: <CancelTimeOff id={timeOff.id} />,
          });
          break;
        case TimeOffStates.PENDING:
          setTimeOffStateInTR({
            label: "Beklemede",
            content: (
              <Fragment>
                <Button
                  sx={{ mr: 1 }}
                  onClick={() => setOpenUpdateDialog(true)}
                >
                  Düzenle
                </Button>
                <Button onClick={() => setOpenDeleteDialog(true)}>Sil</Button>
                <UpdateTimeOff
                  timeOff={timeOff}
                  open={openUpdateDialog}
                  handleClose={() => setOpenUpdateDialog(false)}
                />
                <DeleteTimeOff
                  id={timeOff.id}
                  open={openDeleteDialog}
                  handleClose={() => setOpenDeleteDialog(false)}
                />
              </Fragment>
            ),
          });
          break;
        case TimeOffStates.REJECTED:
          setTimeOffStateInTR({ label: "Reddedildi", content: <></> });
          break;
        case TimeOffStates.CANCELLED:
          setTimeOffStateInTR({ label: "İptal Edildi", content: <></> });
          break;
        case TimeOffStates.CANCEL_REQUESTED:
          setTimeOffStateInTR({
            label: "İptal Talep Edildi",
            content: <DrawCancelTimeOff id={timeOff.id} />,
          });
          break;
        case TimeOffStates.CANCEL_REJECTED:
          setTimeOffStateInTR({ label: "İptal Reddedildi", content: <></> });
          break;
        default:
          setTimeOffStateInTR({ label: "Bilinmeyen", content: <></> });
          break;
      }
    }
    console.log(timeOff.status);
  }, [timeOff, openDeleteDialog, openUpdateDialog]);

  return (
    <TableRow key={timeOff.id}>
      <TableCell>{timeOff.description}</TableCell>
      <TableCell>{formatDateWithDay(timeOff.startDate)}</TableCell>
      <TableCell>{formatDateWithDay(timeOff.endDate)}</TableCell>
      <TableCell>{timeOff.totalDays}</TableCell>
      <TableCell>{formatDate(timeOff.createdAt)}</TableCell>
      <TableCell>{timeOffStateInTR.label}</TableCell>
      <TableCell>{timeOffStateInTR.content}</TableCell>
    </TableRow>
  );
}
