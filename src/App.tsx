import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginPage } from './pages/login/login.page'
import { ProtectedRoute } from './routes/protected.route'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LoginPage />} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            rota dashboard
          </ProtectedRoute>
        } />

        <Route path="/transfer" element={
          <ProtectedRoute>
            rota dashboard
          </ProtectedRoute>
        } />

      </Routes>
    </BrowserRouter>
  )
}

export default App
