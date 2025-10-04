"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface ProductFiltersProps {
  onFilterChange: (filters: FilterState) => void
  category?: string
}

export interface FilterState {
  subcategories: string[]
  sizes: string[]
  colors: string[]
  priceRange: [number, number]
  inStock: boolean
}

const subcategoryOptions = [
  { id: "shoes", label: "Shoes" },
  { id: "dresses", label: "Dresses" },
  { id: "jackets", label: "Jackets" },
  { id: "shorts", label: "Shorts" },
  { id: "t-shirts", label: "T-Shirts" },
  { id: "bags", label: "Bags" },
]

const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"]
const colorOptions = ["Black", "White", "Blue", "Red", "Green", "Brown", "Beige", "Gray"]

export function ProductFilters({ onFilterChange, category }: ProductFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    subcategories: [],
    sizes: [],
    colors: [],
    priceRange: [0, 500],
    inStock: false,
  })

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters }
    setFilters(updated)
    onFilterChange(updated)
  }

  const toggleSubcategory = (subcategory: string) => {
    const updated = filters.subcategories.includes(subcategory)
      ? filters.subcategories.filter((s) => s !== subcategory)
      : [...filters.subcategories, subcategory]
    updateFilters({ subcategories: updated })
  }

  const toggleSize = (size: string) => {
    const updated = filters.sizes.includes(size) ? filters.sizes.filter((s) => s !== size) : [...filters.sizes, size]
    updateFilters({ sizes: updated })
  }

  const toggleColor = (color: string) => {
    const updated = filters.colors.includes(color)
      ? filters.colors.filter((c) => c !== color)
      : [...filters.colors, color]
    updateFilters({ colors: updated })
  }

  const clearFilters = () => {
    const cleared: FilterState = {
      subcategories: [],
      sizes: [],
      colors: [],
      priceRange: [0, 500],
      inStock: false,
    }
    setFilters(cleared)
    onFilterChange(cleared)
  }

  const hasActiveFilters =
    filters.subcategories.length > 0 ||
    filters.sizes.length > 0 ||
    filters.colors.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 500 ||
    filters.inStock

  return (
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

      {/* Subcategories */}
      <div>
        <h4 className="font-medium mb-3">Category</h4>
        <div className="space-y-2">
          {subcategoryOptions.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox
                id={`subcategory-${option.id}`}
                checked={filters.subcategories.includes(option.id)}
                onCheckedChange={() => toggleSubcategory(option.id)}
              />
              <Label htmlFor={`subcategory-${option.id}`} className="text-sm font-normal cursor-pointer">
                {option.label}
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
            value={filters.priceRange}
            onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
            max={500}
            step={10}
            className="mb-2"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h4 className="font-medium mb-3">Size</h4>
        <div className="flex flex-wrap gap-2">
          {sizeOptions.map((size) => (
            <Button
              key={size}
              variant={filters.sizes.includes(size) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleSize(size)}
              className="h-9 w-12"
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <h4 className="font-medium mb-3">Color</h4>
        <div className="space-y-2">
          {colorOptions.map((color) => (
            <div key={color} className="flex items-center space-x-2">
              <Checkbox
                id={`color-${color}`}
                checked={filters.colors.includes(color)}
                onCheckedChange={() => toggleColor(color)}
              />
              <Label htmlFor={`color-${color}`} className="text-sm font-normal cursor-pointer">
                {color}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* In Stock */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="in-stock"
          checked={filters.inStock}
          onCheckedChange={(checked) => updateFilters({ inStock: checked as boolean })}
        />
        <Label htmlFor="in-stock" className="text-sm font-normal cursor-pointer">
          In Stock Only
        </Label>
      </div>
    </div>
  )
}
