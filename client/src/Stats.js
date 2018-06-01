import React from 'react';
import {API_URL} from './Constants'

class Stats extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stats: null
        }
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
                <div className="card-deck">
                    <div className="card text-white bg-danger mb-3" style={{maxWidth: '18rem'}}>
                        <div className="card-header">Average Heart Rate</div>
                        <div className="card-body">
                            <h1 className="card-title text-center">{this.state.stats.heartRate.toFixed(2)} bps</h1>
                        </div>
                    </div>
                    <div className="card text-white bg-warning mb-3" style={{maxWidth: '18rem'}}>
                        <div className="card-header">Average Battery</div>
                        <div className="card-body">
                            <h1 className="card-title text-center">{this.state.stats.battery.toFixed(2)}%</h1>
                        </div>
                    </div>
                    <div className="card text-white bg-success mb-3" style={{maxWidth: '18rem'}}>
                        <div className="card-header">Average Speed</div>
                        <div className="card-body">
                            <h1 className="card-title text-center">{this.state.stats.speed.toFixed(2)} km/h</h1>
                        </div>
                    </div>
                    <div className="card text-white bg-primary mb-3" style={{maxWidth: '18rem'}}>
                        <div className="card-header">Average Temperature</div>
                        <div className="card-body">
                            <h1 className="card-title text-center">{this.state.stats.temp.toFixed(2)} ºC</h1>
                        </div>
                    </div>
                    <div className="card text-white bg-dark mb-3" style={{maxWidth: '18rem'}}>
                        <div className="card-header">Average CO2</div>
                        <div className="card-body">
                            <h1 className="card-title text-center">{this.state.stats.co2.toFixed(2)} ppm</h1>
                        </div>
                    </div>
                </div>
            )}
            </div>
        )
    }
}

export default Stats;
