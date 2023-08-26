import React, { Fragment } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useLogout } from "@lib/auth";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Authorization, ROLES } from "@lib/authorization";

export default function ListItems() {
  const navigate = useNavigate();
  const logout = useLogout();

  return (
    <Fragment>
      <ListItemButton onClick={() => navigate("/")}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Ana Sayfa" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/profile")}>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Profil" />
      </ListItemButton>
      <Authorization allowedRoles={[ROLES.MANAGER]}>
        <ListItemButton onClick={() => navigate("/users")}>
          <ListItemIcon>
            <PeopleAltIcon />
          </ListItemIcon>
          <ListItemText primary="Çalışanlar" />
        </ListItemButton>
      </Authorization>
      <ListItemButton onClick={async () => await logout.mutateAsync(undefined)}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Çıkış yap" />
      </ListItemButton>
    </Fragment>
  );
}
