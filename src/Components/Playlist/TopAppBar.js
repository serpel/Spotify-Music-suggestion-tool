import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu'

function TopAppBar(props) {
    const { classes, profileImg, profileName, onHandleLogout } = props;
    return (
      <div className={classes.root}>
        <AppBar position="static" >
          <Toolbar className={classes.toolbar}>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Avatar
                alt={profileName}
                src={profileImg}
                className={classes.avatar}
            />
            <Typography variant="title" color="inherit" className={classes.grow}>
                Welcome: {profileName}
            </Typography>          
            <Button color="inherit" className={classes.logout} onClick={onHandleLogout}>Logout</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }

  export default TopAppBar;