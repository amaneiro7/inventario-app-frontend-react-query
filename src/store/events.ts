import { EventManager } from '@/core/shared/domain/Observer/EventManager'
import { NotificationListeners } from '@/core/shared/domain/Observer/NotificationObserver'

const eventManager = new EventManager()
const notification = new NotificationListeners()

eventManager.subscribe(notification)

export const events = eventManager
