import Avatar from '@material-ui/core/Avatar/Avatar';
import Typography from '@material-ui/core/Typography/Typography';
import React from 'react';
import { IUser } from '../interfaces/User';
import { useHomeStyles } from '../pages/home/homeClasses';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button/Button';

interface UserInfoBlock {
  user: IUser,
  classes: ReturnType<typeof useHomeStyles>
}

export const UserInfoBlock: React.FC<UserInfoBlock> = ({classes, user}: UserInfoBlock): React.ReactElement => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

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
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  )
}