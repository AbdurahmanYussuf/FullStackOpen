import React from 'react';

const Header = ({ course }) => {
  return (
    <h1>Web development curriculum</h1>
  )
}

const Total = ({ course }) => {
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)
  return(
    <p><strong>Total of exercises {total}</strong></p>
  ) 
}

const Part = ({part}) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>    
  )
}

const Content = ({course}) => {
  return (
    <>
      <h3>{course.name}</h3>
      {course.parts.map(part => <Part key={part.id} part={part} />)}
      <Total course={course} />
    </>
  )
}

const Course = ({course}) => {
  return(
    <>
      <Header course={course} />
      <Content course={course[0]} />
      <Content course={course[1]} />
    </>
  )
}

export default Course