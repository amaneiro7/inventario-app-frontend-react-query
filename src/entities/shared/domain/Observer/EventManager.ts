import { Listeners } from './Listeners.ts'
import { type Props } from './ListenersProps.ts'

export class EventManager {
	private listeners: Listeners[] = []

	subscribe(listener: Listeners): void {
		if (!this.listeners.some(x => x === listener)) {
			this.listeners.push(listener)
		} else {
			throw new Error('Listener has already been registered')
		}
	}

	detach(listener: Listeners): void {
		this.listeners = this.listeners.filter(x => x !== listener)
	}

	notify({ message, type }: Props): void {
		this.listeners.forEach(x => x.update({ type, message } as Props))
	}
}
