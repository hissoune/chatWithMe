
import type React from "react"
import { IoSend } from "react-icons/io5"
import { useSelector } from "react-redux"
import type { RootState } from "./redux/strore"
import { useEffect, useState, useRef } from "react"
import { getMessages, sendMessageAction } from "./redux/slices/chatSlice"
import useAppDispatch from "./redux/useAppdispatch"
import { Loader2, Copy, Check } from "lucide-react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

interface Message {
  sender: string
  message: string
}

const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g

function MessageContent({ content }: { content: string }) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  if (!content.includes("```")) {
    return <p className="whitespace-pre-wrap">{content}</p>
  }

  const parts: Array<{ type: "text" | "code"; content: string; language?: string }> = []
  let lastIndex = 0
  let match
  let index = 0

  codeBlockRegex.lastIndex = 0

  while ((match = codeBlockRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        type: "text",
        content: content.slice(lastIndex, match.index),
      })
    }

    parts.push({
      type: "code",
      language: match[1] || "javascript",
      content: match[2].trim(),
    })

    lastIndex = match.index + match[0].length
  }
  if (lastIndex < content.length) {
    parts.push({
      type: "text",
      content: content.slice(lastIndex),
    })
  }

  return (
    <div className="space-y-3">
      {parts.map((part, idx) => {
        if (part.type === "text") {
          return (
            <p key={idx} className="whitespace-pre-wrap">
              {part.content}
            </p>
          )
        } else {
          index++
          const currentIndex = index - 1
          return (
            <div key={idx} className="relative rounded-md overflow-hidden">
              <div className="flex items-center justify-between bg-gray-800 px-4 py-2 text-xs text-gray-300">
                <span>{part.language}</span>
                <button
                  onClick={() => copyToClipboard(part.content, currentIndex)}
                  className="hover:text-white transition-colors"
                  aria-label="Copy code"
                >
                  {copiedIndex === currentIndex ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              <SyntaxHighlighter
                language={part.language}
                style={vscDarkPlus}
                customStyle={{ margin: 0, borderRadius: 0 }}
                wrapLines={true}
                wrapLongLines={true}
              >
                {part.content}
              </SyntaxHighlighter>
            </div>
          )
        }
      })}
    </div>
  )
}

function Chat() {
  const { messages, loading, error } = useSelector((state: RootState) => state.chat)
  const [message, setMessage] = useState("")
  const dispatch = useAppDispatch()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const userId = "2"
    dispatch(getMessages(userId))
  }, [dispatch])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    textarea.style.height = "auto"
    textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`
  }, [message])

  const handleSendMessage = async () => {
    const userId = "2"
    if (message.trim() === "") return
    try {
      setMessage("")
      await dispatch(sendMessageAction({ userId, message }))
      

      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg max-w-md">
          <h3 className="font-bold mb-2">Error</h3>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <header className="py-4 px-6 border-b border-gray-800 bg-gray-800/50">
        <h1 className="text-2xl font-bold text-center">Chat with AI</h1>
      </header>

      <div className="flex-1 overflow-hidden flex flex-col py-10 px-4 md:px-8 lg:px-16 xl:px-96">
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 mb-4">
          <div className="flex flex-col space-y-4 pb-2">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                {message.sender === "ai" && (
                  <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0 mr-2">
                    <img
                      src="/logo-1-primary-removebg-preview.png"
                      alt="AI"
                      className="h-full w-full object-cover border-2 border-gray-200"
                      style={{ borderRadius: "50%" }}
                    />
                  </div>
                )}

                <div
                  className={`px-4 py-2 rounded-lg max-w-[80%] ${
                    message.sender === "user"
                      ? "bg-sky-600 text-white rounded-br-none"
                      : "bg-gray-700 text-white rounded-bl-none"
                  }`}
                >
                  {message.sender === "ai" ? (
                    <MessageContent content={message.message} />
                  ) : (
                    <p className="whitespace-pre-wrap">{message.message}</p>
                  )}
                </div>

                {message.sender === "user" && (
                  <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0 ml-2">
                    <img
                      src="https://i.pinimg.com/736x/e1/11/4d/e1114d062fdb9e8b0aa34a56496a8f1e.jpg"
                      alt="User"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-start gap-2.5">
                <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0 mr-2">
                  <img
                    src="/logo-1-primary-removebg-preview.png"
                    alt="AI"
                    className="h-full w-full object-cover border-2 border-gray-200"
                    style={{ borderRadius: "50%" }}
                  />
                </div>

                <div className="px-4 py-2 rounded-lg bg-gray-700 text-white rounded-bl-none flex items-center gap-1.5">
                  <span>Thinking</span>
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="mt-auto">
          <div className="flex rounded-xl overflow-hidden border border-gray-700 bg-gray-800 focus-within:ring-2 focus-within:ring-sky-500/50">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 min-h-[40px] max-h-[150px] p-3 bg-transparent outline-none resize-none text-white placeholder-gray-400"
              placeholder="Write your message..."
              rows={1}
              disabled={loading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!message.trim() || loading}
              className="px-4 bg-sky-600 hover:bg-sky-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <IoSend size={18} />
              <span className="sr-only">Send message</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
