import React from 'react';
import { useSingInStyles } from '../pages/singIn/singInClasses';

// UI
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import DialogContent from '@material-ui/core/DialogContent';

interface IDialogProps {
  children: React.ReactNode,
  title?: string,
  classes?: ReturnType<typeof useSingInStyles>,
  visible?: boolean,
  onClose: () => void,
}

const Modal: React.FC<IDialogProps> = ({title, visible = false, onClose, children}): React.ReactElement | null => {
  if (!visible) return null;
  return (
    <Dialog open={visible} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        <IconButton onClick={onClose} color="secondary">
          <CloseIcon style={{fontSize: 26}}/>
        </IconButton>
        {title}
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default Modal;