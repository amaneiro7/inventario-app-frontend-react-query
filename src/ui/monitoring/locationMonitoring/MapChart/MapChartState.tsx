import React from 'react'
import { Card } from '@/components/Card'

interface MapChartStatesProps {
	isLoading: boolean
	isError: boolean
	error: Error | null
	hasNoData: boolean
	children: React.ReactNode
}

// Assuming you have a LoadingSpinner component
import { LoadingSpinner } from '../LocationMonitoringChart'

export const MapChartStates = ({
	isLoading,
	isError,
	error,
	hasNoData,
	children
}: MapChartStatesProps) => {
	if (isLoading) {
		return <LoadingSpinner />
	}

	if (isError) {
		return (
			<Card className="flex h-full items-center justify-center md:min-h-[560px]">
				<div className="text-rojo-600 p-8 text-center" role="alert" aria-live="assertive">
					<p>¡Ups! Hubo un error al cargar la información del mapa.</p>
					<p>Detalles: {error?.message || 'Error desconocido'}</p>
					<p>Por favor, intenta de nuevo más tarde.</p>
				</div>
			</Card>
		)
	}

	if (hasNoData) {
		return (
			<Card className="flex h-full items-center justify-center md:min-h-[560px]">
				<div className="p-8 text-center text-gray-500">
					<p className="mb-2 text-lg font-semibold">
						No hay datos de monitoreo de ubicaciones disponibles.
					</p>
					<p>Verifica si hay equipos configurados para monitoreo.</p>
				</div>
			</Card>
		)
	}

	return <>{children}</>
}
