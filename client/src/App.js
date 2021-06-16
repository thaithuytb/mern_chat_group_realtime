import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthForm from './components/authForm/AuthForm';
import Landing from './components/authForm/Landing';

import './App.css';
function App() {
  return (
    <div className="App">

      <Router>

        <Switch>
          <Route exact path='/' component={Landing}/>
          <Route exact path='/login' render={(props) => <AuthForm {...props} component='login'/>}/>
          <Route exact path='/register' render={(props) => <AuthForm {...props} component='register'/>}/>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
