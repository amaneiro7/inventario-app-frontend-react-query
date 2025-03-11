import { toast } from 'sonner'
import { Listeners } from './Listeners.ts'
import { type Props } from './ListenersProps.ts'

export class NotificationListeners implements Listeners {
	update({ message, type }: Props) {
		if (type === 'success') {
			toast.success(message)
		}
		if (type === 'error') {
			toast.error(message)
		}
		if (type === 'loading') {
			toast.info(message ?? 'Procesando...')
		}
	}
}
