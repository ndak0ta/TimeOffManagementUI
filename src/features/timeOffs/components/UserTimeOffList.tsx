import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useUserTimeOffs } from "../api/getUserTimeOffs";
import { formatDate, formatDateWithDay } from "@utils/format";
import { Fragment, useState } from "react";
import DeleteTimeOff from "./DeleteTimeOff";
import { Authorization, ROLES } from "@lib/authorization";
import CancelTimeOff from "./CancelTimeOff";
import UpdateTimeOff from "./UpdateTimeOff";
import DrawCancelTimeOff from "./DrawCancelTimeOff";
import LoadingSpinner from "@components/LoadingSpinner";

export default function UserTimeOffList() {
  const timeOffs = useUserTimeOffs({
    config: {
      refetchIntervalInBackground: true,
      refetchInterval: 1000 * 60 * 60,
      refetchOnWindowFocus: true,
    },
  });
  const [openDeleteDialog, setOpenDeleteDialog] = useState<Number | null>(null);
  const [openUpdateDialog, setOpenUpdateDialog] = useState<Number | null>(null);

  if (timeOffs.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Authorization allowedRoles={[ROLES.EMPLOYEE]}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Açılama</TableCell>
            <TableCell>Başlangıç Tarihi</TableCell>
            <TableCell>Bitiş Tarihi</TableCell>
            <TableCell>Toplam Gün Sayısı</TableCell>
            <TableCell>Oluşturulma Tarihi</TableCell>
            <TableCell>Durum</TableCell>
            <TableCell>İşlemler</TableCell>
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
                {timeOff.isApproved && !timeOff.hasCancelRequest
                  ? "Onaylandı"
                  : timeOff.isPending
                  ? timeOff.hasCancelRequest
                    ? "İptal onayı bekliyor"
                    : "Onay Bekliyor"
                  : timeOff.isCancelled
                  ? "İptal edildi"
                  : "Rededildi"}
              </TableCell>
              <TableCell>
                {timeOff.isApproved ? (
                  !timeOff.hasCancelRequest ? (
                    <CancelTimeOff id={timeOff.id} />
                  ) : (
                    <DrawCancelTimeOff id={timeOff.id} />
                  )
                ) : timeOff.isPending ? (
                  <Fragment>
                    <Button sx={{ mr: 1 }}>Düzenle</Button>
                    <Button onClick={() => setOpenDeleteDialog(timeOff.id)}>
                      Sil
                    </Button>
                    <UpdateTimeOff
                      timeOff={timeOff}
                      open={openUpdateDialog === timeOff.id}
                      handleClose={() => setOpenUpdateDialog(null)}
                    />
                    <DeleteTimeOff
                      id={timeOff.id}
                      open={openDeleteDialog === timeOff.id}
                      handleClose={() => setOpenDeleteDialog(null)}
                    />
                  </Fragment>
                ) : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Authorization>
  );
}
