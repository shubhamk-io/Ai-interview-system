import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './Pages/Home'
import Auth from './Pages/Auth'
import axios from "axios"
import { useDispatch } from 'react-redux'
import { setUserData } from './redux/userSlice'

export const serverUrl = "http://localhost:8000"

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await axios.get(
          serverUrl + "/api/user/current-user",
          { withCredentials: true }
        );
        dispatch(setUserData(result.data))
        console.log("Current user:", result.data);
      } catch (error) {
      
        if (error.response?.status !== 401) {
          console.log("getUser error:", error);
        }
        dispatch(setUserData(null))
      } finally {
        setLoading(false);
      }
    }
    getUser();
  }, [dispatch])

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