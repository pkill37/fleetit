import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { BrowserRouter, Route, Link, MemoryRouter } from 'react-router-dom'
import App from './App'
import Main from './Main'
import Alerts from './Alerts'
import LiveMap from './LiveMap' 

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('<App />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    render((<BrowserRouter>
		<App />
	    </BrowserRouter>), div);
  })
});

describe('<Alerts />', () => {
  it('there are no alerts when it starts', () => {
    expect(document.getElementById('speed')).toBeNull();
    expect(document.getElementById('heart')).toBeNull();
    expect(document.getElementById('battery')).toBeNull();   
  });

  it('receives an alert when speed is very high', async () => {
    await sleep(4999);
    expect(document.getElementById('speed')).not.toBeNull();
  });
  
  it('receives an alert when heart rate is very high', async () => {
    await sleep(4999);
    expect(document.getElementById('heart')).not.toBeNull();
  });

  it('receives an alert when battery is very low', async () => {
    await sleep(4999);
    expect(document.getElementById('battery')).not.toBeNull();
  });
});
