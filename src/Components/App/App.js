
import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'

class App extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      searchResults: [
        {
          name: 'nome teste',
          artist: 'artista teste',
          album: 'album teste',
          id: 1
        },
        {
          name: 'nome teste 2',
          artist: 'artista teste 2',
          album: 'album teste 2',
          id: 2
        },
        {
          name: 'nome teste 3',
          artist: 'artista teste 3',
          album: 'album teste 3',
          id: 3
        }
      ]
    };
  }


  render() {
    return (
        <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar />
            <div className="App-playlist">
              <SearchResults searchResults={this.state.searchResults}/>
              <Playlist />
            </div>
          </div>
        </div>

    );
  }
} 

export default App;
