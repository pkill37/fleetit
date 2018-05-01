import React from 'react';
import Table from './Table';

class History extends React.Component {
	state = {
	  stats : []
	}	
	
	async componentDidMount() {
	  var array = this.state.stats;
	  array.push(await fetch('http://localhost:8080/api/v1/stats'));
	  this.setState = ({stats: array})
	}

	render() {
	  return (
	      <div className='content-wrapper'>
                <div style={{backgroundColor: "#fdfefe", height:"50px", marginLeft: "40px"}}>
                        <i className="material-icons" style={{display: "inline-block", verticalAlign: "middle"}}>import_contacts</i>
                        <h1 style={{display: "inline-block", verticalAlign: "middle", marginLeft: "15px"}}>History</h1>
                </div>
		<Table data={this.state.stats}/>
              </div>
	  )
	}
}

export default History;
