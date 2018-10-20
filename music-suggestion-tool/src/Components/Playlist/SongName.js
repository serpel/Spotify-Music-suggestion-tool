import React from 'react';
import Typography from '@material-ui/core/Typography';

function SongName(props){
    const { classes, name, artist, image } = props;

    console.log(image);
    return(
        <div className={classes.card}>
            <div className={classes.track}>
                <Typography variant="title" color="secundary">
                    {name}
                </Typography>
                <Typography variant="subtitle1" color="secondary">
                    {artist}
                </Typography>
            </div>
            <img
                image={image}
                title={name}
            />
        </div>
    )
}

export default SongName;