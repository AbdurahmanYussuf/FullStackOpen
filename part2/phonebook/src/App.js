import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
 
  useEffect(() => {
    personService
      .getAll()
      .then(initalPersons => {
        setPersons(initalPersons)
      })
      
  }, [])
 
  const namesToShow = showAll ? persons : (
    persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))
  )

  const addPerson = (event) => {
    event.preventDefault()
    
    let addPerson = true;
    for(let i = 0; i < persons.length; i++){
      if(persons[i].name.toUpperCase().includes(newName.toUpperCase().trim())){
        const confirm = window.confirm(`${persons[i].name} already exists in phonebook, replace the old number with a new one?`)
        const updatedObject = {...persons[i], number: newNumber}  
         
        if(confirm){
          addPerson = false;
          personService
            .update(persons[i].id, updatedObject)
            .then(changedPerson => {  
              setPersons(persons.map(person => person.id !== changedPerson.id ? person : changedPerson))
              setMessage(`${persons[i].name}'s number has been updated`)
              setTimeout(() => {
                setMessage(null)
              }, 5000)
              setNewName('')
              setNewNumber('')
          })
          .catch(error => {
            setErrorMessage(`${updatedObject.name} was already deleted from the Phonebook`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(person => person.id !== updatedObject.id))
            setNewName('')
            setNewNumber('')
          })
        }
        else{
          addPerson = false;
          setNewName('')
          setNewNumber('')
        }
      }   
    }
    
    if(addPerson){
      const nameObject = {name: newName, number: newNumber}
      personService
        .create(nameObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setMessage(`${newName} has been added to Phonebook`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleName = (event) => setNewName(event.target.value)

  const handleNumber = (event) => setNewNumber(event.target.value)

  const handleFilter = (event) => {
    setFilter(event.target.value)
    filter === '' ? setShowAll(true) : setShowAll(false) // if filter is empty showAll is true else showAll is false
  }

  const handleDelete = (id, name) => {
    const confirm = window.confirm(`Delete ${name} ?`)
    
    confirm ? 
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setErrorMessage(`${name} was deleted from the Phonebook`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        
       
    : setPersons(persons)
  }
 
  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={message} />
      <ErrorNotification errorMessage={errorMessage} />
        <Filter text="filter shown with" handleAction={handleFilter} />
        <h3>Add a new</h3>
      <Form addPerson={addPerson} newNumber={newNumber} handleNumber={handleNumber} newName={newName} handleName={handleName} />
      <h2>Numbers</h2>
        <Persons namesToShow={namesToShow} handleAction={handleDelete} />
    </div>
  )
}

const SuccessNotification = ({message}) => {
  if(message == null) {
    return null
  }

  return (
    <div className="message">
      {message}
    </div>
  )
}

const ErrorNotification = ({errorMessage}) => {
  if(errorMessage == null) {
    return null
  }

  return (
    <div className="error">
      {errorMessage}
    </div>
  )
}

const Person = ({name, number, handleAction}) => {
  return(
    <div>
      <span>{name} {number}</span> 
      <button onClick={handleAction}>delete</button>
    </div>
  )
  
}  

const Persons = ({namesToShow, handleAction}) => {
  return(
    namesToShow.map((person) => <Person key={person.id} name={person.name} number={person.number} handleAction={() => handleAction(person.id, person.name)} />)
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