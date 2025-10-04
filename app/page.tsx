import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/data"
import { ArrowRight } from "lucide-react"

export default function HomePage() {
  const featuredProducts = products.filter((p) => p.featured)
  const newProducts = products.filter((p) => p.new)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Promo Banner */}
        <div className="bg-foreground text-background py-2 text-center text-sm">
          <p>
            Sign up and get 20% off your first order.{" "}
            <Link href="/signup" className="underline font-medium">
              Sign Up Now
            </Link>
          </p>
        </div>

        {/* Hero Section */}
        <section className="relative h-[600px] md:h-[700px] bg-muted">
          <Image
            src="/elegant-fashion-model-in-flowing-dress-on-minimali.jpg"
            alt="Summer Arrival Collection"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-balance text-foreground">
                Summer Arrival of Outfit
              </h1>
              <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto text-pretty">
                Discover quality fashion that reflects your style and makes everyday enjoyable.
              </p>
              <Link href="/shop/women">
                <Button size="lg" className="rounded-full px-8 group">
                  EXPLORE PRODUCT
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Collections */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/shop/women" className="group relative h-[300px] overflow-hidden rounded-lg bg-accent">
              <Image
                src="/elegant-woman-in-beige-minimalist-outfit.jpg"
                alt="Where dreams meet couture"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <h2 className="text-3xl font-bold mb-4 text-foreground">Where dreams meet couture</h2>
                <Button variant="secondary" className="rounded-full">
                  Shop Now
                </Button>
              </div>
            </Link>

            <Link href="/shop/women" className="group relative h-[300px] overflow-hidden rounded-lg bg-muted">
              <Image
                src="/elegant-woman-in-neutral-tones-fashion.jpg"
                alt="Enchanting styles for every women"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <h2 className="text-3xl font-bold mb-4 text-foreground">Enchanting styles for every women</h2>
                <Button variant="secondary" className="rounded-full">
                  Shop Now
                </Button>
              </div>
            </Link>
          </div>
        </section>

        {/* Browse by Categories */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-8">Browse by categories</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Link
              href="/shop/men?subcategory=shoes"
              className="group relative aspect-square overflow-hidden rounded-lg bg-muted"
            >
              <Image
                src="/white-leather-sneakers-product-photo.jpg"
                alt="Shoes"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="text-lg font-semibold uppercase tracking-wide">SHOES</span>
              </div>
            </Link>

            <Link
              href="/shop/accessories?subcategory=bags"
              className="group relative aspect-square overflow-hidden rounded-lg bg-muted"
            >
              <Image
                src="/brown-leather-duffle-bag.jpg"
                alt="Bags"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="text-lg font-semibold uppercase tracking-wide">BAG</span>
              </div>
            </Link>

            <Link
              href="/shop/men?subcategory=t-shirts"
              className="group relative aspect-square overflow-hidden rounded-lg bg-muted"
            >
              <Image
                src="/beige-linen-shirt-on-model.jpg"
                alt="T-Shirts"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="text-lg font-semibold uppercase tracking-wide">T-SHIRT</span>
              </div>
            </Link>

            <Link
              href="/shop/women?subcategory=jackets"
              className="group relative aspect-square overflow-hidden rounded-lg bg-muted"
            >
              <Image
                src="/blue-denim-jacket-on-model.jpg"
                alt="Jackets"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="text-lg font-semibold uppercase tracking-wide">JACKETS</span>
              </div>
            </Link>
          </div>
        </section>

        {/* Popular Products */}
        <section className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Popular products</h2>
            <Link href="/shop/all">
              <Button variant="ghost">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* New Arrivals */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">New Arrivals</h2>
              <Link href="/shop/all?filter=new">
                <Button variant="ghost">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {newProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="container mx-auto px-4 py-16">
          <div className="rounded-lg bg-foreground text-background p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay in the loop</h2>
            <p className="text-lg mb-8 text-background/80 max-w-2xl mx-auto">
              Subscribe to our newsletter for exclusive offers, style tips, and early access to new collections.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full text-foreground"
              />
              <Button type="submit" variant="secondary" size="lg" className="rounded-full px-8">
                Subscribe
              </Button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
