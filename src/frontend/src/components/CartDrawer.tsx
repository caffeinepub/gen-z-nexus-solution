import { X, Trash2 } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import type { CartItem } from '../App';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemoveItem: (id: string) => void;
}

export function CartDrawer({ isOpen, onClose, cart, onRemoveItem }: CartDrawerProps) {
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
  
  // Determine currency label for total (use first item's currency or default to Tk)
  const totalCurrencyLabel = cart.length > 0 ? cart[0].currencyLabel : 'Tk';

  const handleCheckout = () => {
    const items = cart.map(item => 
      `${item.productName} (${item.duration}) x${item.quantity} - ${item.currencyLabel} ${item.price}`
    ).join('\n');
    
    const message = encodeURIComponent(
      `Hi! I want to checkout:\n\n${items}\n\nTotal: ${totalCurrencyLabel} ${totalPrice}`
    );
    
    window.open(`https://wa.me/8801326060586?text=${message}`, '_blank');
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({cart.length})</SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-200px)] mt-6">
          {cart.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              Your cart is empty
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3 p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.productName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.duration} × {item.quantity}
                    </p>
                    <p className="font-semibold mt-1">{item.currencyLabel} {item.price}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {cart.length > 0 && (
          <SheetFooter className="absolute bottom-0 left-0 right-0 p-6 border-t bg-background">
            <div className="w-full space-y-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>{totalCurrencyLabel} {totalPrice}</span>
              </div>
              <Button className="w-full" size="lg" onClick={handleCheckout}>
                Checkout via WhatsApp
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
