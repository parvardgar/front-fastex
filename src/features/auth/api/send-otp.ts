import { publicClient } from "@/lib/axios/public-client"

interface SendOtpResponse {
    message: string
}

interface ApiResponse<T> {
    success: boolean
    message: string
    data: T
    errors: unknown
    error_code: string | null
}

export interface SendOtpInput {
    mobile: string
}

export async function sendOtp(
    input: SendOtpInput,
): Promise<SendOtpResponse> {
    const response = await publicClient.post<ApiResponse<SendOtpResponse>>(
        "users/auth/send-otp/",
        input,
    )

    return response.data.data
}
