import axios from 'axios'
import URLS from './settings'

var JWT = require('jsonwebtoken')

const ApiGet = url => {

  var tokens = localStorage.getItem('tokens')
  var header = {}

  const isTokenExpired = (token) => {
    var decoded = JWT.decode(token)
    if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
      ApiRefreshToken()
      .then(res => {
        var tokens = JSON.parse(localStorage.getItem('tokens'))
        var new_token = {}
        new_token.refresh = tokens.refresh
        new_token.access = res.data.access
        localStorage.setItem('tokens',JSON.stringify(new_token))
      })
    }
  }

  if(tokens) {
    tokens = JSON.parse(tokens)
    isTokenExpired(tokens.access)
    header = {
      Authorization: `Bearer ${tokens.access}`
    }
  }

  const Get = async (url) => {
    const response = await axios.get(url, { headers: header })
    return response
  }
  return Get(url)
}


export const ApiPost = (url, payload) => {
  const Post = async (url, payload) => {
    const response = await axios.post(url, payload)
    return response
  }
  return Post(url, payload)
}

export const ApiPut = (url, payload,) => {
  const Put = async (url, payload) => {
    const response = await axios.put(url, payload)
    return response
  }
  return Put(url, payload)
}

export const ApiDelete = (url) => {
  const Delete = async (url) => {
    const response = await axios.delete(url)
    return response
  }
  return Delete(url)
}


export const ApiRefreshToken = () =>{
  var tokens = localStorage.getItem('tokens')
  tokens = JSON.parse(tokens)
  var payload = {
    "refresh": tokens.refresh
  }
  const Token = async () => {
    const response = await axios.post(`${URLS().REFRESH}`, payload)
    return response
  }
  return Token()
}

export default ApiGet


