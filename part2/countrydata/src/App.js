import React, { useState, useEffect } from 'react'
import axios from 'axios'


const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  // let [countriesToShow, setCountriesToShow] = useState()
  let bool = false;
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const showCountry = (country) => {
    // return filterArr.map((country) => {
      return(
     <>
        <h2>{country.name.common}</h2>
        <div>Capital: {country.capital}</div>
        <div>Population: {country.population}</div>
        <h3>Languages</h3>
        <ul>
          {Object.values(country.languages).map((language) => <li>{language}</li>)}
        </ul>
        <img src={country.flags.png} height="250" alt="flag"/>

     </> 
      )
    // })
  }

  const filterCountry = (event) => {
    setFilter(event.target.value);
  }

  const filterArr = countries.filter(country => country.name.common.toUpperCase().includes(filter.toUpperCase()));
  console.log(filterArr);
   
    let countriesToShow;
    if(filter === ''){
      countriesToShow = '';
    } else if(filterArr.length > 1) {
      countriesToShow = 'Too many matches, specify another filter';
    }
    else{
      countriesToShow = filterArr.map(country => showCountry(country));
    }

  return(
    <div>
      <div>
      find countries: <input onChange = {filterCountry}/>
      </div>
      <div>
        {countriesToShow}
      </div>
    </div>

  )
}

const Button = ({handleAction}) => {
  return(
    <button onClick={handleAction}
    >show</button>
  )
}

const Country = ({name}) => {
  return(
    <>
      <span>{name}</span>
      {/* <button onClick={() => 
         console.log(handleAction)
      }
      >show</button><br/> */}
    </>
  )
} 

export default App;