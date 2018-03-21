import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const Map = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100vh` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) =>
    <GoogleMap
        defaultZoom={12}
        center={{ lat: props.lat, lng: props.lng }}
    >
        {props.isMarkerShown && <Marker position={{ lat: props.lat, lng: props.lng }} onClick={props.onMarkerClick} />}
    </GoogleMap>
)

class LiveMap extends React.Component {
    state = {
        isMarkerShown: false,
        lat: 0,
        lng: 0
    }

    componentDidMount() {
        this.connection = new WebSocket('ws://localhost:9999/?topic=test')

        this.connection.onmessage = (e) => {
            var payload = JSON.parse(JSON.parse(e.data)[0].message)
            console.log(payload)
            this.setState({
                isMarkerShown: true,
                lat: payload.lat,
                lng: payload.lng
            })
        };
    }

    handleMarkerClick = () => {
        console.log('click')
    }

    render() {
        return (
            <Map
                isMarkerShown={this.state.isMarkerShown}
                onMarkerClick={this.handleMarkerClick}
                lat={this.state.lat}
                lng={this.state.lng}
            />
        )
    }
}

export default LiveMap
