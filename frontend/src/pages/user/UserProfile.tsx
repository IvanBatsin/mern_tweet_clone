import React from 'react';
import './userProfile.css';
import { IUser } from '../../interfaces/User';
import { Avatar, Typography, Tab, Tabs } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import LinkOutlinedIcon from '@material-ui/icons/LinkOutlined';
import CakeOutlinedIcon from '@material-ui/icons/CakeOutlined';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import { useSelector } from 'react-redux';
import { selectTweetsItems } from '../../store/ducks/tweets/selectors';
import { Tweet } from '../../components';
import { useHomeStyles } from '../home/homeClasses';
import { useParams } from 'react-router-dom';

interface UserProfileProps {
  user: IUser
}

export const UserProfile: React.FC<UserProfileProps> = ({user}: UserProfileProps) => {
  const [value, setValue] = React.useState(2);
  const tweets = useSelector(selectTweetsItems);
  const classes = useHomeStyles();
  const { id: userId } = useParams<{id: string}>();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <div className='userProfileHeader'></div>
      <div className='userProfileInfo'>
        <Avatar src={user.avatarUrl}/>
        <h2 className='userProfilFullName'>{user.fullName}</h2>
        <span className='userProfilUserName'>@{user.userName}</span>
        <p className='userProfilDescription'>Developer and facebook foundation</p>
        <ul className='userProfilDetails'>
          <li><LocationOnOutlinedIcon fontSize='inherit'/>Высоковск</li>
          <li><LinkOutlinedIcon fontSize='inherit'/><a className='link' href="https://google.com">Google</a></li>
          <li><CakeOutlinedIcon fontSize='inherit'/>Дата рождения: 1998 0.2 27</li>
          <li><DateRangeOutlinedIcon fontSize='inherit'/>Регистрация: 28 апреля</li>
        </ul>
      </div>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
        style={{fontSize:16, textTransform:'none'}}
      >
        <Tab label="Твиты"/>
        <Tab label="Твиты и ответы"/>
        <Tab label="Медиа"/>
        <Tab label="Нравится"/>
      </Tabs>
      <div className='userTweets'>
        {tweets.length > 0 && tweets.map(tweet => {
          return <Tweet key={tweet._id} tweetUser={tweet.user} _id={tweet._id} classes={classes} createdAt={tweet.createdAt} currentUser={user} text={tweet.text} images={tweet.images} />
        })}
      </div>
    </>
  )
}