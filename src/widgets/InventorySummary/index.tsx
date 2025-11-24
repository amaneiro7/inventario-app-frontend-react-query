import { memo } from 'react'
import CountUp from 'react-countup'
import { useGetGeneralDashboard } from '@/entities/devices/dashboard/infra/hooks/useGetGeneralDashboard'
import { StatCard } from '../StatCard'

export const InventorySummary = memo(() => {
	const { generalDashboard } = useGetGeneralDashboard()
	const countDuration: number = 2
	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
			<StatCard
				title="Computadoras"
				value={
					<CountUp
						end={generalDashboard?.totalComputer ?? 0}
						duration={countDuration}
						separator="."
					/>
				}
				iconName="laptop"
				color="orange"
				description="Total de computadoras en inventario"
			/>
			<StatCard
				title="Monitores"
				value={
					<CountUp
						end={generalDashboard?.totalScreens ?? 0}
						duration={countDuration}
						separator="."
					/>
				}
				iconName="monitor"
				color="blue"
				description="Total de pantallas registradas"
			/>
			<StatCard
				title="Usuarios"
				value={
					<CountUp
						end={generalDashboard?.totalActiveUsers ?? 0}
						duration={countDuration}
						separator="."
					/>
				}
				iconName="user"
				color="green"
				description="Usuarios Activos"
			/>
			<StatCard
				title="Agencias"
				value={
					<CountUp
						end={generalDashboard?.totalAgencies ?? 0}
						duration={countDuration}
						separator="."
					/>
				}
				iconName="home"
				color="yellow"
				description="Agencias activas registradas"
			/>
			<StatCard
				title="Torres Administrativas"
				value={
					<CountUp
						end={generalDashboard?.totalAdministrativeSites ?? 0}
						duration={countDuration}
						separator="."
					/>
				}
				iconName="building2"
				color="violet"
				description="Torres administraticas registradas"
			/>
		</div>
	)
})
