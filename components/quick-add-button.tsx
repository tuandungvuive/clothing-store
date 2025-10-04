"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Check } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/types"

interface QuickAddButtonProps {
  product: Product
}

export function QuickAddButton({ product }: QuickAddButtonProps) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
      size: product.sizes[0],
      color: product.colors[0],
    })

    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <Button onClick={handleQuickAdd} size="sm" className="w-full" variant={added ? "secondary" : "default"}>
      {added ? (
        <>
          <Check className="h-4 w-4 mr-2" />
          Added
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Quick Add
        </>
      )}
    </Button>
  )
}
