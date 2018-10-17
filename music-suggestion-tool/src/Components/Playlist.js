import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

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
    constructor(props){
        super(props);

        this.state = {
            items: [],
            alertMessage: false,
        }
    }

    getRecomendationList(){
        var url = ``;
        console.log(`Called : ${url}`);
        //axios
    }

    onHandleGenerateRecomendationList = () => {
        this.getRecomendationList();
    }

    componentDidMount(){
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
                    {items.map(row => {
                        return (
                        <TableRow key={row.id}>
                            <TableCell numeric>{row.Tittle}</TableCell>
                            <TableCell component="th" scope="row">{row.Album}</TableCell>
                            <TableCell numeric>
                                <Buttom>
                                    Play
                                </Buttom>
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

PlaylistComponent.PropTypes = {
    classes: PropTypes.object.isRequired, 
}

export default withStyles(styles)(PlaylistComponent);