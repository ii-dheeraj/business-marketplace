"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send, X, Bot, Minimize2, Maximize2 } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot" | "seller"
  timestamp: Date
  businessContext?: {
    businessId: string
    businessName: string
  }
}

interface ChatWidgetProps {
  businessId?: string
  businessName?: string
}

export function ChatWidget({ businessId, businessName }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: businessId
        ? `Hello! I'm here to help you with ${businessName}. What would you like to know about our products or services?`
        : "Hello! I'm your shopping assistant. I can help you find businesses, products, and services. What are you looking for today?",
      sender: "bot",
      timestamp: new Date(),
      businessContext: businessId ? { businessId, businessName: businessName || "" } : undefined,
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue, businessId, businessName)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
        businessContext: businessId ? { businessId, businessName: businessName || "" } : undefined,
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1000)
  }

  const generateBotResponse = (userInput: string, businessId?: string, businessName?: string): string => {
    const input = userInput.toLowerCase()

    if (businessId && businessName) {
      // Business-specific responses
      if (input.includes("price") || input.includes("cost")) {
        return `I can help you with pricing information for ${businessName}. Our products range from ₹99 to ₹15,999. Would you like to see specific product prices?`
      }
      if (input.includes("delivery") || input.includes("shipping")) {
        return `${businessName} offers delivery within 30-45 minutes in most areas. Delivery charges start from ₹29. Would you like to check if we deliver to your area?`
      }
      if (input.includes("hours") || input.includes("open") || input.includes("timing")) {
        return `${businessName} is currently open! Our hours are 9:00 AM to 9:00 PM, Monday to Sunday. Is there anything specific you'd like to order?`
      }
      if (input.includes("product") || input.includes("item")) {
        return `${businessName} has a wide range of products available. I can show you our bestsellers or help you find something specific. What are you looking for?`
      }
      return `I'm here to help with any questions about ${businessName}. You can ask about our products, prices, delivery, or place an order. How can I assist you?`
    } else {
      // General marketplace responses
      if (input.includes("restaurant") || input.includes("food")) {
        return "I found several great restaurants near you! Would you like to see options for Indian, Chinese, or other cuisines?"
      }
      if (input.includes("grocery") || input.includes("vegetables")) {
        return "There are many grocery stores available for delivery. Would you like to see fresh produce options or general grocery stores?"
      }
      if (input.includes("electronics") || input.includes("phone") || input.includes("laptop")) {
        return "I can help you find electronics stores. Are you looking for smartphones, laptops, or other electronic items?"
      }
      if (input.includes("delivery") || input.includes("order")) {
        return "I can help you place an order! First, let me know what type of business or product you're interested in."
      }
      return "I can help you find local businesses, check product availability, compare prices, or place orders. What would you like to explore today?"
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 rounded-full w-14 h-14 shadow-lg z-50"
        size="lg"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <Card className={`fixed bottom-4 right-4 w-80 shadow-xl z-50 transition-all ${isMinimized ? "h-14" : "h-96"}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-blue-600 text-white rounded-t-lg">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Bot className="h-4 w-4" />
          {businessName ? `${businessName} Assistant` : "Shopping Assistant"}
        </CardTitle>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-white hover:bg-blue-700 h-6 w-6 p-0"
          >
            {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-blue-700 h-6 w-6 p-0"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>

      {!isMinimized && (
        <CardContent className="p-0 flex flex-col h-80">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] p-2 rounded-lg ${
                    message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.sender !== "user" && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                    <div>
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 p-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t p-3">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="sm">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
