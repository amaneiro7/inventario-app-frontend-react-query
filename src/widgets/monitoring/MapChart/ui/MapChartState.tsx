import React, { memo } from 'react'
import Typography from '@/shared/ui/Typography'
import { MapChartSkeleton } from './MapChartSkeleton'

interface MapChartStatesProps {
	isLoading: boolean
	isError: boolean
	error: Error | null
	hasNoData: boolean
	children: React.ReactNode
}

/**
 * Skeleton component for the map chart loading state.
 * It's recommended to move this to its own file, for example: `src/shared/ui/skeletons/MapSkeleton.tsx`.
 */

export const MapChartStates = memo(
	({ isLoading, isError, error, hasNoData, children }: MapChartStatesProps) => {
		if (isLoading) {
			return (
				<MapChartStatesCard>
					<div className="h-full w-full p-4">
						<MapChartSkeleton />
					</div>
					<Typography variant="p" className="mt-4 text-slate-500">
						Cargando mapa...
					</Typography>
				</MapChartStatesCard>
			)
		}

		if (isError) {
			return (
				<MapChartStatesCard role="alert" aria-live="assertive">
					<Typography variant="p" color="rojo">
						¡Ups! Hubo un error al cargar la información del mapa.
					</Typography>
					<Typography variant="p" color="rojo">
						Detalles: {error?.message || 'Error desconocido'}
					</Typography>
					<Typography variant="p" color="rojo">
						Por favor, intenta de nuevo más tarde.
					</Typography>
				</MapChartStatesCard>
			)
		}

		if (hasNoData) {
			return (
				<MapChartStatesCard>
					<Typography variant="p" weight="semibold" className="mb-2" color="black">
						No hay datos de monitoreo de ubicaciones disponibles.
					</Typography>
					<Typography variant="p" color="gris">
						Verifica si hay equipos configurados para monitoreo.
					</Typography>
				</MapChartStatesCard>
			)
		}

		return <>{children}</>
	}
)

MapChartStates.displayName = 'MapChartStates'

const MapChartStatesCard = memo((props: React.ComponentProps<'div'>) => {
	const { className, children, ...rest } = props
	return (
		<div
			className={`min-h-withoutHeader flex h-full flex-col items-center justify-center rounded-lg border bg-slate-50 p-8 text-center shadow-2xs ${
				className ?? ''
			}`}
			{...rest}
		>
			{children}
		</div>
	)
})
MapChartStatesCard.displayName = 'MapChartStatesCard'
