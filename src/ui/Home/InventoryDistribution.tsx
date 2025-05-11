import { memo } from 'react'
import { useGetGeneralDashboard } from '@/core/devices/dashboard/infra/hooks/useGetGeneralDashboard'
import { PieCard } from '../dashboard/PieCard'

export const InventoryDistribution = memo(() => {
	const { generalDashboard, isLoading } = useGetGeneralDashboard()

	if (!generalDashboard || isLoading) {
		return <div className="animate-pulse-medium min-h-[560px] w-full bg-gray-200" />
	}

	return (
		<PieCard
			data={generalDashboard.totalByCategory}
			desc="Clasificación por tipo de equipo"
			title="Distribución de Inventario"
			dataKey="count"
			total={generalDashboard.totalByCategory.reduce((sum, item) => sum + item.count, 0)}
		/>
	)
})

InventoryDistribution.displayName = 'InventoryDistribution'
