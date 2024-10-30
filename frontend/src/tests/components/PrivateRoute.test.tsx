import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import PrivateRoute from '../../components/feature/PrivateRoute'
import { describe, expect, it, vi } from 'vitest'
import router from '../../router'
import { AppContext, AppProvider } from '../../context/appContext'
import { AuthContext, AuthProvider } from '../../context/authContext'

// Mock authentication context or hook
const mockUseAuth = vi.fn()
vi.mock('../hooks/useAuth', () => ({
  useAuth: () => mockUseAuth()
}))

describe('PrivateRoute', () => {
  it('renders children when user is authenticated', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: true })
    render(
      <AuthContext.Provider value={{ isAuthenticated: true, setIsAuthenticated: () => { } }}>
        <MemoryRouter initialEntries={['/dashboard']}>
          <Routes>
            <Route path="/dashboard" element={
              <PrivateRoute>
                <div>Dashboard Content</div>
              </PrivateRoute>
            } />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider >
    )
    expect(screen.getByText('Dashboard Content')).toBeInTheDocument()
  })

  it('redirects to login when user is not authenticated', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <div>Dashboard Content</div>
            </PrivateRoute>
          } />
        </Routes>
      </MemoryRouter>
    )
    expect(screen.getByText('Login Page')).toBeInTheDocument()
    expect(screen.queryByText('Dashboard Content')).not.toBeInTheDocument()
  })
})