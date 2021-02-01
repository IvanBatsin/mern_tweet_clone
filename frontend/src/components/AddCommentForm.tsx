import React from 'react';
import { Avatar } from '@material-ui/core';
import { useHomeStyles } from '../pages/home/homeClasses';
import { User } from '../interfaces/User';
import TextareaAutosize from '@material-ui/core/TextareaAutosize/TextareaAutosize';
import { useFormText } from '../hooks/useFormText';
import Button from '@material-ui/core/Button/Button';
import { FormCircularProgress } from './FormTextCircularProgress';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import { LoadingState } from '../interfaces/LoadingState';
import Alert from '@material-ui/lab/Alert/Alert';
import { commentAPi } from '../services/api/commentsApi';
import { CommentCreateObj } from '../services/api/commentsApi';
import { Comment } from '../interfaces/Comment';

interface AddCommentFormProps {
  currentUser: User,
  tweetId: string,
  addNewComment: (payload: Comment) => void
}

export const AddCommentForm: React.FC<AddCommentFormProps> = ({currentUser, tweetId, addNewComment}: AddCommentFormProps) => {
  const classes = useHomeStyles();
  const MAX_LENGTH = 300;
  const { handleChangeText, setText, text } = useFormText('', MAX_LENGTH);
  const [loadingState, setLoadingState] = React.useState<LoadingState>(LoadingState.NEVER);
  let textLimitPercent = Math.round((text.length / MAX_LENGTH) * 100);
  let textCount = MAX_LENGTH - text.length;

  const handleAddComment = async (): Promise<void> => {
    try {
      const payload: CommentCreateObj = {
        owner: currentUser._id,
        tweetId,
        text: text.trim()
      };
      setLoadingState(LoadingState.LOADING);
      const res = await commentAPi.create(payload);
      console.log(res);
      setText('');
      setLoadingState(LoadingState.LOADED);
      res.data.owner = currentUser;
      addNewComment(res.data);
    } catch (error) {
      console.log('error', error);
      setLoadingState(LoadingState.ERROR);
    }
  }

  if (!currentUser) return null;

  return (
    <div style={{width: 550}}>
      <div className={classes.addFormBody}>
        <Avatar
          style={{marginRight: 10}}
          className={classes.twitterAvatar}
          alt="Users avatar"
          src={currentUser.avatarUrl}
        />
        <TextareaAutosize
          onChange={handleChangeText}
          className={classes.addFormTextarea}
          placeholder="Your comment..."
          value={text}
          rowsMax={15}
        />
      </div>
      <div className={classes.addFormBottom} style={{justifyContent:'flex-end'}}>
        <div className={classes.addFormBottomRight}>
          {text.length ?
            <FormCircularProgress 
              MAX_LENGTH={MAX_LENGTH} 
              classes={classes}
              text={text}
              textCount={textCount}
              textLimitPercent={textLimitPercent}/> : null}
          <Button 
            onClick={handleAddComment}
            disabled={loadingState === LoadingState.LOADING || !text || text.length >= MAX_LENGTH} 
            color="primary" 
            variant="contained">
            {loadingState === LoadingState.LOADING ? <CircularProgress size={16} color="secondary"></CircularProgress> : 'Комментировать'}
          </Button>
        </div>
      </div>
      {loadingState === LoadingState.ERROR && <Alert style={{marginTop: 10}} severity="error">Ошибка при добавление твитта</Alert>}
    </div>
  )
}