import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import Home from './components/Home';
import Header from './components/Header/Header';
import Stars from './components/Stars/Stars';

function App() {
  return (
    <div className="App">
      <Stars/>
      <Header/>
      <Switch>
        <Route exact path='/' component={Home} />
      </Switch>
    </div>
  );
}

export default App;
