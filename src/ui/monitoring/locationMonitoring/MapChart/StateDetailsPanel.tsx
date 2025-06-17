import { cn } from '@/lib/utils'
import Typography from '@/components/Typography'
import { StateData } from './useMapChart'
import { StatusProgress } from '@/ui/Home/InventoryStatus/StatusProgress'
import { NetworkLinkMonitoring } from './NetworkLinkMonitoring'
import { type ColorType } from '@/components/Typography/types'

interface StateDetailsPanelProps {
	selectedState: string | null
	stateStats: Record<string, StateData>
}
export const StateDetailsPanel = ({ selectedState, stateStats }: StateDetailsPanelProps) => {
	// Determine if data for the selected state exists
	const hasSelectedStateData = selectedState && stateStats[selectedState]
	const currentStateData = hasSelectedStateData ? stateStats[selectedState] : null

	// Unique IDs for ARIA attributes
	const panelTitleId = 'state-details-title'
	const panelDescriptionId = 'state-details-description'
	return (
		<section
			className="h-withoutHeader flex flex-col space-y-1.5 overflow-y-auto"
			aria-labelledby={panelTitleId}
			aria-describedby={panelDescriptionId}
			role="region"
		>
			<Typography variant="h4" color="azul" id={panelTitleId}>
				{selectedState ? `Detalles de ${selectedState}` : 'Selecciona un estado'}
			</Typography>
			<p id={panelDescriptionId} className="sr-only">
				{selectedState
					? `Mostrando detalles de conectividad para el estado de ${selectedState}.`
					: 'Panel lateral para mostrar información detallada al seleccionar un estado en el mapa.'}
			</p>

			{hasSelectedStateData && currentStateData ? (
				<>
					<StateDetailsPanelCard
						id="active-percentage-card-title"
						title="Porcentaje de Enlaces Activos"
						role="status"
						color="azul"
						value={`${stateStats[selectedState].percentage.toFixed(1)}%`}
						aria-live="polite"
					/>
					{/* Counts Grid */}
					<div className="grid grid-cols-2 gap-2">
						<StateDetailsPanelCard
							id="active-count-title"
							title="Activos"
							color="verde"
							className="text-center"
							value={`${stateStats[selectedState].onlineCount}`}
							aria-live="polite"
						/>
						<StateDetailsPanelCard
							id="inactive-count-title"
							color="rojo"
							title="Inactivos"
							className="text-center"
							value={`${stateStats[selectedState].offlineCount}`}
							aria-live="polite"
						/>
					</div>
					<StateDetailsPanelCard
						id="total-count-title"
						color="black"
						title="Total de sitios"
						className="text-center"
						value={`${stateStats[selectedState].total}`}
						aria-live="polite"
					/>

					{/* Progress bar */}
					<StatusProgress
						id="network-status-label"
						aria-labelledby="network-status-label"
						label="Estado de la Red"
						role="group"
						aria-label="Progreso de estado de la red"
						total={stateStats[selectedState].total}
						value={stateStats[selectedState].onlineCount}
						indicatorColor="bg-verde"
					/>

					{/* Device list for selected state */}
					<NetworkLinkMonitoring selectedState={selectedState} />
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
interface StateDetailsPanelCardProps
	extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	value: string
	color: ColorType
}
const StateDetailsPanelCard = ({
	value,
	color,
	className,
	id,
	title,
	...props
}: StateDetailsPanelCardProps) => {
	return (
		<div
			role="status"
			aria-labelledby={id}
			aria-atomic="true"
			className={cn(
				'flex min-h-min flex-col rounded-lg border bg-white p-3 shadow-sm',
				className
			)}
			{...props}
		>
			<p id={id} className="sr-only">
				{title}
			</p>
			<Typography variant="p" option="medium" weight="bold" color={color}>
				{value}
			</Typography>
			<Typography variant="p" option="tiny" color="gray-600">
				{title}
			</Typography>
		</div>
	)
}
