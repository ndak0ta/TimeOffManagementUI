import React, { Fragment, useEffect } from "react";
import Title from "./Title";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import {
  getTimeOffsAndSetTimeOffs,
} from "../../redux/timeOffThunks";
import "dayjs/locale/tr";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import TimeOffTable from "./TimeOffTable";
import { ITimeOff } from "../../utils/Interfaces";

export default function TimeOffs() {
  const token = useSelector((state: any) => state.token.token);
  const timeOff = useSelector((state: any) => state.timeOff);
  const dispatch = useDispatch<AppDispatch>();

  const [value, setValue] = React.useState("1");

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getTimeOffsAndSetTimeOffs(token));
  }, []);

  if (timeOff.loading) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <Title>İzin isteklerim</Title>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleTabChange}
              aria-label="lab API tabs example"
            >
              <Tab label="Bekleyen" value="1" />
              <Tab label="Onaylananlar" value="2" />
              <Tab label="Reddedilenler" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <TimeOffTable
              timeOff={timeOff.timeOff.filter(
                (timeOff: ITimeOff) => timeOff.isPending
              )}
            />
          </TabPanel>
          <TabPanel value="2">
            <TimeOffTable
              timeOff={timeOff.timeOff.filter(
                (timeOff: ITimeOff) => timeOff.isApproved
              )}
            />
          </TabPanel>
          <TabPanel value="3">
            <TimeOffTable
              timeOff={timeOff.timeOff.filter(
                (timeOff: ITimeOff) => !timeOff.isApproved && !timeOff.isPending
              )}
            />
          </TabPanel>
        </TabContext>
      </Box>
    </Fragment>
  );
}
