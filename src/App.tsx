import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginPage } from './pages/login/login.page'
import { ProtectedRoute } from './routes/protected.route'
import { DashboardPage } from './pages/dashboard/dashboard.page'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LoginPage />} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
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
