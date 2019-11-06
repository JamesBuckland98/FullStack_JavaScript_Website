import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import App from '../components/App';

it('should render App correctly', () => {
	const wrapper = shallow(<App/>);
	expect(toJson(wrapper)).toMatchSnapshot();
});
