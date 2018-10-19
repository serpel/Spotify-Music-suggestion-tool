import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';


import Spotify from '../Services/Spotify';
import queryString from 'query-string'
import { runInNewContext } from 'vm';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 2,
    },
    header: {      
    },  
    playlist: {
    },
    card: {
        display: 'flex',
      },
      details: {
        display: 'flex',
        flexDirection: 'column',
      },
      content: {
        flex: '1 0 auto',
      },
      cover: {
        width: 200,
      },
      controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
      },
      playIcon: {
        height: 38,
        width: 38,
      },
});


function SongName(props){
    const { classes } = props;

    return(
        <Paper className={classes.root} elevation={0}>
            <Typography component="h5" variant="h5">
              Live From Space
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Mac Miller
            </Typography>
        </Paper>
    )
}

function SongControl(props) {
    const { classes } = props;

    return (
        <Paper className={classes.root} elevation={0}>
          <div className={classes.controls}>
            <IconButton aria-label="Previous">
              <SkipPreviousIcon />
            </IconButton>
            <IconButton aria-label="Play/pause">
              <PlayArrowIcon className={classes.playIcon} />
            </IconButton>
            <IconButton aria-label="Next">
              <SkipNextIcon />
            </IconButton>
          </div>
        <CardMedia
          className={classes.cover}
          image="/static/images/cards/live-from-space.jpg"
          title="Live from space album cover"
        />
      </Paper>
    );
  }


class PlaylistComponent extends React.Component {

    spotify = {};

    constructor(props){
        super(props);

        //maybe there is a better way to do this
        const values = queryString.parse(this.props.location.search);
        var token = values.access_token;

        this.state = {
            items: [],
            devices: [],
            isPlaying: false,
            alertMessage: false,
            token: token,
        }

        this.spotify = Spotify.create(process.env.REACT_APP_SPOTIFY_API, token)
    }

    getRecomendationList(){
        this.spotify.recommendations()
        .then(result => {

            this.setState({
                items: result.data.tracks
            })

            console.log(result.data.tracks);
        })
    }

    getProfile(){
        this.spotify.profile()
        .then(result =>  {
            console.log(`${Object.entries(result.data)}`);
        })
        .then(data => {
            /*console.log(data);
            this.setState({
                items: data
            })*/
        })
    }

    getDevices(){
        this.spotify.userDevices()
        .then(result => {
            this.setState({
                devices : result.data.devices
            })
        });
    }

    onHandleGenerateRecomendationList = () => {
        this.getRecomendationList();
    }

    onHandlePlay = () => {

        this.setState({
            isPlaying : !this.state.isPlaying
        })

        if(this.state.isPlaying){
            this.spotify.pausePlayback(this.state.devices[0].id)
            .then(result => {
                //console.log(result);
            })
        } else {
            this.spotify.playPlayback(this.state.devices[0].id)
            .then(result => {
                //console.log(result);
            })
        }
    }

    componentDidMount(){
        this.getDevices();
        this.getRecomendationList();      
    }



    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.root}>
                <Table className={classes.playlist}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Img</TableCell>
                            <TableCell>Tittle</TableCell>
                            <TableCell>Artist</TableCell>
                            <TableCell>Album</TableCell>
                            <TableCell>Options</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.items.map(row => {
                        return (
                        <TableRow key={row.id}>
                            <TableCell><img src={row.album.images[row.album.images.length - 1].url} /></TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.artists.map(artist => artist.name).join(' & ')}</TableCell>
                            <TableCell component="th" scope="row">{row.album.name}</TableCell>
                            <TableCell>
                                <Button onClick={this.onHandlePlay}>
                                    Play
                                </Button>
                            </TableCell>
                        </TableRow>
                        );
                    })}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell>
                                <SongName classes={classes} />
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell>
                                <SongControl classes={classes} />
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableFooter>

                </Table>
        </Paper>
        );
    }
}

PlaylistComponent.propTypes = {
    classes: PropTypes.object.isRequired, 
};

export default withStyles(styles)(PlaylistComponent);