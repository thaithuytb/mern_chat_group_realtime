import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthForm from './components/authForm/AuthForm';
import Landing from './components/authForm/Landing';
//import protect router
import Dashboard from './components/dashboard/Dashboard';
import Diary from './components/diaryForm/Diary';
import ChatForm from './components/chatForm/ChatForm';
import ProtectRoute from './components/privateRoute/ProtectRoute';
//import context
import AuthContextProvider from './contexts/authContext';
import PostsContextProvider from './contexts/postsContext';
import ChatContextProvider from './contexts/chatContext';
import DisplayContextProvider from './contexts/displayContext';

import './App.css';
function App() {
  return (
    <AuthContextProvider>
      <DisplayContextProvider>
      <PostsContextProvider>
        <ChatContextProvider>

          <div className="App">

            <Router>
              <Switch>
                <Route exact path='/' component={Landing} />
                {/* Protect Rote  */}
                <ProtectRoute exact path='/chat' component={ChatForm} />
                <ProtectRoute exact path='/dashboard' component={Dashboard} />
                <ProtectRoute exact path='/diary' component={Diary} />
                <Route exact path='/login' render={(props) => <AuthForm {...props} component='login' />} />
                <Route exact path='/register' render={(props) => <AuthForm {...props} component='register' />} />
              </Switch>
            </Router>

          </div>
        </ChatContextProvider>
      </PostsContextProvider>
      </DisplayContextProvider>
    </AuthContextProvider>

  );
}

export default App;
