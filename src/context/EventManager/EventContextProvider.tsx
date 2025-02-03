import { useEventManager } from '@/hooks/utils/useEventManager'
import { EventContext } from './EventContext'

export const EventContextProvider = ({ children }: React.PropsWithChildren) => {
	const { events } = useEventManager()

	return <EventContext.Provider value={{ events }}>{children}</EventContext.Provider>
}
