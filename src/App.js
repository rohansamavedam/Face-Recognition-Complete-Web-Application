import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
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
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      signedin: false
    }
  }

  //Methods

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
    
  }

  displayFaceBox = (box) => {
    this.setState({box: box});

  }


  onInputChange = (event) => {                              //You need to use ES6 Syntax to access the 'this' keyowrd.
    this.setState({input: event.target.value})

  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})             //Setting a state in react is an asyncronous function, so u cannot access the item after setting state immideatly in that function. Hence the solution is using a callback function after setting the state, like this: setState(updater, callback)
                                                            
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then((response) => {
      this.displayFaceBox(this.calculateFaceLocation(response))
    },
    function(err) {
      alert('Error: There was a problem in detecting the Face')
    }
  );

  }

  onRouteChange = (route) => {
    if(route === 'home'){
      this.setState({signedin: true})
    }
    else{
      this.setState({signedin: false})
    }

    this.setState({ route: route })
  }

  //Render Main

  render() {
    const { signedin, box, imageUrl, route } = this.state;
    return (
      <div className="App">
        <Particles className='particles' params = { particlesOptions } />  
        <Navigation onRouteChange={ this.onRouteChange } isSignedIn={signedin}/>
         { route === 'home'
            ? <div> 
              <Logo/>
              <Rank/>
              <ImageLinkForm onInputChange = { this.onInputChange } onButtonSubmit = { this.onButtonSubmit } />
              <FaceRecognition box = { box } imageUrl = { imageUrl } />
            </div>
            : (
              route === 'signin'
              ? <Signin onRouteChange={ this.onRouteChange }/>
              : <Register onRouteChange={ this.onRouteChange }/>
            )
          }
      </div>
    );
  }
}

export default App;
