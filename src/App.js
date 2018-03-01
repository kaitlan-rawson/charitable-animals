import React, { Component } from 'react';

import routes from './routes'
import Nav from './components/Home/Nav/Nav'

class App extends Component {
  render() {
    return (
      <div className = 'App'>
        <div className = 'nav-main'>
          <Nav/>
        </div>
        {routes}
      </div>
    );
  }
}

export default App;