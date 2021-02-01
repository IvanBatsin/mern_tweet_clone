import React from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchFullTweet, setFullTweet } from '../store/ducks/tweetFull/actionCreators';
import { selectFullTweetData, selectFullTweetIsLoaded } from '../store/ducks/tweetFull/selectors';
import { useHomeStyles } from '../pages/home/homeClasses';
import { Paper, Avatar, Typography, IconButton } from '@material-ui/core';
import format from 'date-fns/format';
import { ru } from 'date-fns/locale';
import mediaZoom from 'medium-zoom';
import { Link } from 'react-router-dom';
import { TweetImagesList } from './TweetImagesList';
import { ModalPopup } from './index';
import { AddCommentForm } from './AddCommentForm';
import { User } from '../interfaces/User';
import { Comment } from '../interfaces/Comment';
import { commentAPi } from '../services/api/commentsApi';
import { CommentComponent } from './CommentComponent';

// UI
import CircularProgress from '@material-ui/core/CircularProgress';
import RepeatIcon from '@material-ui/icons/Repeat';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PublishIcon from '@material-ui/icons/Publish';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import Grid from '@material-ui/core/Grid/Grid';

interface FullTweetForm {
  currentUser: User
}

const FullTweet: React.FC<FullTweetForm> = ({currentUser}: FullTweetForm) => {
  const classes = useHomeStyles();
  const [visibleAddComment, setVisibleAddComment] = React.useState<boolean>(false);
  const [comments, setComments] = React.useState<Comment[]>([]);
  const { id } = useParams<{id: string}>();
  const dispatch = useDispatch();
  const tweet = useSelector(selectFullTweetData);
  const tweetIsLoaded = useSelector(selectFullTweetIsLoaded);

  // Modal handlers
  const handleOpenModal = (): void => {
    setVisibleAddComment(true);
  }
  const handleCloseModal = (): void => {
    setVisibleAddComment(false);
  }

  const handleAddComment = (payload: Comment): void => {
    setComments(prevState => [payload, ...prevState]);
    handleCloseModal();
  }

  const fetchTweetComments = async (): Promise<void> => {
    try {
      const data = await commentAPi.getComments(id);
      setComments(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    if (id) {
      dispatch(fetchFullTweet(id));
      fetchTweetComments();
    }

    return () => {
      dispatch(setFullTweet(undefined));
    }
  }, [dispatch, id]);

  React.useEffect(() => {
    if (tweet) {
      mediaZoom('.tweet-images img');
    }
  }, [tweet])

  if (!tweetIsLoaded) return <div className={classes.tweetsCentered}><CircularProgress/></div>;
  if (tweet) {
    return (
      <>
        <Grid container style={{borderBottom:'0.5px solid #efecec'}}>
          <Paper className={classNames(classes.twitterWrapperHeader, classes.twitterItem)} style={{display:'flex', width:'100%'}}>
            <Grid item md={1} sm={1}>
              <Avatar 
                className={classes.twitterAvatar}
                alt={`${tweet.user.userName}'s avatar`} 
                src={tweet.user.avatarUrl}/>
            </Grid>
            <Grid item  md={11} sm={11}>
              <Typography style={{marginLeft: 20}}>
                <b><Link className={classes.twitterWrapperHeaderUserLink} to={`/home/users/${tweet.user._id}`}>{tweet.user.fullName}</Link></b>  
                <div>
                  <span className={classes.twitterUserName}>@{tweet.user.userName}&nbsp;</span>
                  <span className={classes.twitterUserName}>{format(new Date(tweet.createdAt), 'H:mm MMMM yyy', {locale: ru})}</span>
                </div>
                <Typography style={{fontSize:24}} variant="body1" gutterBottom>
                  {tweet.text}  
                </Typography>
                <div className='tweet-images'>
                  {tweet.images && <TweetImagesList classes={classes} images={tweet.images}/>}
                </div>
              </Typography>
            </Grid>
          </Paper>
          <div className={classes.twitterItemFooter} style={{width:'100%', margin:'auto'}}>
            <div>
              <IconButton color="primary" onClick={handleOpenModal}>
                <ChatBubbleOutlineIcon style={{fontSize: 20}}></ChatBubbleOutlineIcon>
              </IconButton>
              <span>{comments.length > 0 ? comments.length : null}</span>
              <ModalPopup onClose={handleCloseModal} visible={visibleAddComment}>
                <AddCommentForm 
                  currentUser={currentUser} 
                  tweetId={id}
                  addNewComment={handleAddComment}/>
              </ModalPopup>
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
        </Grid>
        <div style={{overflowY:'auto', height:'calc(100vh - 310px)'}}>
          {comments.length > 0 && comments.map(comment => <CommentComponent comment={comment} classes={classes}/>)}
        </div>
      </>
    );
  }
  return null;
}

export default FullTweet;