import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";

// Wrap with React.forwardRef to allow refs to propagate correctly
const DatePicker = React.forwardRef(({ label, control, name }, ref) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <MuiDatePicker
          label={label}
          value={value}
          onChange={onChange}
          renderInput={(params) => (
            <TextField
              {...params}
              onBlur={onBlur}
              inputRef={ref} // Use the ref correctly
              error={!!error}
              helperText={error ? error.message : ""}
            />
          )}
        />
      )}
    />
  </LocalizationProvider>
));

export default DatePicker;
