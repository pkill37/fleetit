import React from 'react';

const API_URL = 'http://localhost:8080/api/v1'

class History extends React.Component {
	state = {
      stats : []
	}

	async componentDidMount() {
      let response = await fetch(`${API_URL}/stats`)
      let stats = await response.json()
	  this.setState = ({ stats: stats })
	}

	render() {
	  return (
	    <div className='content-wrapper'>
        <h1>Stats</h1>
        </div>
        )
	}
}

export default History;
