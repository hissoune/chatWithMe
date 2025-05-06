import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./home";
import Chat from "./chat";
import BlogPosts from "./BlogPosts";

import Register from "./auth/register";
import ProtectedRoute from "./helpers/protected_routes";
import Login from "./auth/login";
import useAppDispatch from "./redux/useAppdispatch";
import { useEffect } from "react";
import { loaduserFromCookies } from "./redux/slices/authSlice";

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(loaduserFromCookies())
  }, [dispatch])
  
  return (
    <div className="h-screen bg-gradient-to-r from-gray-800 to-gray-900">
      <BrowserRouter >
        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
            <Route path="/blogs" element={<BlogPosts />} />
            
        </Routes>
       
        
          
        </BrowserRouter>
    </div>
  
  )
}

export default App
