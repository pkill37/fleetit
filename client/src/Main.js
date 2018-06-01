import React from 'react';
import { Switch,Route } from 'react-router-dom';
import LiveMap from './LiveMap';
import Stats from './Stats';
import Alerts from './Alerts';
import DetailWrapper from './Detail';

const Main = () => (
	<main>
		<Switch>
		    <Route exact path='/' component={LiveMap} />
		    <Route exact path='/stats' component={Stats} />
		    <Route exact path='/alerts' component={Alerts} />
		    <Route path='/bike/:id' component={DetailWrapper} />
		</Switch>
	</main>
)

export default Main;
