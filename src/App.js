import { useState, useEffect } from 'react'

const App = () => {

  const [value, setValue] = useState('')
  const [message, setMessages] = useState('')
  const [previousChats, setPreviousChats] = useState([])
  const [currentTitle, setCurrentTitle] = useState([])

  const getMessages = async () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: value
      })
    }

    try {
      const response = await fetch('http://localhost:8000/completions', options)
      const data = await response.json()
      setMessages(data.choices[0].message)

    } catch(err) {
      console.error(err)
    }
  }

  useEffect(() => {
    console.log(currentTitle, value, message)
    if (!currentTitle && value && message) {
      setCurrentTitle(value)
    }
    if (currentTitle && value && message) {
      setPreviousChats(prevChats => (
        [...prevChats,
          {
            title: currentTitle,
            role: 'user',
            content: value
          },
          {
            title: currentTitle,
            role: message.role,
            content: message.content
          }
        
        ]
      ))
    }
  }, [message, currentTitle])

  return (
    <div className="app">
      <section className="side-bar">
        <button>+ New chat</button>
        <ul className="history">
          <li> Blugh</li>
        </ul>
        <nav>
          <p>Made by Arash</p>
        </nav>
      </section>

      <section className="main">
        <h1>ArashGPT</h1>
        <ul className='feed'>

        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input value={value} onChange={(e) => setValue(e.target.value)}/>
            <div id="submit" onClick={getMessages}>➢</div>
          </div>
          <p className="info">
            ChatGPT March 23 Version API.
          </p>
        </div>
      </section>
    </div>
  )
}

export default App
