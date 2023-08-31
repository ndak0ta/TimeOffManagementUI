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
import { useSetAtom } from "jotai";
import { snackbarAtom } from "@stores/snackbar";

type CreateTimeOffProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function CreateTimeOff({ open, setOpen }: CreateTimeOffProps) {
  const defaultStartDate = dayjs(new Date()).add(1, "day");
  const defaultEndDate = dayjs(new Date()).add(1, "day");
  const createTimeOffMutation = useCreateTimeOff();
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const setSnacbarState = useSetAtom(snackbarAtom);

  const handleClose = () => {
    setDescription("");
    setStartDate(defaultStartDate);
    setEndDate(defaultEndDate);
    setOpen && setOpen(false);
  };

  const handleOperation = async () => {
    await createTimeOffMutation
      .mutateAsync({
        description,
        startDate: startDate.toDate(),
        endDate: endDate.toDate(),
      })
      .catch((error) => {
        setSnacbarState({
          open: true,
          message: error.response.data.message || "Bir hata oluştu.",
          severity: "error",
        });
      })
      .finally(() => {
        setSnacbarState({
          open: true,
          message: "İzin talebi oluşturuldu.",
          severity: "success",
        });
        setDescription("");
        setStartDate(defaultStartDate);
        setEndDate(defaultEndDate);
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
            format="DD/MM/YYYY"
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
