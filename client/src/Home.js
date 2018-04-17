import React from 'react';
import LiveMap from './LiveMap';

const Home = () => (
	<div className='content-wrapper'>
		<div style={{backgroundColor: "#fdfefe", height:"50px", marginLeft: "40px"}}>
			<i className="material-icons" style={{display: "inline-block", verticalAlign: "middle"}}>map</i>
			<h1 style={{display: "inline-block", verticalAlign: "middle", marginLeft: "15px"}}>My Location</h1>
		</div>
		<LiveMap/>
	</div>
)

export default Home;
