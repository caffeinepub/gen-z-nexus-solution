import { Button } from '@/components/ui/button';

export function Hero() {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="/assets/generated/hero-banner-slate-red.dim_1600x600.png" 
          alt="Hero Banner" 
          className="w-full h-full object-cover opacity-40"
        />
      </div>
      <div className="relative container mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
          All Your Favorite <span className="text-destructive">SUBSCRIPTIONS</span> in One Place
        </h1>
        <Button 
          size="lg" 
          className="animate-pulse hover:animate-none"
          onClick={scrollToProducts}
        >
          Shop Now
        </Button>
      </div>
    </section>
  );
}
