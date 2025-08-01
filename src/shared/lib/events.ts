import { EventManager } from '@/entities/shared/domain/Observer/EventManager'
import { NotificationListeners } from '@/entities/shared/domain/Observer/NotificationObserver'

const eventManager = new EventManager()
const notification = new NotificationListeners()

eventManager.subscribe(notification)

export const events = eventManager
