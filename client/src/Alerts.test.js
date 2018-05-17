import React from 'react'
import Alerts from './Alerts'

describe('<Alerts />', () => {
  it('there are no alerts when it starts', async () => {
    const wrapper = shallow(<Alerts/>)
    await wrapper.instance().componentDidMount()
    expect(wrapper.state('speed')).toEqual([])
    expect(wrapper.state('heart')).toEqual([])
    expect(wrapper.state('battery')).toEqual([])
  });
});
