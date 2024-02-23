import React, { createRef } from 'react';

import { SnackbarProvider } from 'notistack';
import { IconButton } from '@mui/material';
import { IconClose } from '../icons';

const Notifications = ({ children }) => {
  const notiRef = createRef();

  const handleClose = (key) => {
    notiRef.current.closeSnackbar(key);
  };

  return (
    <SnackbarProvider
      ref={notiRef}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      preventDuplicate
      action={(key) => (
        <IconButton size="small" onClick={() => handleClose(key)} sx={{ color: 'background.default' }}>
          <IconClose />
        </IconButton>
      )}
    >
      {children}
    </SnackbarProvider>
  );
};

export default Notifications;
