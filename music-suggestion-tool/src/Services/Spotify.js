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

  const getMe = () => spotify.get(`/me`)
  const getRecommendations = () => spotify.get(`/recommendations`)
  //const getRecommendations = (username, password) => api.post(`/login`, { username: username, password: password} )
  
  return {
    getMe,
    getRecommendations,
    //doLogin,
  }
}

export default {
  create
}