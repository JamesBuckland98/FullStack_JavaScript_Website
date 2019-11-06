import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import Login from '../components/Login';


it('should render Login component correctly', () => {
	const wrapper = shallow(<Login/>);
	expect(toJson(wrapper)).toMatchSnapshot();
})


describe('When sign up button is clicked', () => {
	it('switches between login and sign up', () => {
		const switchComponet = jest.fn();
		const wrapper = shallow(<Login switch= { switchComponet }/>);
		const buttonElement = wrapper.find('.link')
		buttonElement.simulate('click');
		expect(switchComponet).toHaveBeenCalledTimes(2);
	})
})