import React from 'react';
import { render } from '@testing-library/react';
import LaunchList from './launch-list';
import {shallow} from "enzyme/build/index";

const initialProps = {
        year: 0,
        spacexData: [],
        sort: 'ascending'
};

describe('<LaunchList /> with no spacexData', () => {
    const container = shallow(<LaunchList {...initialProps} />);
    it('should match the snapshot without launch data', () => {
        expect(container.html()).toMatchSnapshot();
    });
});

const newProps = {
    year: 0,
    spacexData: [{flight_number: 123,
        mission_name: 'Apollo',
        date: '2020-05-24T13:27:03+0000',
        rocket_name: 'Rocket-1',
        launch_year: '2009'}],
    sort: 'ascending'
};

describe('<LaunchList /> with spacexData', () => {
    const container = shallow(<LaunchList {...newProps} />);
    it('should match the snapshot with launch data', () => {
        expect(container.html()).toMatchSnapshot();
    });
});