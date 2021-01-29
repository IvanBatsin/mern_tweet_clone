import React from 'react';
import './info.css';
import TwitterIcon from '@material-ui/icons/Twitter';
import { Typography } from '@material-ui/core';

export const Info: React.FC = () => {
  return (
    <div className='infoPage'>
      <div className='infoPageHeader'>
        <Typography variant='h3'>Twitter 2.0</Typography>
        <TwitterIcon fontSize='large'/>
      </div>
      <div className='infoPageContent'>
        <h2>Благодарим за регистрацию в Twitter 2.0! <TwitterIcon/></h2>
        <Typography variant='subtitle1'>Вы успешно создали аккаунт в нашем приложении. Чтобы вы смогли пользоваться нашей сетью, вы должны подтвердить свою почту. Мы отправили ссылку на указанную вами почту, пройдя по которой, вы сможете подтвердить свой профиль.</Typography>
      </div>
    </div>
  )
}