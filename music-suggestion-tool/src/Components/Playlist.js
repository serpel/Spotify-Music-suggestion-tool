import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button'

import Spotify from '../Services/Spotify';
import queryString from 'query-string'

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

    onHandleGenerateRecomendationList = () => {
        this.getRecomendationList();
    }

    onHandlePlay = () => {
        //this.re
    }

    componentDidMount(){
        //this.getProfile();

        this.spotify.userDevices()
        .then(result => {
            console.log(result);
        });

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
                            <TableCell><img src={row.album.images.pop().url} /></TableCell>
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
                </Table>
        </Paper>
        );
    }
}

PlaylistComponent.propTypes = {
    classes: PropTypes.object.isRequired, 
}

export default withStyles(styles)(PlaylistComponent);