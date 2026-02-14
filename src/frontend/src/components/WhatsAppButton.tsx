import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/8801326060586"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
    >
      <Button
        size="lg"
        className="rounded-full h-14 w-14 shadow-lg bg-green-600 hover:bg-green-700 text-white"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </a>
  );
}
