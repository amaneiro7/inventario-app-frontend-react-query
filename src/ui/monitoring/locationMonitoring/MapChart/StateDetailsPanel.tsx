import { cn } from '@/lib/utils'
import Typography from '@/components/Typography'
import { StateData } from './useMapChart'
import { StatusProgress } from '@/ui/Home/InventoryStatus/StatusProgress'
import { DeviceSelectedList } from './DeviceSelectedList'
import { type ColorType } from '@/components/Typography/types'

interface StateDetailsPanelProps {
	selectedState: string | null
	stateStats: Record<string, StateData>
}
export const StateDetailsPanel = ({ selectedState, stateStats }: StateDetailsPanelProps) => {
	return (
		<section
			className="h-withoutHeader flex flex-col gap-1.5"
			aria-labelledby="state-details-title"
		>
			<Typography variant="h4" color="azul" id="state-details-title">
				{selectedState ? `Detalles de ${selectedState}` : 'Selecciona un estado'}
			</Typography>

			{selectedState && stateStats[selectedState] ? (
				<>
					<StateDetailsPanelCard
						role="status"
						id="status-title"
						color="azul"
						desc="Porcentaje de Equipos Online"
						value={`${stateStats[selectedState].percentage.toFixed(1)}%`}
					/>
					{/* Counts Grid */}
					<div className="grid grid-cols-2 gap-3">
						<StateDetailsPanelCard
							id="active-count-title"
							role="group"
							color="verde"
							desc="Activos"
							className="text-center"
							value={`${stateStats[selectedState].onlineCount}`}
						/>
						<StateDetailsPanelCard
							id="inactive-count-title"
							role="group"
							color="rojo"
							desc="Inactivos"
							className="text-center"
							value={`${stateStats[selectedState].offlineCount}`}
						/>
					</div>
					<StateDetailsPanelCard
						id="total-count-title"
						role="group"
						color="black"
						desc="Total Sitios"
						className="text-center"
						value={`${stateStats[selectedState].total}`}
					/>

					{/* Progress bar */}
					<StatusProgress
						role="group"
						id="network-status-label"
						aria-labelledby="network-status-label"
						label="Estado de la Red"
						total={stateStats[selectedState].total}
						value={stateStats[selectedState].onlineCount}
						indicatorColor="bg-verde"
					/>

					{/* Device list for selected state */}
					<DeviceSelectedList selectedState={selectedState} />
				</>
			) : (
				<div className="text-muted-foreground p-8 text-center">
					<Typography>
						Haz clic en cualquier estado del mapa para ver los detalles de los equipos
						en esa región.
					</Typography>
				</div>
			)}
		</section>
	)
}

const StateDetailsPanelCard = ({
	value,
	desc,
	color,
	className,
	role,
	id
}: {
	id: string
	value: string
	desc: string
	color: ColorType
	className?: string
	role: React.AriaRole
}) => {
	return (
		<div
			role={role}
			aria-labelledby={id}
			className={cn('rounded-lg border bg-slate-100 p-4 shadow-sm', className)}
		>
			<Typography id={id} variant="p" className="sr-only">
				{desc}
			</Typography>
			<Typography variant="p" option="large" weight="bold" color={color}>
				{value}
			</Typography>
			<Typography variant="p" option="tiny" color="gris">
				{desc}
			</Typography>
		</div>
	)
}
