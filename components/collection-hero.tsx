interface CollectionHeroProps {
  title: string
  description: string
  imageUrl: string
  productCount: number
}

export function CollectionHero({ title, description, imageUrl, productCount }: CollectionHeroProps) {
  return (
    <div className="relative h-[300px] md:h-[400px] mb-8 rounded-lg overflow-hidden">
      <img src={imageUrl || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
        <h1 className="text-3xl md:text-5xl font-bold mb-2 text-balance">{title}</h1>
        <p className="text-lg md:text-xl mb-2 text-pretty">{description}</p>
        <p className="text-sm opacity-90">{productCount} Products</p>
      </div>
    </div>
  )
}
