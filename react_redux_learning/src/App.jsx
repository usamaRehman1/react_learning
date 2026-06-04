import { useState } from 'react'
import { useSelector } from 'react-redux'
import StudentPage from "./pages/studentsPage"
import './App.css'

function App() {

  const studentData = useSelector((state) => state.students)
  console.log(studentData, "===> students")

  return (
    <>
      <StudentPage />
    </>
  )
}

export default App
