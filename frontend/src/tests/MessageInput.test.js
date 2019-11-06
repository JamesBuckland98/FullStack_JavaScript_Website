import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import MessageInput from '../components/MessageInput';
import { geolocated } from "react-geolocated";

it('should render Message input component correctly', () => {
	const mockSuccessfulGeolocationProvider = {
		getCurrentPosition(onSuccess) {
			return onSuccess({
				coords: {
					latitude: 50,
					longitude: 20,
				},
			});
		},
		watchPosition(onSuccess) {
			return onSuccess({
				coords: {
					latitude: 50,
					longitude: 20,
				},
			});
		},
	};
	const Component = geolocated({
		geolocationProvider: mockSuccessfulGeolocationProvider,
	})(MessageInput)
	const wrapper = shallow(<Component/>)
	expect(toJson(wrapper)).toMatchSnapshot();
});

