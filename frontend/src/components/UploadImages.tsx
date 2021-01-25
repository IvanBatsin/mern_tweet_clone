import React from 'react';
import IconButton from '@material-ui/core/IconButton/IconButton';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { useHomeStyles } from '../pages/home/homeClasses';
import { ImageObject } from './AddTweetForm';

interface UploadImageProps {
  images: ImageObject[],
  onImageChange: (callback: (prevState: ImageObject[]) => ImageObject[]) => void
}

export const UploadImages: React.FC<UploadImageProps> = ({images, onImageChange}: UploadImageProps): React.ReactElement => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const classes = useHomeStyles();

  const handleInputClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  const handleInputFileChange = React.useCallback((event: Event) => {
    if (event.target) {
      const target = event.target as HTMLInputElement;
      const file = target.files![0];
      if (file) {
        const fileBlob = new Blob([file]);
        onImageChange(prev => [...prev, {
          file,
          blobUrl: URL.createObjectURL(fileBlob)
        }]);
      }
    }
  }, []);

  const removeImage = (url: string): void => {
    onImageChange(prev => prev.filter(imageObj => imageObj.blobUrl !== url));
  }

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addEventListener('change', handleInputFileChange);
    }

    return () => {
      inputRef.current?.removeEventListener('change', handleInputFileChange);
    }
  }, []);

  return (
    <div>
      <input type="file" ref={inputRef} hidden id="upload-input"/>
      <label htmlFor="upload-input">
        <IconButton onClick={handleInputClick} color="primary">
          <ImageOutlinedIcon style={{fontSize: 26}}/>
        </IconButton>
      </label>
      <div className={classes.imagesList}>
        {images.map((obj, index) => 
          <div key={index} className={classes.imagesListItem} style={{backgroundImage:`url(${obj.blobUrl})`}}>
            <IconButton className={classes.imagesListItemRemove} onClick={() => removeImage(obj.blobUrl)} color="primary">
              <HighlightOffIcon style={{fontSize: 18}}/>
            </IconButton>
          </div>
        )}
      </div>
    </div>
  )
}