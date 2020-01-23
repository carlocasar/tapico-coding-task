import React, {Component} from 'react';
import Select from 'react-select';
import Spotifylogo from './spotify-logo.png';
import Twitterlogo from './twitter-logo.png';
import Youtubelogo from './youtube-logo.png';

import './App.css';

const options = [
  { value: 'ES', label: 'Spain' },
  { value: 'UK', label: 'United Kingdom' },
  { value: 'USA', label: 'United States' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
  { value: 'JP', label: 'Japan' },
];

class App extends Component {

  state = {
    selectedOption: null,
    spotifyResponse: [],
    spotifyUrl: [],
    twitterResponse: [],
    twitterUrl: [],
    yotubeResponse: [],
    yotubeUrl: [],
    };

  handleChange = selectedOption => {
    this.setState(
      { selectedOption }
    , () => {
      fetch(`http://localhost:9000/spotify/country/${this.state.selectedOption.value}`)
      .then(res => res.json())
      .then(res => this.setState({spotifyResponse: res.track_name, spotifyUrl: res.url }));
       
      fetch(`http://localhost:9000/twitter/country/${this.state.selectedOption.value}`)
      .then(res => res.json())
      .then(res => this.setState({ twitterResponse: res.name, twitterUrl: res.url }));

      fetch(`http://localhost:9000/youtube/country/${this.state.selectedOption.value}`)
      .then(res => res.json())
      .then(res => this.setState({ yotubeResponse: res.name, yotubeUrl: res.url }));
    })
  };

  createListSpotify = () => {
    let listChildren = []
    let list = []
    for (let i = 0; i < 3; i++) {
      listChildren.push(<li><a href={this.state.spotifyUrl[i]}>{this.state.spotifyResponse[i]}</a></li>)
    }
    list.push(<ol className="center">{listChildren}</ol>)
    return list
  }

  createListTwitter = () => {
    let listChildren = []
    let list = []
    for (let i = 0; i < 3; i++) {
      listChildren.push(<li><a href={this.state.twitterUrl[i]}>{this.state.twitterResponse[i]}</a></li>)
    }
    list.push(<ol className="center">{listChildren}</ol>)
    return list
  }

  createListYoutube = () => {
    let listChildren = []
    let list = []
    for (let i = 0; i < 3; i++) {
      listChildren.push(<li><a href={this.state.yotubeUrl[i]}>{this.state.yotubeResponse[i]}</a></li>)
    }
    list.push(<ol className="center">{listChildren}</ol>)
    return list
  }

  render() {
    const { selectedOption } = this.state;

    return (
        <div className="App">
          <header className="App-header">
            <h1>Tapico coding task</h1>
          </header>
          
            <Select
              value={selectedOption}
              onChange={this.handleChange}
              options={options}
              defaultValue={{ label: "Select country", value: 0 }}
            />

            <b><img src={Spotifylogo} className="App-logo" alt="Spotifylogo"></img>Trendiest songs in Spotify:</b>
            {this.createListSpotify()}

            <b><img src={Twitterlogo} className="App-logo" alt="Twitterlogo"></img>Trending topics in Twitter:</b>
            {this.createListTwitter()}

            <b><img src={Youtubelogo} className="App-logo" alt="Youtubelogo"></img>Trendiest videos in Youtube:</b>
            {this.createListYoutube()}
        </div>
    );
  }
}

export default App;
