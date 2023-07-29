import React, { Fragment, useEffect } from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { useDispatch, useSelector } from "react-redux";
import { ITimeOff } from "../../utils/Interfaces";
import { AppDispatch } from "../../redux/store";
import { getTimeOffsAndSetTimeOffs } from "../../redux/timeOffThunks";

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Orders() {
  const token = useSelector((state: any) => state.token.token);
  const timeOff = useSelector((state: any) => state.timeOff);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getTimeOffsAndSetTimeOffs(token));
  }, [dispatch]);

  // TODO daha sonra terkar bakılacak
  if (timeOff.loading || timeOff.timeOff === null) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <Title>İzin isteklerim</Title>
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
          {timeOff.timeOff
            .filter(
              (timeOff: ITimeOff) => timeOff.isPending || timeOff.isApproved
            )
            .map((timeOff: ITimeOff) => (
              <TableRow key={timeOff.id}>
                <TableCell>{timeOff.description}</TableCell>
                <TableCell>{timeOff.startDate.toString()}</TableCell>
                <TableCell>{timeOff.endDate.toString()}</TableCell>
                <TableCell>{timeOff.totalDays}</TableCell>
                <TableCell>{timeOff.createdAt.toString()}</TableCell>
                <TableCell>
                  {timeOff.isApproved ? "Onaylandı" : "Onaylanmadı"}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </Fragment>
  );
}
