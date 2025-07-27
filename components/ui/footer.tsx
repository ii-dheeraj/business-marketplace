"use client"

import Link from "next/link"
import { useState } from "react"
import { AuthModal } from "@/components/auth-modal"

interface FooterProps {
  variant?: "default" | "customer"
}

export function Footer({ variant = "default" }: FooterProps) {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "register">("register")
  const [authUserType, setAuthUserType] = useState<"CUSTOMER" | "SELLER" | "DELIVERY_AGENT" | null>(null)

  const openAuthModal = (mode: "login" | "register", userType?: "CUSTOMER" | "SELLER" | "DELIVERY_AGENT") => {
    setAuthMode(mode)
    setAuthUserType(userType || null)
    setAuthModalOpen(true)
  }

  const handleCloseAuthModal = () => {
    setAuthModalOpen(false)
    setAuthUserType(null)
  }

  return (
    <>
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">LocalMarket</h3>
              <p className="text-gray-400 text-sm">
                Connecting communities through local commerce. Discover, shop, and support businesses in your
                neighborhood.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Customers</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/browse" className="hover:text-white">
                    Browse Businesses
                  </Link>
                </li>
                <li>
                  {variant === "customer" ? (
                    <Link href="/profile" className="hover:text-white">
                      My Profile
                    </Link>
                  ) : (
                    <button 
                      onClick={() => openAuthModal("register", "CUSTOMER")}
                      className="hover:text-white text-left"
                    >
                      Create Account
                    </button>
                  )}
                </li>
                <li>
                  <Link href="/support" className="hover:text-white">
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Businesses</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <button 
                    onClick={() => openAuthModal("register", "SELLER")}
                    className="hover:text-white text-left"
                  >
                    Become a Seller
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => openAuthModal("login", "SELLER")}
                    className="hover:text-white text-left"
                  >
                    Seller Dashboard
                  </button>
                </li>
                <li>
                  <Link href="/seller/support" className="hover:text-white">
                    Seller Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Delivery Agents</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <button 
                    onClick={() => openAuthModal("register", "DELIVERY_AGENT")}
                    className="hover:text-white text-left"
                  >
                    Join as Delivery Agent
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => openAuthModal("login", "DELIVERY_AGENT")}
                    className="hover:text-white text-left"
                  >
                    Delivery Dashboard
                  </button>
                </li>
                <li>
                  <Link href="/delivery/support" className="hover:text-white">
                    Delivery Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 LocalMarket. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={handleCloseAuthModal} 
        defaultMode={authMode}
        defaultUserType={authUserType}
      />
    </>
  )
} 