import { Toaster } from "sonner"

export function Notifacation() {
    return (
        <Toaster
            closeButton
            expand={false}
            position="bottom-right"
            richColors
            duration={1500}
            swipeDirections={["left", "bottom"]}
        />
    )
}