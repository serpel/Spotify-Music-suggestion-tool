import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';

function SongControl(props) {
    const { classes } = props;

    return (
        <div className={classes.controlblock}>
          <div className={classes.controls}>
              <IconButton aria-label="Previous" onClick={props.onHandlePrevious}>
                <SkipPreviousIcon />
              </IconButton>
              <IconButton aria-label="Play/pause" onClick={props.onHandlePlay}>
                <PlayArrowIcon className={classes.playIcon} />
              </IconButton>
              <IconButton aria-label="Next" onClick={props.onHandleNext}>
                <SkipNextIcon />
              </IconButton>
          </div>
       </div>
    );
  }

export default SongControl;