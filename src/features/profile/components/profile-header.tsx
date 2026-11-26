import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

interface ProfileHeaderProps {
    onCreateReport: () => void
}
 
export function ProfileHeader({
    onCreateReport,
}: ProfileHeaderProps) {
    return (
        <div className="flex items-center justify-between gap-4">
            <div>
                <h1 className="text-1xl font-bold">
                    گزارش روزانه خود را ایجاد کنید
                </h1>

                {/* <p className="mt-1 text-sm text-muted-foreground">
                    گزارش‌های فعالیت ماهانه خود را مدیریت کنید.
                </p> */}
            </div>

            <Button className="text-1xl rounded-md" onClick={onCreateReport}>
                <Plus className="size-6" />
                ایجاد گزارش روزانه
            </Button>
        </div>
    )
}