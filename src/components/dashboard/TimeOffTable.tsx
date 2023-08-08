import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { ITimeOff, ITimeOffUpdate } from "../../utils/Interfaces";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import {
  deleteTimeOffAndSetTimeOffs,
  getTimeOffsAndSetTimeOffs,
  updateTimeOffAndSetTimeOffs,
} from "../../redux/timeOffThunks";
import TimeOffDialog from "./TimeOffDialog";
import {
  createTimeOffCancelAndSetTimeOffCancels,
  deleteTimeOffCancelAndSetTimeOffCancels,
} from "../../redux/timeOffCancelThunks";

export default function TimeOffTable({ timeOff }: any) {
  const [openDialog, setOpenDialog] = useState<Number | null>(null);
  const token = useSelector((state: any) => state.token.token);
  const dispatch = useDispatch<AppDispatch>();

  const handleClose = () => {
    setOpenDialog(null);
  };

  const handleUpdateTimeOff = async (timeOff: ITimeOffUpdate) => {
    await dispatch(updateTimeOffAndSetTimeOffs({ token, timeOff }));
  };

  const handleDeleteTimeOff = async (timeOffId: number) => {
    await dispatch(deleteTimeOffAndSetTimeOffs({ token, timeOffId }));
  };

  const handleCancelTimeOff = async (timeOffId: number) => {
    await dispatch(
      createTimeOffCancelAndSetTimeOffCancels({ token, timeOffId })
    ).then(async () => {
      await dispatch(getTimeOffsAndSetTimeOffs(token));
    });
  };

  const handleDeleteCancelTimeOff = async (timeOffCancelId: number) => {
    await dispatch(
      deleteTimeOffCancelAndSetTimeOffCancels({ token, timeOffCancelId })
    ).then(async () => {
      await dispatch(getTimeOffsAndSetTimeOffs(token));
    });
  };

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Açılama</TableCell>
          <TableCell>Başlangıç Tarihi</TableCell>
          <TableCell>Bitiş Tarihi</TableCell>
          <TableCell>Toplam Gün Sayısı</TableCell>
          <TableCell>Oluşturulma Tarihi</TableCell>
          <TableCell>Durum</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {timeOff.map((timeOff: ITimeOff) => (
          <TableRow key={timeOff.id}>
            <TableCell>{timeOff.description}</TableCell>
            <TableCell>
              {dayjs(timeOff.startDate).locale("tr").format("dddd DD/MM/YYYY")}
            </TableCell>
            <TableCell>
              {dayjs(timeOff.endDate).locale("tr").format("dddd DD/MM/YYYY")}
            </TableCell>
            <TableCell>{timeOff.totalDays}</TableCell>
            <TableCell>
              {dayjs(timeOff.createdAt).locale("tr").format("dddd DD/MM/YYYY")}
            </TableCell>
            <TableCell>
              {timeOff.isApproved ? "Onaylandı" : "Onaylanmadı"}
            </TableCell>
            {timeOff.isApproved ||
            (!timeOff.isApproved && !timeOff.isPending) ? null : (
              <TableCell>
                <Button
                  variant="text"
                  color="success"
                  onClick={() => setOpenDialog(timeOff.id)}
                >
                  Düzenle
                </Button>
                <TimeOffDialog
                  openTimeOffDialog={openDialog === timeOff.id}
                  handleClose={handleClose}
                  operation={{
                    type: "update",
                    function: handleUpdateTimeOff,
                  }}
                  title="İzin Düzenle"
                  contentText="İzin düzenlemek üzeresiniz."
                  id={timeOff.id}
                  descriptionBefore={timeOff.description}
                  startDateBefore={timeOff.startDate}
                  endDateBefore={timeOff.endDate}
                />
              </TableCell>
            )}
            {timeOff.isApproved ||
            (!timeOff.isApproved && !timeOff.isPending) ? null : (
              <TableCell>
                <Button
                  variant="text"
                  color="error"
                  onClick={() => handleDeleteTimeOff(timeOff.id)}
                >
                  Sil
                </Button>
              </TableCell>
            )}
            {timeOff.isApproved ? (
              !timeOff.hasCancelRequest ? (
                <TableCell>
                  <Button
                    variant="text"
                    color="error"
                    onClick={() => handleCancelTimeOff(timeOff.id)}
                  >
                    İptal Talebi Gönder
                  </Button>
                </TableCell>
              ) : (
                <TableCell>
                  <Button
                    variant="text"
                    color="error"
                    onClick={() => handleDeleteCancelTimeOff(timeOff.id)}
                  >
                    İptal Talebini Geri Al
                  </Button>
                </TableCell>
              )
            ) : null}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
