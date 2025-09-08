import { memo } from 'react'
import { AlertTriangle } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import Typography from '@/shared/ui/Typography'
import Button from '../Button'

// 1. Se definen las variantes que el componente aceptará
type FallbackVariant = 'default' | 'compact'

interface WidgetErrorFallbackProps {
	message?: string
	onReset: () => void
	variant?: FallbackVariant // 2. Se añade la nueva prop 'variant'
}

export const WidgetErrorFallback = memo(
	({
		message = 'Ocurrió un error al cargar este módulo.',
		onReset,
		variant = 'default' // 3. Se establece 'default' como la variante por defecto
	}: WidgetErrorFallbackProps) => {
		const isCompact = variant === 'compact'

		// 4. Se definen clases condicionales basadas en la variante
		const containerClasses = cn(
			'flex w-full flex-col items-center justify-center space-y-2 rounded-lg border border-dashed p-4 text-center',
			{
				'border-rojo-300 bg-rojo-50 p-8 space-y-4': !isCompact, // Estilos para la variante 'default'
				'border-red-500/30 bg-red-500/10 text-red-700': isCompact // Estilos para la variante 'compact'
			}
		)

		const iconSize = isCompact ? 'h-8 w-8' : 'h-10 w-10'
		const titleVariant = isCompact ? 'p' : 'h5'
		const buttonSize = isCompact ? 'small' : 'large'

		return (
			<div className={containerClasses} role="alert">
				<AlertTriangle className={cn('text-rojo-500', iconSize)} aria-hidden="true" />
				<Typography variant={titleVariant} weight="semibold" color="rojo">
					Algo salió mal
				</Typography>
				<Typography color="rojo" option={isCompact ? 'tiny' : 'small'}>
					{message}
				</Typography>
				<Button
					onClick={onReset}
					buttonSize={buttonSize}
					size="content"
					color="red"
					text="Reintentar"
				/>
			</div>
		)
	}
)

WidgetErrorFallback.displayName = 'WidgetErrorFallback'
