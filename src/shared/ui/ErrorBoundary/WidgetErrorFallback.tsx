import { memo } from 'react'
import { AlertTriangle } from 'lucide-react'

import Typography from '@/shared/ui/Typography'
import Button from '../Button'

interface WidgetErrorFallbackProps {
	message?: string
	onReset: () => void
}

export const WidgetErrorFallback = memo(
	({
		message = 'Ocurrió un error al cargar este módulo.',
		onReset
	}: WidgetErrorFallbackProps) => {
		return (
			<div
				className="border-rojo-300 bg-rojo-50 flex w-full flex-col items-center justify-center space-y-4 rounded-lg border border-dashed p-8 text-center"
				role="alert"
			>
				<AlertTriangle className="text-rojo-500 h-10 w-10" aria-hidden="true" />
				<Typography variant="h5" color="rojo">
					Algo salió mal
				</Typography>
				<Typography color="rojo">{message}</Typography>
				<Button
					onClick={onReset}
					buttonSize="large"
					size="content"
					color="red"
					text="Reintentar"
				/>
			</div>
		)
	}
)

WidgetErrorFallback.displayName = 'WidgetErrorFallback'
