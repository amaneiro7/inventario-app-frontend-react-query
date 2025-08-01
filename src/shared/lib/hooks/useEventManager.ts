import { EventManager } from '@/entities/shared/domain/Observer/EventManager'
import { NotificationListeners } from '@/entities/shared/domain/Observer/NotificationObserver'

export function useEventManager() {
	const eventManager = new EventManager()
	const notification = new NotificationListeners()

	eventManager.subscribe(notification)

	return {
		events: eventManager
	}
}
