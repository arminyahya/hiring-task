const BACKED_PORT = 8000;
const BACKED_API_URL = `http://localhost:${BACKED_PORT}/api/v1`;
    console.log(BACKED_API_URL);
export async function login(email: string, password: string) {
    const response = await fetch(`${BACKED_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    })
    return response
}

export async function register(username: string, password: string, email: string) {
    const response = await fetch(`${BACKED_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email }),
    })
    return response;
}