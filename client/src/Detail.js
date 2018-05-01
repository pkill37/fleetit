import React from 'react';
import Table from './Table';

class Detail extends React.Component {
        state = {
          idStats : [],
          lastStats : []
        } 

        async componentDidMount() {
	  var arrayId = this.state.idStats;
	  var arrayLast = this.state.lastStats;
	  arrayId.push(await fetch("http://localhost:8080/api/v1/bike/8925/stats"));
	  arrayLast.push(await fetch("http://localhost:8080/api/v1/bike/8925/last/30"));
	  this.setState = ({idStats: arrayId, lastStats: arrayLast})
        }

        render() {
          return (
              <div className='content-wrapper'>
                <div style={{backgroundColor: "#fdfefe", height:"50px", marginLeft: "40px"}}>
                        <i className="material-icons" style={{display: "inline-block", verticalAlign: "middle"}}>account_box</i>
                        <h1 style={{display: "inline-block", verticalAlign: "middle", marginLeft: "15px"}}>Details</h1>
                </div>
		<Table data={this.state.idStats}/>
		<Table data={this.state.lastStats}/>
              </div>
          )
        }
}

export default Detail
