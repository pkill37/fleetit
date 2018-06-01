import React from 'react'
import { Link } from 'react-router-dom'
import {KAFKA_PROXY_URL, KAFKA_TOPIC_ALERTS_SPEED, KAFKA_TOPIC_ALERTS_HEART, KAFKA_TOPIC_ALERTS_BATTERY} from './Constants'

class Alerts extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        speed: [],
        heart: [],
        battery: []
      }
    }

    componentDidMount() {
        (new WebSocket(`${KAFKA_PROXY_URL}/?topic=${KAFKA_TOPIC_ALERTS_SPEED}`)).onmessage = (e) => {
            var payload = JSON.parse(JSON.parse(e.data)[0].message)

            this.setState(prevState => ({
                speed: [...prevState.speed, payload]
            }))
        }

        (new WebSocket(`${KAFKA_PROXY_URL}/?topic=${KAFKA_TOPIC_ALERTS_HEART}`)).onmessage = (e) => {
            var payload = JSON.parse(JSON.parse(e.data)[0].message)

            this.setState(prevState => ({
                heart: [...prevState.heart, payload]
            }))
        }

        (new WebSocket(`${KAFKA_PROXY_URL}/?topic=${KAFKA_TOPIC_ALERTS_BATTERY}`)).onmessage = (e) => {
            var payload = JSON.parse(JSON.parse(e.data)[0].message)

            this.setState(prevState => ({
                battery: [...prevState.battery, payload]
            }))
        }
    }

    render() {
        return (
            <div className="content-wrapper" style={{ padding: '2rem' }}>
                <h1>Alerts</h1>

                {this.state.speed.map((s, index) => (
                    <div key={index} className="alert alert-info" role="alert">
                    Bike <Link to={`/bike/${s.bike_id}`}>#{s.bike_id}</Link> is over the speed limit at {s.speed.toFixed(2)} km/h
                    </div>
                ))}

                {this.state.heart.map((h, index) => (
                    <div key={index} className="alert alert-danger" role="alert">
                    Bike <Link to={`/bike/${h.bike_id}`}>#{h.bike_id}</Link> exceeds the heart rate at {h.heart_rate.toFixed(2)} bps
                    </div>
                ))}

                {this.state.battery.map((b, index) => (
                    <div key={index} className="alert alert-warning" role="alert">
                    Bike <Link to={`/bike/${b.bike_id}`}>#{b.bike_id}</Link> is low on battery at {b.battery.toFixed(2)}%
                    </div>
                ))}
            </div>
        )
    }
}

export default Alerts
