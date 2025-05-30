import { LinkCard } from '@/components/LinkCard'
import { MonitorCheck } from 'lucide-react'

const Monitoring = () => {
	const list = [
		{
			title: 'Monitoreo de dispositivos',
			description: '',
			icon: MonitorCheck,
			to: 'device'
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
