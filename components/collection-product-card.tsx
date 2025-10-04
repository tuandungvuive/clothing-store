import Link from "next/link"
import { Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { QuickAddButton } from "@/components/quick-add-button"
import type { Product } from "@/lib/types"

interface CollectionProductCardProps {
  product: Product
}

export function CollectionProductCard({ product }: CollectionProductCardProps) {
  return (
    <div className="group">
      <Link href={`/product/${product.slug}`}>
        <div className="relative aspect-[3/4] mb-3 overflow-hidden rounded-lg bg-muted">
          <img
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.new && <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">New</Badge>}
          {product.originalPrice && (
            <Badge className="absolute top-2 right-2 bg-destructive text-destructive-foreground">Sale</Badge>
          )}
        </div>
      </Link>

      <div className="space-y-2">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-medium text-sm md:text-base line-clamp-1 group-hover:underline">{product.name}</h3>
        </Link>

        <div className="flex items-center gap-1">
          <Star className="h-3 w-3 fill-primary text-primary" />
          <span className="text-xs text-muted-foreground">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-semibold">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
          )}
        </div>

        <QuickAddButton product={product} />
      </div>
    </div>
  )
}
