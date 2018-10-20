import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add'
import SearchIcon from '@material-ui/icons/Search'
import MoreIcon from '@material-ui/icons/More'
import SongList from './SongList';
import SongName from './SongName';

function BottomAppBar(props) {
    const { classes, state, onHandlePlay, onHandleNext, onHandlePrevious } = props;
    return (
      <div className={classes.container}>

        <SongList 
            classes={classes} 
            state={state} 
            onHandlePlay={onHandlePlay} 
            onHandleNext={onHandleNext} 
            onHandlePrevious={onHandlePrevious} />
       
        <AppBar position="sticky" color="primary">
          <Toolbar className={classes.toolbar}>
            <IconButton color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            <SongName classes={classes} name={state.currentSongName} artist={state.currentSongArtist} />               
            <Button variant="fab" color="secondary" aria-label="Add" className={classes.fabButton}>
              <AddIcon />
            </Button>
            <div>
              <IconButton color="inherit">
                <SearchIcon />
              </IconButton>
              <IconButton color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }

  BottomAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default BottomAppBar;