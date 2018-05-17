import React from 'react';
import { Switch,Route } from 'react-router-dom';
import LiveMap from './LiveMap';
import History from './History';
import Alerts from './Alerts';
import DetailWrapper from './Detail';

const Main = () => (
	<main>
		<Switch>
		    <Route exact path='/' component={LiveMap} />
		    <Route exact path='/history' component={History} />
		    <Route exact path='/alerts' component={Alerts} />
		    <Route path='/detail/:id' component={DetailWrapper} />
		</Switch>
	</main>
)

export default Main;
