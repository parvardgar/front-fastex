
import { authenticatedClient } from "@/lib/axios/authenticated-client"
import type {
  ApiResponse,
  Report,
  ReportFilters,
} from "../types/types"

export async function getReports(
  filters: ReportFilters = {},
): Promise<Report[]> {
  const params: Record<string, string | number> = {}

  if (filters.report_date) {
    params.report_date = filters.report_date
  } else if (filters.year && filters.month) {
    params.year = filters.year
    params.month = filters.month
  }

  const response =
    await authenticatedClient.get<ApiResponse<Report[]>>(
      "/reports/",
      { params },
    )

  return response.data.data
}