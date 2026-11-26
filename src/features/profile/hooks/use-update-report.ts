import { useMutation, useQueryClient } from "@tanstack/react-query"

import { updateReport } from "../api/update-report"

export function useUpdateReportMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string
      data: {
        report_date: string
        equipment: string
        activity_name: string
        consumed_parts: string
        tools_used: string
        duration: string
        performed_by: string
        image?: File
      }
    }) => updateReport(id, data),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["reports"],
      })

      await queryClient.invalidateQueries({
        queryKey: ["report-stats"],
      })
    },
  })
}
