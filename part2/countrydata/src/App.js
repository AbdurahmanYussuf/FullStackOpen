import React, { useState, useEffect } from 'react'
import axios from 'axios'


const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [weather, setWeather] = useState()
  const [capital, setCapital] = useState()
  const api_key = process.env.REACT_APP_API_KEY

  let y = countries.filter(country => country.name.common.toUpperCase().includes(filter.toUpperCase()))

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    for(let i = 0; i < y.length; i++){
      if(y[i].name.common.toUpperCase().includes(filter.toUpperCase())){
        setCapital(y[i].capital);
      }
    }
    axios
      .get(`https://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
      .then(response => {
        setWeather(response.data)
        console.log(weather)
        // console.log(capital);
      })
  }, [filter])
  

  const showCountry = (country) => {
    window.s = country.capital
      return(
     <>
        <h2>{country.name.common}</h2>
        <div>Capital: {country.capital}</div>
        <div>Population: {country.population}</div>
        <h3>Spoken Languages</h3>
        <ul>
          {Object.values(country.languages).map((language) => <li>{language}</li>)}
        </ul>
        <img src={country.flags.png} height="250" alt="flag"/>
        <h3>Weather in {country.capital}:</h3>
        <h4>Temperature: {weather.current.temperature}&deg;C</h4> 
        <img src={weather.current.weather_icons} height="150" alt="flag"/>
        <h4>Wind: {weather.current.wind_speed} mph directing {weather.current.wind_dir}</h4>
        <h4>Local Time: {weather.location.localtime}</h4>
     </> 
      )
      
  }
  
  const filterCountry = (event) => {
    setFilter(event.target.value);
  }

  const filterArr = countries.filter(country => country.name.common.toUpperCase().includes(filter.toUpperCase()));
  

    let countriesToShow;
    if(filter === ''){
      countriesToShow = '';
    } else if(filterArr.length > 1) {
      countriesToShow = 'Too many matches, specify another filter';  
    }
    else {
      countriesToShow = filterArr.map(country => showCountry(country));
    }

  return(
    <div>
      <div>
      Find countries: <input onChange = {filterCountry}/>
      </div>
      <div>
        {countriesToShow}
      </div>
    </div>

  )
}


export default App;
