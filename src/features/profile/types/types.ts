
export type ReportStatus = "draft" | "completed"

export interface Report {
  id: string
  report_date: string // Jalali: YYYY-MM-DD
  status: ReportStatus
  created_by: string
  equipment: string
  activity_name: string
  image: string | null
  consumed_parts: string
  tools_used: string
  duration: string | null
  performed_by: string
  created_at: string
  updated_at: string
}

export interface ReportFilters {
  report_date?: string
  year?: number
  month?: number
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
  errors: unknown
  error_code: string | null
}