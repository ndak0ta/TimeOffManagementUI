import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { UpdateTimeOffDTO, useUpdateTimeOff } from "../api/updateTimeOff";
import { Authorization, ROLES } from "@lib/authorization";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import dayjs from "dayjs";
import { useSetAtom } from "jotai";
import { snackbarAtom } from "@stores/snackbar";

type UpdateTimeOffProps = {
  timeOff: UpdateTimeOffDTO;
  open: boolean;
  handleClose: () => void;
};

export default function UpdateTimeOff({
  timeOff,
  open,
  handleClose,
}: UpdateTimeOffProps) {
  const updateTimeOffMutation = useUpdateTimeOff();
  const [updatedTimeOff, setUpdatedTimeOff] = useState(timeOff);
  const setSnacbarState = useSetAtom(snackbarAtom);

  const handleUpdate = async () => {
    await updateTimeOffMutation
      .mutateAsync(updatedTimeOff)
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
          message: "İzin talebi güncellendi.",
          severity: "success",
        });
        handleClose();
      });
  };

  return (
    <Authorization allowedRoles={[ROLES.EMPLOYEE]}>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>İzin Talebini Güncelle</DialogTitle>
        <DialogContent>
          <DialogContentText>
            İzin talebni düzenlemek üzeresiniz
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
            onChange={(e) =>
              setUpdatedTimeOff({
                ...updatedTimeOff,
                description: e.target.value,
              })
            }
            defaultValue={timeOff.description}
          />

          <DatePicker
            label="Başlangıç tarihi"
            onChange={(date: Date | null) =>
              date
                ? setUpdatedTimeOff({
                    ...updatedTimeOff,
                    startDate: dayjs(date).toDate(),
                  })
                : null
            }
            format="DD/MM/YYYY" // TODO daha sonra gün isim olarak değiştirilebilir
            // @ts-ignore
            defaultValue={dayjs(timeOff.startDate)}
            disablePast
            sx={{ marginBottom: "8px", width: "100%" }}
          />
          <DatePicker
            label="Bitiş tarihi"
            onChange={(date: Date | null) =>
              date
                ? setUpdatedTimeOff({
                    ...updatedTimeOff,
                    endDate: dayjs(date).toDate(),
                  })
                : null
            }
            format="DD/MM/YYYY"
            // @ts-ignore
            defaultValue={dayjs(timeOff.endDate)}
            // @ts-ignore
            minDate={updatedTimeOff.endDate}
            sx={{ width: "100%" }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            disabled={updateTimeOffMutation.isLoading}
          >
            İptal
          </Button>
          <Button
            onClick={handleUpdate}
            disabled={updateTimeOffMutation.isLoading}
          >
            Gönder
          </Button>
        </DialogActions>
      </Dialog>
    </Authorization>
  );
}
