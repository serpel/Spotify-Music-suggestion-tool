import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import NewIcon from '@material-ui/icons/Cached'
import MoreIcon from '@material-ui/icons/MoreVert'
import SongList from './SongList';
import SongName from './SongName';
import SongControl from './SongControl';

function BottomAppBar(props) {
    const { classes, state, onHandlePlay, onHandleNext, onHandlePrevious, onHandleNewRecomendationList } = props;
    return (
      <div className={classes.container}>
        <SongList 
            classes={classes} 
            state={state} 
            onHandlePlay={onHandlePlay} 
            onHandleNext={onHandleNext} 
            onHandlePrevious={onHandlePrevious} />
       
        <AppBar position="sticky" color="primary">
          <Toolbar>
            <IconButton color="inherit">
                <MoreIcon />
            </IconButton>
            <SongName 
              classes={classes} 
              name={state.currentSongName} 
              artist={state.currentSongArtist} 
              image={state.currentSongCover} />             

            <Button variant="fab" color="secondary" aria-label="Add" className={classes.fabButton} onClick={onHandleNewRecomendationList}>
              <NewIcon />
            </Button>

            <SongControl classes={classes} 
              is_playing={state.is_playing}
              onHandlePlay={onHandlePlay} 
              onHandleNext={state.onHandleNext} 
              onHandlePrevious={onHandlePrevious} />        
          </Toolbar>
        </AppBar>
      </div>
    );
  }

  BottomAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default BottomAppBar;