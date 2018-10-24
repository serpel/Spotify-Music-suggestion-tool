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
  const player =() => spotify.get(`/me/player`)
  const userDevices = () => spotify.get(`/me/player/devices`)
  const pausePlayback = (device_id) => spotify.put(`/me/player/pause`, { device_id : device_id || null})
  const playPlayback = (device_id) => spotify.put(`/me/player/play`, { device_id : device_id || null })
  const currentPlayingSong = () => spotify.get(`/me/player/currently-playing`)
  const saveTracksToUserLibrary = (ids) => spotify.put(`/me/tracks?ids=${ids}`)
  const nextTrackPlayback = () => spotify.post(`/me/player/next`)
  const previousTrackPlayback = () => spotify.post(`me/player/previous`)
  const recommendations = (limit, seed_genres) => spotify.get(`/recommendations`, { limit: limit || 10, seed_genres: seed_genres || 'rock' })
  const recommendationGenreSeeds = () => spotify.get(`/recommendations/available-genre-seeds`)
  const createNewPlaylist = (user_id, name, description, p) => spotify.post(`/users/${user_id}/playlists`, { name: name || "Awesome playlist", description: description || 'Awesome playlist Description', public: p || true})
  const addTracksToPlaylist = (playlist_id, uris) => spotify.post(`/playlists/${playlist_id}/tracks?uris=${uris}`)

  return {
    profile,
    player,
    userDevices,
    pausePlayback,
    playPlayback,
    currentPlayingSong,
    saveTracksToUserLibrary,
    nextTrackPlayback,
    previousTrackPlayback,
    recommendations,
    recommendationGenreSeeds,
    createNewPlaylist,
    addTracksToPlaylist,
  }
}

export default {
  create
}