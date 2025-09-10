import { useMemo } from 'react'

export const useInfoMonitoringChart = ({ chartType }: { chartType: 'devices' | 'locations' }) => {
	const cardTitleId = 'network-status-chart-title'
	const cardDescriptionId = 'network-status-chart-description'

	const { title, description } = useMemo(() => {
		if (chartType === 'devices') {
			return {
				title: 'Estado de Conectividad de Equipos de Red',
				description:
					'Visión general del estado (activos/inactivos) de los equipos de red en toda la infraestructura, categorizados por estado geográfico.'
			}
		} else {
			// chartType === 'locations'
			return {
				title: 'Estado de Conectividad de Enlaces y Agencias',
				description:
					'Visión general del estado (operativos/inoperativos) de los enlaces de red y la conectividad de las agencias, detallado por estado geográfico.'
			}
		}
	}, [chartType])

	return { cardTitleId, cardDescriptionId, title, description }
}
