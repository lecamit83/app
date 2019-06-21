import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LoginScreen from './components/login-screen/LoginScreen';
import Home from './components/home/Home';
function App() {
  return (
    <Router>
		<Switch>
    		<Route exact path="/" component={LoginScreen} />
            <Route path="/home" component={Home} />
            <Route path="/chat/:id" component={LoginScreen}/>
            <Route component={LoginScreen} />

		</Switch>
    </Router>  
  );
}

export default App;
