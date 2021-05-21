import React, { useState, useEffect } from 'react'
import axios from 'axios'


const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  // let [countriesToShow, setCountriesToShow] = useState()
  let bool = false;
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const showCountry = (country) => {
    // return filterArr.map((country) => {
      return(
     <>
        <h2>{country.name}</h2>
        <div>Capital: {country.capital}</div>
        <div>Population: {country.population}</div>
        <h3>Languages</h3>
        <ul>
          {country.languages.map((language) => <li>{language.name}</li>)}
        </ul>
        <img src={country.flag} height="250" alt="flag"/>
     </> 
      )
    // })
  }

  const filterCountry = (event) => {
    setFilter(event.target.value);
  }

  const handleClick = () => {
    bool = true;
    
  }

  const filterArr = countries.filter(country => country.name.toUpperCase().includes(filter.toUpperCase()));

   let countriesToShow = filter === '' ? '' : (
    filterArr.length > 10 ? 'Too many matches, specify another filter' : filterArr.length === 1 ? filterArr.map(country => showCountry(country)) 
    : filterArr.map((country, i) =><> <Country key={i}  name={country.name} /> <button onClick={() => countriesToShow = ''} >show</button><br/> </>)  
    )

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
