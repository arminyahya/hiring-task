import axios from "axios";
import Cookies from 'js-cookie'

const BACKED_PORT = 8000;
const BACKED_API_URL = `http://localhost:${BACKED_PORT}/api/v1`;

export const api = axios.create({
    baseURL: BACKED_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization' : `${Cookies.get('token')}`
    },
});


export async function login(email: string, password: string) {
    const response = await api(`/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({ email, password })
    });
    return response
}

export async function register(username: string, password: string, email: string) {
    const response = await api(`/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({ username, password, email }),
    })
    return response;
}

export async function getAllTitles() {
    const response = await api(`/title`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
    return response;
}

export async function addTitle(title: string) {
    const response = await api(`/title`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({ title }),
    })
    return response;
}
