import React from 'react';
import Snackbar from '@material-ui/core/Snackbar/Snackbar';
import Alert, { Color } from '@material-ui/lab/Alert/Alert';

interface INotification {
  children: (callback: (text: string, type: Color) => void) => React.ReactElement
}

const Notification: React.FC<INotification> = ({children}: INotification): React.ReactElement => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [notificationObj, setNotificationObj] = React.useState<{text: string, type: Color}>();

  const openNotification = (text: string, type: Color) => {
    setNotificationObj({text, type});
    setOpen(true);
  }
  return (
    <>
      {children(openNotification)}
      <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity={notificationObj?.type}>
          {notificationObj?.text}
        </Alert>
      </Snackbar>
    </>
  )
}

export { Notification }