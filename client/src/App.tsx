import { useState } from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import type { User } from '@monorepo/shared';

function App() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fetchedUser, setFetchedUser] = useState<User | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      console.log('apiUrl: ', apiUrl)
      const res = await axios.get(`${apiUrl}/user`, {headers: {Authorization: 'Bearer faketoken'}});
      // server returns { success: true, data: user }
      if (res.data && res.data.data) {
        console.log('fetched data: ', res.data.data)
        setFetchedUser(res.data.data as User);
      } else {
        setFetchError('No data in response');
      }
    } catch (err: any) {
      setFetchError(err?.message || String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <div className="card">
        <button onClick={fetchData} disabled={loading}>
          {loading ? 'fetching...' : 'fetch data'}
        </button>
        {fetchError && <p style={{color: 'red'}}>Error: {fetchError}</p>}
        {fetchedUser && (
          <div>
            <p>Fetched: {fetchedUser.name} ({fetchedUser.email})</p>
          </div>
        )}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
