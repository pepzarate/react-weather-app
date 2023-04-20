const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'
const API_KEY = '821f7f326ea7781f64b83f8857a8f2e8'

const getData = (location) => {
  return fetch(`${WEATHER_URL}q=${location}&appid=${API_KEY}&units=metric`)
    .then(response => response.json())
    .then(data => {
      return data
    })
}

export default getData
