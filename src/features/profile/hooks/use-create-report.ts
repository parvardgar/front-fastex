import { useMutation, useQueryClient } from "@tanstack/react-query"

import {
    createReport,
    type CreateReportInput,
} from "../api/create-report"

export function useCreateReportMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (input: CreateReportInput) =>
            createReport(input),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["reports"],
            })
        },
    })
}