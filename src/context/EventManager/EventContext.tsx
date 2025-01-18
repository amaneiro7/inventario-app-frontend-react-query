import { createContext } from "react"
import { type EventManager } from "@/core/shared/domain/Observer/EventManager"

export interface EventContextType {
    events: EventManager
}

export const EventContext = createContext({} as EventContextType)