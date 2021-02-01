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
import { TweetImagesList } from './TweetImagesList';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserData } from '../store/ducks/user/selector';
import { User } from '../interfaces/User';
import { deleteTweet } from '../store/ducks/tweets/actionCreators';
import { Tweet } from '../interfaces/Tweet';

interface TweetProps {
  classes: ReturnType<typeof useHomeStyles>,
  currentUser: User
  tweet: Tweet
}

export const TweetComponent: React.FC<TweetProps> = ({classes, currentUser, tweet}: TweetProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleTweetClick = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    history.push(`/home/tweet/${tweet._id}`);
  }

  const handleClose = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(null);
  };

  const handleDeleteTweet = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
    event.preventDefault();
    if (window.confirm('Delete this tweet')) {
      handleClose(event);
      dispatch(deleteTweet(tweet._id));
    }
  }

  if (!currentUser) return null;

  return (
    <div onClick={handleTweetClick} className={classes.tweetWrapper}>
      <Paper className={classNames(classes.twitterWrapperHeader, classes.twitterItem)}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center'}}>
            <Avatar 
              className={classes.twitterAvatar}
              alt={`${tweet.user.userName}'s avatar`} 
              src={tweet.user.avatarUrl}/>
            <div style={{marginLeft:15}}>
              <b>{tweet.user.fullName}</b>
              <Typography>
                <span className={classes.twitterUserName}>@{tweet.user.userName}&nbsp;</span>
                <span className={classes.twitterUserName}>{formateDate(new Date(tweet.createdAt))}</span>
              </Typography>
            </div>
          </div>
          {currentUser!._id === tweet.user._id &&
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
                <MenuItem onClick={handleDeleteTweet}>
                  Удалить твит
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  Редактировать
                </MenuItem>
              </Menu>
            </div>
          }
        </div>
        <Typography variant="body1" style={{overflow:'hidden'}} gutterBottom>
          {tweet.text}  
          {tweet.images && <TweetImagesList classes={classes} images={tweet.images}/>}
        </Typography>
        <div className={classes.twitterItemFooter}>
          <div>
            <IconButton color="primary">
              <ChatBubbleOutlineIcon style={{fontSize: 20}}></ChatBubbleOutlineIcon>
            </IconButton>
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