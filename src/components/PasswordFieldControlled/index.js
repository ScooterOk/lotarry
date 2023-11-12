import React, { forwardRef, useState } from "react";
import { Controller } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
// import { IconEye, IconEyeSlash } from '@/components/icons';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const PasswordFieldControlled = forwardRef((props, ref) => {
  const {
    control,
    name,
    label,
    placeholder = "",
    fullWidth = true,
    layout = "vertical",
    color = "shades.500",
    required = false,
    rules,
    errors,
    size = "medium",
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Controller
      name={name}
      ref={ref}
      control={control}
      {...(rules && { rules })}
      render={({ field }) => (
        <FormControl
          fullWidth={fullWidth}
          {...(layout === "horizontal" && {
            sx: {
              flexDirection: "row",
              alignItems: "center",
            },
          })}
        >
          {!!label && (
            <InputLabel
              shrink
              required={required}
              sx={{
                position: "static",
                transform: "none",
                fontSize: 14,
                lineHeight: "20px",
                color,
                mb: layout === "vertical" ? 0.5 : 0,
                mr: layout === "horizontal" ? 1 : 0,
                flexShrink: 0,
              }}
            >
              {label}
            </InputLabel>
          )}

          <OutlinedInput
            {...field}
            error={!!errors?.[name]}
            placeholder={placeholder}
            fullWidth={fullWidth}
            type={showPassword ? "text" : "password"}
            size={size}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  sx={{
                    padding: 0.875,
                    boxShadow: "none",
                    borderColor: "transparent",
                  }}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            }
          />
          {errors?.[name]?.message && (
            <FormHelperText
              sx={{
                color: "error.main",
              }}
            >
              {errors?.[name]?.message}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
});

PasswordFieldControlled.displayName = "PasswordFieldControlled";
export default PasswordFieldControlled;
