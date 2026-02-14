import { useState } from 'react';
import { Star, Minus, Plus } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import type { CartItem } from '../App';

interface Product {
  id: string;
  name: string;
  originalPrice?: number;
  currentPrice?: number;
  rating: number;
  image: string;
  price?: number;
  isPriced: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (item: Omit<CartItem, 'id'>) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);

  const totalPrice = product.isPriced && product.price ? product.price * quantity : 0;

  const handleAddToCart = () => {
    if (!product.isPriced || !product.price) return;
    
    onAddToCart({
      productName: product.name,
      duration: '1 Month',
      quantity,
      price: totalPrice
    });
    toast.success('Added to cart!', {
      description: `${product.name} (1 Month) x${quantity}`
    });
  };

  const handleBuyNow = () => {
    if (!product.isPriced || !product.price) return;
    
    const message = encodeURIComponent(
      `Hi! I want to buy:\n\nProduct: ${product.name}\nDuration: 1 Month\nQuantity: ${quantity}\nTotal: Tk ${totalPrice}`
    );
    window.open(`https://wa.me/8801326060586?text=${message}`, '_blank');
  };

  const handlePriceInquiry = () => {
    const message = encodeURIComponent(
      `Hi! I want to inquire about the price for:\n\nProduct: ${product.name}\n\nPlease provide pricing details.`
    );
    window.open(`https://wa.me/8801326060586?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <Badge className="absolute top-2 right-2 z-10" variant="destructive">
          Sale
        </Badge>
        <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden">
          {!imageError ? (
            <img
              src={product.image}
              alt={`${product.name} logo`}
              className="w-full h-full object-contain p-4"
              onError={() => setImageError(true)}
            />
          ) : (
            <span className="text-4xl">{product.name[0]}</span>
          )}
        </div>
      </div>
      <CardContent className="p-4 space-y-3">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(product.rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-muted-foreground'
              }`}
            />
          ))}
          <span className="text-sm text-muted-foreground ml-1">
            {product.rating}
          </span>
        </div>

        {product.isPriced && product.originalPrice && product.currentPrice ? (
          <>
            <div className="flex items-center gap-2">
              <span className="text-sm line-through text-muted-foreground">
                Tk {product.originalPrice}
              </span>
              <span className="text-xl font-bold text-destructive">
                Tk {product.currentPrice}
              </span>
            </div>

            <div className="flex items-center justify-between border rounded-md p-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="font-semibold">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="text-center font-bold text-lg">
              Total: Tk {totalPrice}
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <button
              onClick={handlePriceInquiry}
              className="text-xl font-bold text-destructive hover:underline cursor-pointer"
            >
              (prize)
            </button>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col gap-2">
        {product.isPriced ? (
          <>
            <Button className="w-full" onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <Button className="w-full" variant="outline" onClick={handleBuyNow}>
              Buy It Now
            </Button>
          </>
        ) : (
          <Button className="w-full" onClick={handlePriceInquiry}>
            Inquire on WhatsApp
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
