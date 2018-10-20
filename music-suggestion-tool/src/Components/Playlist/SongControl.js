import React from 'react';
import Paper from '@material-ui/core/Paper';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';

function SongControl(props) {
    const { classes } = props;

    return (
        <div>
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
          <CardMedia
            className={classes.cover}
            image="/static/images/cards/live-from-space.jpg"
            title="Live from space album cover"
          />
       </div>
    );
  }

export default SongControl;