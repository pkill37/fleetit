import React from 'react';
import { Switch,Route } from 'react-router-dom';
import Home from './Home';
import History from './History';
import Alerts from './Alerts';
import Detail from './Detail';

const Main = () => (
	<main>
		<Switch>
		    <Route exact path='/' component={Home} />
		    <Route exact path='/history' component={History} />
		    <Route exact path='/alerts' component={Alerts} />
		    <Route path='/detail/:id' component={Detail} />
		</Switch>
	</main>
)

export default Main;
