import { Button, CircularProgress } from "@mui/material";
import React, { forwardRef } from "react";

const LoadingButton = forwardRef((props, ref) => {
  const { loading, children, ...rest } = props;
  return (
    <Button
      ref={ref}
      {...rest}
      {...(loading && {
        loading: 1,
        startIcon: (
          <CircularProgress
            size={16}
            color="inherit"
            sx={{
              color: "#ffffff",
            }}
          />
        ),
      })}
    >
      {children}
    </Button>
  );
});

LoadingButton.displayName = "LoadingButton";

export default LoadingButton;
