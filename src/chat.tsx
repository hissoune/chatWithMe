import { IoSend } from "react-icons/io5";

function chat() {
  
  return (
    <div>

      <h1 className="text-3xl font-bold text-center text-white">Chat with AI</h1>

      <div className=" rounded-xl  p-4 w-96 h-96 overflow-y-auto">
        <div className="flex flex-col space-y-4">
          <div className="flex gap-4  text-white p-2 rounded-lg">
          <div>
          <img className="h-8 w-8 object-cover rounded-full" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80" alt="Current profile photo" />
          </div>    
          <div className="text-sm flex justify-center items-center ">Hello! How can I assist you today?</div>
          </div>
        </div>
        
      </div>

      <div className="mt-8 flex justify-center ">

        <input type="text" className="h-full rounded-l-xl p-2 outline-0" placeholder="write your message" />

        <button className="bg-blue-500 hover:bg-blue-700 text-white  font-bold  px-4 rounded-r-xl ">
          <IoSend />
        </button>
      </div>
    </div>
  )
}

export default chat