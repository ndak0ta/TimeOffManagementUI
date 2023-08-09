import React, { Fragment } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { ITimeOff, IUser } from "../../utils/Interfaces";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import {
  approveTimeOffAndSetTimeOffs,
  getAllTimeOffsAndSetAllTimeOffs,
} from "../../redux/timeOffThunks";
import dayjs from "dayjs";
import { approveOrDeclineTimeOffCancelAndSetTimeOffCancels } from "../../redux/timeOffCancelThunks";

export default function TimeOffTableManager({
  timeOffs,
  users,
}: {
  timeOffs: ITimeOff[];
  users: IUser[];
}) {
  const loading = useSelector((state: any) => state.timeOff.loading);
  const token = useSelector((state: any) => state.token.token);
  const dispatch = useDispatch<AppDispatch>();

  const handleApproveTimeOff = async (timeOffId: number, status: boolean) => {
    await dispatch(
      approveTimeOffAndSetTimeOffs({ token, timeOffId, status })
    ).then(async () => {
      await dispatch(getAllTimeOffsAndSetAllTimeOffs(token));
    });
  };

  const handleApproveTimeOffCancel = async (
    timeOffCancelId: number,
    isApproved: boolean
  ) => {
    await dispatch(
      approveOrDeclineTimeOffCancelAndSetTimeOffCancels({
        token,
        timeOffCancelId,
        isApproved,
      })
    ).then(async () => {
      await dispatch(getAllTimeOffsAndSetAllTimeOffs(token));
    });
  };

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell align="center">Çalışan</TableCell>
          <TableCell align="center">Açıklama</TableCell>
          <TableCell align="center">Başlangıç Tarihi</TableCell>
          <TableCell align="center">Bitiş Tarihi</TableCell>
          <TableCell align="center">Durum/İşlem</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {timeOffs.map((timeOff: ITimeOff) => (
          <TableRow key={timeOff.id}>
            <TableCell align="center">
              {users.find((u) => u.id === timeOff.userId)?.firstName}{" "}
              {users.find((u) => u.id === timeOff.userId)?.lastName}
            </TableCell>
            <TableCell align="center">{timeOff.description}</TableCell>
            <TableCell align="center">
              {dayjs(timeOff.startDate).locale("tr").format("dddd DD/MM/YYYY")}
            </TableCell>
            <TableCell align="center">
              {dayjs(timeOff.endDate).locale("tr").format("dddd DD/MM/YYYY")}
            </TableCell>
            {!timeOff.isApproved && timeOff.isPending ? (
              !loading ? (
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ marginRight: 1 }}
                    onClick={() => handleApproveTimeOff(timeOff.id, true)}
                  >
                    Onayla
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleApproveTimeOff(timeOff.id, false)}
                  >
                    Reddet
                  </Button>
                </TableCell>
              ) : (
                <TableCell align="center">loading...</TableCell>
              )
            ) : timeOff.isApproved ? (
              <TableCell align="center">Onaylandı</TableCell>
            ) : (
              <TableCell align="center">Reddedildi</TableCell>
            )}
            {timeOff.isApproved && timeOff.hasCancelRequest ? (
              <TableCell align="center">
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ marginRight: 1 }}
                  onClick={() => handleApproveTimeOff(timeOff.id, true)}
                >
                  Onayla
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleApproveTimeOff(timeOff.id, false)}
                >
                  Reddet
                </Button>
              </TableCell>
            ) : null}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
