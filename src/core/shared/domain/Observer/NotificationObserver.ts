import { Listeners } from './Listeners.ts'
import { type Props } from './ListenersProps.ts'

export class NotificationListeners implements Listeners {
	update({ message, type }: Props) {
		if (type === 'success') {
			import('sonner').then(m => m.toast.success(message))
		}
		if (type === 'error') {
			import('sonner').then(m => m.toast.error(message))
		}
		if (type === 'loading') {
			import('sonner').then(m => m.toast.info(message ?? 'Procesando...'))
		}
	}
}
