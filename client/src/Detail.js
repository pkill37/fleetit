import React from 'react'
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import {API_URL} from './Constants'

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
      <div className="content-wrapper" style={{ padding: '2rem' }}>
      {this.state.stats !== null &&
        <div>
        <h1>Bike #{this.state.stats.bikeId} Most Recent Details</h1>
        <div className="card-deck">
            <div className="card text-white bg-danger mb-3" style={{maxWidth: '18rem'}}>
                <div className="card-header">Heart Rate</div>
                <div className="card-body">
                    <h1 className="card-title text-center">{this.state.stats.heartRate.toFixed(2)} bps</h1>
                </div>
            </div>
            <div className="card text-white bg-warning mb-3" style={{maxWidth: '18rem'}}>
                <div className="card-header">Battery</div>
                <div className="card-body">
                    <h1 className="card-title text-center">{this.state.stats.battery.toFixed(2)}%</h1>
                </div>
            </div>
            <div className="card text-white bg-success mb-3" style={{maxWidth: '18rem'}}>
                <div className="card-header">Speed</div>
                <div className="card-body">
                    <h1 className="card-title text-center">{this.state.stats.speed.toFixed(2)} km/h</h1>
                </div>
            </div>
            <div className="card text-white bg-primary mb-3" style={{maxWidth: '18rem'}}>
                <div className="card-header">Temperature</div>
                <div className="card-body">
                    <h1 className="card-title text-center">{this.state.stats.temp.toFixed(2)} ºC</h1>
                </div>
            </div>
            <div className="card text-white bg-dark mb-3" style={{maxWidth: '18rem'}}>
                <div className="card-header">CO2</div>
                <div className="card-body">
                    <h1 className="card-title text-center">{this.state.stats.co2.toFixed(2)} ppm</h1>
                </div>
            </div>
        </div>
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
