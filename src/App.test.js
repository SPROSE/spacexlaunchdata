import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';

import App from './App';

const initialProps = {
    yearsData: {}
};

test('renders header elements', () => {
  const { getByText } = render(<App />);
  const headerText = getByText('Launches');
  const reloadText = getByText('Reload Data');
  expect(headerText).toBeInTheDocument();
  expect(reloadText).toBeInTheDocument();
});

describe('<App /> with props', () => {
    const container = shallow(<App {...initialProps} />);
    it('should match the snapshot', () => {
        expect(container.html()).toMatchSnapshot();
    });
});