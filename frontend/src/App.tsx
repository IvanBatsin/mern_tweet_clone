import React, { useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from './store/ducks/user/actionCreators';
import { LoadingState } from './interfaces/LoadingState';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHomeStyles } from './pages/home/homeClasses';

// Pages
import { Home, SingIn, Confirm } from './pages/index';
import { selectIsAuth, selectUserLoadingStatus } from './store/ducks/user/selector';

function App() {
  const classes = useHomeStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const userLoadingState = useSelector(selectUserLoadingStatus);
  const isReady = userLoadingState !== LoadingState.NEVER && userLoadingState !== LoadingState.LOADING;

  useEffect(() => {
    if (isAuth && isReady && userLoadingState === LoadingState.LOADED){
      history.push('/home');
    } else if (isReady && !isAuth) {
      history.push('/signin');
    }

  }, [isAuth, isReady]);

  useEffect(() => {
    dispatch(getMe());
  }, []);

  if (!isReady) return <div className={classes.centerdeLoading}><CircularProgress/></div>

  return (
    <div className="App" style={{minHeight: '100vh'}}>
      <Switch>
        <Route path="/signin" exact component={SingIn}></Route>
        <Route path="/home" component={Home}></Route>
      </Switch>
    </div>
  );
}

export default App;
