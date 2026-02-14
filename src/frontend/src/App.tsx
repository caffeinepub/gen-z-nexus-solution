import { useState, useEffect } from 'react';
import { AppErrorBoundary } from './components/AppErrorBoundary';
import { NoticeBar } from './components/NoticeBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { TrustSection } from './components/TrustSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { CartDrawer } from './components/CartDrawer';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';

export interface CartItem {
  id: string;
  productName: string;
  duration: string;
  quantity: number;
  price: number;
  currencyLabel: string;
}

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item: Omit<CartItem, 'id'>) => {
    const id = `${item.productName}-${Date.now()}`;
    setCart(prev => [...prev, { ...item, id }]);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <AppErrorBoundary>
        <div className="min-h-screen bg-background text-foreground">
          <NoticeBar />
          <Header 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            cartItemCount={cartItemCount}
            onCartClick={() => setIsCartOpen(true)}
          />
          <main>
            <Hero />
            <ProductGrid 
              searchQuery={searchQuery}
              onAddToCart={addToCart}
            />
            <TrustSection />
            <ReviewsSection />
          </main>
          <Footer />
          <WhatsAppButton />
          <CartDrawer 
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cart={cart}
            onRemoveItem={removeFromCart}
          />
          <Toaster />
        </div>
      </AppErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
