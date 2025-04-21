import { lazy, memo, Suspense } from 'react'
import { useGetGeneralDashboard } from '@/core/devices/dashboard/infra/hooks/useGetGeneralDashboard'

const PieCard = lazy(() => import('../dashboard/PieCard').then(m => ({ default: m.PieCard })))

const COLORS = [
	'#3B82F6', // Blue 500
	'#10B981', // Green 500
	'#F59E0B', // Yellow 500
	'#EC4899', // Pink 500
	'#6366F1', // Indigo 500
	'#8B5CF6', // Purple 500
	'#22C55E', // Lime 500
	'#EAB308', // Amber 500
	'#F472B6', // Rose 500
	'#4F46E5', // Violet 500
	'#06B6D4', // Cyan 500
	'#84CC16', // Emerald 500
	'#D97706', // Orange 500
	'#BE123C', // Red 500
	'#14B8A6', // Teal 500
	'#A855F7', // Fuchsia 500
	'#0EA5E9', // Sky 500
	'#6EE7B7', // Green 300
	'#FBBF24', // Yellow 300
	'#F08CAA', // Pink 300
	'#818CF8', // Indigo 300
	'#A78BFA', // Purple 300
	'#65A30D', // Lime 600 (moved slightly darker)
	'#CA8A04', // Amber 600 (moved slightly darker)
	'#E11D48' // Rose 600 (moved slightly darker)
]

export const InventoryDistribution = memo(() => {
	const { generalDashboard } = useGetGeneralDashboard()

	if (!generalDashboard) {
		return <p>...Cargando</p>
	}

	return (
		<Suspense fallback={<div className="animate-pulse-medium min-h-[710px] w-full" />}>
			<PieCard
				data={generalDashboard.totalByCategory}
				colors={COLORS}
				desc="Clasificación por tipo de equipo"
				title="Distribución de Inventario"
				dataKey="count"
				total={generalDashboard.totalByCategory.reduce((sum, item) => sum + item.count, 0)}
			/>
		</Suspense>
	)
})

InventoryDistribution.displayName = 'InventoryDistribution'
