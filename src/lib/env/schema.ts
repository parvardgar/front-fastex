import { z } from "zod"

export const clientEnvSchema = z.object({
  VITE_API_URL: z.string().refine(
      (value) => {
        if (value.startsWith("/")) return true

        try {
          new URL(value)
          return true
        } catch {
          return false
        }
      },
      { message: "Invalid API URL" },
    ),

  VITE_APP_NAME: z.string(),

  VITE_DEFAULT_LOCALE: z.enum(["fa", "en"]),

  VITE_ENABLE_DEVTOOLS: z
    .string()
    .transform(value => value === "true"),
})

export type ClientEnv = z.infer<typeof clientEnvSchema>