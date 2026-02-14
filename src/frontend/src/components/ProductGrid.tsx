import { useState } from 'react';
import { ProductCard } from './ProductCard';
import type { CartItem } from '../App';

interface Product {
  id: string;
  name: string;
  originalPrice?: number;
  currentPrice?: number;
  rating: number;
  image: string;
  fallbackImage?: string;
  price?: number;
  isPriced: boolean;
  duration?: string;
  currencyLabel?: string;
}

// Official product logos sourced online - stored locally as static assets
const products: Product[] = [
  {
    id: 'netflix',
    name: 'Netflix Premium',
    originalPrice: 1800,
    currentPrice: 1550,
    rating: 4.8,
    image: '/assets/generated/netflix-logo-online.dim_512x512.png',
    price: 1550,
    isPriced: true,
    duration: '1 Month',
    currencyLabel: 'Tk'
  },
  {
    id: 'chess',
    name: 'Chess.com Diamond Membership',
    originalPrice: 1200,
    currentPrice: 970,
    rating: 4.6,
    image: '/assets/generated/chesscom-logo-online.dim_512x512.png',
    price: 970,
    isPriced: true,
    duration: '1 Year',
    currencyLabel: 'BDT'
  },
  {
    id: 'spotify',
    name: 'Spotify',
    rating: 4.7,
    image: '/assets/generated/spotify-logo-online.dim_512x512.png',
    isPriced: false
  },
  {
    id: 'youtube',
    name: 'YouTube Premium',
    rating: 4.9,
    image: '/assets/generated/youtube-premium-logo-online.dim_512x512.png',
    isPriced: false
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    rating: 4.9,
    image: '/assets/generated/chatgpt-logo.dim_512x512.png',
    isPriced: false
  },
  {
    id: 'gemini',
    name: 'Gemini',
    rating: 4.8,
    image: '/assets/generated/gemini-logo-online.dim_512x512.png',
    isPriced: false
  },
  {
    id: 'facebook',
    name: 'Facebook',
    rating: 4.5,
    image: '/assets/generated/facebook-logo-online.dim_512x512.png',
    isPriced: false
  },
  {
    id: 'toffee',
    name: 'Toffee',
    rating: 4.6,
    image: '/assets/generated/toffee-logo-online.dim_512x512.png',
    isPriced: false
  },
  {
    id: 'chorki',
    name: 'Chorki',
    rating: 4.7,
    image: '/assets/generated/chorki-logo-online.dim_512x512.png',
    isPriced: false
  },
  {
    id: 'deeptopay',
    name: 'Deepto Pay',
    rating: 4.5,
    image: '/assets/generated/deepto-pay-logo-online.dim_512x512.png',
    isPriced: false
  },
  {
    id: 'bioscope',
    name: 'Bioscope',
    rating: 4.6,
    image: '/assets/generated/bioscope-logo-online.dim_512x512.png',
    isPriced: false
  },
  {
    id: 'iscreen',
    name: 'iScreen',
    rating: 4.5,
    image: '/assets/generated/iscreen-logo-online.dim_512x512.png',
    isPriced: false
  },
  {
    id: 'hoichoi',
    name: 'Hoichoi',
    rating: 4.8,
    image: '/assets/generated/hoichoi-logo-online.dim_512x512.png',
    isPriced: false
  },
  {
    id: 'pubg',
    name: 'PUBG Mobile',
    rating: 4.9,
    image: '/assets/generated/pubg-mobile-logo-online.dim_512x512.png',
    isPriced: false
  },
  {
    id: 'freefire',
    name: 'Free Fire',
    rating: 4.8,
    image: '/assets/generated/free-fire-logo-online.dim_512x512.png',
    isPriced: false
  },
  {
    id: 'adobe',
    name: 'Adobe Creative',
    rating: 4.9,
    image: '/assets/generated/adobe-creative-logo.dim_512x512.png',
    isPriced: false
  },
  {
    id: 'canva',
    name: 'Canva',
    rating: 4.8,
    image: '/assets/generated/canva-logo.dim_512x512.png',
    isPriced: false
  },
  {
    id: 'truecaller',
    name: 'Truecaller',
    rating: 4.7,
    image: '/assets/generated/truecaller-logo.dim_512x512.png',
    isPriced: false
  },
  {
    id: 'camscanner',
    name: 'CamScanner',
    rating: 4.6,
    image: '/assets/generated/camscanner-logo.dim_512x512.png',
    isPriced: false
  }
];

interface ProductGridProps {
  searchQuery: string;
  onAddToCart: (item: Omit<CartItem, 'id'>) => void;
}

export function ProductGrid({ searchQuery, onAddToCart }: ProductGridProps) {
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="products" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Premium Subscriptions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No products found matching "{searchQuery}"
          </div>
        )}
      </div>
    </section>
  );
}
