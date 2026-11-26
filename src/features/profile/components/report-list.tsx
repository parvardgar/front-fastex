import { useState } from "react"
import type { FormEvent } from "react"
import { jalaaliMonthLength, toJalaali } from "jalaali-js"
import { DatePicker } from "react-persian-range-picker"
import { FileDown, Loader2 } from "lucide-react"

import { exportReportsPptx } from "../api/export-reports-pptx"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const months = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
]

function formatJalaliDate(timestamp: number): string {
  const { jy, jm, jd } = toJalaali(new Date(timestamp))

  return [
    jy,
    String(jm).padStart(2, "0"),
    String(jd).padStart(2, "0"),
  ].join("-")
}

export function ReportList() {
  const [mode, setMode] = useState<"range" | "month">("month")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [year, setYear] = useState("1405")
  const [month, setMonth] = useState("1")
  const [isExporting, setIsExporting] = useState(false)
  const [error, setError] = useState("")

  async function handleExport(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")

    let start: string
    let end: string

    if (mode === "month") {
      const jalaliYear = Number(year)
      const jalaliMonth = Number(month)

      if (
        !Number.isInteger(jalaliYear) ||
        jalaliYear < 1 ||
        !Number.isInteger(jalaliMonth) ||
        jalaliMonth < 1 ||
        jalaliMonth > 12
      ) {
        setError("سال و ماه معتبر وارد کنید.")
        return
      }

      const lastDay = jalaaliMonthLength(jalaliYear, jalaliMonth)

      start = `${jalaliYear}-${String(jalaliMonth).padStart(2, "0")}-01`
      end = `${jalaliYear}-${String(jalaliMonth).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`
    } else {
      if (!startDate || !endDate) {
        setError("تاریخ شروع و پایان را انتخاب کنید.")
        return
      }

      start = startDate
      end = endDate

      if (start > end) {
        setError("تاریخ شروع باید قبل از تاریخ پایان باشد.")
        return
      }
    }

    try {
      setIsExporting(true)
      await exportReportsPptx(start, end)
    } catch {
      setError("ساخت فایل پاورپوینت با خطا مواجه شد.")
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <section dir="rtl" className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold">
          دریافت گزارش ماهانه
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          گزارش‌های ثبت‌شده را در قالب پاورپوینت دریافت کنید.
        </p>
      </div>

      <form
        onSubmit={handleExport}
        className="space-y-5 rounded-xl border bg-card p-5"
      >
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            className={"rounded-md"}
            variant={mode === "month" ? "default" : "outline"}
            onClick={() => {
              setMode("month")
              setError("")
            }}
          >
            انتخاب ماه
          </Button>

          <Button
            type="button"
            className={"rounded-md"}
            variant={mode === "range" ? "default" : "outline"}
            onClick={() => {
              setMode("range")
              setError("")
            }}
          >
            بازه دلخواه
          </Button>
        </div>

        {mode === "month" ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="report-year">سال شمسی</Label>
              <Input
                id="report-year"
                type="number"
                min={1}
                required
                value={year}
                onChange={(event) => setYear(event.target.value)}
                dir="ltr"
                placeholder="1405"
              />
            </div>

            <div className="space-y-2">
              <Label>ماه</Label>
              <Select
                value={month}
                onValueChange={(value) => {
                  if (value !== null) {
                    setMonth(value)
                  }
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="انتخاب ماه" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((name, index) => (
                    <SelectItem
                      key={name}
                      value={String(index + 1)}
                    >
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>از تاریخ</Label>
              <div className="min-w-0">
                <DatePicker
                  calendarType="jalali"
                  exportType="timeStamp"
                  showMask
                  allowClear
                  onChange={(value) => {
                    setStartDate(
                      typeof value === "number"
                        ? formatJalaliDate(value)
                        : "",
                    )
                    setError("")
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>تا تاریخ</Label>
              <div className="min-w-0">
                <DatePicker
                  calendarType="jalali"
                  exportType="timeStamp"
                  showMask
                  allowClear
                  onChange={(value) => {
                    setEndDate(
                      typeof value === "number"
                        ? formatJalaliDate(value)
                        : "",
                    )
                    setError("")
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}

        <Button
          type="submit"
          disabled={isExporting}
          className="w-full sm:w-auto rounded-md"
        >
          {isExporting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <FileDown className="size-4" />
          )}
          {isExporting
            ? "در حال ساخت پاورپوینت..."
            : "دریافت پاورپوینت"}
        </Button>
      </form>
    </section>
  )
}
