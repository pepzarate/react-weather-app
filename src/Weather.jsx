import React, { useCallback, useState } from 'react'
import getLocation from './services/getLocation'
import debounce from 'lodash/debounce'

function Weather () {
  const [data, setData] = useState({})
  const [searchedTerm, setSearchedTerm] = useState('')
  const [location, setLocation] = useState('')

  const handleChange = e => {
    const search = e.target.value
    if (!search && !location) {
      setSearchedTerm('')
      setLocation('')
    } else {
      setSearchedTerm(search)
      delayedSearch(search)
    }
  }

  // Delay search by 600ms
  const delayedSearch = useCallback(
    debounce((q) => sendQuery(q), 600),
    []
  )

  const sendQuery = async (query) => {
    // Call API with query parameter here
    console.log(query)
    const newData = await getLocation(query)
    console.log(newData)
    if (newData.cod === '400') setLocation('')
    else setLocation(newData)
  }

  return (
    <div>
      <div className='flex items-center justify-center my-16'>
        <div className='top'>
          <div className='text-center'>
            <h1 className='text-6xl text-white font-bold'>Clima:</h1>
          </div>
          <br />
          <div className='location text-center'>
            {data.weather ? <img className='mx-auto' src={`../src/icons/${data.weather[0].icon}.png`} alt='' /> : null}
            <p className='text-4xl text-white font-bold'>{data.name}</p>
          </div>
          <div className='temp text-center'>
            {data.main ? <h1 className='text-8xl text-white font-bold'>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className='description text-center'>
            {data.weather ? <p className='text-3xl text-white font-bold'>{data.weather[0].description}</p> : null}
          </div>
          <br />
          <div className='flex items-center justify-center pl-11'>
            <div className='feels text-center'>
              {data.main ? <p className='text-3xl text-white font-bold pr-9'>{data.main.feels_like.toFixed()}°C</p> : null}
              <p className='text-3xl text-white font-bold pr-9'>Sens. Térmica</p>
            </div>
            <div className='feels text-center'>
              {data.main ? <p className='text-3xl text-white font-bold pr-9'>{data.main.humidity}%</p> : null}
              <p className='text-3xl text-white font-bold pr-9'>Humedad</p>
            </div>
            <div className='feels text-center'>
              {data.main ? <p className='text-3xl text-white font-bold pr-9'>{data.wind.speed} km/h</p> : null}
              <p className='text-3xl text-white font-bold pr-9'>Viento</p>
            </div>
          </div>
        </div>
      </div>
      <div className='flex items-center justify-center'>
        <form>
          <input
            value={searchedTerm}
            className='bg-transparent text-white font-bold text-xl focus:outline-0 focus:border-teal-700 border-b-4 p-2'
            onChange={handleChange}
            placeholder='Ciudad'
            type='text'
          />
          {location && searchedTerm
            ? <ul className='text-white'>
              {location.map(city =>
                <li
                  key={city.lat}
                  className='bg-gray-700 mt-2 pl-2 cursor-pointer'
                >
                  {city.name} <span className='text-blue-600 text-base'> {city.state}</span> <span className='text-base text-blue-600'>{city.country}</span>
                </li>)}
              </ul>
            : null}
        </form>
      </div>
    </div>
  )
}

export default Weather
