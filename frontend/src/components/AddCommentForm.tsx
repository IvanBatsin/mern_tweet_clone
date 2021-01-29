import React from 'react';
import { Avatar } from '@material-ui/core';
import { useHomeStyles } from '../pages/home/homeClasses';
import { User } from '../interfaces/User';
import TextareaAutosize from '@material-ui/core/TextareaAutosize/TextareaAutosize';

interface AddCommentFormProps {
  currentUser: User
}

export const AddCommentForm: React.FC<AddCommentFormProps> = ({currentUser}: AddCommentFormProps) => {
  const classes = useHomeStyles();
  const [text, setText] = React.useState<string>('');

  const handleChangeText = (event: React.FormEvent<HTMLTextAreaElement>): void => {
    setText(event.currentTarget.value);
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
    </div>
  )
}