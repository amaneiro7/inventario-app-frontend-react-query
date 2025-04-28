import React from 'react'
import { Computer } from 'lucide-react'
import { Link } from 'react-router-dom'

const DashboardCard = ({
	title,
	description,
	icon: Icon,
	to
}: {
	title: string
	description: string
	icon: React.ElementType
	to: string
}) => (
	<Link to={to} className="block">
		<div className="rounded-lg border border-slate-200 bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
			<div className="mb-4 flex items-center gap-4">
				<div className="bg-primary/10 rounded-lg p-3">
					<Icon className="text-primary h-6 w-6" />
				</div>
				<h3 className="text-lg font-semibold text-slate-900">{title}</h3>
			</div>
			<p className="text-slate-600">{description}</p>
		</div>
	</Link>
)

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
		<>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{dashboards.map(dashboard => (
					<DashboardCard key={dashboard.title} {...dashboard} />
				))}
			</div>
		</>
	)
}
export default Dashboards
