import React from 'react';
import classNames from 'classnames';
import { useHomeStyles } from '../pages/home/homeClasses';
import { fetchAddTweet, setAddFormState } from '../store/ducks/tweets/actionCreators';
import { selectAddFormState } from '../store/ducks/tweets/selectors';
import { AddFormLoading } from '../store/ducks/tweets/state';
import { UploadImages } from './UploadImages';
import { User } from '../interfaces/User';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPhotos } from '../utils/uploadImages';

// UI
import Alert from '@material-ui/lab/Alert';
import Avatar from '@material-ui/core/Avatar/Avatar';
import TextareaAutosize from '@material-ui/core/TextareaAutosize/TextareaAutosize';
import IconButton from '@material-ui/core/IconButton/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import Button from '@material-ui/core/Button/Button';

// Icons
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import { useFormText } from '../hooks/useFormText';
import { FormCircularProgress } from './FormTextCircularProgress';

interface AddTweetFormProps {
  classes: ReturnType<typeof useHomeStyles>,
  maxRows?: number,
  currentUser: User
}

export interface ImageObject {
  file: File,
  blobUrl: string
}

const AddTweetForm: React.FC<AddTweetFormProps> = ({classes, maxRows, currentUser}: AddTweetFormProps) => {
  const MAX_LENGTH = 280;
  const {text, handleChangeText, setText} = useFormText('', MAX_LENGTH);
  let textLimitPercent = Math.round((text.length / MAX_LENGTH) * 100);
  let textCount = MAX_LENGTH - text.length;
  const [images, setImages] = React.useState<ImageObject[]>([]);
  const dispatch = useDispatch();
  const addFormState = useSelector(selectAddFormState);

  const handleClickAddTweet = async (): Promise<void> => {
    const result = [];
    dispatch(setAddFormState(AddFormLoading.LOADING));
    for(let i=0; i<images.length; i++){
      const file = images[i].file;
      const { data: {url} } = await uploadPhotos(file);
      result.push(url);
    }
    dispatch(fetchAddTweet({text, images: result}));
    setText('');
    setImages([]);
  }

  if (!currentUser) return null;
  
  return (
    <div>
      <div className={classes.addFormBody}>
        <Avatar
          style={{marginRight: 10}}
          className={classes.twitterAvatar}
          alt="Users avatar"
          src={currentUser.avatarUrl}
        />
        <TextareaAutosize
          onChange={handleChangeText}
          className={classes.addFormTextarea}
          placeholder="Whats happening?"
          value={text}
          rowsMax={maxRows}
        />
      </div>
      <div className={classes.addFormBottom}>
        <div className={classNames(classes.addFormBottomActions)}>
          <UploadImages images={images} onImageChange={setImages}/>
        </div>
        <div className={classes.addFormBottomRight}>
          {text.length ?
            <FormCircularProgress 
              MAX_LENGTH={MAX_LENGTH} 
              classes={classes}
              text={text}
              textCount={textCount}
              textLimitPercent={textLimitPercent}/> : null}
          <Button 
            onClick={handleClickAddTweet}
            disabled={addFormState === AddFormLoading.LOADING || !text || text.length >= MAX_LENGTH} 
            color="primary" 
            variant="contained">
            {addFormState === AddFormLoading.LOADING ? <CircularProgress size={16} color="secondary"></CircularProgress> : 'Твитнуть'}
          </Button>
        </div>
      </div>
      {addFormState === AddFormLoading.ERROR && <Alert severity="error">Ошибка при добавление твитта</Alert>}
    </div>
  )
}

export default AddTweetForm;