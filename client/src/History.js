import React from 'react';

const API_URL = 'http://localhost:8080/api/v1'

class History extends React.Component {
	state = {
      stats: null
	}

	async componentDidMount() {
      let response = await fetch(`${API_URL}/stats`)
      let stats = await response.json()
	  this.setState({ stats: stats })
	}

	render() {
	  return (
	    <div className='content-wrapper'>
        <h1>Stats</h1>
        {this.state.stats != null && (
        <ul>
          <li>{this.state.stats.heartRate} average heart rate</li>
          <li>{this.state.stats.battery} average battery</li>
          <li>{this.state.stats.speed} average speed</li>
          <li>{this.state.stats.co2} average CO2</li>
          <li>{this.state.stats.temp} average temperature</li>
        </ul>
        )}
        </div>
        )
	}
}

export default History;
