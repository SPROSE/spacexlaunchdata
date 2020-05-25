import React from 'react';
import { render } from '@testing-library/react';
import Year from './year';
import {shallow} from "enzyme/build/index";

const initialProps = {
        yearsData: {
        year: 0,
        availableYears: [2006, 2007, 2008, 2009],
        showYearsDropdown: false
    }
};

describe('<Year /> with props', () => {
    const container = shallow(<Year {...initialProps} />);
    it('should match the snapshot', () => {
        expect(container.html()).toMatchSnapshot();
    });
});

const newProps = {
    yearsData: {
        year: 0,
        availableYears: [2006, 2007, 2008, 2009],
        showYearsDropdown: true
    }
};

test('renders component without dropdown', () => {
    const { getByText } = render(<Year {...newProps} />);
    const dropdownValue = getByText('2008');
    expect(dropdownValue).toBeInTheDocument();
});

describe('<Year /> with dropdown', () => {
    const container = shallow(<Year {...newProps} />);
    it('should match the snapshot', () => {
        expect(container.html()).toMatchSnapshot();
    });
});