import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Spotify from '../../Services/Spotify';
//import SongList from './SongList'
import BottomAppBar from './BottomAppBar';
import queryString from 'query-string';

const styles = theme => ({
    aroot: {
        flexGrow: 1,
    },
    root: {
        flex: 1, 
        flexDirection: 'row',
        marginLeft: "auto",
        marginRight: "auto"
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
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    fabButton: {
        position: 'absolute',
        top: -30,
        left: 0,
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
            devices: [],
            isPlaying: true,
            alertMessage: false,
            currentSongName: '',
            currentSongArtist: '',
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

    getCurrenPlayingSong() {
        this.spotify.currentPlayingSong()
        .then(result => {
            this.setState({
                currentSongName: result.data.item.name,
                currentSongArtist: result.data.item.artists.map(artist => artist.name).join(' & ')
            })
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
                console.log("pause click");
            })
        } else {
            this.spotify.playPlayback(this.state.devices[0].id)
            .then(result => {
                console.log("play click");
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
            <BottomAppBar classes={classes} 
                        onHandlePlay={this.onHandlePlay} 
                        onHandleNext={this.onHandleNext}
                        onHandlePrevious={this.onHandlePrevious}
                        state={this.state} />
        );
    }
}

PlaylistComponent.propTypes = {
    classes: PropTypes.object.isRequired, 
};

export default withStyles(styles)(PlaylistComponent);