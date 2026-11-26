import { useQuery } from "@tanstack/react-query"
import { getReports } from "../api/get-reports"
import type { ReportFilters } from "../types/types"

export const reportsQueryKey = ["reports"] as const

export function useReports(filters: ReportFilters = {}) {
  return useQuery({
    queryKey: [...reportsQueryKey, filters],
    queryFn: () => getReports(filters),
  })
}