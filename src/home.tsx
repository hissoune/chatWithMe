import { useSelector } from "react-redux"

function home() {
  const {isAuthenticated} = useSelector((state: any) => state.auth)

  if (isAuthenticated) {
    window.location.href = "/chat"
  }
  return (
       <div >
        <h1 className="text-3xl font-bold text-center text-white">Welcome to AI chat </h1>
        <p className="text-center text-white mt-4">This is a simple example application for chat with the ai </p>
        <div className="mt-8 flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded   ">
            <a href="/chat" className="text-white">Start Chat</a>   
          </button>
        </div>
      </div> 
      
    )
}

export default home