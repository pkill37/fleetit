import React from 'react';
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const API_URL = 'http://localhost:8080/api/v1'

class Detail extends React.Component {
  state = {
    stats: null,
    last: []
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
      {this.state.stats !== null &&
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

      {this.state.last.length !== 0 &&
          <ResponsiveContainer minHeight={300}>
            <LineChart data={this.state.last}>
              <XAxis ticks={false} dataKey="timestamp"/>
              <YAxis/>
              <Tooltip/>
              <Legend />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
              <Line type="monotone" dataKey="heartRate" stroke="#8884d8" />
              <Line type="monotone" dataKey="battery" stroke="#82ca9d" />
              <Line type="monotone" dataKey="speed" stroke="#ff7f0e" />
              <Line type="monotone" dataKey="co2" stroke="#bcbd22" />
              <Line type="monotone" dataKey="temp" stroke="#e377c2" />
            </LineChart>
          </ResponsiveContainer>
      }
      </div>
    )
  }
}

export default Detail
