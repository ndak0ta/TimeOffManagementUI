import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { formatDate, formatDateWithDay } from "@utils/format";
import { useTimeOffs } from "../api/getTimeOffs";
import { Authorization, ROLES } from "@lib/authorization";
import ApproveTimeOff from "./ApproveTimeOff";
import { ApproveCancelTimeOff } from "./ApproveCancelTimeOff";
import LoadingSpinner from "@components/LoadingSpinner";

export default function TimeOffList() {
  const timeOffs = useTimeOffs({
    config: {
      refetchIntervalInBackground: true,
      refetchInterval: 1000 * 60 * 60,
      refetchOnWindowFocus: true,
    },
  });

  if (timeOffs.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Authorization allowedRoles={[ROLES.MANAGER]}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Açılama</TableCell>
            <TableCell>Başlangıç Tarihi</TableCell>
            <TableCell>Bitiş Tarihi</TableCell>
            <TableCell>Toplam Gün Sayısı</TableCell>
            <TableCell>Oluşturulma Tarihi</TableCell>
            <TableCell>Durum/İşlemler</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {timeOffs.data?.map((timeOff) => (
            <TableRow key={timeOff.id}>
              <TableCell>{timeOff.description}</TableCell>
              <TableCell>{formatDateWithDay(timeOff.startDate)}</TableCell>
              <TableCell>{formatDateWithDay(timeOff.endDate)}</TableCell>
              <TableCell>{timeOff.totalDays}</TableCell>
              <TableCell>{formatDate(timeOff.createdAt)}</TableCell>
              <TableCell>
                {!timeOff.isCancelled ? (
                  timeOff.isApproved ? (
                    timeOff.hasCancelRequest ? (
                      <ApproveCancelTimeOff timeOffId={timeOff.id} />
                    ) : (
                      "Onaylandı"
                    )
                  ) : timeOff.isPending ? (
                    <ApproveTimeOff id={timeOff.id} />
                  ) : (
                    "Rededildi"
                  )
                ) : (
                  "İptal edildi"
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Authorization>
  );
}
