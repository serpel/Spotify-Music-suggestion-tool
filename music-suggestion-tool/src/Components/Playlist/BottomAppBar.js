import AppBar from '@material-ui/core/AppBar'
import React from 'react';
import SongList from './SongList'

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

  export default withStyles(styles)(BottomAppBar);