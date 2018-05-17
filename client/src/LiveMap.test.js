import React from 'react'
import LiveMap from './LiveMap'

describe('<LiveMap/>', () => {
  it('there are no updates coming up when it starts', async () => {
    const wrapper = shallow(<LiveMap/>)
    await wrapper.instance().componentDidMount()
    expect(wrapper.state('bikes')).toEqual(new Map())
  });
});
