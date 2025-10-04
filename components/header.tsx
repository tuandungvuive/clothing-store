"use client"

import Link from "next/link"
import { Menu, Search, ShoppingCart, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/lib/cart-context"
import { useState } from "react"

export function Header() {
  const { totalItems } = useCart()
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px]">
            <nav className="flex flex-col gap-4">
              <Link href="/shop/men" className="text-lg font-medium hover:text-muted-foreground">
                Men
              </Link>
              <Link href="/shop/women" className="text-lg font-medium hover:text-muted-foreground">
                Women
              </Link>
              <Link href="/shop/children" className="text-lg font-medium hover:text-muted-foreground">
                Children
              </Link>
              <Link href="/shop/accessories" className="text-lg font-medium hover:text-muted-foreground">
                Accessories
              </Link>
              <div className="my-4 h-px bg-border" />
              <Link href="/collections/summer" className="text-sm hover:text-muted-foreground">
                Summer Collection
              </Link>
              <Link href="/collections/winter" className="text-sm hover:text-muted-foreground">
                Winter Collection
              </Link>
              <Link href="/collections/spring" className="text-sm hover:text-muted-foreground">
                Spring Collection
              </Link>
              <div className="my-4 h-px bg-border" />
              <Link href="/about" className="text-sm hover:text-muted-foreground">
                About
              </Link>
              <Link href="/contact" className="text-sm hover:text-muted-foreground">
                Contact
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background">
            <span className="text-sm font-bold">N</span>
          </div>
          <span className="text-xl font-semibold">Nextgen</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex">
          <Link href="/shop/men" className="text-sm font-medium hover:text-muted-foreground transition-colors">
            Men
          </Link>
          <Link href="/shop/women" className="text-sm font-medium hover:text-muted-foreground transition-colors">
            Women
          </Link>
          <Link href="/shop/children" className="text-sm font-medium hover:text-muted-foreground transition-colors">
            Children
          </Link>
          <Link href="/shop/accessories" className="text-sm font-medium hover:text-muted-foreground transition-colors">
            Accessories
          </Link>
          <Link
            href="/collections/summer"
            className="text-sm font-medium hover:text-muted-foreground transition-colors"
          >
            Collections
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="hidden md:block">
            {searchOpen ? (
              <div className="flex items-center gap-2">
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-[200px] lg:w-[300px]"
                  autoFocus
                  onBlur={() => setSearchOpen(false)}
                />
              </div>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)}>
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            )}
          </div>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          {/* Account */}
          <Link href="/account">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
          </Link>

          {/* Cart */}
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-[10px] font-medium text-background">
                  {totalItems}
                </span>
              )}
              <span className="sr-only">Shopping cart</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
