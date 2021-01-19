import IconButton from '@material-ui/core/IconButton/IconButton';
import React from 'react';
import { useHomeStyles } from '../pages/home/homeClasses';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom';

interface BackButtonProps {
  classes: ReturnType<typeof useHomeStyles>
}

const BackButton: React.FC<BackButtonProps> = ({classes}: BackButtonProps): React.ReactElement => {
  const history = useHistory();

  const handleClickButton = () => {
    history.goBack();
  }
  return (
    <IconButton onClick={handleClickButton} className={classes.twitterWrapperHeaderBackButton} color="primary">
      <ArrowBackIcon/>
    </IconButton>
  )
}

export default BackButton;