import React from 'react';
import './Header.scss';
import logo from '../../logo.png';

export default class Header extends React.Component {
    render() {
        return (
            <header className="App-header">
                <h1>Saint Seiya API</h1>
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
                >
                Learn React
                </a>
            </header>
        );
    }
}