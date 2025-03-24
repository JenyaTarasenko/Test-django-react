import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Comment from './components/comment/comment';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Comment />

    </>
  )
}

export default App
