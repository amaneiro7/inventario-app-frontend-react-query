import { Toaster } from 'sonner'

export function Notifacation() {
	return (
		<Toaster
			closeButton
			expand={false}
			position="bottom-right"
			richColors
			visibleToasts={3}
			duration={1500}
			swipeDirections={['left', 'bottom']}
		/>
	)
}
