"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, User, MapPin, Phone, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface UnassignedOrder {
  id: number
  orderNumber: string
  customerName: string
  customerPhone: string
  customerAddress: string
  totalAmount: number
  orderStatus: string
  created_at: string
}

interface DeliveryAgent {
  id: number
  name: string
  email: string
  phone: string
  isAvailable: boolean
}

export default function AdminAssignOrders() {
  const [unassignedOrders, setUnassignedOrders] = useState<UnassignedOrder[]>([])
  const [deliveryAgents, setDeliveryAgents] = useState<DeliveryAgent[]>([])
  const [loading, setLoading] = useState(true)
  const [assigning, setAssigning] = useState<number | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchUnassignedOrders()
    fetchDeliveryAgents()
  }, [])

  const fetchUnassignedOrders = async () => {
    try {
      const response = await fetch('/api/order/place?deliveryAgentId=null&status=PENDING')
      const data = await response.json()

      if (response.ok) {
        setUnassignedOrders(data.orders || [])
      } else {
        console.error('Failed to fetch unassigned orders:', data)
        toast({
          title: "Error",
          description: "Failed to fetch unassigned orders",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error fetching unassigned orders:', error)
      toast({
        title: "Error",
        description: "Failed to fetch unassigned orders",
        variant: "destructive",
      })
    }
  }

  const fetchDeliveryAgents = async () => {
    try {
      const response = await fetch('/api/delivery-agents')
      const data = await response.json()

      if (response.ok) {
        setDeliveryAgents(data.agents || [])
      } else {
        console.error('Failed to fetch delivery agents:', data)
      }
    } catch (error) {
      console.error('Error fetching delivery agents:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAssignOrder = async (orderId: number, agentId: number) => {
    setAssigning(orderId)
    try {
      const response = await fetch('/api/delivery/assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, deliveryAgentId: agentId })
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Success",
          description: `Order assigned to ${data.deliveryAgent?.name || 'delivery agent'}`,
        })
        fetchUnassignedOrders() // Refresh the list
      } else {
        console.error('Failed to assign order:', data)
        toast({
          title: "Error",
          description: data.error || "Failed to assign order",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error assigning order:', error)
      toast({
        title: "Error",
        description: "Failed to assign order",
        variant: "destructive",
      })
    } finally {
      setAssigning(null)
    }
  }

  const handleAutoAssign = async (orderId: number) => {
    setAssigning(orderId)
    try {
      const response = await fetch('/api/delivery/assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId })
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Success",
          description: `Order auto-assigned to ${data.deliveryAgent?.name || 'delivery agent'}`,
        })
        fetchUnassignedOrders() // Refresh the list
      } else {
        console.error('Failed to auto-assign order:', data)
        toast({
          title: "Error",
          description: data.error || "Failed to auto-assign order",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error auto-assigning order:', error)
      toast({
        title: "Error",
        description: "Failed to auto-assign order",
        variant: "destructive",
      })
    } finally {
      setAssigning(null)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-2">Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Admin - Assign Orders</h1>
        <p className="text-gray-600">Manually assign orders to delivery agents</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Unassigned Orders ({unassignedOrders.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {unassignedOrders.length === 0 ? (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No unassigned orders</p>
              </div>
            ) : (
              <div className="space-y-4">
                {unassignedOrders.map((order) => (
                  <Card key={order.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold">Order #{order.orderNumber}</h3>
                          <p className="text-sm text-gray-600">
                            {new Date(order.created_at).toLocaleString()}
                          </p>
                        </div>
                        <Badge variant="outline">{order.orderStatus}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Customer</p>
                          <p className="text-sm flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {order.customerName}
                          </p>
                          <p className="text-sm flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            {order.customerPhone}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Address</p>
                          <p className="text-sm flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {order.customerAddress}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Total Amount</p>
                          <p className="text-lg font-bold">₹{order.totalAmount}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleAutoAssign(order.id)}
                            disabled={assigning === order.id}
                            variant="outline"
                            size="sm"
                          >
                            {assigning === order.id ? "Assigning..." : "Auto Assign"}
                          </Button>
                          
                          {deliveryAgents.length > 0 && (
                            <div className="relative">
                              <select
                                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                                onChange={(e) => {
                                  const agentId = parseInt(e.target.value)
                                  if (agentId) {
                                    handleAssignOrder(order.id, agentId)
                                  }
                                }}
                                disabled={assigning === order.id}
                              >
                                <option value="">Select Agent</option>
                                {deliveryAgents
                                  .filter(agent => agent.isAvailable)
                                  .map(agent => (
                                    <option key={agent.id} value={agent.id}>
                                      {agent.name} ({agent.phone})
                                    </option>
                                  ))
                                }
                              </select>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Available Delivery Agents ({deliveryAgents.filter(a => a.isAvailable).length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {deliveryAgents.length === 0 ? (
              <div className="text-center py-8">
                <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No delivery agents found</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {deliveryAgents.map((agent) => (
                  <div key={agent.id} className="flex justify-between items-center p-3 border border-gray-200 rounded">
                    <div>
                      <p className="font-medium">{agent.name}</p>
                      <p className="text-sm text-gray-600">{agent.email}</p>
                      <p className="text-sm text-gray-600">{agent.phone}</p>
                    </div>
                    <Badge variant={agent.isAvailable ? "default" : "secondary"}>
                      {agent.isAvailable ? "Available" : "Unavailable"}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}