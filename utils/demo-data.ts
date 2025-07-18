// Demo accounts for testing
export const demoAccounts = [
  {
    id: 999,
    name: "Demo Customer",
    email: "customer@demo.com",
    phone: "+91 98765 43210",
    userType: "customer",
    status: "active",
    createdAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: 998,
    name: "Sharma Electronics",
    email: "seller@example.com",
    phone: "+91 98765 43211",
    userType: "seller",
    businessName: "Sharma Electronics",
    businessCategory: "Electronics",
    businessAddress: "MG Road, Bangalore",
    status: "active",
    createdAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: 997,
    name: "Demo Delivery Partner",
    email: "delivery@demo.com",
    phone: "+91 98765 43212",
    userType: "delivery",
    vehicleType: "Motorcycle",
    licenseNumber: "KA01AB1234",
    status: "active",
    createdAt: "2024-01-01T00:00:00.000Z",
  },
]

// Demo credentials
export const demoCredentials = {
  "customer@demo.com": { password: "demo123", type: "customer" },
  "seller@example.com": { password: "seller123", type: "seller" },
  "delivery@demo.com": { password: "demo123", type: "delivery" },
}

// Initialize demo data in localStorage
export const initializeDemoData = () => {
  if (typeof window === "undefined") return

  const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")

  // Check if demo accounts already exist
  const demoExists = demoAccounts.some((demo) => registeredUsers.some((user: any) => user.email === demo.email))

  if (!demoExists) {
    // Add demo accounts to registered users
    const updatedUsers = [...registeredUsers, ...demoAccounts]
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers))
    console.log("Demo accounts initialized")
  }
}
