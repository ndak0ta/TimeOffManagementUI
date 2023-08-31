import { useState } from "react";
import { Button, Menu, MenuItem, TableCell, TableRow } from "@mui/material";
import { User } from "../types";
import { formatDate } from "@utils/format";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { UpdateUser } from "./UpdateUser";
import { DeleteUser } from "./DeleteUser";
import AddUserToRole from "./AddUserToRole";

type UserListElementProps = {
  key: number;
  user: User;
};

export const UserListItem = ({ key, user }: UserListElementProps) => {
  const [openUpdateDialog, setOpenUpdateDialog] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [openAddUserToRoleDialog, setOpenAddUserToRoleDialog] =
    useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

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
          aria-controls={openMenu ? "user-menu-" + key : undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? "true" : undefined}
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          <MoreHorizIcon />
        </Button>
        <Menu
          id={"user-menu-" + key}
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
        />
        <DeleteUser
          user={user}
          open={openDeleteDialog}
          handleClose={() => setOpenDeleteDialog(false)}
        />
        <AddUserToRole
          userId={user.id}
          open={openAddUserToRoleDialog}
          handleClose={() => setOpenAddUserToRoleDialog(false)}
        />
      </TableCell>
    </TableRow>
  );
};
