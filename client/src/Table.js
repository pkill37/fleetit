import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class Table extends React.Component {

	render() {
	  return (
	    <BootstrapTable data={this.props.data} scrollTop={'Bottom'}  bordered={false} options={{noDataText:'Data could not be retrieved'}} version='4'>
		<TableHeaderColumn isKey dataField='id'>Bike ID</TableHeaderColumn>
		<TableHeaderColumn dataField='km'>Distance Traveled</TableHeaderColumn>
		<TableHeaderColumn dataField='heart_rate'>Heart Rate</TableHeaderColumn>
	   </BootstrapTable>
	  )
	}
}

export default Table
