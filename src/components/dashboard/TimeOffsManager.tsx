import React, { Fragment, SyntheticEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { getAllTimeOffsAndSetAllTimeOffs } from "../../redux/timeOffThunks";
import { getAllUserAndSetAllUser } from "../../redux/userThunks";
import { ITimeOff, IUser } from "../../utils/Interfaces";
import TimeOffTableManager from "./TimeOffTableManager";
import Title from "./Title";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { getTimeOffCancelsAndSetTimeOffCancels } from "../../redux/timeOffCancelThunks";

export default function TimeOffsManager() {
  const [timeOffsloading, setTimeOffsloading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(true);
  const [timeOffCancelsLoading, setTimeOffCancelsLoading] = useState(true);
  const [tabValue, setTabValue] = useState("1");
  const token = useSelector((state: any) => state.token.token);
  const timeOffs = useSelector((state: any) => state.timeOff.timeOff);
  const timeOffCancels = useSelector(
    (state: any) => state.timeOffCancel.timeOffCancel
  );
  const users: IUser[] = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch<AppDispatch>();

  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    dispatch(getAllTimeOffsAndSetAllTimeOffs(token)).then(() =>
      setTimeOffsloading(false)
    );
    dispatch(getAllUserAndSetAllUser(token)).then(() => setUsersLoading(false));
    dispatch(getTimeOffCancelsAndSetTimeOffCancels(token)).then(() =>
      setTimeOffCancelsLoading(false)
    );
  }, [dispatch, token]);

  if (timeOffsloading || usersLoading || timeOffCancelsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <Title>İzin istekleri</Title>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleTabChange}
              aria-label="lab API tabs example"
            >
              <Tab label="Hepsi" value="1" />
              <Tab label="Bekleyen" value="2" />
              <Tab label="Bekleyen İptal" value="3" />
              <Tab label="Onaylananlar" value="4" />
              <Tab label="Reddedilenler" value="5" />
              <Tab label="İptal edilenler" value="6" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <TimeOffTableManager timeOffs={timeOffs} users={users} />
          </TabPanel>
          <TabPanel value="2">
            <TimeOffTableManager
              timeOffs={timeOffs.filter((t: ITimeOff) => t.isPending)}
              users={users}
            />
          </TabPanel>
          <TabPanel value="3">
            <TimeOffTableManager
              timeOffs={timeOffs.filter(
                (t: ITimeOff) => t.isApproved && t.hasCancelRequest
              )}
              users={users}
            />
          </TabPanel>
          <TabPanel value="4">
            <TimeOffTableManager
              timeOffs={timeOffs.filter((t: ITimeOff) => t.isApproved)}
              users={users}
            />
          </TabPanel>
          <TabPanel value="5">
            <TimeOffTableManager
              timeOffs={timeOffs.filter(
                (t: ITimeOff) => !t.isApproved && !t.isPending && !t.isCancelled
              )}
              users={users}
            />
          </TabPanel>
          <TabPanel value="6">
            <TimeOffTableManager
              timeOffs={timeOffs.filter((t: ITimeOff) => t.isCancelled)}
              users={users}
            />
          </TabPanel>
        </TabContext>
      </Box>
    </Fragment>
  );
}
