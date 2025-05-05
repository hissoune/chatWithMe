import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./home";
import Chat from "./chat";
import BlogPosts from "./BlogPosts";
import { Provider } from "react-redux";
import store from "./redux/strore";

function App() {

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-800 to-gray-900">
      <BrowserRouter >
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/blogs" element={<BlogPosts />} />
            
        </Routes>
        </Provider>
        
          
        </BrowserRouter>
    </div>
  
  )
}

export default App
