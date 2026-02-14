import { AlertCircle, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface ActionableErrorProps {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
}

export function ActionableError({
  title,
  message,
  actionLabel = 'Try Again',
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
}: ActionableErrorProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="max-w-md w-full space-y-4">
        <Alert variant="destructive" className="border-2">
          <AlertCircle className="h-5 w-5" />
          <AlertTitle className="text-lg font-semibold">{title}</AlertTitle>
          <AlertDescription className="mt-2 text-sm">
            {message}
          </AlertDescription>
        </Alert>
        <div className="flex gap-3 justify-center">
          {onAction && (
            <Button onClick={onAction} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              {actionLabel}
            </Button>
          )}
          {onSecondaryAction && secondaryActionLabel && (
            <Button onClick={onSecondaryAction} variant="outline">
              {secondaryActionLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
