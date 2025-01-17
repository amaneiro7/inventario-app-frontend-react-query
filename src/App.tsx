import ErrorBoundary from './ErrorBoundary'
import { Toaster } from 'sonner'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Routes'
import { AuthContextProvider } from './context/Auth/AuthContextProvider'


function App() {
  return (
    <ErrorBoundary>
      <AuthContextProvider>
        <RouterProvider
          router={router}
          fallbackElement={'...loading'}
          future={{
            v7_startTransition: true,
          }} />
        <Toaster
          richColors
          visibleToasts={3}
          closeButton
        />
      </AuthContextProvider>
    </ErrorBoundary>
  )
}

export default App
