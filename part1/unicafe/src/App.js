import React, { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text = "give feedback"/>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Header text = "statistics"/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>

  )
}

const Header = (props) => <h1>{props.text}</h1>

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const Statistics = (props) => {
  const allClicks = props.good + props.neutral + props.bad;
  if(allClicks === 0){
    return (
      <div>No feedback given</div>
    )
  }
  return(
    <div>
      <table>
        <tbody>
          <tr><Statistic text="good" value={props.good}/></tr>
          <tr><Statistic text="neutral" value={props.neutral} /></tr>
          <tr><Statistic text="bad" value={props.bad} /></tr>
          <tr><Statistic text="all" value={props.good+props.neutral+props.bad} /></tr>
          <tr><Statistic text="average" value={((props.good*1)+(props.neutral*0)+(props.bad*-1))/(props.good+props.bad+props.neutral)} /></tr>
          <tr><Statistic text="positive" value={props.good/(props.good+props.bad+props.neutral)*100 + " %"} /></tr>
        </tbody>
      </table>
    </div>
  )
}

const Statistic = (props) => 
  <>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </>

export default App
