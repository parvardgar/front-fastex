
import { publicClient } from "@/lib/axios/public-client"

interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
  errors: unknown
  error_code: string | null
}

export interface LoginInput {
  mobile: string
  password: string
}

export interface LoginResponse {
  access: string
  id: string
  mobile: string
}

export async function login(
  input: LoginInput,
): Promise<LoginResponse> {
  const response = await publicClient.post<
    ApiResponse<LoginResponse>
  >("/users/auth/login/", input)

  return response.data.data
}
