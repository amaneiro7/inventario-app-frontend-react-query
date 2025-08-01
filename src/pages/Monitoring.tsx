import { LinkCard } from '@/shared/ui/LinkCard'
import { MonitorCheck, MapPinCheck } from 'lucide-react'

const Monitoring = () => {
	const list = [
		{
			title: 'Monitoreo de Ubicaciones',
			description:
				'Accede al panel para ver el estado de conectividad en tiempo real de tus equipos.',
			icon: MapPinCheck,
			to: 'location'
		},
		{
			title: 'Monitoreo de Dispositivos',
			description:
				'Accede al panel para ver el estado de conectividad en tiempo real de tus equipos.',
			icon: MonitorCheck,
			to: 'device'
		},
		{
			title: 'Mapa de Conectividad de Agencias',
			description:
				'Visualiza el estado de los enlaces y la conectividad de las agencias a nivel nacional.',
			icon: MonitorCheck,
			to: 'agencymap'
		},
		{
			title: 'Mapa de Conectividad de Torres Administrativas',
			description:
				'Visualiza el estado de los equipos de red activos en las torres administrativas a nivel nacional.',

			icon: MonitorCheck,
			to: 'administrativesitemap'
		}
	]

	return (
		<>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{list.map(dashboard => (
					<LinkCard key={dashboard.title} {...dashboard} />
				))}
			</div>
		</>
	)
}
export default Monitoring
