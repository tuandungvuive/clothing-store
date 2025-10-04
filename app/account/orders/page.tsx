"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

const mockOrders = [
  {
    id: "12345",
    date: "March 15, 2024",
    status: "delivered",
    total: 289.97,
    items: [
      {
        id: "1",
        name: "Classic White Sneakers",
        image: "/white-leather-sneakers-product-photo.jpg",
        price: 89.99,
        quantity: 2,
        size: "10",
        color: "White",
      },
      {
        id: "2",
        name: "Summer Floral Dress",
        image: "/floral-summer-dress-model.png",
        price: 79.99,
        quantity: 1,
        size: "M",
        color: "Floral Print",
      },
    ],
  },
]

export default function OrdersPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Link href="/account" className="text-sm text-muted-foreground hover:text-foreground">
              ← Back to Account
            </Link>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-8">Order History</h1>

          <div className="space-y-6">
            {mockOrders.map((order) => (
              <div key={order.id} className="bg-background rounded-lg border overflow-hidden">
                <div className="p-6 border-b">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold mb-1">Order #{order.id}</h2>
                      <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge
                        variant={order.status === "delivered" ? "default" : "secondary"}
                        className="capitalize bg-green-100 text-green-800 hover:bg-green-100"
                      >
                        {order.status}
                      </Badge>
                      <span className="text-xl font-bold">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{item.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {item.color} / {item.size} × {item.quantity}
                          </p>
                          <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3 mt-6 pt-6 border-t">
                    <Button variant="outline" className="flex-1 bg-transparent">
                      View Invoice
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Track Shipment
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Request Return
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
