"use client"

import { useState, useEffect, useCallback } from "react"

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  sellerId: string
  sellerName: string
}

export interface CartState {
  items: CartItem[]
  totalItems: number
  totalPrice: number
}

// Global cart state
let globalCartState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
}

// Cart listeners
const cartListeners = new Set<() => void>()

const notifyCartListeners = () => {
  cartListeners.forEach((listener) => listener())
}

const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  return { totalItems, totalPrice }
}

const updateGlobalCart = (items: CartItem[]) => {
  const { totalItems, totalPrice } = calculateTotals(items)
  globalCartState = { items, totalItems, totalPrice }
  localStorage.setItem("cart", JSON.stringify(globalCartState))
  notifyCartListeners()
}

export function useCart() {
  const [cart, setCart] = useState<CartState>(globalCartState)

  // Subscribe to cart updates
  useEffect(() => {
    const updateCart = () => {
      setCart({ ...globalCartState })
    }

    cartListeners.add(updateCart)

    return () => {
      cartListeners.delete(updateCart)
    }
  }, [])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        globalCartState = parsedCart
        setCart(globalCartState)
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error)
      }
    }
  }, [])

  const addToCart = useCallback((product: Omit<CartItem, "quantity">) => {
    const existingItemIndex = globalCartState.items.findIndex((item) => item.id === product.id)

    let newItems: CartItem[]
    if (existingItemIndex >= 0) {
      newItems = globalCartState.items.map((item, index) =>
        index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item,
      )
    } else {
      newItems = [...globalCartState.items, { ...product, quantity: 1 }]
    }

    updateGlobalCart(newItems)
  }, [])

  const removeFromCart = useCallback((productId: string) => {
    const newItems = globalCartState.items.filter((item) => item.id !== productId)
    updateGlobalCart(newItems)
  }, [])

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId)
        return
      }

      const newItems = globalCartState.items.map((item) => (item.id === productId ? { ...item, quantity } : item))
      updateGlobalCart(newItems)
    },
    [removeFromCart],
  )

  const clearCart = useCallback(() => {
    updateGlobalCart([])
  }, [])

  const getItemQuantity = useCallback((productId: string) => {
    const item = globalCartState.items.find((item) => item.id === productId)
    return item ? item.quantity : 0
  }, [])

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemQuantity,
  }
}
