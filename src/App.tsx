import { Router } from 'wouter'
import './App.css'
import { AuthContextProvider } from './context/Auth/AuthContextProvider'
import ErrorBoundary from './ErrorBoundary'
import { Routes } from './routes/Routes'
import { useBrowserLocation } from 'wouter/use-browser-location'


function App() {
  return (
    <ErrorBoundary>
      <Router hook={useBrowserLocation}>
        <AuthContextProvider>
          <Routes />
        </AuthContextProvider>
      </Router>
    </ErrorBoundary>
  )
}

export default App
