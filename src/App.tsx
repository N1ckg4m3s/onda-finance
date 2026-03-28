import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<>rota main</>} />
        <Route path="/dashboard" element={<>rota dashboard</>} />
        <Route path="/transfer" element={<>rota transfer</>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
