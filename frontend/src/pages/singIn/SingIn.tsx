import React from 'react';
import { Typography } from '@material-ui/core';
import { useSingInStyles } from './singInClasses';
import { LoginPopup } from './components/LoginModal';
import { RegisterPopup } from './components/RegisterPopup';
import { useSelector } from 'react-redux';
import { selectUserLoadingStatus } from '../../store/ducks/user/selector';
import { Notification } from '../../components/Notification';
import { LoadingState } from '../../interfaces/LoadingState';
import { AlertDialog } from '../../components/AlertDialog';

// UI components
import TwitterIcon from '@material-ui/icons/Twitter';
import SearchIcon from '@material-ui/icons/Search';
import PeopleIcon from '@material-ui/icons/PeopleOutline';
import ChatIcon from '@material-ui/icons/ChatBubbleOutline';
import Button from '@material-ui/core/Button';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const SingIn: React.FC = (): React.ReactElement => {
  const classes = useSingInStyles();
  const userLoadingState = useSelector(selectUserLoadingStatus);
  const [showNotification, setShowNotification] = React.useState<boolean>(false);
  const [showRegisterInfo, setShowRegisterInfo] = React.useState<boolean>(false);

  // Dialog state
  const [visibleModal, setVisibleModal] = React.useState<'singIn' | 'singUp'>();
  const handleOpenSingIn = (): void => {
    setVisibleModal('singIn');
  }
  const handleOpenSingUp = (): void => {
    setVisibleModal('singUp');
  }
  const handleCloseModal = (): void => {
    setVisibleModal(undefined);
  }

  const handleShowRegisterInfo = (): void => {
    setShowRegisterInfo(prevState => !prevState);
  }

  React.useEffect(() => {
    if (userLoadingState === LoadingState.ERROR) {
      setShowNotification(true);
    }
  }, []);

  return (
    <div className={classes.wrapper}>
      {showNotification && <Notification text={'Неудалось выполнить вход'} type={'warning'}/>}
      <section className={classes.blueSide}>
      <TwitterIcon color="primary" className={classes.blueSideBigIcon}/>
        <ul className={classes.blueSideListInfo}>
          <li className={classes.blueSideListInfoItem}>
            <Typography variant="h6"><SearchIcon className={classes.blueSideListInfoIcon}/> Читайте о том, что вам интересно</Typography>
          </li>
          <li className={classes.blueSideListInfoItem}>
            <Typography variant="h6"><PeopleIcon className={classes.blueSideListInfoIcon}/> Узнайте о чем говорят в мире</Typography>
          </li>
          <li className={classes.blueSideListInfoItem}>
            <Typography variant="h6"><ChatIcon className={classes.blueSideListInfoIcon}/> Присоединяйтесь к общению</Typography>
          </li>
        </ul>
      </section>
      <section className={classes.loginSide}>
        {showRegisterInfo && <AlertDialog 
          show={handleShowRegisterInfo} 
          text=' После того, как вы создатите аккаунт, мы пришлем вам на почту ссылку, пройдя по которой, вы подтвертите свой профиль.'
          title='Как пройти регистрацию?'/>}
        <Button className={classes.loginSideInfoIcon} onClick={handleShowRegisterInfo}>
          <HelpOutlineIcon fontSize='large' color='primary'/>
        </Button>
        <div className={classes.loginSideWrapper}>
          <TwitterIcon color="primary" className={classes.loginSideTwitterIcon}/>
          <Typography className={classes.loginSideTitle} gutterBottom variant="h4">Узнай, что проиходит в мире прямо сейчас</Typography>
          <Typography><b>Присоединяйся к Twitter прямо сейчас</b></Typography>
          <br></br>
          <Button onClick={handleOpenSingUp} style={{marginBottom: 20}} variant="contained" color="primary" fullWidth>Зарегестрироваться</Button>
          <Button onClick={handleOpenSingIn} variant="outlined" color="primary" fullWidth>Войти</Button>
          <LoginPopup onClose={handleCloseModal} open={visibleModal === 'singIn'}></LoginPopup>
          <RegisterPopup onClose={handleCloseModal} open={visibleModal === 'singUp'}></RegisterPopup>
        </div>
      </section>
    </div>
  )
}

export { SingIn };