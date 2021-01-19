import makeStyles from "@material-ui/core/styles/makeStyles";
import {theme} from '../../Theme';
import { grey } from '@material-ui/core/colors';

export const useHomeStyles = makeStyles((theme) => ({
  wrapper: {
    heigth: '100vh',
  },
  menuLogo: {
    fontSize: 38,
    margin: '15px 0',
    position: 'relative',
    left: -15
  },
  sideMenuList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    position: 'sticky',
    top: 0,
    maxWidth: 230
  },
  sideMenuListItem: {
    '& div': {
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      padding: '0 10px',
      borderRadius: 30,
      position: 'relative',
      left: -10,
      height: 58,
      marginBottom: 10,
      transition: '.15s ease-in-out',
      '&:hover': {
        backgroundColor: 'rgba(29, 161, 242, .1)',
        '& h6': {
          color: theme.palette.primary.main
        }
      }
    }
  },
  sideMenuListItemTitle: {
    fontWeight: 700,
    fontSize: 20,
    margonLeft: 15
  },
  sideMenuListItemIcon: {
    fontSize: 28
  },
  sideMenuTwitterButton: {
    fontSize: 18,
    color: 'white',
    padding: theme.spacing(3),
    width: 230,
    marginTop: 30
  },
  twitterWrapper: {
    borderRadius: 0,
    height: '100%',
    borderTop: 'none',
    borderBottom: 'none',
  },
  tweetPopupMenu: {
    position: 'absolute',
    right: 0,
    top: 0
  },
  twitterWrapperHeader: {
    borderRight: 'none',
    borderLeft: 'none',
    borderTop: 'none',
    borderRadius: 0,
    padding: '10px 15px',

    '& h6': {
      fontWeight: 800
    }
  },
  twitterWrapperHeaderBackButton: {
    marginRight: 30
  },
  twitterUserName: {
    color: grey[500]
  },
  twitterItemFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: 450,
    position: 'relative',
    left: -15
  },
  twitterItem: {
    cursor: 'pointer',
    paddingTop: 15,
    paddingLeft: 15,
    '&:hover': {
      backgroundColor: 'rgb(245, 248, 250)'
    }
  },
  twitterAvatar: {
    width: theme.spacing(5),
    height: theme.spacing(5)
  },
  tweetsCentered: {
    textAlign: 'center',
    marginTop: 50
  }, 
  rightSide: {
    paddingTop: 20,
    position: 'sticky',
    top: 0
  },
  tweetWrapper: {
    color: 'inherit',
    textDecoration: 'none'
  },
  rightSideBlock: {
    backgroundColor: '#f5f8fa',
    borderRadius: 15,
    marginTop: 20,
    '& .MuiList-root': {
      paddingTop: 0
    }
  },
  rightSideBlockHeader: {
    borderTop: 0,
    borderLeft: 0,
    borderRight: 0,
    backgroundColor: 'transparent',
    padding: '13px 18px',
    '& b': {
      fontSize: 20,
      fontWeight: 800
    }
  },
  rightSideBlockItem: {
    borderBottom: '1px solid grey',
    marginBottom: 5,
    cursor: 'pointer',
    '& .MuiTopography-body1': {
      fontWeight: 700
    },
    '& .MuiListItemAvatar-root': {
      minWidth: 50
    },
    '& .MuiListItemText-root': {
      margin: 0
    },
    '&:hover': {
      backgroundColor: '$edf3f6'
    },
    '& a': {
      color: 'inherit',
      textDecoration: 'none'
    }
  },
  addForm: {
    padding: 20
  },
  mainAddForm: {
    padding: 20
  },
  addFormBody: {
    display: 'flex',
    width: '100%'
  },
  addFormBottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  addFormBottomActions: {
    marginTop: 10,
    paddingLeft: 70
  },
  addFormTextarea: {
    width: '100%',
    border: 0,
    fontSize: 20,
    outline: 'none',
    fontFamily: 'inherit',
    resize: 'none'
  },
  addFormBottomLine: {
    height: 12,
    backgroundColor: '#e6ecf0'
  },
  addFormCircleProgress: {
    position: 'relative',
    width: 20,
    height: 20,
    margin: '0 10px',
    '& .MuiCircularProgress-root': {
      position: 'absolute'
    }
  },
  addFormBottomRight: {
    display: 'flex',
    alignItems: 'center'
  }
}));