import { useContext } from "react"
import { EventContext } from "./EventContext"

export const useEventContext = () => {
    const context = useContext(EventContext)
    if (!context) {
        throw new Error("useEventConext must be used within a EventContextProvider")
    }

    return context
}