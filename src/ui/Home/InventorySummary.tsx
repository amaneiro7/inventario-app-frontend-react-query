import { memo } from 'react'
import { Monitor, Laptop, User, Building, HomeIcon } from 'lucide-react'
import { StatCard } from './StatCard'
import Typography from '@/components/Typography'
import { useGetGeneralDashboard } from '@/core/devices/dashboard/infra/hooks/useGetGeneralDashboard'

export const InventorySummary = memo(() => {
	const { generalDashboard } = useGetGeneralDashboard()
	return (
		<section className="fade-in">
			<Typography variant="h2" weight="semibold" className="mb-4">
				Resumen de inventario
			</Typography>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
				<StatCard
					title="Computadoras"
					value={generalDashboard?.totalComputer ?? 0}
					icon={Laptop}
					color="green"
					description="Total de computadoras en inventario"
				/>
				<StatCard
					title="Monitores"
					value={generalDashboard?.totalScreens ?? 0}
					icon={Monitor}
					color="amber"
					description="Total de pantallas registradas"
				/>
				<StatCard
					title="Usuarios"
					value={generalDashboard?.totalActiveUsers ?? 0}
					icon={User}
					color="blue"
					description="Usuarios Activos"
				/>
				<StatCard
					title="Agencias"
					value={generalDashboard?.totalAgencies ?? 0}
					icon={HomeIcon}
					color="rose"
					description="Agencias activas registradas"
				/>
				<StatCard
					title="Torres Administrativas"
					value={generalDashboard?.totalAdministrativeSites ?? 0}
					icon={Building}
					color="blue"
					description="Torres administraticas registradas"
				/>
			</div>
		</section>
	)
})
