import { Authorization, ROLES } from "@lib/authorization";
import { useCreateTimeOff } from "../api/createTimeOff";
import { useState } from "react";
import dayjs from "dayjs";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

type CreateTimeOffProps = {
  open: boolean;
  handleClose: () => void;
};

export default function CreateTimeOff({
  open,
  handleClose,
}: CreateTimeOffProps) {
  const createTimeOffMutation = useCreateTimeOff();
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(dayjs(new Date()));
  const [endDate, setEndDate] = useState(dayjs(new Date()));

  const defaultStartDate = dayjs(new Date()).add(1, "day");
  const defaultEndDate = dayjs(new Date()).add(1, "day");

  const handleOperation = async () => {
    await createTimeOffMutation
      .mutateAsync({
        description,
        startDate: startDate.toDate(),
        endDate: endDate.toDate(),
      })
      .then(() => {
        handleClose();
      });
  };

  return (
    <Authorization allowedRoles={[ROLES.EMPLOYEE]}>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>İzin talebi oluştur</DialogTitle>
        <DialogContent>
          <DialogContentText>
            İzin talebi oluşturmak üzeresizniz
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Açıklama"
            type="text"
            fullWidth
            variant="standard"
            inputProps={{ maxLength: 255 }}
            onChange={(e) => setDescription(e.target.value)}
          />
          <DatePicker
            label="Başlangıç tarihi"
            onChange={(date: Date | null) =>
              date ? setStartDate(dayjs(date)) : null
            }
            format="DD/MM/YYYY" // TODO daha sonra gün isim olarak değiştirilebilir
            // @ts-ignore
            defaultValue={defaultStartDate}
            disablePast
            sx={{ marginBottom: "8px", width: "100%" }}
          />
          <DatePicker
            label="Bitiş tarihi"
            onChange={(date: Date | null) =>
              date ? setEndDate(dayjs(date)) : null
            }
            format="DD/MM/YYYY"
            // @ts-ignore
            defaultValue={defaultEndDate}
            // @ts-ignore
            minDate={startDate}
            sx={{ width: "100%" }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            disabled={createTimeOffMutation.isLoading}
          >
            İptal
          </Button>
          <Button
            onClick={handleOperation}
            disabled={createTimeOffMutation.isLoading}
          >
            Gönder
          </Button>
        </DialogActions>
      </Dialog>
    </Authorization>
  );
}
