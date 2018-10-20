import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseArrowIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';

function SongControl(props) {
    const { classes, is_playing, onHandlePrevious, onHandleNext, onHandlePlay } = props;

    return (
        <div className={classes.controlblock}>
          <div className={classes.controls}>
              <IconButton aria-label="Previous" onClick={onHandlePrevious}>
                <SkipPreviousIcon />
              </IconButton>
              <IconButton aria-label="Play/pause" onClick={onHandlePlay}>
                 { is_playing === false && <PlayArrowIcon className={classes.playIcon} />}
                 { is_playing === true && <PauseArrowIcon className={classes.playIcon} />}
              </IconButton>
              <IconButton aria-label="Next" onClick={onHandleNext}>
                <SkipNextIcon />
              </IconButton>
          </div>
       </div>
    );
  }

export default SongControl;