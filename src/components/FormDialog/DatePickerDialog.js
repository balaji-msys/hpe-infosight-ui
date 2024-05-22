import "./FormDialog.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useState } from "react";

export default function DatePickerFormDialog({
  handleFilterDates,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <p onClick={handleClickOpen} style={{ marginBottom: "0px" }}>
        Custom period
      </p>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            handleFilterDates();
            handleClose();
          },
        }}
        style={{ position: "fixed", bottom: "50%" }}
      >
        <DialogTitle>Select a Date Range</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker"]}>
              <div className="date-selection">
                <DemoItem label="Start Date">
                  <DateTimePicker
                    defaultValue={startDate ? dayjs(startDate) : null}
                    onChange={(selectedDates) =>
                      setStartDate(selectedDates?.$d)
                    }
                  />
                </DemoItem>
                <DemoItem label="End Date">
                  <DateTimePicker
                    defaultValue={endDate ? dayjs(endDate) : null}
                    onChange={(selectedDates) => setEndDate(selectedDates?.$d)}
                  />
                </DemoItem>
              </div>
            </DemoContainer>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>Cancel</Button>
          <Button type="submit" disabled={!startDate}>
            Filter
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
