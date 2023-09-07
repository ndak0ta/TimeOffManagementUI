import { Fragment, useState } from "react";
import { Button, Menu, MenuItem, TableCell, TableRow } from "@mui/material";
import { User } from "../types";
import { formatDate } from "@utils/format";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { UpdateUser } from "./UpdateUser";
import { DeleteUser } from "./DeleteUser";
import AddUserToRole from "./AddUserToRole";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";

type UserListElementProps = {
  user: User;
};

export const UserListItem = ({ user }: UserListElementProps) => {
  const [openUpdateDialog, setOpenUpdateDialog] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [openAddUserToRoleDialog, setOpenAddUserToRoleDialog] =
    useState<boolean>(false);

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
        <PopupState variant="popover" popupId={"user-popup-menu-" + user.id}>
          {(popupState) => (
            <Fragment>
              <Button {...bindTrigger(popupState)}>
                <MoreHorizIcon />
              </Button>
              <Menu {...bindMenu(popupState)}>
                <MenuItem
                  onClick={() => {
                    setOpenUpdateDialog(true);
                    popupState.close();
                  }}
                >
                  Düzenle
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setOpenAddUserToRoleDialog(true);
                    popupState.close();
                  }}
                >
                  Rol değiştir
                </MenuItem>
                <MenuItem
                  sx={{ color: "error.main" }}
                  onClick={() => {
                    setOpenDeleteDialog(true);
                    popupState.close();
                  }}
                >
                  Sil
                </MenuItem>
              </Menu>
            </Fragment>
          )}
        </PopupState>
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
