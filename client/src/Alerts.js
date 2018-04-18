import React from 'react';

const KAFKA_TOPIC_ALERTS_SPEED = 'alerts-speed'
const KAFKA_TOPIC_ALERTS_HEART = 'alerts-heart'
const KAFKA_WEBSOCKET_PROXY = 'ws://localhost:9999'

class Alerts extends React.Component {
    state = {
        speed: [],
        heart: []
    }

    componentDidMount() {
        (new WebSocket(`${KAFKA_WEBSOCKET_PROXY}/?topic=${KAFKA_TOPIC_ALERTS_SPEED}`)).onmessage = (e) => {
            var payload = JSON.parse(JSON.parse(e.data)[0].message)
            console.log('!!!!!!!!! speed alert', payload)

            this.setState(prevState => ({
                speed: [...prevState.speed, payload]
            }))
        }

        (new WebSocket(`${KAFKA_WEBSOCKET_PROXY}/?topic=${KAFKA_TOPIC_ALERTS_HEART}`)).onmessage = (e) => {
            var payload = JSON.parse(JSON.parse(e.data)[0].message)
            console.log('!!!!!!!!! heart alert', payload)

            this.setState(prevState => ({
                heart: [...prevState.heart, payload]
            }))
        }
    }

    render() {
        return (
            <div className="content-wrapper">
                <div style={{backgroundColor: "#fdfefe", height:"50px", marginLeft: "40px"}}>
                    <i className="material-icons" style={{display: "inline-block", verticalAlign: "middle"}}>report_problem</i>
                    <h1 style={{display: "inline-block", verticalAlign: "middle", marginLeft: "15px"}}>Alerts</h1>
                </div>
                <h2>Speed Alerts</h2>
                <ul>
                {this.state.speed.map((s, index) => (
                    <li key={index}>Bike #{s.bike_id} is over the speed limit at {s.speed} km/h</li>
                ))}
                </ul>

                <h2>Heart Rate Alerts</h2>
                <ul>
                {this.state.heart.map((h, index) => (
                    <li key={index}>Bike #{h.bike_id} exceeds the heart rate at {h.heart_rate} km/h</li>
                ))}
                </ul>
            </div>
        )
    }
}

export default Alerts
