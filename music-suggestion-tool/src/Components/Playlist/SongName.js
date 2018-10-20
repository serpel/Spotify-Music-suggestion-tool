import React from 'react';
import Typography from '@material-ui/core/Typography';
import IconBotton from '@material-ui/core/IconButton';

function SongName(props){
    const { classes, name, artist, image } = props;
    
    return(
        <div className={classes.card}>
            <div className={classes.track}>
                <Typography variant="title">
                    {name}
                </Typography>
                <Typography variant="body1" >
                    {artist}
                </Typography>
            </div>
            <IconBotton>
            <img
                image={image}
                alt={name}
            />
            </IconBotton>
        </div>
    )
}

export default SongName;