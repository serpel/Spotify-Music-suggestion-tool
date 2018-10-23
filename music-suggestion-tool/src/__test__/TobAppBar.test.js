import React from 'react';
import { mount } from 'enzyme';
import TopAppBar from '../Components/Playlist/TopAppBar';

describe('Render top app bar component', () => {

    it('renders a table list with a recommendation button', () => {

        const classes = theme => ({
            'root': {
                height: 450,
                overflowY: 'auto',
                position: 'relative',
            },
        });

        const component = mount(<TopAppBar classes={classes} profileName={'Sergio Peralta'} />);

        //the h2 header exist 
        expect(component.find('h2').exists()).toBe(true)

        //welcome message
        expect(component.find('h2').text()).toBe(`Welcome: Sergio Peralta`)

        //logout button
        expect(component.find('button').exists()).toBe(true)

        component.unmount();
    })
})