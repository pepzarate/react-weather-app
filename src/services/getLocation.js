const LOCATION_URL = 'http://api.openweathermap.org/geo/1.0/direct?'
const API_KEY = '821f7f326ea7781f64b83f8857a8f2e8'

const getLocation = (searchedTerm) => {
  return fetch(`${LOCATION_URL}q=${searchedTerm}&appid=${API_KEY}&limit=5`)
    .then(response => response.json())
    .then(data => {
      return data
    })
}

export default getLocation
