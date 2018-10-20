function SongList(props){

    const { classes } = props;

    return (
        <Paper className={classes.root}>
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
                    {this.state.items.map(row => {
                        return (
                            <TableRow key={row.id}>
                                <TableCell><img src={row.album.images[row.album.images.length - 1].url} alt={row.album.name}/></TableCell>
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
                            <SongName classes={classes} name={this.state.currentSongName} artist={this.state.currentSongArtist} />
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell>
                            <SongControl classes={classes} onHandlePlay={this.onHandlePlay} onHandleNext={this.onHandleNext} onHandlePrevious={this.onHandlePrevious} />
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