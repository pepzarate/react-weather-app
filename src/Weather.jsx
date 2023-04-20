import React, { useState } from 'react'
import getData from './services/getData'

function Weather () {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('Orizaba,mx')

  const searchWeatherLocation = async (e) => {
    if (e.key === 'Enter') {
      const newData = await getData(location)
      console.log(newData)
      setData(newData)
    }
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
        <input
          value={location}
          className=' bg-transparent text-white font-bold text-2xl mb-20 focus:outline-0 border-b-4 p-2'
          onChange={event => setLocation(event.target.value)}
          onKeyDown={searchWeatherLocation}
          placeholder='Ciudad'
          type='text'
        />
      </div>
    </div>
  )
}

export default Weather
