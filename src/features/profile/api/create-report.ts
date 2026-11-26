import { authenticatedClient } from "@/lib/axios/authenticated-client"

import type { Report } from "../types/types"

interface CreateReportResponse {
    success: boolean
    message: string
    data: Report
    errors: unknown
    error_code: string | null
}

export interface CreateReportInput {
    report_date: string
    equipment: string
    activity_name: string
    image?: File
    consumed_parts?: string
    tools_used?: string
    duration?: string
    performed_by: string
}

export async function createReport(
    input: CreateReportInput,
): Promise<Report> {
    const formData = new FormData()

    formData.append(
        "report_date",
        input.report_date,
    )

    formData.append(
        "equipment",
        input.equipment,
    )

    formData.append(
        "activity_name",
        input.activity_name,
    )

    if (input.image) {
        formData.append(
            "image",
            input.image,
        )
    }

    formData.append(
        "consumed_parts",
        input.consumed_parts ?? "",
    )

    formData.append(
        "tools_used",
        input.tools_used ?? "",
    )

    if (input.duration) {
        formData.append(
            "duration",
            input.duration,
        )
    }

    formData.append(
        "performed_by",
        input.performed_by,
    )

    const response =
        await authenticatedClient.post<CreateReportResponse>(
            "reports/",
            formData,
        )

    return response.data.data
}