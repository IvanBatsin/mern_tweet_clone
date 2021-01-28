import React from 'react';
import Snackbar from '@material-ui/core/Snackbar/Snackbar';
import { Alert } from '@material-ui/lab';


interface INotification {
  text: string,
  type: "error" | "success" | "info" | "warning"
}

export const Notification: React.FC<INotification> = ({text, type}: INotification) => {
  const [open, setOpen] = React.useState<boolean>(true);

  const handleClose = (event: React.SyntheticEvent | React.MouseEvent): void => {
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type}>
        {text}
      </Alert>
    </Snackbar>
  )
}