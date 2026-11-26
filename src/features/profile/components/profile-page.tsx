// import { useState } from "react"

// import { ProfileHeader } from "./profile-header"
// import { ReportStats } from "./report-stats"
// import { ReportList } from "./report-list"
// import { CreateReportDialog } from "./create-report-dialog"

// export function ProfilePage() {
//     const [createReportOpen, setCreateReportOpen] =
//         useState(false)

//     return (
//         <>
//             <div className="py-8">
//                 <div className="mx-auto max-w-7xl space-y-12 px-4">
//                     <ProfileHeader
//                         onCreateReport={() =>
//                             setCreateReportOpen(true)
//                         }
//                     />

//                     <ReportStats />

//                     <ReportList />
//                 </div>
//             </div>

//             <CreateReportDialog
//                 open={createReportOpen}
//                 onOpenChange={setCreateReportOpen}
//             />
//         </>
//     )
// }


import { useState } from "react"

import { ProfileHeader } from "./profile-header"
import { ReportStats } from "./report-stats"
import { ReportList } from "./report-list"
import { LatestReports } from "./latest-reports"
import { CreateReportDialog } from "./create-report-dialog"
import type { Report } from "../types/types"

export function ProfilePage() {
  const [createReportOpen, setCreateReportOpen] = useState(false)
  const [selectedReport, setSelectedReport] =
    useState<Report | null>(null)

  function openCreateDialog() {
    setSelectedReport(null)
    setCreateReportOpen(true)
  }

  function openEditDialog(report: Report) {
    setSelectedReport(report)
    setCreateReportOpen(true)
  }

  function handleDialogOpenChange(open: boolean) {
    setCreateReportOpen(open)

    if (!open) {
      setSelectedReport(null)
    }
  }

  return (
    <>
      <div className="py-8">
        <div className="mx-auto max-w-7xl space-y-12 px-4">
          <ProfileHeader onCreateReport={openCreateDialog} />

          <ReportStats />

          <ReportList />

          <LatestReports onEdit={openEditDialog} />
        </div>
      </div>

      <CreateReportDialog
        open={createReportOpen}
        onOpenChange={handleDialogOpenChange}
        report={selectedReport}
      />
    </>
  )
}
