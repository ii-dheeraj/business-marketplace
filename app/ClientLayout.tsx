"use client"

import type React from "react"
import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { ChatWidget } from "@/components/chat-widget"
import Header from "@/components/ui/header"
import { Toaster } from "@/components/ui/toaster"

interface Props {
  children: React.ReactNode
}

export default function ClientLayout({ children }: Props) {
  const pathname = usePathname()
  
  // Hide global header on business detail pages since they have their own header
  const shouldShowHeader = !pathname?.startsWith('/business/')

  useEffect(() => {
    // Remove demo data seeding from localStorage
  }, [])

  return (
    <>
      {shouldShowHeader && <Header />}
      {children}
      <ChatWidget />
      <Toaster />
    </>
  )
}
