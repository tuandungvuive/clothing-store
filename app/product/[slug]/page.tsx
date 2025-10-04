"use client"

import { use, useState } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { products, reviews } from "@/lib/data"
import { useCart } from "@/lib/cart-context"
import { Star, Check, ShoppingCart, Heart, Share2 } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { useToast } from "@/hooks/use-toast"

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const product = products.find((p) => p.slug === slug)
  const { toast } = useToast()

  if (!product) {
    notFound()
  }

  const productReviews = reviews.filter((r) => r.productId === product.id)
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [quantity, setQuantity] = useState(1)

  const { addItem } = useCart()

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes.length > 1) {
      toast({
        title: "Please select a size",
        variant: "destructive",
      })
      return
    }

    addItem(product, selectedSize || product.sizes[0], selectedColor, quantity)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Product Details */}
          <div className="grid gap-8 lg:grid-cols-2 mb-16">
            {/* Images */}
            <div className="space-y-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
                <Image
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {product.new && <Badge className="absolute top-4 left-4 bg-foreground text-background">New</Badge>}
                {product.originalPrice && (
                  <Badge variant="destructive" className="absolute top-4 right-4">
                    Sale
                  </Badge>
                )}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                      selectedImage === index ? "border-foreground" : "border-transparent"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-foreground text-foreground" : "text-muted-foreground"}`}
                      />
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">
                      {product.rating} ({product.reviewCount} reviews)
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="font-semibold mb-3">Color: {selectedColor}</h3>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <Button
                      key={color}
                      variant={selectedColor === color ? "default" : "outline"}
                      onClick={() => setSelectedColor(color)}
                      className="min-w-[100px]"
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              {product.sizes.length > 1 && (
                <div>
                  <h3 className="font-semibold mb-3">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? "default" : "outline"}
                        onClick={() => setSelectedSize(size)}
                        className="min-w-[60px]"
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <h3 className="font-semibold mb-3">Quantity</h3>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    -
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                    +
                  </Button>
                </div>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 text-sm">
                {product.inStock ? (
                  <>
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-green-600">In Stock</span>
                  </>
                ) : (
                  <span className="text-destructive">Out of Stock</span>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button size="lg" className="flex-1" onClick={handleAddToCart} disabled={!product.inStock}>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline" className="aspect-square p-0 bg-transparent">
                  <Heart className="h-5 w-5" />
                  <span className="sr-only">Add to wishlist</span>
                </Button>
                <Button size="lg" variant="outline" className="aspect-square p-0 bg-transparent">
                  <Share2 className="h-5 w-5" />
                  <span className="sr-only">Share</span>
                </Button>
              </div>

              {/* Features */}
              <div className="border-t border-border pt-6 space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  <span>Free shipping on orders over $100</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  <span>30-day return policy</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  <span>Secure checkout</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="reviews" className="mb-16">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger
                value="reviews"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent"
              >
                Reviews ({productReviews.length})
              </TabsTrigger>
              <TabsTrigger
                value="details"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent"
              >
                Product Details
              </TabsTrigger>
              <TabsTrigger
                value="shipping"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent"
              >
                Shipping & Returns
              </TabsTrigger>
            </TabsList>

            <TabsContent value="reviews" className="mt-8">
              <div className="space-y-6">
                {productReviews.length > 0 ? (
                  productReviews.map((review) => (
                    <div key={review.id} className="border-b border-border pb-6 last:border-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold">{review.userName}</span>
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs">
                                Verified Purchase
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${i < review.rating ? "fill-foreground text-foreground" : "text-muted-foreground"}`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="details" className="mt-8">
              <div className="prose prose-sm max-w-none">
                <h3 className="font-semibold mb-4">Product Information</h3>
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="font-medium text-muted-foreground">Category</dt>
                    <dd className="capitalize">{product.category}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-muted-foreground">Type</dt>
                    <dd className="capitalize">{product.subcategory}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-muted-foreground">Available Sizes</dt>
                    <dd>{product.sizes.join(", ")}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-muted-foreground">Available Colors</dt>
                    <dd>{product.colors.join(", ")}</dd>
                  </div>
                </dl>
              </div>
            </TabsContent>

            <TabsContent value="shipping" className="mt-8">
              <div className="prose prose-sm max-w-none space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Shipping Information</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We offer free standard shipping on all orders over $100. Orders are typically processed within 1-2
                    business days and delivered within 5-7 business days.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Returns & Exchanges</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We accept returns within 30 days of purchase. Items must be unworn, unwashed, and in original
                    condition with tags attached. Exchanges are available for different sizes or colors.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
