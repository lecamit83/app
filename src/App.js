import React from 'react';
import { BrowserRouter as Router, Route, Link , Switch} from 'react-router-dom';
import LoginScreen from './components/login-screen/LoginScreen';
import Register from './components/register/Register';
import Home from './components/home/Home';
function App() {
  return (
    <Router>
		<Switch>
    		<Route exact path="/" component={LoginScreen} />
            <Route path="/home" component={Home} />
            <Route component={LoginScreen} />
		</Switch>
    </Router>  
  );
}

export default App;
