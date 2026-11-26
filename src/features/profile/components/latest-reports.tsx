// import { CalendarDays, FileText, Pencil } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
// } from "@/components/ui/card"
// import { Skeleton } from "@/components/ui/skeleton"

// import { useReports } from "../hooks/use-reports"
// import type { Report } from "../types/types"

// interface LatestReportsProps {
//   onEdit: (report: Report) => void
// }

// export function LatestReports({ onEdit }: LatestReportsProps) {
//   const {
//     data: reports = [],
//     isPending,
//     isError,
//   } = useReports()

//   // The API should return reports newest first.
//   const latestReports = reports.slice(0, 6)

//   return (
//     <section dir="rtl" className="space-y-5">
//       <div>
//         <h2 className="text-lg font-semibold">
//           آخرین گزارش‌های روزانه
//         </h2>

//         <p className="mt-1 text-sm text-muted-foreground">
//           فقط شش گزارش اخیر شما قابل ویرایش هستند.
//         </p>
//       </div>

//       {/* Loading state */}
//       {isPending && (
//         <div className="space-y-3">
//           {Array.from({ length: 3 }).map((_, index) => (
//             <Card className="rounded-md" key={index}>
//               <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
//                 <div className="w-full space-y-3">
//                   <Skeleton className="h-5 w-1/2" />
//                   <Skeleton className="h-4 w-3/4" />
//                 </div>

//                 <Skeleton className="h-9 w-24 shrink-0" />
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}

//       {/* Error state */}
//       {isError && (
//         <Card>
//           <CardContent className="p-6 text-center">
//             <p className="text-sm text-destructive">
//               دریافت گزارش‌ها با خطا مواجه شد.
//             </p>
//           </CardContent>
//         </Card>
//       )}

//       {/* Empty state */}
//       {!isPending && !isError && latestReports.length === 0 && (
//         <Card className="border-dashed">
//           <CardContent className="flex flex-col items-center p-8 text-center">
//             <FileText className="size-8 text-muted-foreground" />

//             <p className="mt-3 text-sm text-muted-foreground">
//               هنوز گزارشی ثبت نکرده‌اید.
//             </p>
//           </CardContent>
//         </Card>
//       )}

//       {/* Reports list */}
//       {!isPending && !isError && latestReports.length > 0 && (
//         <div className="space-y-3">
//           {latestReports.map((report) => (
//             <Card className="rounded-xl size-auto" key={report.id}>
//               <CardContent className="flex flex-col gap-x-4 gap-y-2 p-4 sm:flex-row sm:items-center sm:justify-between">
//                 <div className="min-w-0 space-y-2">
//                   <h3 className="font-bold">
//                     {report.activity_name}
//                   </h3>

//                   <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
//                     <span>
//                       شناسه تجهیز: {report.equipment}
//                     </span>

//                     <span className="inline-flex items-center gap-1">
//                       <CalendarDays className="size-4 shrink-0" />
//                       {report.report_date.replaceAll("-", "/")}
//                     </span>
//                   </div>
//                 </div>

//                 <Button
//                   type="button"
//                   variant="outline"
//                   className="shrink-0 rounded-md"
//                   onClick={() => onEdit(report)}
//                 >
//                   <Pencil className="size-4" />
//                   ویرایش
//                 </Button>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}
//     </section>
//   )
// }
import { CalendarDays, Pencil, FileText } from "lucide-react"
import { useReports } from "../hooks/use-reports"
import type { Report } from "../types/types"

interface LatestReportsProps {
  onEdit: (report: Report) => void
}

export function LatestReports({ onEdit }: LatestReportsProps) {
  const {
    data: reports = [],
    isPending,
    isError,
  } = useReports()

  // The API should return reports newest first.
  const latestReports = reports.slice(0, 6)

  return (
    <section dir="rtl" className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold">
          آخرین گزارش‌های روزانه
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          فقط شش گزارش اخیر شما قابل ویرایش هستند.
        </p>
      </div>

      {isPending && (
        <p className="text-sm text-muted-foreground">
          در حال دریافت گزارش‌ها...
        </p>
      )}

      {isError && (
        <p className="text-sm text-destructive">
          دریافت گزارش‌ها با خطا مواجه شد.
        </p>
      )}

      {!isPending && !isError && latestReports.length === 0 && (
        <div className="rounded-xl border border-dashed p-8 text-center">
          <FileText className="mx-auto size-8 text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">
            هنوز گزارشی ثبت نکرده‌اید.
          </p>
        </div>
      )}

      {!isPending && !isError && latestReports.length > 0 && (
        <div className="space-y-3">
          {latestReports.map((report) => (
            <article
              key={report.id}
              className="flex flex-col gap-4 rounded-xl border bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0 space-y-2">
                <h3 className="font-medium">
                  {report.activity_name}
                </h3>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                  <span>
                    شناسه تجهیز: {report.equipment}
                  </span>

                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="size-4" />
                    {report.report_date.replaceAll("-", "/")}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onEdit(report)}
                className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-md border px-3 text-sm font-medium hover:bg-muted"
              >
                <Pencil className="size-4" />
                ویرایش
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
