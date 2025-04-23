import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./home";
import Chat from "./chat";

function App() {

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-800 to-gray-900">
      <BrowserRouter >
        
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            
        </Routes>
          
        </BrowserRouter>
    </div>
  
  )
}

export default App
