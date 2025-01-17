import { Router } from 'wouter'
import { AuthContextProvider } from './context/Auth/AuthContextProvider'
import ErrorBoundary from './ErrorBoundary'
import { Routes } from './routes/Routes'
import { useBrowserLocation } from 'wouter/use-browser-location'
import { Toaster } from 'sonner'


function App() {
  return (
    <ErrorBoundary>
      <Router hook={useBrowserLocation}>
        <AuthContextProvider>
          <Routes />
          <Toaster
            richColors
            visibleToasts={3}
            closeButton
          />
        </AuthContextProvider>
      </Router>
    </ErrorBoundary>
  )
}

export default App
