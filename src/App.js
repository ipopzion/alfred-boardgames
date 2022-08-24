import React, { useState } from 'react'
import BoardGames from './components/BoardGames';
import BottomBar from './components/BottomBar';
import NavBar from './components/NavBar';

function App() {
  let data = require('./assets/test.json')
  const [search, setSearch] = useState("")

  return (
    <>
      <NavBar handleChange={setSearch} />      
      <BoardGames data={data} search={search} />
      <BottomBar /> 
    </>
  )
}

export default App;
