import IconButton from '@material-ui/core/IconButton/IconButton';
import React from 'react';
import { useHomeStyles } from '../pages/home/homeClasses';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

interface TweetImagesListProps {
  images: string[],
  classes: ReturnType<typeof useHomeStyles>,
  removeImage?: (url: string) => void
}

export const TweetImagesList: React.FC<TweetImagesListProps> = ({classes, images, removeImage}: TweetImagesListProps): React.ReactElement => {
  return (
    <div className={classes.imagesList}>
      {images.map(url => 
        <div key={url} className={classes.imagesListItem} style={{backgroundImage:`url(${url})`}}>
          <img src={url} alt='Tweet image'>
          </img>
            {removeImage &&
              <IconButton className={classes.imagesListItemRemove} onClick={() => removeImage(url)} color="primary">
                <HighlightOffIcon style={{fontSize: 18}}/>
              </IconButton>
            }
        </div>
      )}
    </div>
  )
}