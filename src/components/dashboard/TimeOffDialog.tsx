import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import { ITimeOffRequest, ITimeOffUpdate } from "../../utils/Interfaces";
import { time } from "console";

function isTimeOffRequest(obj: any) {
  return (
    typeof obj === "object" &&
    "description" in obj &&
    "startDate" in obj &&
    "endDate" in obj
  );
}

export default function TimeOffDialog({
  openTimeOffDialog,
  handleClose,
  operation,
  title,
  contentText,
  id,
  descriptionBefore,
  startDateBefore,
  endDateBefore,
}: {
  openTimeOffDialog: boolean;
  handleClose: () => void;
  operation:
    | { type: "request"; function: (timeOff: ITimeOffRequest) => void }
    | { type: "update"; function: (timeOff: ITimeOffUpdate) => Promise<void> };
  title: string;
  contentText: string;
  id?: number;
  descriptionBefore?: string;
  startDateBefore?: Date;
  endDateBefore?: Date;
}) {
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleOperation = async () => {
    if (operation.type === "request") {
      const timeOff: ITimeOffRequest = { description, startDate, endDate };
      operation.function(timeOff);
    } else if (operation.type === "update") {
      const timeOff: ITimeOffUpdate = {
        id: id ? id : 0,
        description: description,
        startDate: startDate,
        endDate: endDate,
      };
      await operation.function(timeOff);
    }

    handleClose();
  };

  useEffect(() => {
    setDescription(descriptionBefore ? descriptionBefore : "");
    setStartDate(startDateBefore ? startDateBefore : new Date());
    setEndDate(endDateBefore ? endDateBefore : new Date());
  }, []);

  return (
    <Dialog open={openTimeOffDialog} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Açıklama"
          type="text"
          fullWidth
          variant="standard"
          defaultValue={descriptionBefore}
          onChange={(e) => setDescription(e.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="tr">
          <DatePicker
            label="Başlangıç tarihi"
            onChange={(date: Date | null) => (date ? setStartDate(date) : null)}
            format="DD/MM/YYYY"
            // @ts-ignore
            defaultValue={
              startDateBefore
                ? dayjs(startDateBefore)
                : dayjs(new Date()).add(1, "day")
            }
            disablePast
            sx={{ marginBottom: "8px", width: "100%" }}
          />
          <DatePicker
            label="Bitiş tarihi"
            onChange={(date: Date | null) => (date ? setEndDate(date) : null)}
            format="DD/MM/YYYY"
            // @ts-ignore
            defaultValue={
              endDateBefore
                ? dayjs(endDateBefore)
                : dayjs(new Date()).add(1, "day")
            }
            minDate={startDate}
            sx={{ width: "100%" }}
          />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>İptal</Button>
        <Button onClick={handleOperation}>Gönder</Button>
      </DialogActions>
    </Dialog>
  );
}
