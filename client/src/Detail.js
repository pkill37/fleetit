import React from 'react'
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import {API_URL} from './constants'

const DetailWrapper = ({ match }) => (
  <Detail id={match.params.id} />
)

class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stats: null,
      last: []
    }
  }

  async componentDidMount() {
    try {
      let id = this.props.id

      let r1 = await fetch(`${API_URL}/bike/${id}/stats`)
      let stats = await r1.json()

      let r2 = await fetch(`${API_URL}/bike/${id}/last/30`)
      let last = await r2.json()

      this.setState({ stats: stats, last: last })
    } catch(error) {
      console.log(error)
    }
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
          <div>
          <h1>Stats Over Last 30 Days</h1>
          <ResponsiveContainer minHeight={300}>
          <LineChart data={this.state.last}>
          <XAxis tick={false} dataKey="timestamp"/>
          <YAxis/>
          <Tooltip/>
          <Legend />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
          <Line type="monotone" dataKey="heartRate" stroke="#8884d8" />
          </LineChart>
          </ResponsiveContainer>
          <ResponsiveContainer minHeight={300}>
          <LineChart data={this.state.last}>
          <XAxis tick={false} dataKey="timestamp"/>
          <YAxis/>
          <Tooltip/>
          <Legend />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
          <Line type="monotone" dataKey="battery" stroke="#82ca9d" />
          </LineChart>
          </ResponsiveContainer>
          <ResponsiveContainer minHeight={300}>
          <LineChart data={this.state.last}>
          <XAxis tick={false} dataKey="timestamp"/>
          <YAxis/>
          <Tooltip/>
          <Legend />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
          <Line type="monotone" dataKey="speed" stroke="#ff7f0e" />
          </LineChart>
          </ResponsiveContainer>
          <ResponsiveContainer minHeight={300}>
          <LineChart data={this.state.last}>
          <XAxis tick={false} dataKey="timestamp"/>
          <YAxis/>
          <Tooltip/>
          <Legend />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
          <Line type="monotone" dataKey="co2" stroke="#bcbd22" />
          </LineChart>
          </ResponsiveContainer>
          <ResponsiveContainer minHeight={300}>
          <LineChart data={this.state.last}>
          <XAxis tick={false} dataKey="timestamp"/>
          <YAxis/>
          <Tooltip/>
          <Legend />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
          <Line type="monotone" dataKey="temp" stroke="#e377c2" />
          </LineChart>
          </ResponsiveContainer>
          </div>
      }
      </div>
    )
  }
}

export default DetailWrapper
