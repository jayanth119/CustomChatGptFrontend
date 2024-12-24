import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import './pages/homepage'
import HomePage from './pages/homepage'
import ChatGpt from './pages/chatgpt';
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      {/* <h1 className="text-3xl font-bold underline text-red-600">
      Simple React Typescript Tailwind Sample
    </h1> */}
    
    <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/code-genx" element={< ChatGpt />} />
                <Route path="/doc-sumex" element={<ChatGpt />} />
                <Route path="/web-intx" element={<ChatGpt />} />
                <Route path="/gen-query" element={<ChatGpt />} />
            </Routes>
        </Router>
    
    </>
  )
}

export default App
