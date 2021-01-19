import React from 'react';
import { useHomeStyles } from '../pages/home/homeClasses';
import { Link } from 'react-router-dom';

// UI
import Paper from '@material-ui/core/Paper/Paper';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import Typography from '@material-ui/core/Typography/Typography';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import Divider from '@material-ui/core/Divider/Divider';
import { useSelector } from 'react-redux';
import { selectTagsItems, selectTagsIsLoaded } from '../store/ducks/themes/selectors';

interface TagsProps {
  classes: ReturnType<typeof useHomeStyles>,
}

const Tags: React.FC<TagsProps> = ({classes}: TagsProps): React.ReactElement | null => {
  const items = useSelector(selectTagsItems);
  const isLoaded = useSelector(selectTagsIsLoaded);

  if (!isLoaded) return null;

  return (
    <Paper className={classes.rightSideBlock}>
      <Paper className={classes.rightSideBlockHeader} variant="outlined">
        <b>Актальные темы</b>
      </Paper>
      <List>
        {items.map((obj, index) => {
          return (
            <React.Fragment key={`${obj.name}${index}`}>
                <ListItem className={classes.rightSideBlockItem}>
                <Link to={`/home/search?q=${obj.name}`}>
                  <ListItemText 
                    primary={obj.name}
                    secondary={
                      <Typography component="span" variant="body2">
                        Твитов: {obj.count}
                      </Typography>
                    }/>
                  </Link>
                </ListItem>
              <Divider component="li"/>
            </React.Fragment>
          )
        })}
      </List>
    </Paper>
  )
}

export default Tags;