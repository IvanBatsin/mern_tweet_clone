import React, { useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { userApi } from './services/api/userApi';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from './store/ducks/user/actionCreators';

// Pages
import { Home, SingIn } from './pages/index';
import { selectIsAuth } from './store/ducks/user/selector';

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  // const isReady = 

  const checkAuth = async () => {
    try {
      const { data } = await userApi.getMe();
      dispatch(setUserData(data));
      // history.replace('/home');
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (isAuth){
      history.push('/home');
    }
  }, [isAuth]);

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route path="/singin" exact component={SingIn}></Route>
        <Route path="/home" component={Home}></Route>
      </Switch>
    </div>
  );
}

export default App;
