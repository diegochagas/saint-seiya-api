import React, { Component } from 'react';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = { urls: [] };
    }

    componentDidMount() {
        this.getURLs();
    }

    render() {
        const { urls } = this.state;

        return (
            <div className="home">
                <div>
                    {urls.length ? (
                        <div>
                            <h2>Available URL's for requests</h2>
                            <ul>
                                {urls.map(url => <li key={url}>/{url}</li>)}
                            </ul>
                        </div>
                    ) : (
                        <div>
                            <h2>No urls found</h2>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    getURLs() {
        fetch('/urls')
            .then(res => res.json())
            .then(urls => this.setState({ urls }));
    }
}

export default Home;