import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useUsers } from "../api/getUsers";

export function UserList() {
  const usersQuery = useUsers();

  if (usersQuery.isLoading) {
    return <div>Loading...</div>; // TODO loading component
  }

  if (!usersQuery.data) return null;

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
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
          </TableRow>
        </TableHead>
        <TableBody>
          {usersQuery.data.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.firstname}</TableCell>
              <TableCell>{user.lastname}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>{user.dateOfBirth}</TableCell>
              <TableCell>{user.hireDate}</TableCell>
              <TableCell>{user.annualTimeOffs}</TableCell>
              <TableCell>{user.remainingAnnualTimeOffs}</TableCell>
              <TableCell>{user.roles}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
