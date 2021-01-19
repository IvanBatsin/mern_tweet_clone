import React from 'react';
import Avatar from '@material-ui/core/Avatar/Avatar';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar/ListItemAvatar';
import Paper from '@material-ui/core/Paper/Paper';
import { useHomeStyles } from '../pages/home/homeClasses';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import Typography from '@material-ui/core/Typography/Typography';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useSelector } from 'react-redux';
import { selectRandomUsersItems } from '../store/ducks/randomUsers/selector';

interface IRandomUsersProps {
  classes: ReturnType<typeof useHomeStyles>
}

const RandomUsers: React.FC<IRandomUsersProps> = ({classes}: IRandomUsersProps): React.ReactElement => {
  const users = useSelector(selectRandomUsersItems);
  console.log(users);

  if (!users.length) return <div>Not now baby</div>
  return (
    <Paper className={classes.rightSideBlock}>
      <Paper className={classes.rightSideBlockHeader} variant="outlined">
        Пользователи
        <List>
          {users.map(item => {
            return (
              <ListItem key={item._id} className={classes.rightSideBlockItem}>
                <ListItemAvatar>
                  <Avatar
                    alt={`${item.fullName} avatar`}
                    src={item.avatarUrl ? item.avatarUrl : 'https://banner2.cleanpng.com/20180802/czs/kisspng-malta-blockchain-summit-ad-fraud-advertising-indus-twitter-logo-png-5b6352722ae8d6.4341314915332358261758.jpg'}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={item.fullName}
                  secondary={
                    <Typography component="span" variant="body2">
                      @{item.userName}
                    </Typography>
                  }
                />
                <AddCircleOutlineIcon color="primary"/>
              </ListItem>
            )
          })}
          {/* <ListItem className={classes.rightSideBlockItem}>
            <ListItemAvatar>
              <Avatar
                alt="Some person avatar"
                src="https://images.unsplash.com/photo-1545912452-8aea7e25a3d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
              />
            </ListItemAvatar>
            <ListItemText
              primary="Eva Molly"
              secondary={
                <Typography component="span" variant="body2">
                  @Lolita
                </Typography>
              }
            />
            <AddCircleOutlineIcon color="primary"/>
          </ListItem> */}
        </List>
      </Paper>
    </Paper>
  )
}

export default RandomUsers;