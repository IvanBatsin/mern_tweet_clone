import { makeStyles } from '@material-ui/core';
import { theme } from '../../Theme';

export const useSingInStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    height: '100vh'
  },
  blueSide: {
    backgroundColor: '#1DA1F2',
    flex: '0 0 50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  blueSideBigIcon: {
    position: 'absolute',
    left: '18%',
    top: '40%',
    color: '#10cdd9',
    width: '120%',
    height: '120%',
    transform: 'translate(-50%, -50%)',

    '@media screen and (max-width: 1100px)': {
      '&': {
        width: '90%',
        height: '90%',
        top: '35%',
      }
    }
  },
  blueSideListInfo: {
    zIndex: 10,
    listStyle: 'none',
    padding: 0,
    margin: 0,
    width: 380,
    '& h6': {
      color: 'white',
      fontWeight: 600,
      fontSize: 20,
      display: 'flex',
      alignItems: 'center'
    }
  },
  blueSideListInfoIcon: {
    fontSize: 30,
    marginRight: 15
  },
  blueSideListInfoItem: {
    marginBottom: 40
  },
  loginSide: {
    flex: '0 0 50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative'
  },
  loginSideInfoIcon: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  loginSideTwitterIcon: {
    fontSize: 50
  },
  loginSideWrapper: {
    width: 380
  },
  loginSideTitle: {
    fontWeight: 700,
    fontSize: 32,
    marginBottom: 60,
    marginTop: 20
  },
  loginSideField: {
    marginBottom: 18 
  },
  registerField: {
    marginBottom: theme.spacing(5)
  },
  registerFormControl: {
    marginBottom: theme.spacing(3)
  }
}));