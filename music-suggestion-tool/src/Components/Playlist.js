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
    }
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
    }
}

PlaylistComponent.PropTypes = {
    classes: PropTypes.object.isRequired, 
}

export default withStyles(styles)(PlaylistComponent);