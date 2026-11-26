import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Upload } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { DatePicker } from "react-persian-range-picker"
import { toJalaali } from "jalaali-js"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import { useCreateReportMutation } from "../hooks/use-create-report"
import { useUpdateReportMutation } from "../hooks/use-update-report"
import type { Report } from "../types/types"

interface CreateReportDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    report?: Report | null
}

const createReportSchema = z.object({
    report_date: z.string().min(1, "تاریخ گزارش الزامی است."),

    equipment: z.string().min(1, "شناسه تجهیز الزامی است."),

    activity_name: z.string().min(1, "نام فعالیت الزامی است."),

    consumed_parts: z.string(),

    tools_used: z.string(),

    duration: z
        .string()
        .regex(
            /^$|^([01]\d|2[0-3]):[0-5]\d$/,
            "زمان باید به صورت HH:mm باشد.",
        ),

    performed_by: z.string().min(1, "نام پرسنل الزامی است."),

    image: z.instanceof(File).optional(),
})

type CreateReportFormValues = z.infer<typeof createReportSchema>

function durationToApi(value: string) {
    return value ? `${value}:00` : ""
}

export function CreateReportDialog({
    open,
    onOpenChange,
    report = null,
}: CreateReportDialogProps) {
    const createReportMutation = useCreateReportMutation()
    const updateReportMutation = useUpdateReportMutation()

    const isEditing = Boolean(report)
    const isPending =
        createReportMutation.isPending ||
        updateReportMutation.isPending

    const form = useForm<CreateReportFormValues>({
        resolver: zodResolver(createReportSchema),
        defaultValues: {
            report_date: "",
            equipment: "",
            activity_name: "",
            consumed_parts: "",
            tools_used: "",
            duration: "",
            performed_by: "",
            image: undefined,
        },
    })

    // Populate the form whenever a report is selected for editing.
    useEffect(() => {
        if (!open) return

        form.reset({
            report_date: report?.report_date ?? "",
            equipment: report?.equipment ?? "",
            activity_name: report?.activity_name ?? "",
            consumed_parts: report?.consumed_parts ?? "",
            tools_used: report?.tools_used ?? "",
            duration: report?.duration?.slice(0, 5) ?? "",
            performed_by: report?.performed_by ?? "",
            image: undefined,
        })
    }, [open, report, form])

    const onSubmit = (values: CreateReportFormValues) => {
        const payload = {
            report_date: values.report_date,
            equipment: values.equipment,
            activity_name: values.activity_name,
            consumed_parts: values.consumed_parts,
            tools_used: values.tools_used,
            duration: durationToApi(values.duration),
            performed_by: values.performed_by,
            image: values.image,
        }

        if (report) {
            updateReportMutation.mutate(
                {
                    id: report.id,
                    data: payload,
                },
                {
                    onSuccess: () => {
                        form.reset()
                        onOpenChange(false)
                    },
                },
            )
        } else {
            createReportMutation.mutate(payload, {
                onSuccess: () => {
                    form.reset()
                    onOpenChange(false)
                },
            })
        }
    }

    const handleOpenChange = (value: boolean) => {
        if (isPending) return

        if (!value) {
            form.reset()
        }

        onOpenChange(value)
    }

    return (
        <Dialog
            open={open}
            onOpenChange={handleOpenChange}
        >
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? "ویرایش گزارش روزانه" : "ایجاد گزارش جدید"}
                    </DialogTitle>

                    <DialogDescription>
                        {isEditing
                            ? "اطلاعات گزارش را ویرایش کنید."
                            : "اطلاعات فعالیت انجام‌شده را وارد کنید."}
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5"
                >
                    {/* Report date */}
                    <div className="space-y-2">
                        <Label htmlFor="report_date">
                            تاریخ گزارش
                        </Label>

                        <DatePicker
                            key={report?.id ?? "new-report"}
                            calendarType="jalali"
                            exportType="timeStamp"
                            showMask
                            allowClear
                            onChange={(value) => {
                                if (!value) {
                                    form.setValue("report_date", "", {
                                        shouldValidate: true,
                                    })
                                    return
                                }

                                const date = new Date(value)

                                const { jy, jm, jd } = toJalaali(
                                    date.getFullYear(),
                                    date.getMonth() + 1,
                                    date.getDate(),
                                )

                                const jalaliDate = [
                                    jy,
                                    String(jm).padStart(2, "0"),
                                    String(jd).padStart(2, "0"),
                                ].join("-")

                                form.setValue("report_date", jalaliDate, {
                                    shouldValidate: true,
                                })
                            }}
                        />

                        {form.getValues("report_date") && (
                            <p className="text-xs text-muted-foreground">
                                تاریخ ثبت‌شده:{" "}
                                {form.getValues("report_date").replaceAll("-", "/")}
                            </p>
                        )}

                        {form.formState.errors.report_date && (
                            <p className="text-sm text-destructive">
                                {form.formState.errors.report_date.message}
                            </p>
                        )}
                    </div>

                    {/* Equipment */}
                    <div className="space-y-2">
                        <Label htmlFor="equipment">
                            شناسه تجهیز
                        </Label>
                        <Input
                            id="equipment"
                            placeholder="شناسه تجهیز را وارد کنید"
                            {...form.register("equipment")}
                        />
                        {form.formState.errors.equipment && (
                            <p className="text-sm text-destructive">
                                {form.formState.errors.equipment.message}
                            </p>
                        )}
                    </div>

                    {/* Activity */}
                    <div className="space-y-2">
                        <Label htmlFor="activity_name">
                            نام فعالیت
                        </Label>
                        <Input
                            id="activity_name"
                            placeholder="نام فعالیت را وارد کنید"
                            {...form.register("activity_name")}
                        />
                        {form.formState.errors.activity_name && (
                            <p className="text-sm text-destructive">
                                {form.formState.errors.activity_name.message}
                            </p>
                        )}
                    </div>

                    {/* Image */}
                    <div className="space-y-2">
                        <Label htmlFor="image">
                            عکس مربوطه
                        </Label>

                        {report?.image && (
                            <div className="space-y-2">
                                <p className="text-xs text-muted-foreground">
                                    عکس فعلی گزارش:
                                </p>
                                <img
                                    src={report.image}
                                    alt={report.activity_name}
                                    className="h-32 w-auto rounded-md border object-cover"
                                />
                                <p className="text-xs text-muted-foreground">
                                    برای حفظ عکس فعلی، فایل جدید انتخاب نکنید.
                                </p>
                            </div>
                        )}

                        <div className="flex items-center gap-3">
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                className="cursor-pointer"
                                onChange={(event) => {
                                    const file = event.target.files?.[0]

                                    form.setValue("image", file, {
                                        shouldValidate: true,
                                    })
                                }}
                            />
                            <Upload className="size-5 shrink-0 text-muted-foreground" />
                        </div>

                        {form.watch("image") && (
                            <p className="text-xs text-muted-foreground">
                                فایل جدید: {form.watch("image")?.name}
                            </p>
                        )}
                    </div>

                    {/* Consumed parts */}
                    <div className="space-y-2">
                        <Label htmlFor="consumed_parts">
                            قطعات مصرفی
                        </Label>
                        <Textarea
                            id="consumed_parts"
                            placeholder="قطعات مصرف‌شده را وارد کنید"
                            rows={3}
                            {...form.register("consumed_parts")}
                        />
                    </div>

                    {/* Tools */}
                    <div className="space-y-2">
                        <Label htmlFor="tools_used">
                            ابزارآلات مورد استفاده
                        </Label>
                        <Textarea
                            id="tools_used"
                            placeholder="ابزارآلات مورد استفاده را وارد کنید"
                            rows={3}
                            {...form.register("tools_used")}
                        />
                    </div>

                    {/* Duration */}
                    <div className="space-y-2">
                        <Label htmlFor="duration">
                            زمان صرف‌شده
                        </Label>
                        <Input
                            id="duration"
                            type="text"
                            inputMode="numeric"
                            placeholder="02:30"
                            maxLength={5}
                            {...form.register("duration")}
                        />
                        <p className="text-xs text-muted-foreground">
                            زمان را به صورت ساعت و دقیقه وارد کنید. مثال: 02:30
                        </p>
                        {form.formState.errors.duration && (
                            <p className="text-sm text-destructive">
                                {form.formState.errors.duration.message}
                            </p>
                        )}
                    </div>

                    {/* Performed by */}
                    <div className="space-y-2">
                        <Label htmlFor="performed_by">
                            نام پرسنل انجام‌دهنده
                        </Label>
                        <Input
                            id="performed_by"
                            placeholder="نام پرسنل را وارد کنید"
                            {...form.register("performed_by")}
                        />
                        {form.formState.errors.performed_by && (
                            <p className="text-sm text-destructive">
                                {form.formState.errors.performed_by.message}
                            </p>
                        )}
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            disabled={isPending}
                            onClick={() => handleOpenChange(false)}
                        >
                            انصراف
                        </Button>

                        <Button
                            type="submit"
                            disabled={isPending}
                        >
                            {isPending && (
                                <Loader2 className="size-4 animate-spin" />
                            )}
                            {isEditing ? "ذخیره تغییرات" : "ایجاد گزارش"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}