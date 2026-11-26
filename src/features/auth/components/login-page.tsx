import { Card, CardContent, CardHeader } from "@/components/ui/card"

import { LoginForm } from "./login-form"

export function LoginPage() {
    return (
        <div className="flex min-h-svh items-center justify-center px-4 py-12">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-2 text-center">
                    <h1 className="text-2xl font-semibold">
                        خوش آمدید
                    </h1>

                    <p className="text-sm text-muted-foreground">
                    ورود به سامانه با شماره موبایل و رمز عبور
                    </p>
                </CardHeader>

                <CardContent>
                    <LoginForm />
                </CardContent>
            </Card>
        </div>
    )
}