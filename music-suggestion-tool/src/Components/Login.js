import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SpotifyIcon from '../Images/SpotifyIcon.png'
import { Redirect } from  'react-router-dom';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        //justifyContent: 'space-around',
        overflow: 'hidden',
        //backgroundColor: 'powderblue',
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 2,
        height: '100vh',
    },
    container: {
        //backgroundColor: theme.palette.background.paper,
    },
    button: {
        margin: theme.spacing.unit,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
});

class LoginComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loggedIn: sessionStorage.getItem('loggedin') === 'true',
            alertMessage: false,
        }
    }

    onLoginSubmitHandler = (event) => {
        event.preventDefault();
        window.location.href = process.env.REACT_APP_AUTH_API+'/login';
    }

    render(){

        const { classes } = this.props;

        if(this.state.loggedIn) {
            return <Redirect to='/home'/>;
        }

        return (
            <Paper className={classes.root}>
               <Grid container spacing={12}>
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={1} sm container className={classes.container}>
                        <form onSubmit={this.onLoginSubmitHandler}>
                            <Button variant="contained" color="default" type="submit" className={classes.button} >
                                <img src={SpotifyIcon} alt="spotify" className={classes.extendedIcon} />
                                Login With Spotify
                            </Button>
                        </form>
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

LoginComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginComponent)