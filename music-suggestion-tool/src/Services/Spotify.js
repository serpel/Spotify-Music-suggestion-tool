import apisauce from 'apisauce'

const create = (url = 'https://api.spotify.com/v1', token = '') => {

  const spotify = apisauce.create({
    baseURL: url,
    headers: {
      'Authorization': 'Bearer ' + token,
    },
    // 10 second timeout...
    timeout: 10000
  })

  const profile = () => spotify.get(`/me`)
  const resumePlayback = () => spotify.put(`/me/player/play`)
  const nextTrackPlayback = () => spotify.post(`/me/player/next`)
  const previousTrackPlayback = () => spotify.post(`me/player/previous`)
  const recommendations = (limit, seed_genres) => spotify.get(`/recommendations`, { limit: limit || 10, seed_genres: seed_genres || 'rock' })
  const createNewPlaylist = (user_id) => spotify.post(`/users/${user_id}/playlists`)
  const addTracksToPlaylist = (playlist_id) => spotify.post(`/playlists/${playlist_id}/tracks`)

  return {
    profile,
    resumePlayback,
    nextTrackPlayback,
    previousTrackPlayback,
    recommendations,
    createNewPlaylist,
    addTracksToPlaylist,
  }
}

export default {
  create
}