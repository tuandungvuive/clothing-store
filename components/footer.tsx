import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background">
                <span className="text-sm font-bold">N</span>
              </div>
              <span className="text-xl font-semibold">Nextgen</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Discover quality fashion that reflects your style and makes everyday enjoyable.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/shop/men" className="text-muted-foreground hover:text-foreground transition-colors">
                  Men's Collection
                </Link>
              </li>
              <li>
                <Link href="/shop/women" className="text-muted-foreground hover:text-foreground transition-colors">
                  Women's Collection
                </Link>
              </li>
              <li>
                <Link href="/shop/children" className="text-muted-foreground hover:text-foreground transition-colors">
                  Children's Collection
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/accessories"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:text-foreground transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">Subscribe to get special offers and updates.</p>
            <form className="flex gap-2">
              <Input type="email" placeholder="Your email" className="flex-1" />
              <Button type="submit" size="sm">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Nextgen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
