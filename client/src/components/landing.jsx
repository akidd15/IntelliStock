import { useState } from 'react';

export default function Landing() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('User: ' + username);
        console.log('Password: ' + password);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                id="username"
                value={username}
                onChange={handleUsername}
                required
            />

            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={handlePassword}
                required
            />

            <button type="submit">Login</button>
        </form>
    )
}