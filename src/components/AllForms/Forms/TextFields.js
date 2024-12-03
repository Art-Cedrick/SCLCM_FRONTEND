import React, { forwardRef } from "react";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

// Use React.forwardRef to ensure the ref is correctly passed down
const TextFields = forwardRef((props, ref) => {
  const { label, placeholder, name, control, sx } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <TextField
          label={label}
          variant="outlined"
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          inputRef={ref} // Properly forward the ref using inputRef
          error={!!error}
          helperText={error ? error.message : ""}
          sx={sx}
          fullWidth
        />
      )}
    />
  );
});

export default TextFields;
