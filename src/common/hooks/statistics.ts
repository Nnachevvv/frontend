import { useQuery } from '@tanstack/react-query'
import { endpoints } from 'service/apiEndpoints'

export function useContributorsCount() {
  return useQuery<number>([endpoints.statistics.getContributorsNumber.url], {
    // Add 1 hour and 5 minutes of cache time
    cacheTime: 65 * (60 * 1000),
    // Add 1 hour of stale time
    staleTime: 60 * (60 * 1000),
  })
}
