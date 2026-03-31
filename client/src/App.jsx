import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './Pages/Home'
import Auth from './Pages/Auth'
import axios from "axios"

export const serverUrl = "http://localhost:8000"

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await axios.get(
          serverUrl + "/api/user/current-user",
          { withCredentials: true }
        );
        setUser(result.data);
        console.log("Current user:", result.data);
      } catch (error) {
        // 401 = not logged in, expected — don't log as error
        if (error.response?.status !== 401) {
          console.log("getUser error:", error);
        }
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    getUser();
  }, [])

  // Don't render routes until we know auth status
  // Prevents flash of wrong page on refresh
  if (loading) return null;

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/auth' element={<Auth />} />
    </Routes>
  )
}

export default App