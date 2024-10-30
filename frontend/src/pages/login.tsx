'use client'

import { useContext, useState } from 'react'
import { login } from '../utils/services'
import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { setIsAuthenticated } = useContext(AuthContext);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        const response = await login(email, password);
        if (response.status === 200) {
            Cookies.set('token', response.data.token);
            setIsAuthenticated(true);
            navigate('/dashboard')
        } else {
            const data = await response.data;
            setError(data.message || 'Invalid username or password.')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Log in to your account</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>
                            <Input
                                id="email"
                                name="email"
                                type="text"
                                required
                                className='rounded-t-md'
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="rounded-b-md"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && <div className="text-red-500 text-sm">{error}</div>}

                    <Button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Log in
                    </Button>
                </form>
                <div className="text-sm text-center">
                    <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Don't have an account? Register
                    </Link>
                </div>
            </div>
        </div>
    )
}