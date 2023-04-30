// import './index.css'

const App = () => {
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
            <input/>
            <div id="submit">➢</div>
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
