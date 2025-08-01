import { memo } from 'react'
import { Monitor, Laptop, User, Building, HomeIcon } from 'lucide-react'
import { StatCard } from './StatCard'
import { useGetGeneralDashboard } from '@/entities/devices/dashboard/infra/hooks/useGetGeneralDashboard'

export const InventorySummary = memo(() => {
	const { generalDashboard } = useGetGeneralDashboard()
	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
			<StatCard
				title="Computadoras"
				value={generalDashboard?.totalComputer ?? 0}
				icon={Laptop}
				color="orange"
				description="Total de computadoras en inventario"
			/>
			<StatCard
				title="Monitores"
				value={generalDashboard?.totalScreens ?? 0}
				icon={Monitor}
				color="blue"
				description="Total de pantallas registradas"
			/>
			<StatCard
				title="Usuarios"
				value={generalDashboard?.totalActiveUsers ?? 0}
				icon={User}
				color="green"
				description="Usuarios Activos"
			/>
			<StatCard
				title="Agencias"
				value={generalDashboard?.totalAgencies ?? 0}
				icon={HomeIcon}
				color="yellow"
				description="Agencias activas registradas"
			/>
			<StatCard
				title="Torres Administrativas"
				value={generalDashboard?.totalAdministrativeSites ?? 0}
				icon={Building}
				color="violet"
				description="Torres administraticas registradas"
			/>
		</div>
	)
})
