import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useUserTimeOffs } from "../api/getUserTimeOffs";
import { Authorization, ROLES } from "@lib/authorization";
import LoadingSpinner from "@components/LoadingSpinner";
import UserTimeOffListItem from "./UserTimeOffListItem";

export default function UserTimeOffList() {
  const timeOffs = useUserTimeOffs({
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
          {timeOffs.data?.map((timeOff, index) => (
            <UserTimeOffListItem key={index} timeOff={timeOff} />
          ))}
        </TableBody>
      </Table>
    </Authorization>
  );
}
