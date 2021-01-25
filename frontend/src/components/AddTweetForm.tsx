import React, { useState } from 'react';
import classNames from 'classnames';
import { useHomeStyles } from '../pages/home/homeClasses';
import { fetchAddTweet } from '../store/ducks/tweets/actionCreators';
import { selectAddFormState } from '../store/ducks/tweets/selectors';
import { AddFromLoading } from '../store/ducks/tweets/state';
import { UploadImages } from './UploadImages';

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
import { useDispatch, useSelector } from 'react-redux';
import { uploadPhotos } from '../utils/uploadImages';

interface AddTweetFormProps {
  classes: ReturnType<typeof useHomeStyles>,
  maxRows?: number
}

export interface ImageObject {
  file: File,
  blobUrl: string
}

const AddTweetForm: React.FC<AddTweetFormProps> = ({classes, maxRows}: AddTweetFormProps): React.ReactElement => {
  const [text, setText] = useState<string>('');
  let textLimitPercent = Math.round((text.length / 280) * 100);
  const MAX_LENGTH = 280;
  let textCount = MAX_LENGTH - text.length;
  const [images, setImages] = React.useState<ImageObject[]>([]);
  const dispatch = useDispatch();
  const addFormState = useSelector(selectAddFormState);

  const handleChangeText = (event: React.FormEvent<HTMLTextAreaElement>): void => {
    if (event.currentTarget && event.currentTarget.value.length <= 280){
      setText(event.currentTarget.value);
    }
  }

  const handleClickAddTweet = async (): Promise<void> => {
    const result = [];
    for(let i=0; i<images.length; i++){
      const file = images[i].file;
      const { data: {url} } = await uploadPhotos(file);
      result.push(url);
    }
    dispatch(fetchAddTweet({text, images: result}));
    setText('');
  }
  return (
    <div>
      <div className={classes.addFormBody}>
        <Avatar
          style={{marginRight: 10}}
          className={classes.twitterAvatar}
          alt="Users avatar"
          src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
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
        <div className={classNames(classes.twitterItemFooter, classes.addFormBottomActions)}>
          {/* <IconButton color="primary">
            <EmojiEmotionsOutlinedIcon style={{fontSize: 26}}></EmojiEmotionsOutlinedIcon>
          </IconButton> */}
          <UploadImages images={images} onImageChange={setImages}/>
        </div>
        <div className={classes.addFormBottomRight}>
          {text.length ?
          (<>
            <span>{textCount}</span>
            <div className={classes.addFormCircleProgress}>
              <CircularProgress 
                variant="static" 
                size={20} 
                thickness={4} 
                value={text.length >= MAX_LENGTH ? 100 : textLimitPercent}
                style={text.length >= MAX_LENGTH ? {color: 'red'} : undefined}/>
              <CircularProgress 
                style={{color: 'rgba(0, 0, 0, .1)'}}
                variant="static"
                size={20}
                thickness={4}
                value={100}
              />
            </div>
            </>)
            : null}
          <Button 
            onClick={handleClickAddTweet}
            disabled={addFormState === AddFromLoading.LOADING || !text || text.length >= 280} 
            color="primary" 
            variant="contained">
            {addFormState === AddFromLoading.LOADING ? <CircularProgress size={16} color="secondary"></CircularProgress> : 'Твитнуть'}
          </Button>
        </div>
      </div>
      {addFormState === AddFromLoading.ERROR && <Alert severity="error">Ошибка при добавление твитта</Alert>}
    </div>
  )
}

export default AddTweetForm;