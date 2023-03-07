import React from "react";
import { Controller } from "react-hook-form";
import { FormControlLabel, Checkbox as MuiCheckbox  } from "@mui/material";


export const Checkboxtmb = ({
    name,
    label,
    control,
    labelPlacement,
    disabled,
    className
  }) => {
    return (
      <FormControlLabel
        label={label}
        disabled={disabled}
        labelPlacement={labelPlacement}
        className={className}
        control={
          <Controller
            name={name}
            control={control}
            rules={{ required: true }}
            render={({ field: { value, ...field } }) => (
              <MuiCheckbox
                {...field}
                checked={!!value}
              />
            )}
          />
        }
      />
    );
  };