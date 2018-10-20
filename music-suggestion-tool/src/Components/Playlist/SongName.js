import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


function SongName(props){
    const { classes, name, artist } = props;

    return(
        <div className={classes.track}>
            <Typography component="h5" variant="h5">
                {name}
            </Typography>
            <Typography variant="subtitle1">
                {artist}
            </Typography>
        </div>
    )
}

export default SongName;