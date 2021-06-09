
let accessToken;
let expiresIn;
const clientID = "26590f51a422426bb45b8352e2439ad1"
let redirectURI = "http://localhost:3000/";

const Spotify = {

  getAccessToken() {
    if (accessToken) {
      return accessToken
    }

      const accessTokenURL = window.location.href.match(/access_token=([^&]*)/);
      const expiresInURL = window.location.href.match(/expires_in=([^&]*)/);

      if (accessTokenURL && expiresInURL) {
        accessToken = accessTokenURL[1];
        //expiresIn = Number(expiresInURL);
        expiresIn = parseInt(expiresInURL[1]);

        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
        return accessToken;
      } else {
        
        // interpolate client ID, redirect URI and spotify url
        const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
        
        // window.location is used to get the current adress page (URL):
        window.location = accessURL;
      }
    },

    search(term) {
      const accessToken = Spotify.getAccessToken();
      return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, 
        { headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
        if (!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map(track => (
          {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          }
        ))
      })
    },



    savePlaylist(playlistName, tracksUris) {
      if (!playlistName || !tracksUris.length) {
        return;
      }

      const accessToken = Spotify.getAccessToken();
      const headers = {Authorization: `Bearer ${accessToken}`};
      let userId; 

      return fetch('https://api.spotify.com/v1/me', {headers: headers}
      ).then(response => response.json()
      ).then(jsonResponse => {
        userId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, 
          {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({name: playlistName})
          }).then( response => response.json()
          ).then( jsonResponse => {
            const playlistId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
              {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({uris: tracksUris})
              }
            )
          })
      })
  
    }


  }






export default Spotify;