import { useState } from "react";
import { Button, Menu, MenuItem, TableCell, TableRow } from "@mui/material";
import { User } from "../types";
import { formatDate } from "@utils/format";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { UpdateUser } from "./UpdateUser";
import { DeleteUser } from "./DeleteUser";
import AddUserToRole from "./AddUserToRole";
import { useSetAtom } from "jotai";
import { snackbarAtom } from "@stores/snackbar";

type UserListElementProps = {
  key: number;
  user: User;
};

export const UserListItem = ({ user }: UserListElementProps) => {
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openAddUserToRoleDialog, setOpenAddUserToRoleDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const setSnackbarState = useSetAtom(snackbarAtom);

  return (
    <TableRow key={user.id}>
      <TableCell>{user.firstName}</TableCell>
      <TableCell>{user.lastName}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.phoneNumber}</TableCell>
      <TableCell>{user.address}</TableCell>
      <TableCell>{formatDate(user.dateOfBirth)}</TableCell>
      <TableCell>{formatDate(user.hireDate)}</TableCell>
      <TableCell>{user.annualTimeOffs}</TableCell>
      <TableCell>{user.remainingAnnualTimeOffs}</TableCell>
      <TableCell>{user.roles}</TableCell>
      <TableCell>
        <Button
          id="basic-button"
          color="primary"
          aria-controls={openMenu ? "user-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? "true" : undefined}
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          <MoreHorizIcon />
        </Button>
        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClose={() => setAnchorEl(null)}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => {
              setOpenUpdateDialog(true);
              setAnchorEl(null);
            }}
          >
            Düzenle
          </MenuItem>
          <MenuItem
            onClick={() => {
              setOpenAddUserToRoleDialog(true);
              setAnchorEl(null);
            }}
          >
            Rol değiştir
          </MenuItem>
          <MenuItem
            sx={{ color: "error.main" }}
            onClick={() => {
              setOpenDeleteDialog(true);
              setAnchorEl(null);
            }}
          >
            Sil
          </MenuItem>
        </Menu>
        <UpdateUser
          user={user}
          open={openUpdateDialog}
          handleClose={() => setOpenUpdateDialog(false)}
          setSnackbarState={setSnackbarState}
        />
        <DeleteUser
          id={user.id}
          open={openDeleteDialog}
          handleClose={() => setOpenDeleteDialog(false)}
          setSnackbarState={setSnackbarState}
        />
        <AddUserToRole
          userId={user.id}
          open={openAddUserToRoleDialog}
          handleClose={() => setOpenAddUserToRoleDialog(false)}
          setSnackbarState={setSnackbarState}
        />
      </TableCell>
    </TableRow>
  );
};
