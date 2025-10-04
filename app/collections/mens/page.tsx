"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CollectionHero } from "@/components/collection-hero"
import { CollectionProductCard } from "@/components/collection-product-card"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { SlidersHorizontal, X } from "lucide-react"
import { products } from "@/lib/data"

const mensSubcategories = [
  { id: "shoes", label: "Shoes" },
  { id: "t-shirts", label: "Shirts & Tops" },
  { id: "shorts", label: "Pants & Shorts" },
  { id: "jackets", label: "Jackets & Outerwear" },
]

const mensSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"]
const mensShoesSizes = ["7", "8", "9", "10", "11", "12", "13"]

export default function MensCollectionPage() {
  const [subcategories, setSubcategories] = useState<string[]>([])
  const [sizes, setSizes] = useState<string[]>([])
  const [colors, setColors] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
  const [inStock, setInStock] = useState(false)
  const [sortBy, setSortBy] = useState("featured")

  const mensProducts = products.filter((p) => p.category === "men")

  const filteredProducts = useMemo(() => {
    let filtered = [...mensProducts]

    if (subcategories.length > 0) {
      filtered = filtered.filter((p) => subcategories.includes(p.subcategory))
    }
    if (sizes.length > 0) {
      filtered = filtered.filter((p) => sizes.some((size) => p.sizes.includes(size)))
    }
    if (colors.length > 0) {
      filtered = filtered.filter((p) => colors.some((color) => p.colors.includes(color)))
    }
    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])
    if (inStock) {
      filtered = filtered.filter((p) => p.inStock)
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "newest":
        filtered.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0))
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    return filtered
  }, [mensProducts, subcategories, sizes, colors, priceRange, inStock, sortBy])

  const clearFilters = () => {
    setSubcategories([])
    setSizes([])
    setColors([])
    setPriceRange([0, 500])
    setInStock(false)
  }

  const hasActiveFilters =
    subcategories.length > 0 ||
    sizes.length > 0 ||
    colors.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 500 ||
    inStock

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filters</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Category */}
      <div>
        <h4 className="font-medium mb-3">Category</h4>
        <div className="space-y-2">
          {mensSubcategories.map((cat) => (
            <div key={cat.id} className="flex items-center space-x-2">
              <Checkbox
                id={`mens-cat-${cat.id}`}
                checked={subcategories.includes(cat.id)}
                onCheckedChange={(checked) => {
                  setSubcategories(checked ? [...subcategories, cat.id] : subcategories.filter((c) => c !== cat.id))
                }}
              />
              <Label htmlFor={`mens-cat-${cat.id}`} className="text-sm font-normal cursor-pointer">
                {cat.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-medium mb-3">Price Range</h4>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            max={500}
            step={10}
            className="mb-2"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Size */}
      <div>
        <h4 className="font-medium mb-3">Size</h4>
        <div className="flex flex-wrap gap-2">
          {mensSizes.map((size) => (
            <Button
              key={size}
              variant={sizes.includes(size) ? "default" : "outline"}
              size="sm"
              onClick={() => setSizes(sizes.includes(size) ? sizes.filter((s) => s !== size) : [...sizes, size])}
              className="h-9 w-12"
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      {/* In Stock */}
      <div className="flex items-center space-x-2">
        <Checkbox id="mens-stock" checked={inStock} onCheckedChange={(checked) => setInStock(checked as boolean)} />
        <Label htmlFor="mens-stock" className="text-sm font-normal cursor-pointer">
          In Stock Only
        </Label>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <CollectionHero
            title="Men's Collection"
            description="Discover timeless style and modern comfort"
            imageUrl="/placeholder.svg?height=400&width=1200"
            productCount={mensProducts.length}
          />

          <div className="flex gap-8">
            {/* Desktop Filters */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <FilterContent />
              </div>
            </aside>

            {/* Products */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="lg:hidden bg-transparent">
                        <SlidersHorizontal className="h-4 w-4 mr-2" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] overflow-y-auto">
                      <FilterContent />
                    </SheetContent>
                  </Sheet>
                  <p className="text-sm text-muted-foreground">
                    {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
                  </p>
                </div>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Product Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
                  {filteredProducts.map((product) => (
                    <CollectionProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg mb-4">No products found matching your filters.</p>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
