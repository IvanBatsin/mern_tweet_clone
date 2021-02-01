import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import { useHomeStyles } from '../pages/home/homeClasses';

interface FormCircularProgressProps {
  classes: ReturnType<typeof useHomeStyles>,
  text: string,
  textCount: number,
  MAX_LENGTH: number,
  textLimitPercent: number
}

export const FormCircularProgress: React.FC<FormCircularProgressProps> = ({text, classes, MAX_LENGTH, textCount, textLimitPercent}: FormCircularProgressProps) => {
  return (
    <>
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
    </>
  )
}