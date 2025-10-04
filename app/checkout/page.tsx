"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/lib/cart-context"
import { CreditCard, Lock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    phone: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })

  const [shippingMethod, setShippingMethod] = useState("standard")

  const shipping = shippingMethod === "express" ? 20 : totalPrice > 100 ? 0 : 10
  const tax = totalPrice * 0.08
  const total = totalPrice + shipping + tax

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simulate order processing
    toast({
      title: "Order placed successfully!",
      description: "You will receive a confirmation email shortly.",
    })

    clearCart()
    router.push("/account/orders")
  }

  if (items.length === 0) {
    router.push("/cart")
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Checkout</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Checkout Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Contact Information */}
                <div className="bg-background rounded-lg p-6 border">
                  <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-background rounded-lg p-6 border">
                  <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="123 Main St"
                      />
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input id="city" name="city" required value={formData.city} onChange={handleInputChange} />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input id="state" name="state" required value={formData.state} onChange={handleInputChange} />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          required
                          value={formData.zipCode}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipping Method */}
                <div className="bg-background rounded-lg p-6 border">
                  <h2 className="text-xl font-semibold mb-4">Shipping Method</h2>
                  <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                    <div className="flex items-center justify-between p-4 border rounded-lg mb-3">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label htmlFor="standard" className="cursor-pointer">
                          <div className="font-medium">Standard Shipping</div>
                          <div className="text-sm text-muted-foreground">5-7 business days</div>
                        </Label>
                      </div>
                      <span className="font-semibold">{totalPrice > 100 ? "Free" : "$10.00"}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="express" id="express" />
                        <Label htmlFor="express" className="cursor-pointer">
                          <div className="font-medium">Express Shipping</div>
                          <div className="text-sm text-muted-foreground">2-3 business days</div>
                        </Label>
                      </div>
                      <span className="font-semibold">$20.00</span>
                    </div>
                  </RadioGroup>
                </div>

                {/* Payment Information */}
                <div className="bg-background rounded-lg p-6 border">
                  <div className="flex items-center gap-2 mb-4">
                    <CreditCard className="h-5 w-5" />
                    <h2 className="text-xl font-semibold">Payment Information</h2>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        required
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input
                        id="cardName"
                        name="cardName"
                        required
                        value={formData.cardName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          name="expiryDate"
                          required
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          name="cvv"
                          required
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          maxLength={4}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                    <Lock className="h-4 w-4" />
                    <span>Your payment information is secure and encrypted</span>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-background rounded-lg p-6 border sticky top-24">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                  <div className="space-y-3 mb-4 max-h-[300px] overflow-y-auto">
                    {items.map((item) => (
                      <div
                        key={`${item.product.id}-${item.size}-${item.color}`}
                        className="flex gap-3 pb-3 border-b last:border-0"
                      >
                        <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                          <Image
                            src={item.product.images[0] || "/placeholder.svg"}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium line-clamp-1">{item.product.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {item.color} / {item.size} × {item.quantity}
                          </p>
                          <p className="text-sm font-semibold mt-1">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span className="font-medium">${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between mb-6">
                    <span className="font-semibold">Total</span>
                    <span className="text-2xl font-bold">${total.toFixed(2)}</span>
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Place Order
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}
