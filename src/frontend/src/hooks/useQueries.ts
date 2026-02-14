import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';

// Placeholder for future backend queries
// Currently the app uses client-side state management

export function useExampleQuery() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['example'],
    queryFn: async () => {
      if (!actor) return null;
      // Add backend calls here when needed
      return null;
    },
    enabled: !!actor && !isFetching,
  });
}
