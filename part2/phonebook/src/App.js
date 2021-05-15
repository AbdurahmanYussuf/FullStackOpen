import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [ filter, setFilter ] = useState('')
 
  
  const namesToShow = showAll ? persons : (
    persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))
  )

  const addPerson = (event) => {
    event.preventDefault()
    
    for(let i = 0; i < persons.length; i++){
      if(persons[i].name.includes(newName))
        return alert(`${newName} already exists in phonebook`)
    }

    const nameObject = {name: newName, number: newNumber}
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

  const handleName = (event) => setNewName(event.target.value)

  const handleNumber = (event) => setNewNumber(event.target.value)

  const handleFilter = (event) => {
    setFilter(event.target.value)
    filter === '' ? setShowAll(true) : setShowAll(false) // if filter is empty showAll is true else showAll is 
  }
 
  return (
    <div>
      <h2>Phonebook</h2>
        <Filter text="filter shown with" handleAction={handleFilter} />
        <h3>Add a new</h3>
      <Form addPerson={addPerson} newNumber={newNumber} handleNumber={handleNumber} newName={newName} handleName={handleName} />
      <h2>Numbers</h2>
        <Persons namesToShow={namesToShow} />
    </div>
  )
}

const Person = ({name, number}) =>  <div>{name} {number}</div>

const Persons = ({namesToShow}) => {
  return(
    namesToShow.map((person,i) => <Person key={i} name={person.name} number={person.number} />)
  )
}

const Filter = ({handleAction, text}) => {
  return (
    <p><span>{text}</span><input
    onChange = {handleAction}
    /></p>
  )
}

const Form = ({addPerson, newName, handleName, newNumber, handleNumber}) => {
  return(
    <form onSubmit = {addPerson}>
        <div>
          name: <input value={newName} 
                  onChange = {handleName}
                />
        </div>
        <div>
          number: <input value={newNumber}
                  onChange={handleNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}

export default App