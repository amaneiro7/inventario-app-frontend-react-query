import {
	CheckCircle,
	PackageCheck,
	XCircle,
	Send,
	Settings,
	ShieldCheck,
	Check,
	Archive
} from 'lucide-react'
import { StatusItem } from './StatusItem'
import { StatusProgress } from './StatusProgress'

interface StatusListProps {
	statusData: Record<string, number>
	total: number
	useProgress?: boolean
}

interface StatusConfig {
	label: string
	key: string
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
	color: string
}

export const StatusList: React.FC<StatusListProps> = ({
	statusData,
	total,
	useProgress = false
}) => {
	const statusItems: StatusConfig[] = [
		{ label: 'En uso', key: 'En Uso', icon: CheckCircle, color: 'bg-green-500' },
		{ label: 'En almacén', key: 'En Almacen', icon: PackageCheck, color: 'bg-amber-500' },
		{
			label: 'Por desincorporar',
			key: 'Por Desincorporar',
			icon: Archive,
			color: 'bg-blue-500'
		},
		{ label: 'Desincorporado', key: 'Desincorporado', icon: XCircle, color: 'bg-rose-500' },
		{ label: 'Préstamo', key: 'Préstamo', icon: Send, color: 'bg-indigo-500' },
		{ label: 'Contingencia', key: 'Contingencia', icon: Settings, color: 'bg-orange-500' },
		{ label: 'Guardia', key: 'Guardia', icon: ShieldCheck, color: 'bg-teal-500' },
		{ label: 'Disponible', key: 'Disponible', icon: Check, color: 'bg-lime-500' }
	]

	return (
		<div className="space-y-4">
			{statusItems.map(({ label, key, icon, color }) =>
				useProgress ? (
					<StatusProgress
						key={key}
						label={label}
						value={statusData[key]}
						color={color}
						total={total}
					/>
				) : (
					<StatusItem
						key={key}
						icon={icon}
						label={label}
						value={statusData[key]}
						color={color}
						total={total}
					/>
				)
			)}
		</div>
	)
}
