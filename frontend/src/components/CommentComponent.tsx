import { Paper, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar/Avatar';
import Grid from '@material-ui/core/Grid/Grid';
import classNames from 'classnames';
import format from 'date-fns/format';
import { ru } from 'date-fns/locale';
import React from 'react';
import { Link } from 'react-router-dom';
import { Comment } from '../interfaces/Comment';
import { useHomeStyles } from '../pages/home/homeClasses';

interface CommentComponentProps {
  comment: Comment,
  classes: ReturnType<typeof useHomeStyles>
}

export const CommentComponent: React.FC<CommentComponentProps> = ({comment, classes}: CommentComponentProps) => {
  return (
    <Grid container style={{display:'flex'}}>
      <Paper className={classNames(classes.twitterWrapperHeader, classes.twitterItem)} style={{display:'flex', width:'100%'}}>
        <Grid item md={1} sm={1}>
        <Avatar 
          className={classes.twitterAvatar}
          alt={`${comment.owner.userName}'s avatar`} 
          src={comment.owner.avatarUrl}/>
        </Grid>
        <Grid item md={11} sm={11}>
          <Typography style={{marginLeft: 20}}>
            <div style={{display:'flex', alignItems:'center'}}>
              <b style={{marginRight:10}}><Link className={classes.twitterWrapperHeaderUserLink} to={`/home/users/${comment.owner._id}`}>{comment.owner.fullName}</Link></b>  
              <span className={classes.twitterUserName}>@{comment.owner.userName}&nbsp;</span>
              <span className={classes.twitterUserName}>{format(new Date(comment.createdAt), 'H:mm MMMM yyy', {locale: ru})}</span>
            </div>
            <Typography style={{fontSize:16}} variant="body1" gutterBottom>
              {comment.text}  
            </Typography>
          </Typography>
        </Grid>
      </Paper>
    </Grid>
  )
}