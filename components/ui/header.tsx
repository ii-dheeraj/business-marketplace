import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CartDrawer } from "@/components/cart-drawer"
import { LogOut } from "lucide-react"
import { getCookie, deleteCookie } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { AuthModal } from "@/components/auth-modal"

export default function Header() {
  const [userInfo, setUserInfo] = useState<any>(null)
  const [userType, setUserType] = useState<string>("")
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "register">("login")
  const router = useRouter()

  useEffect(() => {
    const checkInitialAuth = () => {
      const userInfoCookie = getCookie("userInfo")
      const userTypeCookie = getCookie("userType")
      console.log("[Header] Initial check - userInfo cookie:", userInfoCookie ? "exists" : "missing")
      console.log("[Header] Initial check - userType cookie:", userTypeCookie ? "exists" : "missing")
      console.log("[Header] Initial check - userInfo cookie value:", userInfoCookie)
      console.log("[Header] Initial check - userType cookie value:", userTypeCookie)
      
      if (userInfoCookie) {
        try {
          const user = JSON.parse(userInfoCookie)
          console.log("[Header] Initial check - parsed user:", user)
          setUserInfo(user)
          setUserType(user.userType || userTypeCookie || "")
        } catch (error) {
          console.log("[Header] Initial check - error parsing userInfo cookie:", error)
          setUserInfo(null)
          setUserType("")
        }
      } else {
        setUserInfo(null)
        setUserType("")
      }
    }

    // Check immediately
    checkInitialAuth()
    
    // Also check after a small delay to ensure cookies are loaded
    setTimeout(checkInitialAuth, 100)
    setTimeout(checkInitialAuth, 500)
    setTimeout(checkInitialAuth, 1000)
  }, [])

  // Listen for login events to update header state
  useEffect(() => {
    const handleUserLogin = (event: CustomEvent) => {
      const user = event.detail
      console.log("[Header] userLogin event received:", user)
      setUserInfo(user)
      setUserType(user.userType)
    }

    window.addEventListener('userLogin', handleUserLogin as EventListener)
    
    return () => {
      window.removeEventListener('userLogin', handleUserLogin as EventListener)
    }
  }, [])

  // Periodic check to ensure header state is correct
  useEffect(() => {
    const checkAuthState = () => {
      const userInfoCookie = getCookie("userInfo")
      if (userInfoCookie && !userInfo) {
        console.log("[Header] Periodic check: Found cookie but no userInfo state, updating...")
        try {
          const user = JSON.parse(userInfoCookie)
          setUserInfo(user)
          setUserType(user.userType)
        } catch (error) {
          console.log("[Header] Periodic check: Error parsing cookie:", error)
        }
      }
    }

    // Check immediately
    checkAuthState()
    
    // Check every 2 seconds
    const interval = setInterval(checkAuthState, 2000)
    
    // Check when window gains focus
    const handleFocus = () => {
      console.log("[Header] Window focused, checking auth state...")
      checkAuthState()
    }
    
    window.addEventListener('focus', handleFocus)
    
    return () => {
      clearInterval(interval)
      window.removeEventListener('focus', handleFocus)
    }
  }, [userInfo])

  const handleLogout = () => {
    deleteCookie("userInfo")
    setUserInfo(null)
    setUserType("")
    router.push("/")
  }

  const openAuthModal = (mode: "login" | "register") => {
    setAuthMode(mode)
    setAuthModalOpen(true)
  }

  const refreshAuthState = () => {
    console.log("[Header] Manual refresh triggered")
    const userInfoCookie = getCookie("userInfo")
    const userTypeCookie = getCookie("userType")
    console.log("[Header] Manual refresh - userInfo:", userInfoCookie ? "exists" : "missing")
    console.log("[Header] Manual refresh - userType:", userTypeCookie)
    
    if (userInfoCookie) {
      try {
        const user = JSON.parse(userInfoCookie)
        console.log("[Header] Manual refresh - parsed user:", user)
        setUserInfo(user)
        setUserType(user.userType || userTypeCookie || "")
      } catch (error) {
        console.log("[Header] Manual refresh - error parsing:", error)
        setUserInfo(null)
        setUserType("")
      }
    } else {
      setUserInfo(null)
      setUserType("")
    }
  }

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              LocalMarket
            </Link>
          </div>
          <div className="flex items-center space-x-4">

            
            {userInfo && userType?.toUpperCase() === "CUSTOMER" && (
              <Link href="/customer/orders">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-gray-700 hover:bg-gray-100 border-gray-300"
                >
                  My Orders
                </Button>
              </Link>
            )}
            <CartDrawer />
            {userInfo ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">Welcome, {userInfo.name}</span>
                {userType?.toUpperCase() === "SELLER" && (
                  <Link href="/seller/dashboard">
                    <Button variant="outline" size="sm">
                      Dashboard
                    </Button>
                  </Link>
                )}
                {userType?.toUpperCase() === "DELIVERY_AGENT" && (
                  <Link href="/delivery/dashboard">
                    <Button variant="outline" size="sm">
                      Dashboard
                    </Button>
                  </Link>
                )}
                {userType?.toUpperCase() === "CUSTOMER" && (
                  <>
                    <Link href="/customer/home">
                      <Button variant="outline" size="sm">
                        My Home
                      </Button>
                    </Link>
                  </>
                )}
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={() => openAuthModal("login")}>Sign In</Button>
                <Button size="sm" onClick={() => openAuthModal("register")}>Join Now</Button>
              </>
            )}
          </div>
        </div>
      </div>
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        defaultMode={authMode} 
      />
    </header>
  )
} 