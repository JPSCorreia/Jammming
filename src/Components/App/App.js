
import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'
// import TrackList from '../TrackList/TrackList';
import Spotify from '../../util/Spotify'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.state = {
      searchResults: [],
      playlistName: 'My Playlist',
      playlistTracks: []
    }
  }


  removeTrack(track) {

    let tracksAux = this.state.playlistTracks;
    tracksAux = tracksAux.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({ playlistTracks: tracksAux });

  }


  addTrack(track) {
   
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    this.state.playlistTracks.push(track);
    this.setState({playlistTracks: this.state.playlistTracks});

  }


  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }


  savePlaylist() {
    
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
    
    

    // Bugfixing
    // 4roqhhRarPSjK7V9viFOVU
    //alert('its working')

  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({ searchResults: searchResults })
    });
  }




  render() {
    return (
        <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar onSearch={this.search}/>
            <div className="App-playlist" >
              <SearchResults 
                searchResults={this.state.searchResults} 
                onAdd={this.addTrack}
                />
              <Playlist 
                playlistTracks={this.state.playlistTracks} 
                playlistName={this.state.playlistName} 
                onRemove={this.removeTrack} 
                onNameChange={this.updatePlaylistName}
                onSave={this.savePlaylist}
              />
            </div>
          </div>
        </div>

    );
  }
} 

export default App;
