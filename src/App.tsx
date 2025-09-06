import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
          <h1>Test side</h1>
      </header>
        <header>
            <main>
                <article>
                    <h2>Tittel på artikkel</h2>
                </article>
            </main>
        </header>
    </>
  )
}

export default App
