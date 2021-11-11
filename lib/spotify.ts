const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const GET_PLAYLIST_ENDPOINT = `https://api.spotify.com/v1/playlists/`;
const ADD_TRACK_ENDPOINT = 'https://api.spotify.com/v1/playlists/';

const getAccessToken = async () => {
  const params = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refresh_token as string,
  });

  console.log(params.toString());
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  return response.json();
};

export const getPlaylist = async (playlistId: string) => {
  const {access_token} = await getAccessToken();

  return fetch(`${GET_PLAYLIST_ENDPOINT}${playlistId}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const addTrack = async (playListId: string, trackId: string) => {
  const {access_token} = await getAccessToken();

  return fetch(`${ADD_TRACK_ENDPOINT}${playListId}/tracks?uris=spotify:track:${trackId}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    method: 'POST',
  });
};
