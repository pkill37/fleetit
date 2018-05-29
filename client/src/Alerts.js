import React from 'react'
import {KAFKA_PROXY_URL, KAFKA_TOPIC_ALERTS_SPEED, KAFKA_TOPIC_ALERTS_HEART, KAFKA_TOPIC_ALERTS_BATTERY} from './constants'

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

                <h2>Speed Alerts</h2>
                <ul>
                {this.state.speed.map((s, index) => (
                    <li key={index}>Bike #{s.bike_id} is over the speed limit at {s.speed} km/h</li>
                ))}
                </ul>

                <h2>Heart Rate Alerts</h2>
                <ul>
                {this.state.heart.map((h, index) => (
                    <li key={index}>Bike #{h.bike_id} exceeds the heart rate at {h.heart_rate} bps</li>
                ))}
                </ul>

                <h2>Battery Alerts</h2>
                <ul>
                {this.state.battery.map((b, index) => (
                    <li key={index}>Bike #{b.bike_id} is on low battery ({b.battery}%)</li>
                ))}
                </ul>
            </div>
        )
    }
}

export default Alerts
