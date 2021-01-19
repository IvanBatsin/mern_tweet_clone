import React, { useEffect } from 'react';
import { Grid, Paper, Typography, Container, InputAdornment} from '@material-ui/core';
import { SearchTextField } from '../../components/SearchTextField';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTweets } from '../../store/ducks/tweets/actionCreators';
import { fetchTags } from '../../store/ducks/themes/actionCreators' 
import { selectTweetsItems, selectTweetsIsLoading } from '../../store/ducks/tweets/selectors';

// Components
import { SideMenu, Tweet, TweetForm, Tags, BackButton, FullTweet, RandomUsers } from '../../components';

// UI
import SearchIcon from '@material-ui/icons/Search';
import { useHomeStyles } from './homeClasses';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Route } from 'react-router-dom';

const Home: React.FC = (): React.ReactElement => {
  const classes = useHomeStyles();
  const dispatch = useDispatch();
  const tweets = useSelector(selectTweetsItems);
  let isLoading = useSelector(selectTweetsIsLoading);

  // const handleFetchTweets = () =>{ 
  //   dispatch(fetchTweets());
  // }

  useEffect(() => {
    // handleFetchTweets();
    dispatch(fetchTweets());
    // dispatch(fetchTags());
  }, []);
  return (
    <Container className={classes.wrapper} maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item md={3} sm={1}>
          <SideMenu classes={classes}></SideMenu>
        </Grid>
        <Grid item sm={8} md={6}>
          <Paper className={classes.twitterWrapper} style={{height: '100%'}} variant="outlined">
            <Paper className={classes.twitterWrapperHeader} variant="outlined">
              <Route path="/home/:any">
                <BackButton classes={classes}/>
              </Route>
              <Route exact path={['/home', '/home/search']}>
                <Typography variant="h6">Главная</Typography>
              </Route>
              <Route path="/home/tweet">
                <Typography variant="h6">Твитнуть</Typography>
              </Route>
              <Route exact path={['/home', '/home/search']}>
                <Paper>
                  <div className={classes.addForm}>
                  <TweetForm classes={classes}/>
                  </div>
                  <div className={classes.addFormBottomLine}/>
                </Paper>
              </Route>
            </Paper>
            <Route path='/home' exact>
              {isLoading && <div className={classes.tweetsCentered}><CircularProgress/></div>}
              {(!isLoading && tweets.length > 0) ? 
              tweets.map(item => {
                return <Tweet key={item._id} createdAt={item.createdAt} _id={item._id} text={item.text} user={item.user} classes={classes}></Tweet>
              }) : null}
            </Route>
            <Route path='/home/tweet/:id' exact component={FullTweet}>
              <FullTweet></FullTweet>
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