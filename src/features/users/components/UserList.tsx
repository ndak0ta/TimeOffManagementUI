import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useUsers } from "../api/getUsers";
import { UserListItem } from "./UserListItem";

export function UserList() {
  const users = useUsers({
    config: {
      refetchIntervalInBackground: true,
      refetchInterval: 1000 * 60 * 60,
      refetchOnWindowFocus: true,
    },
  });

  if (users.isLoading) {
    return <div>Loading...</div>; // TODO loading component
  }

  if (!users.data) return null;

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Ad</TableCell>
          <TableCell>Soyad</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Telefon</TableCell>
          <TableCell>Adres</TableCell>
          <TableCell>Doğum Tarihi</TableCell>
          <TableCell>İşe Alınma Tarihi</TableCell>
          <TableCell>Yıllık İzin</TableCell>
          <TableCell>Kalan İzin</TableCell>
          <TableCell>Rol</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.data.map((user, index) => (
          <UserListItem key={index} user={user} />
        ))}
      </TableBody>
    </Table>
  );
}
