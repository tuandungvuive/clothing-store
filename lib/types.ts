export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  originalPrice?: number
  category: "men" | "women" | "children" | "accessories"
  subcategory: string
  images: string[]
  sizes: string[]
  colors: string[]
  inStock: boolean
  featured?: boolean
  new?: boolean
  rating: number
  reviewCount: number
}

export interface Review {
  id: string
  productId: string
  userName: string
  rating: number
  comment: string
  date: string
  verified: boolean
}

export interface CartItem {
  product: Product
  quantity: number
  size: string
  color: string
}

export interface User {
  id: string
  name: string
  email: string
  orders: Order[]
}

export interface Order {
  id: string
  date: string
  total: number
  status: "pending" | "processing" | "shipped" | "delivered"
  items: CartItem[]
}
