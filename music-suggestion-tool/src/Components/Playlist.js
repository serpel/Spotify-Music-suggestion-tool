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
        //justifyContent: 'space-around',
        overflow: 'hidden',
        //backgroundColor: 'powderblue',
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
        const result = this.spotify.getMe();
        console.log(result);
    }

    getProfile(){
        const result = this.spotify.getMe();
        console.log(result);
    }

    onHandleGenerateRecomendationList = () => {
        this.getRecomendationList();
    }

    componentDidMount(){
        this.getProfile();
        this.getRecomendationList();      
    }

    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.root}>
                <Table className={classes.playlist}>
                    <TableHead>
                        <TableRow>
                            <TableCell numeric>Img</TableCell>
                            <TableCell>Tittle</TableCell>
                            <TableCell numeric>Album</TableCell>
                            <TableCell>Options</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.items.map(row => {
                        return (
                        <TableRow key={row.id}>
                            <TableCell numeric>{row.Tittle}</TableCell>
                            <TableCell component="th" scope="row">{row.Album}</TableCell>
                            <TableCell numeric>
                                <Button>
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