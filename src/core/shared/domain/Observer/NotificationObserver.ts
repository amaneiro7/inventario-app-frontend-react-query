import { toast } from "sonner"
import { Listeners } from "./Listeners.ts"
import { Props } from "./ListenersProps.ts"

export class NotificationListeners implements Listeners {
    update({ message, type }: Props) {
        console.log("NotificationListensers", message, type)
        if (type === 'success') {
            toast.success(message)
        }
        if (type === "error") {
            toast.error(message)
        }
    }
}