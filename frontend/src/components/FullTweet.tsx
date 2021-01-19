import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchFullTweet, setFullTweet } from '../store/ducks/tweetFull/actionCreators';
import { selectFullTweetData, selectFullTweetIsLoaded } from '../store/ducks/tweetFull/selectors';
import { useHomeStyles } from '../pages/home/homeClasses';
import { Paper, Avatar, Typography, IconButton } from '@material-ui/core';
import format from 'date-fns/format';
import {ru} from 'date-fns/locale';

// UI
import CircularProgress from '@material-ui/core/CircularProgress';
import RepeatIcon from '@material-ui/icons/Repeat';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PublishIcon from '@material-ui/icons/Publish';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

const FullTweet: React.FC = (): React.ReactElement | null => {
  const classes = useHomeStyles();
  const params: {id: string} = useParams();
  const dispatch = useDispatch();
  const id = params.id;
  const tweet = useSelector(selectFullTweetData);
  const isLoaded = useSelector(selectFullTweetIsLoaded);

  useEffect(() => {
    if (id) dispatch(fetchFullTweet(id));

    return () => {
      dispatch(setFullTweet(undefined));
    }
  }, [dispatch, id]);

  if (!isLoaded) return <div className={classes.tweetsCentered}><CircularProgress/></div>;
  if (tweet) {
    return (
      <Paper className={classNames(classes.twitterWrapperHeader, classes.twitterItem)}>
        <div style={{display:'flex'}}> 
          <Avatar 
            className={classes.twitterAvatar}
            alt={`${tweet.user.userName}'s avatar`} 
            src={tweet.user.avatarUrl}></Avatar>
          <Typography style={{marginLeft: 20}}>
            <b>{tweet.user.fullName}</b>
            <div>
              <span className={classes.twitterUserName}>@{tweet.user.userName}&nbsp;</span>
              <span className={classes.twitterUserName}>{format(new Date(tweet.createdAt), 'H:mm MMMM yyy', {locale: ru})}</span>
            </div>
          </Typography>
        </div>
        <Typography style={{fontSize:24}} variant="body1" gutterBottom>
          {tweet.text}  
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
    );
  }
  return null;
}

export default FullTweet;