import { ReactElement, useEffect, useState } from "react";
import { TableCell, TableRow } from "@mui/material";
import { TimeOff, TimeOffStates } from "../types";
import { formatDate, formatDateWithDay } from "@utils/format";
import ApproveTimeOff from "./ApproveTimeOff";
import { ApproveCancelTimeOff } from "./ApproveCancelTimeOff";
import { useUsers } from "@features/users/api/getUsers";

type TimeOffListItemProps = {
  timeOff: TimeOff;
};

export default function TimeOffListItem({ timeOff }: TimeOffListItemProps) {
  const user = useUsers();
  const userInfo = user.data?.find((u) => u.id === timeOff.userId);
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
            content: <></>,
          });
          break;
        case TimeOffStates.PENDING:
          setTimeOffStateInTR({
            label: "Beklemede",
            content: <ApproveTimeOff id={timeOff.id} />,
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
            content: <ApproveCancelTimeOff timeOffId={timeOff.id} />,
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
  }, [timeOff]);

  return (
    <TableRow key={timeOff.id}>
      <TableCell>{userInfo?.firstName + " " + userInfo?.lastName}</TableCell>
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
