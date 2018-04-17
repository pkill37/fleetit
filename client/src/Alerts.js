import React from 'react';

const KAFKA_TOPIC_ALERTS_SPEED = 'alerts-speed'
const KAFKA_WEBSOCKET_PROXY = 'ws://localhost:9999'

class Alerts extends React.Component {
    state = {
        alerts: []
    }

    componentDidMount() {
        (new WebSocket(`${KAFKA_WEBSOCKET_PROXY}/?topic=${KAFKA_TOPIC_ALERTS_SPEED}`)).onmessage = (e) => {
            var payload = JSON.parse(JSON.parse(e.data)[0].message)
            console.log('!!!!!!!!! alert', payload)

            this.setState(prevState => ({
                alerts: [...prevState.alerts, payload]
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
                <ul>
                {this.state.alerts.map((alert, index) => (
                    <li key={index}>Bike #{alert.bike_id} is over the speed limit at {alert.speed} km/h</li>
                ))}
                </ul>
            </div>
        )
    }
}

export default Alerts
