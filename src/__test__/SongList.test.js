import React from 'react';
import { shallow, mount } from 'enzyme';
import SongList from '../Components/Playlist/SongList';

describe('Render login component', () => {
 
    /*
    it('playlist should render with a song list', () => {
      expect(shallow(<SongList />).find('#table').exists() === true)
    })*/

    it('renders a table list with a recommendation button', () => {

        const classes = theme => ({
            'main': {
                height: 450,
                overflowY: 'auto',
                position: 'relative',
            },
        });

        const state = {
            genre: [],
            genres: Array(9).fill(null),
            items: [{
                id: '12312',
                name: 'Pain',
                artists: [{
                    name: 'Three Days Grace'
                }],
                album: {
                    name: 'One-X',
                    images: [{
                        url: ''
                    }]
                }
            }]
        }

        const component = mount(<SongList classes={classes} state={state} />);

        //the table renders 
        expect(component.find('table').exists()).toBe(true)

        //onHandleSaveTrackToUserLibrary button
        expect(component.find('button').exists()).toBe(true)

        component.unmount();
    })
})