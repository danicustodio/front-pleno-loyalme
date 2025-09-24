import { type QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'

interface ReactQueryWrapperProps {
  children: ReactNode
}

export function createReactQueryWrapper(queryClient: QueryClient) {
  return function ReactQueryWrapper({ children }: ReactQueryWrapperProps) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
  }
}
