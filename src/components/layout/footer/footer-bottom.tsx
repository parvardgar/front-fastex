import { Container } from "@/components/common/container"

export function FooterBottom() {
    return (
        <div className="border-t">
            <Container>
                <div className="flex h-14 flex-col items-center justify-between gap-2 text-sm text-muted-foreground md:flex-row">
                    <span>
                        © {new Date().getFullYear()}  تمامی حقوق محفوظ است.
                        وب گستر.
                    </span>

                    {/* <span>
                        سامان • زرین پال • سداد
                    </span> */}
                </div>
            </Container>
        </div>
    )
}