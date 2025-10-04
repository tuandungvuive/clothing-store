"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { ProductFilters, type FilterState } from "@/components/product-filters"
import { products, categories } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SlidersHorizontal } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ShopCategoryPage({ params }: { params: { category: string } }) {
  const { category } = params
  const [filters, setFilters] = useState<FilterState>({
    subcategories: [],
    sizes: [],
    colors: [],
    priceRange: [0, 500],
    inStock: false,
  })
  const [sortBy, setSortBy] = useState("featured")

  const categoryData = categories.find((c) => c.slug === category)

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      // Category filter
      if (category !== "all" && product.category !== category) return false

      // Subcategory filter
      if (filters.subcategories.length > 0 && !filters.subcategories.includes(product.subcategory)) return false

      // Price filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false

      // Size filter
      if (filters.sizes.length > 0 && !filters.sizes.some((size) => product.sizes.includes(size))) return false

      // Color filter
      if (filters.colors.length > 0 && !filters.colors.some((color) => product.colors.includes(color))) return false

      // Stock filter
      if (filters.inStock && !product.inStock) return false

      return true
    })

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
        // Featured - prioritize featured products
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    return filtered
  }, [category, filters, sortBy])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{categoryData?.name || "All Products"}</h1>
            <p className="text-muted-foreground">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
            </p>
          </div>

          <div className="flex gap-8">
            {/* Desktop Filters */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <ProductFilters onFilterChange={setFilters} category={category} />
              </div>
            </aside>

            {/* Products */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6">
                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden bg-transparent">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] overflow-y-auto">
                    <ProductFilters onFilterChange={setFilters} category={category} />
                  </SheetContent>
                </Sheet>

                {/* Sort */}
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
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg mb-4">No products found matching your filters.</p>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setFilters({
                        subcategories: [],
                        sizes: [],
                        colors: [],
                        priceRange: [0, 500],
                        inStock: false,
                      })
                    }
                  >
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
