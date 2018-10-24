import React from 'react';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem';
import SettingIcon from '@material-ui/icons/Settings'

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    searchRoot: {
      width: '100%',
    },
    heading: {
      //fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
      //fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    icon: {
      verticalAlign: 'bottom',
      height: 20,
      width: 20,
    },
    details: {
      alignItems: 'center',
    },
    column: {
      flexBasis: '33.33%',
    },
    helper: {
      borderLeft: `2px solid ${theme.palette.divider}`,
      padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    link: {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing.unit,
    },
  });

function SearchSettings(props){

    const { classes, genres, genre, handleChange, } = props;

    return (
        <div className={classes.searchRoot}>
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <SettingIcon />
                    <div className={classes.column}>         
                        <Typography className={classes.heading}>
                            Settings
                        </Typography>
                    </div>
                    <div className={classes.column}>
                        <Typography className={classes.secondaryHeading}>Genre</Typography>
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.details}>
                    <div className={classes.column} />
                    <div className={classes.column}>
                        <Select
                            multiple
                            value={genre}
                            onChange={handleChange}
                            input={<Input id="select-multiple-chip" />}
                            renderValue={selected => (
                            <div className={classes.chips}>
                                {selected.map(value => (
                                    <Chip key={value} label={value} className={classes.chip} />
                                ))}
                            </div>
                            )}
                            >
                            {genres.map(name => (
                                <MenuItem
                                    key={name}
                                    value={name}
                                >
                                {name}
                            </MenuItem>
                            ))}
                        </Select>                     
                    </div>
                    <div className={classes.column}>
                    <Typography variant="subheading">
                        Select music genre
                        <br />
                    </Typography>
                    </div>
                </ExpansionPanelDetails>
                <Divider />
            </ExpansionPanel>
        </div>
       );
}

export default withStyles(styles)(SearchSettings);