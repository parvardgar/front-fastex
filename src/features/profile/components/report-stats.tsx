import { useReports } from "../hooks/use-reports"

export function ReportStats() {
    const { data: reports = [] } = useReports()

    const total = reports.length

    const completed = reports.filter(
        (report) => report.status === "completed",
    ).length

    return (
        <div className="grid gap-4 sm:grid-cols-3">
            <StatCard
                label="گزارش های این ماه"
                value={total}
            />

            <StatCard
                label= "کل گزارش های ثبت شده"
                value={completed}
            />
        </div>
    )
}

interface StatCardProps {
    label: string
    value: number
}

function StatCard({
    label,
    value,
}: StatCardProps) {
    return (
        <div className="rounded-xl border bg-card p-5">
            <p className="text-sm text-muted-foreground">
                {label}
            </p>

            <p className="mt-2 text-3xl font-bold">
                {value}
            </p>
        </div>
    )
}