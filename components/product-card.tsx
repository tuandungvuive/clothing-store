import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/types"
import { Star } from "lucide-react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.slug}`}>
      <Card className="group overflow-hidden border-border/50 hover:border-border transition-all hover:shadow-md">
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.new && <Badge className="absolute top-3 left-3 bg-foreground text-background">New</Badge>}
          {product.originalPrice && (
            <Badge variant="destructive" className="absolute top-3 right-3">
              Sale
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium text-sm mb-1 line-clamp-1">{product.name}</h3>
          <div className="flex items-center gap-1 mb-2">
            <Star className="h-3 w-3 fill-foreground text-foreground" />
            <span className="text-xs text-muted-foreground">
              {product.rating} ({product.reviewCount})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
