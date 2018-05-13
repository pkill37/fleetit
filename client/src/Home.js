import React from 'react';
import LiveMap from './LiveMap';

const Home = (props) => (
	<div className='content-wrapper'>
		<LiveMap history={props.history} />
	</div>
)

export default Home;
