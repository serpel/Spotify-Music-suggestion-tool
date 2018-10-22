
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Divider from '@material-ui/core/Divider';

function AddPlaylistDialog(props){

    const { fullScreen, state, handleClosePlaylist, onHandleAddPlaylistSubmit, handleAttributeChange } = props;

    return(
            <Dialog
                fullScreen={fullScreen}
                open={state.addPlaylistDialog}
                onClose={handleClosePlaylist}
                aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">Add New Playlist</DialogTitle>
                    <form onSubmit={onHandleAddPlaylistSubmit}>
                      <DialogContent> 
                        <DialogContentText>
                            Please Add a Playlist Name
                        </DialogContentText>
                        <TextField value={state.playlistName} onChange={handleAttributeChange('playlistName')} />                
                      </DialogContent>
                        {state.loadingAddPlaylist && <LinearProgress />}
                      <Divider />
                      <DialogActions>
                        <Button onClick={handleClosePlaylist} color="primary">Cancel</Button>
                        <Button type="submit" color="primary">Save</Button>
                      </DialogActions>
                    </form>
              </Dialog>
    );
}

export default AddPlaylistDialog;