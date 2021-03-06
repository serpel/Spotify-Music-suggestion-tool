import React from 'react';
//import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import SearchSettings from './SearchSettings'

function SongList(props){

    const { classes, state, onHandleSaveTrackToUserLibrary, handleChange } = props;

    return (
        <Paper square className={classes.main}>

         <SearchSettings 
            genres={state.genres} 
            genre={state.genre} 
            handleChange={handleChange} />

          <Table>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Tittle</TableCell>
                        <TableCell>Artist</TableCell>
                        <TableCell>Album</TableCell>
                        <TableCell>Options</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {state.items.map(row => {
                        return (
                            <TableRow key={row.id}>
                                <TableCell><img src={row.album.images[row.album.images.length - 1].url} alt={row.album.name}/></TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.artists.map(artist => artist.name).join(' & ')}</TableCell>
                                <TableCell component="th" scope="row">{row.album.name}</TableCell>
                                <TableCell>
                                    <Button onClick={() => onHandleSaveTrackToUserLibrary(row.id)}>
                                        <AddIcon />
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

export default SongList;