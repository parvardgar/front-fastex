import { CalendarDays, Clock, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"

import type { Report } from "../types/types"

interface ReportCardProps {
    report: Report
}

export function ReportCard({
    report,
}: ReportCardProps) {
    const formattedDate = new Intl.DateTimeFormat(
        "fa-IR",
        {
            year: "numeric",
            month: "long",
            day: "numeric",
        },
    ).format(new Date(report.report_date))

    return (
        <div className="rounded-xl border bg-card p-5">
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <div className="flex items-center gap-2">
                        <h3 className="font-semibold">
                            {report.activity_name}
                        </h3>

                        <StatusBadge
                            status={report.status}
                        />
                    </div>

                    <p className="mt-1 text-sm text-muted-foreground">
                        {report.equipment}
                    </p>
                </div>

                <Button
                    variant="ghost"
                    size="icon"
                >
                    <MoreHorizontal className="size-4" />
                </Button>
            </div>

            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <CalendarDays className="size-4" />
                    {formattedDate}
                </div>

                {report.duration && (
                    <div className="flex items-center gap-2">
                        <Clock className="size-4" />
                        {report.duration}
                    </div>
                )}
            </div>
        </div>
    )
}

function StatusBadge({
    status,
}: {
    status: Report["status"]
}) {
    if (status === "completed") {
        return (
            <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs text-green-700">
                تکمیل شده
            </span>
        )
    }

    return (
        <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
            پیش‌نویس
        </span>
    )
}