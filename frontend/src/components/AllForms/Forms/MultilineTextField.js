import * as React from "react";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

const MultilineTextField = React.forwardRef((props, ref) => {
  const { label, placeholder, name, control, sx } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <TextField
          label={label}
          variant="outlined"
          multiline
          rows={4}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          inputRef={ref} // React Hook Form uses ref to register inputs
          error={!!error} // Convert to boolean
          helperText={error ? error.message : ""} // Display error message if exists
          sx={sx}
          fullWidth
        />
      )}
    />
  );
});

export default MultilineTextField;
