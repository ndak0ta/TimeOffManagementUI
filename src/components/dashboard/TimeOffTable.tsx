import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { ITimeOff } from "../../utils/Interfaces";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { deleteTimeOffAndSetTimeOffs } from "../../redux/timeOffThunks";

export default function TimeOffTable({ timeOff }: any) {
  const token = useSelector((state: any) => state.token.token);
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteTimeOff = async (timeOffId: number) => {
    await dispatch(deleteTimeOffAndSetTimeOffs({ token, timeOffId }));
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
            <TableCell>
              {timeOff.isApproved || !timeOff.isApproved && !timeOff.isPending ? null : (
                <Button
                  variant="text"
                  color="error"
                  href="#"
                  onClick={() => handleDeleteTimeOff(timeOff.id)}
                >
                  Sil
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}