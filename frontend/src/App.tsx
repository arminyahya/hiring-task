import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { AuthProvider } from './context/authContext'
import { AppProvider } from './context/appContext'

function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </AppProvider>
  )
}

export default App
