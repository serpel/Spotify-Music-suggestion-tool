import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SongName from './SongName'
import SongControl from './SongControl'

function SongList(props){

    const { classes, state, onHandlePlay, onHandleNext, onHandlePrevious } = props;

    return (
        <Paper square className={classes.main}>
          <Typography className={classes.text} variant="h5" gutterBottom>
            Song List
          </Typography>
            <Table className={classes.playlist}>
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
                                    <Button onClick={onHandlePlay}>
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
                            <SongName classes={classes} name={state.currentSongName} artist={state.currentSongArtist} />
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell>
                            <SongControl classes={classes} onHandlePlay={onHandlePlay} onHandleNext={onHandleNext} onHandlePrevious={onHandlePrevious} />
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </Paper>
    );
}

export default SongList;