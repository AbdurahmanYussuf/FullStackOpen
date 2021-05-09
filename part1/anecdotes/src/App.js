import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(Array(6).fill(0));
  
  
  const handleClick = () => setSelected(Math.floor(Math.random() * 6));

  const handleVote = () => {
    const copy = [...vote];
    copy[selected] += 1;
    setVote([...copy])
  }

  const highestVote = () => {
    let max = vote[0];

    for(let i = 0; i < vote.length; i++){
      if(vote[i] > max){
        max = vote[i]
      }
    }
  
    return(
    <>
      <div>{anecdotes[vote.indexOf(max)]}</div>
      <div>{`has ${vote[vote.indexOf(max)]} votes`}</div> 
    </>
    )
  }

  return (
    <>
      <Header text="Anecdote of the day" />
      <div>
        {anecdotes[selected]}
      </div>
      <div>
        {`has ${vote[selected]} votes`}
      </div>
      <div>
        <Button handleClick={handleVote} text="vote" />
        <Button handleClick={handleClick} text="next anecdote" />
      </div>
      <Header text="Anecdote with most votes" />
      <div>
        {highestVote()}
      </div>
    </>
  )
}

const Header = (props) => <h1>{props.text}</h1>

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

export default App
