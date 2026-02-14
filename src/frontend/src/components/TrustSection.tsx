export function TrustSection() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold mb-2">Guaranteed Safe Checkout</h3>
          <p className="text-muted-foreground">Your payment information is secure</p>
        </div>
        <div className="flex justify-center items-center gap-8 flex-wrap">
          <img 
            src="/assets/generated/payment-icons-set.dim_800x200.png" 
            alt="Payment Methods" 
            className="h-12 opacity-80"
          />
        </div>
      </div>
    </section>
  );
}
