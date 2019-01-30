import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';

class App extends Component {

  constructor(props){
    super(props);


    this.state = {
      inSession: false,
      loggedEmail: "",
    }
   
  }

  componentDidMount() {
    this.checkInSession()
  } 

  checkInSession = () => {
    axios.get('/api').then((res) => {
      this.setState({ inSession: res.data.inSession });
    }).catch(err => console.log(err));
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
