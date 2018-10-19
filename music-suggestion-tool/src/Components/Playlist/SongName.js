import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


function SongName(props){
    const { classes, name, artist } = props;

    return(
        <Paper className={classes.root} elevation={0}>
            <Typography component="h5" variant="h5">
                {name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
                {artist}
            </Typography>
        </Paper>
    )
}


export default SongName;