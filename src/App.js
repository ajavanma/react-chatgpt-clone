import { useState, useEffect } from 'react'

const App = () => {

  const [value, setValue] = useState(null)
  const [message, setMessage] = useState(null)
  const [previousChats, setPreviousChats] = useState([])
  const [currentTitle, setCurrentTitle] = useState(null)

  const createNewChat = () => {
    setMessage(null)
    setValue("")
    setCurrentTitle(null)
  }

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
      setMessage(data.choices[0].message)

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

  console.log(previousChats)
  const currentChat = previousChats.filter(previousChat => previousChat.title === currentTitle )
  const uniqueTitle = Array.from(new Set(previousChats.map(previousChat => previousChat.title)))

  return (
    <div className="app">
      <section className="side-bar">
        <button onClick={createNewChat}>+ New chat</button>
        <ul className="history">
          <li> Blugh</li>
        </ul>
        <nav>
          <p>Made by Arash</p>
        </nav>
      </section>

      <section className="main">
        {!currentTitle && <h1>ArashGPT</h1>}
        <ul className='feed'>
          {currentChat?.map((chatMessage, index) => <li key={index}>
            <p className="role">{chatMessage.role}</p>
            <p>{chatMessage.message}</p>
          </li>)}
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
