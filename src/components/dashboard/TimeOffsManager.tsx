import React, { useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import {
  approveTimeOffAndSetTimeOffs,
  getAllTimeOffsAndSetAllTimeOffs,
} from "../../redux/timeOffThunks";
import { getAllUserAndSetAllUser } from "../../redux/userThunks";
import { ITimeOff, IUser } from "../../utils/Interfaces";
import dayjs from "dayjs";

export default function TimeOffsManager() {
  const [loading, setLoading] = React.useState(true);
  const token = useSelector((state: any) => state.token.token);
  const timeOffs = useSelector((state: any) => state.timeOff.timeOff);
  const users: IUser[] = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch<AppDispatch>();

  const handleApproveTimeOff = async (timeOffId: number, status: boolean) => {
    await dispatch(approveTimeOffAndSetTimeOffs({ token, timeOffId, status }));
  };

  useEffect(() => {
    dispatch(getAllTimeOffsAndSetAllTimeOffs(token));
    dispatch(getAllUserAndSetAllUser(token));
    setLoading(false);
  }, [dispatch, token]);

  if (!timeOffs || !users || loading) {
    return <div>Loading...</div>;
  }

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell align="center">Çalışan</TableCell>
          <TableCell align="center">Açıklama</TableCell>
          <TableCell align="center">Başlangıç Tarihi</TableCell>
          <TableCell align="center">Bitiş Tarihi</TableCell>
          <TableCell align="center">İşlemler</TableCell>
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
