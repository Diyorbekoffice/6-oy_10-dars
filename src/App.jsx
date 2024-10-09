import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import MainLayout from './components/MainLayout'

function App() { 
  const [token, setToken] = useState(localStorage.getItem("token"))
  const location = useLocation()
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"))
    } else {
      if(!location.pathname.includes("/register")) {
        navigate("/login")
      }
    }
  }, [navigate, location])
  function PrivateRoute({isAuth, children}) {
    if(!isAuth) {
      navigate("/login")
    }
    return children;
  }
  return (
    <div>
      <Routes>
        <Route 
         index
         element={<PrivateRoute isAuth={!!token}>
          <MainLayout>
          <Home></Home>
          </MainLayout>
          </PrivateRoute>}>

          </Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        </Routes>
    </div>
  )
}

export default App