import { useState, useEffect} from "react"
import React from 'react'

const App = () => {
  const [data, setdata] = useState({})
  useEffect(async() => {
    const response = await fetch('https://official-joke-api.appspot.com/jokes/random')
    .then(response => response.json())
    .then(data => console.log(data));

    setdata(response)
  }, []);

  return (
    <div>
      <h1>Joke of the day</h1>
      <p>{data.setup}</p>
      <p>{data.punchline}</p>
    </div>
  )
}

export default App