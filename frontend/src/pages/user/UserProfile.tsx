import React from 'react';
import './userProfile.css';
import { User } from '../../interfaces/User';
import { Avatar, Tab, Tabs } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import LinkOutlinedIcon from '@material-ui/icons/LinkOutlined';
import CakeOutlinedIcon from '@material-ui/icons/CakeOutlined';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { selectTweetsIsLoading, selectTweetsItems } from '../../store/ducks/tweets/selectors';
import { TweetComponent } from '../../components/Tweet';
import { useHomeStyles } from '../home/homeClasses';
import { useHistory, useParams } from 'react-router-dom';
import { fetchTweets, fetchUserTweets } from '../../store/ducks/tweets/actionCreators';
import CircularProgress from '@material-ui/core/CircularProgress';
import { userApi } from '../../services/api/userApi';
import { Skeleton } from '@material-ui/lab';

interface UserProfileProps {
  currentUser: User
}

export const UserProfile: React.FC<UserProfileProps> = ({currentUser}: UserProfileProps) => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [userState, setUserState] = React.useState<User | undefined>(undefined);
  const { id: userId } = useParams<{id: string}>();
  const tweets = useSelector(selectTweetsItems);
  const classes = useHomeStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const tweetsLoading = useSelector(selectTweetsIsLoading);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };

  const fetchUser = async (): Promise<void> => {
    const { data } = await userApi.getUserById(userId);
    setUserState(data);
  }

  React.useEffect(() => {
    if (!currentUser) {
      history.push('/home');
    } else {
      if (currentUser._id === userId) {
        setUserState(currentUser);
      } else {
        fetchUser();
      }
      dispatch(fetchUserTweets(userId));
    }

    return () => {
      dispatch(fetchTweets());
    }
  }, []);

  if (!currentUser) return null;

  return (
    <>
      {!userState ? <CircularProgress/> :
        <>
          <div className='userProfileHeader'></div>
          <div className='userProfileInfo'>
            <Avatar src={userState.avatarUrl}/>
            {!userState ? <Skeleton variant='text' width={100} height={40}/> :
              <h2 className='userProfilFullName'>{userState.fullName}</h2>
            }
            {!userState ? <Skeleton variant='text' width={80} height={35}/> : 
              <span className='userProfilUserName'>@{userState.userName}</span>
            }
            <p className='userProfilDescription'>Developer and facebook foundation</p>
            <ul className='userProfilDetails'>
              <li><LocationOnOutlinedIcon fontSize='inherit'/>Высоковск</li>
              <li><LinkOutlinedIcon fontSize='inherit'/><a className='link' href="https://google.com">Google</a></li>
              <li><CakeOutlinedIcon fontSize='inherit'/>Дата рождения: 1998 0.2 27</li>
              <li><DateRangeOutlinedIcon fontSize='inherit'/>Регистрация: 28 апреля</li>
            </ul>
          </div>
          <Tabs
            value={activeTab}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="disabled tabs example"
            style={{fontSize:16, textTransform:'none'}}
          >
            <Tab label={`Твиты ${tweets.length}`}/>
            <Tab label="Твиты и ответы"/>
            <Tab label="Медиа"/>
            <Tab label="Нравится"/>
          </Tabs>
          <div className='userTweets'>
            {tweetsLoading ? <CircularProgress/> :
              tweets.length > 0 && tweets.map(tweet => {
                return <TweetComponent 
                          key={tweet._id} 
                          tweet={tweet}
                          classes={classes} 
                          currentUser={userState} 
                        />
              })
            }
          </div>
        </>
      }
    </>
  )
}