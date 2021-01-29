import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from './store/ducks/user/actionCreators';
import { LoadingState } from './interfaces/LoadingState';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHomeStyles } from './pages/home/homeClasses';

// Pages
import { Home, Info, SingIn, UserProfile } from './pages/index';
import { selectIsAuth, selectUserIsConfirmed, selectUserLoadingStatus } from './store/ducks/user/selector';

function App() {
  const classes = useHomeStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const userLoadingState = useSelector(selectUserLoadingStatus);
  const userConfirmed = useSelector(selectUserIsConfirmed);
  const isReady = userLoadingState !== LoadingState.NEVER && userLoadingState !== LoadingState.LOADING;

  React.useEffect(() => {
    if (isAuth && isReady && userLoadingState === LoadingState.LOADED && userConfirmed){
      history.push('/home');
    } else if (isReady && !isAuth) {
      history.push('/signin');
    } else if (isAuth && !userConfirmed) {
      history.push('/info')
    }

  }, [isAuth, isReady]);

  React.useEffect(() => {
    dispatch(getMe());
  }, []);

  if (!isReady) return <div className={classes.centerdeLoading}><CircularProgress/></div>

  return (
    <div className="App" style={{minHeight: '100vh'}}>
      <Switch>
        <Route path="/signin" exact component={SingIn}/>
        <Route path="/home" component={Home}/>
        <Route path="/info" exact component={Info}/>
      </Switch>
    </div>
  );
}

export default App;
