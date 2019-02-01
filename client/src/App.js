import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';

class App extends Component {

  constructor(props){
    super(props);
     
    this.state = {
      user: ""
    }

   
  }
  


  render() {
  
    return (
      <div className="App">

        <Navbar />
      </div>
    );
  }
}

export default App;
