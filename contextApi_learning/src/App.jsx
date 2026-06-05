import { useState } from 'react'
import { ConterProvider } from "./context/counterContext"
import { Counter } from "./components/counter"
import { UserProvider } from './context/userContext'
import { UserPage } from './pages/userPage'
import './App.css'

function App() {

  return (
    <>
      <ConterProvider>
        <Counter />
      </ConterProvider>
      <UserProvider>
        <UserPage />
      </UserProvider>
    </>
  )
}

export default App
