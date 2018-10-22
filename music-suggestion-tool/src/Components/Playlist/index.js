import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Spotify from '../../Services/Spotify';
//import SongList from './SongList'
import TopAppBar from './TopAppBar';
import BottomAppBar from './BottomAppBar';
import AddPlaylistDialog from './AddPlaylistDialog';
import queryString from 'query-string';
import 'typeface-roboto';
import green from '@material-ui/core/colors/green';

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
        alignContent: 'space-between',
        alignItems: 'center',
    },
    avatar: {
        margin: 10,
    },
    logout: {
        left: '45%'
    },
    fabButton: {
        position: 'absolute',
        top: -30,
        left: '50%',
        right: 0,
        margin: '0 auto',
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -30,
        left: '50%',
        right: 0,
        margin: '0 auto',
        zIndex: 1,
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
      wrapper: {
        //margin: theme.spacing.unit,
        //position: 'relative',
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
            genres: [],
            genre: [],
            device: null,
            loading: false,
            is_playing: '',
            alertMessage: false,
            currentSongName: '',
            currentSongArtist: '',
            currentSongCover: '',
            userId: '',
            profileImg: '',
            profileName: '',
            addPlaylistDialog: false,
            loadingAddPlaylist: false,
            playlistName: '',
            settingExpanded: false,
            token: token === (null || '' ) ? this.state.token : token,
        }

        //console.log('hey ')

        this.spotify = Spotify.create(process.env.REACT_APP_SPOTIFY_API, this.state.token)
    }

    getRecomendationList(){

        //i need to check loading state for reduce callbacks 
        if (!this.state.loading) {

            this.setState({
                loading: true,
            })

            //default values;
            let genre = '';
            let limit = 15;

            if(this.state.genre.length > 0)
            {
                genre = this.state.genre.join(',');
            }

            this.spotify.recommendations(limit, genre)
            .then(result => {
                return result.data; 
            })
            .then(data =>{
                this.setState({
                    items: data.tracks,
                    loading: false
                })
            })
        }
    }

    getGenres(){
        this.spotify.recommendationGenreSeeds()
        .then(result => {
            return result.data;
        })
        .then(data => {
            this.setState({
                genres: data.genres,
            })
        })
    }

    getProfile(){
        this.spotify.profile()
        .then(result =>  {
            //console.log(result.data);
            return result.data;
        })
        .then(data => {
            this.setState({
                userId: data.id,
                profileName: data.display_name,
                profileImg: data.images[data.images.length -1].url,
            })
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
                currentSongCover: data.item.album.images[data.item.album.images.length -1].url,
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

            return device;
        })
        .then( device => {
            this.setState({
                device : device
            })
        })
    }

    onHandleNewRecomendationList = () => {
        this.getRecomendationList();
    }

    onHandlePlay = () => {
        if(this.state.is_playing === true){
            this.spotify.pausePlayback()
            .then(result => {
                console.log("pause click");
                this.setState({
                    is_playing : !this.state.is_playing
                })
            })
        } else {
            this.spotify.playPlayback()
            .then(result => {
                console.log("play click");
                this.setState({
                    is_playing : !this.state.is_playing
                })
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

    //handle change genre settings block
    handleChange = event => {
        this.setState({ genre: event.target.value });
    };

    handleAttributeChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleAddPlaylist = () => {
        this.setState({
            addPlaylistDialog: true,
        })
    }

    handleClosePlaylist = () => {
        this.setState({
            addPlaylistDialog: false,
        })
    } 
    
    onHandleAddPlaylistSubmit = () => {

        if(!this.state.loadingAddPlaylist){
            this.setState({
                loadingAddPlaylist: true,
            })

            this.spotify.createNewPlaylist(this.state.userId, this.state.playlistName, '', true)
            .then(result => {
                return result.data;
            })
            .then(data => {
                //adding tracks to playlist
                if(data.id){
                    //my recommended list
                    var uris = this.state.items.map(track => track.uri).join(',');
                    //console.log(uris);
                    this.spotify.addTracksToPlaylist(data.id, uris)
                    .then(result => {
                        return result.data;
                    })
                    .then(data => {
                        console.log("add playlist success");
                    })
                }

                this.setState({
                    loadingAddPlaylist: false,
                    addPlaylistDialog: false,
                })
            })
        }
    }

    componentDidMount(){
        this.getProfile();
        this.getDevices();
        this.getGenres();
        this.getCurrenPlayingSong();
        this.getRecomendationList();      
    }



    render() {
        const { classes } = this.props;

        if(this.state.token === (null || '')){
            return null;
        }

        return (
            <div className={classes.root}>
                <Grid container direction="row" justify="center" alignItems="center">
                    <TopAppBar classes={classes}
                               onHandleLogout={this.onHandleLogout}
                               profileImg={this.state.profileImg}
                               profileName={this.state.profileName} 
                               {...this.props} />
                    <BottomAppBar classes={classes} 
                                onHandlePlay={this.onHandlePlay} 
                                onHandleNext={this.onHandleNext}
                                onHandlePrevious={this.onHandlePrevious}
                                onHandleNewRecomendationList={this.onHandleNewRecomendationList}
                                handleChange={this.handleChange}  
                                handleAddPlaylist={this.handleAddPlaylist}       
                                state={this.state}
                                {...this.props} />
                </Grid>

                <AddPlaylistDialog 
                    state={this.state}  
                    handleAddPlaylist={this.handleAddPlaylist}
                    handleClosePlaylist={this.handleClosePlaylist}
                    onHandleAddPlaylistSubmit={this.onHandleAddPlaylistSubmit}
                    handleAttributeChange={this.handleAttributeChange}
                    {...this.props} />
            </div>
        );
    }
}

PlaylistComponent.propTypes = {
    classes: PropTypes.object.isRequired, 
};

export default withStyles(styles)(PlaylistComponent);