import * as React from "react";
import { Controller } from "react-hook-form";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function CheckboxLabels({ control, name, label }) {
  return (
    <FormGroup>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={value}
                onChange={(event) => onChange(event.target.checked)}
                onBlur={onBlur}
                inputRef={ref}
              />
            }
            label={label}
          />
        )}
      />
    </FormGroup>
  );
}
