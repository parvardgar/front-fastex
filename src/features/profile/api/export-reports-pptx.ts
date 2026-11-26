import { authenticatedClient } from "@/lib/axios/authenticated-client"

export async function exportReportsPptx(
  startDate: string,
  endDate: string,
) {
  const response = await authenticatedClient.post(
    "reports/export-pptx/",
    {
      start_date: startDate,
      end_date: endDate,
    },
    {
      responseType: "blob",
    },
  )

  const url = URL.createObjectURL(response.data)
  const link = document.createElement("a")

  link.href = url
  link.download = `reports-${startDate}-${endDate}.pptx`
  document.body.appendChild(link)
  link.click()
  link.remove()

  URL.revokeObjectURL(url)
}
