import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header/>
      <div className="stars small"></div>
    	<div className="stars medium"></div>
    	<div className="stars large"></div>
      <Switch>
        <Route exact path='/' component={Home} />
      </Switch>
    </div>
  );
}

export default App;
