import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function setCookie(name: string, value: string, days: number = 7) {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
}

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null
  return null
}

export function deleteCookie(name: string) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`
}

export function getUserInfo() {
  if (typeof document === 'undefined') return null
  
  const userInfo = getCookie('userInfo')
  if (userInfo) {
    try {
      return JSON.parse(userInfo)
    } catch (error) {
      console.error('Error parsing user info:', error)
      return null
    }
  }
  return null
}

export function getUserType(): string | null {
  if (typeof document === 'undefined') return null
  return getCookie('userType')
}

export function getUserId(): string | null {
  if (typeof document === 'undefined') return null
  return getCookie('userId')
}

export function isLoggedIn(): boolean {
  return getUserInfo() !== null
}

export function logout() {
  deleteCookie('userInfo')
  deleteCookie('userType')
  deleteCookie('userId')
  window.location.href = '/'
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(price)
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatDateTime(date: string | Date): string {
  return new Date(date).toLocaleString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function generateOrderNumber(): string {
  return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export function generatePaymentId(): string {
  return `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}
