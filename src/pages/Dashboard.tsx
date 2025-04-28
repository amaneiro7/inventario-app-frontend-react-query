import { DetailsWrapper } from '@/components/DetailsWrapper/DetailsWrapper'
import { LinkCard } from '@/components/LinkCard'
import { Computer } from 'lucide-react'

const Dashboards = () => {
	const dashboards = [
		// {
		// 	title: 'Dashboard Principal',
		// 	description: 'Vista general del sistema y métricas clave',
		// 	icon: LayoutDashboard,
		// 	to: '/dashboard'
		// },
		{
			title: 'Computadoras',
			description: 'Gestión y monitoreo de equipos de cómputo',
			icon: Computer,
			to: 'computer'
		}
		// {
		// 	title: 'Monitores',
		// 	description: 'Control y seguimiento de pantallas',
		// 	icon: Monitor,
		// 	to: '/monitors'
		// }
	]

	return (
		<DetailsWrapper>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{dashboards.map(dashboard => (
					<LinkCard key={dashboard.title} {...dashboard} />
				))}
			</div>
		</DetailsWrapper>
	)
}
export default Dashboards
