import Avatar from '@material-ui/core/Avatar/Avatar';
import Typography from '@material-ui/core/Typography/Typography';
import React from 'react';
import { User } from '../interfaces/User';
import { useHomeStyles } from '../pages/home/homeClasses';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button/Button';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { userSignOut } from '../store/ducks/user/actionCreators';

interface UserInfoBlock {
  user: User,
  classes: ReturnType<typeof useHomeStyles>
}

export const UserInfoBlock: React.FC<UserInfoBlock> = ({classes, user}: UserInfoBlock) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const signOut = (): void => {
    window.localStorage.removeItem('token');
    dispatch(userSignOut());
    handleClose();
  }

  if (!user) return null;

  return (
    <div className={classes.sideMenuUserInfo}>
      <Avatar 
        className={classes.twitterAvatar}
        alt={`${user.userName}'s avatar`} 
        src={user.avatarUrl}
      />
      <div style={{display:'flex', justifyContent:'space-between', flex:1, alignItems:'center'}}>
        <div className={classes.sideMenuUserInfoUser}>
          <b>{user.fullName}</b>
          <Typography>
            <span className={classes.twitterUserName}>@{user.userName}</span>
          </Typography>
        </div>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          <ExpandMoreIcon/>
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Link to={`/home/users/${user._id}`} style={{textDecoration:'none', color:'inherit'}}>
            <MenuItem onClick={handleClose}>Мой профиль</MenuItem>
          </Link>
          <MenuItem onClick={signOut}>Выйти</MenuItem>
        </Menu>
      </div>
    </div>
  )
}