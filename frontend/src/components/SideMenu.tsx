import { Button, Hidden, IconButton, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import {useHomeStyles} from '../pages/home/homeClasses';
import ModalPopup from './ModalPopup'
import { Link } from 'react-router-dom';
 
// UI
import TwitterIcon from '@material-ui/icons/Twitter';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CreateIcon from '@material-ui/icons/Create';
import AddTweetForm from './AddTweetForm';

interface SideMenuProps {
  classes: ReturnType<typeof useHomeStyles>
}

const SideMenu: React.FC<SideMenuProps> = ({classes}: SideMenuProps): React.ReactElement => {
  const [visibleAddTweet, setVisisbleAddTweet] = useState<boolean>(false);

  const handleOpenAddTweet = (): void => {
    setVisisbleAddTweet(true);
  }
  const handleCloseAddTweet = (): void => {
    setVisisbleAddTweet(false);
  }
  return (
    <ul className={classes.sideMenuList}>
      <li className={classes.sideMenuListItem}>
        <div>
          <Link to="/home">
            <IconButton>
              <TwitterIcon className={classes.menuLogo} color="primary"/>
            </IconButton>
          </Link>
        </div>
      </li>
      <li className={classes.sideMenuListItem}>
        <div>
          <SearchIcon className={classes.sideMenuListItemIcon}/>&nbsp;
          <Hidden smDown>
            <Typography className={classes.sideMenuListItemTitle} variant="h6">Поиск</Typography>
          </Hidden>
        </div>
      </li>
      <li className={classes.sideMenuListItem}>
        <div>
        <NotificationsNoneIcon className={classes.sideMenuListItemIcon}/>&nbsp;
        <Hidden smDown>
          <Typography className={classes.sideMenuListItemTitle} variant="h6">Уведомления</Typography>
        </Hidden>
        </div>
      </li>
      <li className={classes.sideMenuListItem}>
        <div>
          <ChatBubbleOutlineIcon className={classes.sideMenuListItemIcon}/>&nbsp;
          <Hidden smDown>
            <Typography className={classes.sideMenuListItemTitle} variant="h6">Сообщения</Typography>
          </Hidden>
        </div>
      </li>
      <li className={classes.sideMenuListItem}>
        <div>
          <BookmarkBorderIcon className={classes.sideMenuListItemIcon}/>&nbsp;
          <Hidden smDown>
            <Typography className={classes.sideMenuListItemTitle} variant="h6">Закладки</Typography>
          </Hidden>
        </div>
      </li>
      <li className={classes.sideMenuListItem}>
        <div>
          <ListAltIcon className={classes.sideMenuListItemIcon}/>&nbsp;
          <Hidden smDown>
            <Typography className={classes.sideMenuListItemTitle} variant="h6">Список</Typography>
          </Hidden>
        </div>
      </li>
      <li className={classes.sideMenuListItem}>
        <div>
          <AccountCircleIcon className={classes.sideMenuListItemIcon}/>&nbsp;
          <Hidden smDown>
            <Typography className={classes.sideMenuListItemTitle} variant="h6">Профиль</Typography>
          </Hidden>
        </div>
      </li>
      <li>
        <Button 
          onClick={handleOpenAddTweet}
          className={classes.sideMenuTwitterButton} 
          fullWidth 
          variant="contained" 
          color="primary">
        <Hidden smDown>Твитнуть</Hidden>
        <Hidden mdUp><CreateIcon/></Hidden>
        </Button>
        <ModalPopup onClose={handleCloseAddTweet} visible={visibleAddTweet}>
          <div style={{width: 550}}>
           <AddTweetForm maxRows={15} classes={classes}></AddTweetForm>
          </div>
        </ModalPopup>
      </li>
    </ul>
  )
}

export default SideMenu;