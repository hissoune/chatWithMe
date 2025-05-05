import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./home";
import Chat from "./chat";
import BlogPosts from "./BlogPosts";
import { Provider } from "react-redux";
import store from "./redux/strore";
import Register from "./auth/register";
import ProtectedRoute from "./helpers/protected_routes";

function App() {

  return (
    <div className="h-screen bg-gradient-to-r from-gray-800 to-gray-900">
      <BrowserRouter >
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
            <Route path="/blogs" element={<BlogPosts />} />
            
        </Routes>
        </Provider>
        
          
        </BrowserRouter>
    </div>
  
  )
}

export default App
