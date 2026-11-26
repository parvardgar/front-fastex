import { publicClient } from "@/lib/axios/public-client"

interface ApiResponse<T> {
    success: boolean
    message: string
    data: T
    errors: unknown
    error_code: string | null
}

export interface VerifyOtpInput {
    mobile: string
    otp: string
}

export interface VerifyOtpResponse {
    access: string
}

export async function verifyOtp(
    input: VerifyOtpInput,
): Promise<VerifyOtpResponse> {
    const response = await publicClient.post<
        ApiResponse<VerifyOtpResponse>
    >("/users/auth/verify-otp/", input)

    return response.data.data
}
