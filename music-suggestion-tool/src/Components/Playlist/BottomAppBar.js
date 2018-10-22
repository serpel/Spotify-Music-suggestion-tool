import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckIcon from '@material-ui/icons/Check';
import NewIcon from '@material-ui/icons/Cached';
//import MoreIcon from '@material-ui/icons/MoreVert';
import AddPlaylistIcon from '@material-ui/icons/PlaylistAdd'
import SongList from './SongList';
import CurrentPlaying from './CurrentPlaying';
import PlayerControls from './PlayerControls';

function BottomAppBar(props) {
    const { classes, state, onHandlePlay, onHandleNext, onHandlePrevious, handleChange, onHandleNewRecomendationList, handleAddPlaylist, onHandleSaveTrackToUserLibrary } = props;
    return (
      <div className={classes.container}>
        <SongList 
            classes={classes} 
            state={state} 
            onHandleSaveTrackToUserLibrary={onHandleSaveTrackToUserLibrary}
            onHandlePlay={onHandlePlay} 
            onHandlePrevious={onHandlePrevious}
            onHandleNext={onHandleNext} 
            handleChange={handleChange} />
       
        <AppBar position="sticky" color="primary">
          <Toolbar>
            <IconButton color="inherit" onClick={handleAddPlaylist}>
                <AddPlaylistIcon />
            </IconButton>
            <CurrentPlaying 
              classes={classes} 
              name={state.currentSongName} 
              artist={state.currentSongArtist} 
              image={state.currentSongCover} />             

            <div className={classes.wrapper}>
              <Button 
                  variant="fab" 
                  color="secondary" 
                  aria-label="Add" 
                  className={classes.fabButton} 
                  onClick={onHandleNewRecomendationList}>
                  { state.loading === true ? <NewIcon /> : <CheckIcon />}
              </Button>
              {state.loading && <CircularProgress size={64} className={classes.fabProgress} />}
            </div>

            <PlayerControls classes={classes} 
              is_playing={state.is_playing}
              onHandlePlay={onHandlePlay} 
              onHandleNext={onHandleNext} 
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