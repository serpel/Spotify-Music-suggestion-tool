import React from 'react';
import Typography from '@material-ui/core/Typography';


function SongName(props){
    const { classes, name, artist } = props;

    return(
        <div className={classes.track}>
            <Typography variant="title">
                {name}
            </Typography>
            <Typography variant="subtitle">
                {artist}
            </Typography>
        </div>
    )
}

export default SongName;