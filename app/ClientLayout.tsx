"use client"

import type React from "react"
import { useEffect } from "react"
import { ChatWidget } from "@/components/chat-widget"

interface Props {
  children: React.ReactNode
}

export default function ClientLayout({ children }: Props) {
  useEffect(() => {
    // Remove demo data seeding from localStorage
  }, [])

  return (
    <>
      {children}
      <ChatWidget />
    </>
  )
}
