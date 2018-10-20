function BottomAppBar(props) {
    const { classes } = props;
    return (
      <div className={classes.container}>
        <Paper square className={classes.main}>
          <Typography className={classes.text} variant="h5" gutterBottom>
            Inbox
          </Typography>
          <List className={classes.list}>
            {messages.map(({ id, primary, secondary, person }) => (
              <Fragment key={id}>
                {id === 1 && <ListSubheader className={classes.subHeader}>Today</ListSubheader>}
                {id === 3 && <ListSubheader className={classes.subHeader}>Yesterday</ListSubheader>}
                <ListItem button>
                  <Avatar alt="Profile Picture" src={person} />
                  <ListItemText primary={primary} secondary={secondary} />
                </ListItem>
              </Fragment>
            ))}
          </List>
        </Paper>
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