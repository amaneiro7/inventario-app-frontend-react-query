import { memo } from 'react'
import { Monitor, Laptop, User, Building, HomeIcon } from 'lucide-react'
import CountUp from 'react-countup'
import { StatCard } from '../StatCard'
import { useGetGeneralDashboard } from '@/entities/devices/dashboard/infra/hooks/useGetGeneralDashboard'

export const InventorySummary = memo(() => {
	const { generalDashboard } = useGetGeneralDashboard()
	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
			<StatCard
				title="Computadoras"
				value={
					<CountUp
						end={generalDashboard?.totalComputer ?? 0}
						duration={1.5}
						separator="."
					/>
				}
				icon={Laptop}
				color="orange"
				description="Total de computadoras en inventario"
			/>
			<StatCard
				title="Monitores"
				value={
					<CountUp
						end={generalDashboard?.totalScreens ?? 0}
						duration={1.5}
						separator="."
					/>
				}
				icon={Monitor}
				color="blue"
				description="Total de pantallas registradas"
			/>
			<StatCard
				title="Usuarios"
				value={
					<CountUp
						end={generalDashboard?.totalActiveUsers ?? 0}
						duration={1.5}
						separator="."
					/>
				}
				icon={User}
				color="green"
				description="Usuarios Activos"
			/>
			<StatCard
				title="Agencias"
				value={
					<CountUp
						end={generalDashboard?.totalAgencies ?? 0}
						duration={1.5}
						separator="."
					/>
				}
				icon={HomeIcon}
				color="yellow"
				description="Agencias activas registradas"
			/>
			<StatCard
				title="Torres Administrativas"
				value={
					<CountUp
						end={generalDashboard?.totalAdministrativeSites ?? 0}
						duration={1.5}
						separator="."
					/>
				}
				icon={Building}
				color="violet"
				description="Torres administraticas registradas"
			/>
		</div>
	)
})
