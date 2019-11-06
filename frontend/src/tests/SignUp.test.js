import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import SingUp from '../components/SignUp';

it('should render Sign up component correctly', () =>{
	const wrapper = shallow(<SingUp/>);
	expect(toJson(wrapper)).toMatchSnapshot();
});

describe('When sign up button is clicked', () => {
	it('switches between login and sign up', () => {
		const switchComponet = jest.fn();
		const wrapper = shallow(<SingUp switch= { switchComponet }/>);
		const buttonElement = wrapper.find('.link')
		buttonElement.simulate('click');
		expect(switchComponet).toHaveBeenCalledTimes(2);
	})
})