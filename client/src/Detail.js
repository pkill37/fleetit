import React from 'react';

const API_URL = 'http://localhost:8080/api/v1'

class Detail extends React.Component {
  state = {
    stats: null,
    last: null
  }

  async componentDidMount() {
    let r1 = await fetch(`${API_URL}/bike/8925/stats`)
    let stats = await r1.json()
    console.log('stats', stats)
    let r2 = await fetch(`${API_URL}/bike/8925/last/30`)
    let last = await r2.json()
    console.log('last', last)
    this.setState({ stats: stats, last: last })
  }

  render() {
    return (
      <div className="content-wrapper">
        {this.state.stats != null &&
          <div>
            <h1>Bike #{this.state.stats.bikeId} Most Recent Details</h1>
            <ul>
              <li>Speed: {this.state.stats.speed} km/h</li>
              <li>CO2: {this.state.stats.co2}</li>
              <li>Heart Rate: {this.state.stats.heartRate}</li>
              <li>Temperature: {this.state.stats.temp}</li>
              <li>Battery: {this.state.stats.battery}</li>
              <li>Latitude: {this.state.stats.lat}</li>
              <li>Longitude: {this.state.stats.lng}</li>
            </ul>
          </div>
        }
      </div>
    )
  }
}

export default Detail
