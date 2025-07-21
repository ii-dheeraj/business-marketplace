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
    const userInfoCookie = getCookie("userInfo")
    if (userInfoCookie) {
      try {
        const user = JSON.parse(userInfoCookie)
        setUserInfo(user)
        setUserType(user.userType)
      } catch {
        setUserInfo(null)
        setUserType("")
      }
    } else {
      setUserInfo(null)
      setUserType("")
    }
  }, [])

  // Listen for login events to update header state
  useEffect(() => {
    const handleUserLogin = (event: CustomEvent) => {
      const user = event.detail
      setUserInfo(user)
      setUserType(user.userType)
    }

    window.addEventListener('userLogin', handleUserLogin as EventListener)
    
    return () => {
      window.removeEventListener('userLogin', handleUserLogin as EventListener)
    }
  }, [])

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