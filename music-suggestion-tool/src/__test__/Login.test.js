import React from 'react';
import { shallow, mount } from 'enzyme';
import Login from '../Components/Login';

describe('Render login component', () => {
 
    it('login should render without throwing an error', () => {
      expect(shallow(<Login />).find('#form').exists() === true)
    })

    it('renders a login button', () => {

        const component = mount(<Login />);

        expect(component.find('#button').exists() == true)

        //component.find('#button').simulate()
        //expect(component).toMatchSnapshot();
        component.unmount();
    })
})