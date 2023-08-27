import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useTimeOffs } from "../api/getTimeOffs";
import LoadingSpinner from "@components/LoadingSpinner";
import TimeOffListItem from "./TimeOffListItem";

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
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>İsim</TableCell>
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
          {timeOffs.data?.map((timeOff, index) => (
            <TimeOffListItem key={index} timeOff={timeOff} />
          ))}
        </TableBody>
      </Table>
  );
}
