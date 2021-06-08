
let accessToken;
let expiresIn;

const Spotify = {

  getAccessToken() {
    if (accessToken) {
      return accessToken
    }

      accessToken = window.location.href.match(/access_token=([^&]*)/);
      expiresIn = window.location.href.match(/expires_in=([^&]*)/);
    }
  }






export default Spotify;