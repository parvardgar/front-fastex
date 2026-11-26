import { FilePlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export function TodayReportCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>گزارش روز</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="font-medium">
                        You haven't created today's report yet.
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Request a report form to start completing
                        today's report.
                    </p>
                </div>

                <Button>
                    <FilePlus />
                    Request Report Form
                </Button>
            </CardContent>
        </Card>
    )
}