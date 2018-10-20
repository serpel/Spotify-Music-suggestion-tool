import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia';


function SongName(props){
    const { classes, name, artist, image } = props;

    console.log(image);

    return(
        <Card className={classes.card}>
            <div className={classes.track}>
                <Typography variant="title">
                    {name}
                </Typography>
                <Typography variant="subtitle1">
                    {artist}
                </Typography>
            </div>
            <CardMedia
                image={image}
                title={name}
            />
        </Card>
    )
}

export default SongName;