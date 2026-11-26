import { authenticatedClient } from "@/lib/axios/authenticated-client"

interface UpdateReportData {
  report_date: string
  equipment: string
  activity_name: string
  consumed_parts: string
  tools_used: string
  duration: string
  performed_by: string
  image?: File
}

export async function updateReport(
  id: string,
  data: UpdateReportData,
) {
  const formData = new FormData()

  formData.append("report_date", data.report_date)
  formData.append("equipment", data.equipment)
  formData.append("activity_name", data.activity_name)
  formData.append("consumed_parts", data.consumed_parts)
  formData.append("tools_used", data.tools_used)
  formData.append("duration", data.duration)
  formData.append("performed_by", data.performed_by)

  // Only replace the existing image if a new one was selected.
  if (data.image) {
    formData.append("image", data.image)
  }

  const response = await authenticatedClient.patch(
    `reports/${id}/`,
    formData,
  )

  return response.data.data
}
