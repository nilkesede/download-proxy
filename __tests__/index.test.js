import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Index from '../src/pages';

Enzyme.configure({adapter: new Adapter()});

describe('on Index', () => {
  it('shows an input field', () => {
    const index = shallow(<Index/>);
    expect(index.find('input').exists).toBeTruthy();
  });

  it('have a initial state', () => {
    const index = shallow(<Index/>);
    expect(index.state().value).toBe('');
  });

  it('change state value when input value change', () => {
    const index = shallow(<Index/>);
    index.setState({value: 'testing'});
    expect(index.find('input').props().value).toEqual('testing');
  });
});
