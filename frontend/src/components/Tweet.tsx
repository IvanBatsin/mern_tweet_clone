import { Paper, Avatar, Typography, IconButton } from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';
import { useHomeStyles } from '../pages/home/homeClasses';
import { useHistory } from 'react-router-dom';
import { formateDate } from '../utils/formatDate';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// UI
import RepeatIcon from '@material-ui/icons/Repeat';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PublishIcon from '@material-ui/icons/Publish';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import MoreVertIcon from '@material-ui/icons/MoreVert';

interface TweetProps {
  _id: string,
  classes: ReturnType<typeof useHomeStyles>,
  text: string,
  createdAt: Date
  user: {
    fullName: string,
    userName: string,
    avatarUrl: string
  }
}

const Tweet: React.FC<TweetProps> = ({classes, user, text, _id, createdAt}: TweetProps): React.ReactElement => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const history = useHistory();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleTweetClick = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    history.push(`/home/tweet/${_id}`);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div onClick={handleTweetClick} className={classes.tweetWrapper}>
      <Paper className={classNames(classes.twitterWrapperHeader, classes.twitterItem)}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center'}}>
            <Avatar 
              className={classes.twitterAvatar}
              alt={`${user.userName}'s avatar`} 
              src={user.avatarUrl}/>
            <div style={{marginLeft:15}}>
              <b>{user.fullName}</b>
              <Typography>
                <span className={classes.twitterUserName}>@{user.userName}&nbsp;</span>
                <span className={classes.twitterUserName}>{formateDate(new Date(createdAt))}</span>
              </Typography>
            </div>
          </div>
          <div>
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                Удалить твит
              </MenuItem>
              <MenuItem onClick={handleClose}>
                Редактировать
              </MenuItem>
            </Menu>
          </div>
        </div>
        <Typography variant="body1" gutterBottom>
          {text}  
        </Typography>
        <div className={classes.twitterItemFooter}>
          <div>
            <IconButton color="primary">
              <ChatBubbleOutlineIcon style={{fontSize: 20}}></ChatBubbleOutlineIcon>
            </IconButton>
            <span>1</span>
          </div>
          <div>
            <IconButton color="primary">
              <RepeatIcon style={{fontSize: 20}}></RepeatIcon>
            </IconButton>
          </div>
          <div>
            <IconButton color="primary">
              <FavoriteBorderIcon style={{fontSize: 20}}></FavoriteBorderIcon>
            </IconButton>
          </div>
          <div>
            <IconButton color="primary">
              <PublishIcon style={{fontSize: 20}}></PublishIcon>
            </IconButton>
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default Tweet;