import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const app = new Clarifai.App({
  apiKey: 'fe4c7e914b26472badfdc2fc4b7c6a94'
 });

class App extends Component {

  constructor() {
    super();
    this.state = {
      input: ''
    }
  }

  onInputChange(event) {
    console.log(event.target.value)
  }

  onButtonSubmit(){
    console.log('click')
    app.models.predict("a403429f2ddf4b49b307e318f00e528b", "https://samples.clarifai.com/face-det.jpg").then(
    function(response) {
      console.log(response)
    },
    function(err) {
      console.log(err)
    }
  );
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles' params = { particlesOptions } />
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageLinkForm onInputChange = { this.onInputChange } onButtonSubmit = { this.onButtonSubmit } />
      </div>
    );
  }
}

export default App;
