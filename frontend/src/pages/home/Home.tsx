import React from 'react';
import { Grid, Paper, Typography, Container, InputAdornment} from '@material-ui/core';
import { SearchTextField } from '../../components/SearchTextField';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTweets } from '../../store/ducks/tweets/actionCreators';
import { fetchTags } from '../../store/ducks/themes/actionCreators' 
import { selectTweetsItems, selectTweetsIsLoading } from '../../store/ducks/tweets/selectors';
import { Route } from 'react-router-dom';
import { UserInfoBlock } from '../../components/UserInfoBlock';
import { selectUserData } from '../../store/ducks/user/selector';
import { UserProfile } from '../index';

// Components
import { SideMenu, TweetForm, Tags, BackButton, FullTweet, RandomUsers } from '../../components';
import { TweetComponent } from '../../components/Tweet';

// UI
import SearchIcon from '@material-ui/icons/Search';
import { useHomeStyles } from './homeClasses';
import CircularProgress from '@material-ui/core/CircularProgress';

const Home: React.FC = (): React.ReactElement => {
  const classes = useHomeStyles();
  const dispatch = useDispatch();
  const tweets = useSelector(selectTweetsItems);
  let isLoading = useSelector(selectTweetsIsLoading);
  const currentUser = useSelector(selectUserData);

  React.useEffect(() => {
    // handleFetchTweets();
    dispatch(fetchTweets());
    // dispatch(fetchTags());
  }, []);
  
  return (
    <Container className={classes.wrapper} maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item md={3} sm={1} className={classes.sideMenuBlock}>
          <SideMenu classes={classes} currentUser={currentUser!}></SideMenu>
          {currentUser && <UserInfoBlock classes={classes} user={currentUser}/>}
        </Grid>
        <Grid item sm={8} md={6} style={{minHeight: '100vh'}}>
          <Paper className={classes.twitterWrapper} style={{height: '100vh', overflowY: 'auto'}} variant="outlined">
            <Paper className={classes.twitterWrapperHeader} variant="outlined">
              <Route path="/home/:any">
                <BackButton classes={classes}/>
              </Route>
              <Route exact path={['/home', '/home/search']}>
                <Typography variant="h6">Главная</Typography>
              </Route>
              <Route path="/home/tweet">
                <Typography className={classes.fullTweetLink} variant="h6">Твитнуть</Typography>
              </Route>
              <Route path="/home/users/:any">
                <Typography className={classes.fullTweetLink} variant="h6">Профиль</Typography>
              </Route>
              <Route exact path={['/home', '/home/search']}>
                <Paper>
                  <div className={classes.addForm}>
                  <TweetForm classes={classes} currentUser={currentUser!}/>
                  </div>
                  <div className={classes.addFormBottomLine}/>
                </Paper>
              </Route>
            </Paper>
            <Route path='/home' exact>
              {isLoading && <div className={classes.tweetsCentered}><CircularProgress/></div>}
              {(!isLoading && tweets.length > 0) ? 
              tweets.map(item => {
                return <TweetComponent 
                          key={item._id} 
                          tweet={item}
                          classes={classes}
                          currentUser={currentUser!}/>
              }) : null}
            </Route>
            <Route path='/home/tweet/:id' exact component={FullTweet}>
              <FullTweet currentUser={currentUser!}></FullTweet>
            </Route>
            <Route path='/home/users/:id' exact>
              <UserProfile currentUser={currentUser!}/>
            </Route>
          </Paper>
        </Grid>
        <Grid item sm={3} md={3}>
          <div className={classes.rightSide}>
            <SearchTextField 
              placeholder="Поиск по twitter" 
              fullWidth
              inputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon/>
                  </InputAdornment>
                )
              }}/>
              <Tags classes={classes}/>
              {/* <RandomUsers classes={classes}/> */}
          </div>
        </Grid>
      </Grid>
    </Container>
  )
};

export {Home};