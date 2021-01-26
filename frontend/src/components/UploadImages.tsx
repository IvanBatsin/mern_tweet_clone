import React from 'react';
import IconButton from '@material-ui/core/IconButton/IconButton';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import { useHomeStyles } from '../pages/home/homeClasses';
import { ImageObject } from './AddTweetForm';
import { TweetImagesList } from './TweetImagesList';

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
      inputRef.current.addEventListener('input', handleInputFileChange);
    }

    return () => {
      inputRef.current?.removeEventListener('input', handleInputFileChange);
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
      <TweetImagesList classes={classes} images={images.map(obj => obj.blobUrl)} removeImage={removeImage}/>
    </div>
  )
}