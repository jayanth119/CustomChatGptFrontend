import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import './pages/homepage'
import HomePage from './pages/homepage'
import ChatGpt from './pages/chatgpt';
import FilePage from './pages/fileuploadpage';
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/code-genx" element={< ChatGpt />} />
                <Route path="/doc-sumex" element={<FilePage />} />
                <Route path="/web-intx" element={<ChatGpt />} />
                <Route path="/gen-query" element={<ChatGpt />} />
                <Route path="/textsummarize" element={<ChatGpt />} />
            </Routes>
        </Router>
    
    </>
  )
}

export default App
