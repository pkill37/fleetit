import React from 'react'
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
            <div className="content-wrapper">
                <h1>Alerts</h1>

                {this.state.speed.map((s, index) => (
                    <div key={index} className="alert alert-info" role="alert">
                    Bike #{s.bike_id} is over the speed limit at {s.speed} km/h
                    </div>
                ))}

                {this.state.heart.map((h, index) => (
                    <div key={index} className="alert alert-danger" role="alert">
                    Bike #{h.bike_id} exceeds the heart rate at {h.heart_rate} bps
                    </div>
                ))}

                {this.state.battery.map((b, index) => (
                    <div key={index} className="alert alert-warning" role="alert">
                    Bike #{b.bike_id} is low on battery at {b.battery}%
                    </div>
                ))}
            </div>
        )
    }
}

export default Alerts
