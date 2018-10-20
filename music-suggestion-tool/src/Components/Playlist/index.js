import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Spotify from '../../Services/Spotify';
//import SongList from './SongList'
import BottomAppBar from './BottomAppBar';
import queryString from 'query-string';
import 'typeface-roboto';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },  
    container: {
        position: 'relative',
        maxWidth: 1000,
    },
    main: {
        height: 450,
        overflowY: 'auto',
        position: 'relative',
    },
    list: {
        marginBottom: theme.spacing.unit * 2,
    },
    toolbar: {
        //alignItems: 'center',
        justifyContent: 'space-between',
    },
    toolbaroptions: {
       alignItems: 'center',
       justifyContent: 'space-between',
    },
    fabButton: {
        position: 'absolute',
        top: -30,
        left: 700,
        right: 0,
        margin: '0 auto',
    },
    track: {
        color: 'white',
        textColor: 'white',
    },
    header: {      
    },  
    subHeader: {
        backgroundColor: '#fff',
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
      controlblock: {

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

class PlaylistComponent extends React.Component {

    spotify = {};

    constructor(props){
        super(props);

        //maybe there is a better way to do this
        const values = queryString.parse(this.props.location.search);
        var token = values.access_token;

        this.state = {
            items: [],
            device: null,
            is_playing: '',
            alertMessage: false,
            currentSongName: '',
            currentSongArtist: '',
            currentSongCover: '',
            token: token,
        }

        this.spotify = Spotify.create(process.env.REACT_APP_SPOTIFY_API, token)
    }

    getRecomendationList(){
        this.spotify.recommendations()
        .then(result => {
            return result.data; 
        })
        .then(data =>{
            this.setState({
                items: data.tracks
            })
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

    getCurrenPlayingSong() {
        this.spotify.player()
        .then(result => {
            return result.data;
        })
        .then(data => {
            this.setState({
                is_playing: data.is_playing,
                currentSongName: data.item.name,
                currentSongArtist: data.item.artists.map(artist => artist.name).join(' & '),
                currentSongCover: data.item.album.images[0].url,
            })
        })
    }

    getDevices(){
        this.spotify.userDevices()
        .then(result => {
            // spotify can handle mutiple devices so i need to find the active one in order to play or pause playback
            var device = result.data.devices.find(function(device){
                return device.is_active
            })

            console.log("my device"+ device);
            return device;
        })
        .then( device => {
            this.setState({
                device : device
            })
        })
    }

    onHandleGenerateRecomendationList = () => {
        this.getRecomendationList();
    }

    onHandlePlay = () => {

        /*
        this.setState({
            is_playing : !this.state.is_playing
        })*/
        console.log("este es"+this.state.device.id);
        console.log("current playing "+this.state.is_playing);

        if(this.state.is_playing === true){
            this.spotify.pausePlayback()
            .then(result => {
                console.log("pause click");
                this.getCurrenPlayingSong();
            })
        } else {
            this.spotify.playPlayback()
            .then(result => {
                console.log("play click");
                this.getCurrenPlayingSong();
            })
        }
    }

    onHandleNext = () => {
        this.spotify.nextTrackPlayback()
        .then(result => {
            console.log("next click");

            //refresh current playing view
            this.getCurrenPlayingSong();
        })
    }

    onHandlePrevious = () => {
        this.spotify.previousTrackPlayback()
        .then(result => {
            console.log("back click");

            //refresh current playing view
            this.getCurrenPlayingSong();
        })
    }

    componentDidMount(){
        this.getDevices();
        this.getCurrenPlayingSong();
        this.getRecomendationList();      
    }



    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container direction="row" justify="center" alignItems="center">
                    <BottomAppBar classes={classes} 
                                onHandlePlay={this.onHandlePlay} 
                                onHandleNext={this.onHandleNext}
                                onHandlePrevious={this.onHandlePrevious}
                                state={this.state} />
                </Grid>
            </div>
        );
    }
}

PlaylistComponent.propTypes = {
    classes: PropTypes.object.isRequired, 
};

export default withStyles(styles)(PlaylistComponent);