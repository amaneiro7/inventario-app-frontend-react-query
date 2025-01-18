import ErrorBoundary from './ErrorBoundary'
import { Toaster } from 'sonner'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/Auth/AuthContextProvider'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/queryCliente'
import { EventContextProvider } from './context/EventManager/EventContextProvider'
import { AppRoutes } from './routes/Routes'

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <EventContextProvider>
          <AuthContextProvider>
            <BrowserRouter
              future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
              }} >
              <AppRoutes />
              <Toaster
                richColors
                visibleToasts={3}
                closeButton
              />
            </BrowserRouter>
          </AuthContextProvider>
        </EventContextProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App
