import { memo, useMemo } from 'react'
import Typography from '@/shared/ui/Typography'
import { StatusProgress } from '@/shared/ui/StatusProgress'
import { DetailsPanelCard } from './DetailsPanelCard'

interface DetailsPanelProps {
	selectedFloor: string | null
	panelTitleId: string
	panelDescriptionId: string
	onlineCount?: number
	total?: number
	offlineCount?: number
	isDataLoaded: boolean
	currentStateData: boolean
	panelType: 'devices' | 'locations'
}
export const DetailsPanel = memo(
	({
		selectedFloor,
		panelDescriptionId,
		panelTitleId,
		offlineCount = 0,
		onlineCount = 0,
		total = 0,
		currentStateData,
		isDataLoaded,
		panelType,
		children
	}: React.PropsWithChildren<DetailsPanelProps>) => {
		const {
			mainTitlePrefix,
			mainDescriptionPrefix,
			percentageTitle,
			totalCountTitle,
			noSelectionMessage,
			noEquipmentOrLinksMessage // New message for when total is 0
		} = useMemo(() => {
			if (panelType === 'devices') {
				return {
					mainTitlePrefix: 'Conectividad de Equipos en',
					mainDescriptionPrefix:
						'Mostrando el estado de conectividad de los equipos de red por sitio y ubicación (piso) en',
					percentageTitle: 'Porcentaje de Equipos Activos',
					totalCountTitle: 'Total de Equipos',
					noSelectionMessage:
						'Haz clic en cualquier estado del mapa para ver el detalle de los equipos de red en las torres administrativas por región.',
					noEquipmentOrLinksMessage: 'No hay equipos de red registrados para este estado.'
				}
			} else {
				return {
					mainTitlePrefix: 'Conectividad de Enlaces y Agencias en',
					mainDescriptionPrefix:
						'Mostrando el estado de conectividad de los enlaces y agencias por sitio y ubicación en',
					percentageTitle: 'Porcentaje de Enlaces Operativos',
					totalCountTitle: 'Total de Enlaces/Agencias',
					noSelectionMessage:
						'Haz clic en cualquier estado del mapa para ver el detalle de los enlaces y agencias por región.',
					noEquipmentOrLinksMessage:
						'No hay enlaces o agencias registrados para este estado.'
				}
			}
		}, [panelType])

		const mainPanelTitle = selectedFloor
			? `${mainTitlePrefix} ${selectedFloor}`
			: `Selecciona un ${panelType === 'locations' ? 'estado' : 'piso'} en el mapa.`

		const mainPanelDescription = selectedFloor
			? `${mainDescriptionPrefix} ${selectedFloor}.`
			: 'Panel lateral para mostrar información detallada al seleccionar un estado en el mapa.'

		return (
			<section
				className="h-withoutHeader flex flex-col space-y-1.5 overflow-y-auto"
				aria-labelledby={panelTitleId}
				aria-describedby={panelDescriptionId}
				role="region"
			>
				<Typography variant="h4" color="azul" id={panelTitleId}>
					{mainPanelTitle}
				</Typography>
				<p id={panelDescriptionId} className="sr-only">
					{mainPanelDescription}
				</p>

				{isDataLoaded && currentStateData ? (
					<>
						{total > 0 && (
							<DetailsPanelCard
								id="active-percentage-card-title"
								title={percentageTitle}
								role="status"
								color="azul"
								value={`${((onlineCount / total) * 100).toFixed(1)}%`}
								aria-live="polite"
							/>
						)}
						{total === 0 && (
							<DetailsPanelCard
								id="no-equipment-card-title"
								title={noEquipmentOrLinksMessage}
								role="status"
								color="azul"
								value={`${((onlineCount / total) * 100).toFixed(1)}%`}
								aria-live="polite"
							/>
						)}
						{/* Counts Grid */}
						<div className="grid grid-cols-2 gap-2">
							<DetailsPanelCard
								id="active-count-title"
								title="Activos"
								color="verde"
								className="text-center"
								value={`${onlineCount}`}
								aria-live="polite"
							/>
							<DetailsPanelCard
								id="inactive-count-title"
								color="rojo"
								title="Inactivos"
								className="text-center"
								value={`${offlineCount}`}
								aria-live="polite"
							/>
						</div>
						<DetailsPanelCard
							id="total-count-title"
							color="black"
							title={totalCountTitle}
							className="text-center"
							value={`${total}`}
							aria-live="polite"
						/>

						{/* Progress bar */}
						<StatusProgress
							id="network-status-label"
							aria-labelledby="network-status-label"
							label="Estado de la Red"
							role="group"
							aria-label="Progreso de estado de la red"
							total={total}
							value={onlineCount}
							indicatorColor="bg-verde"
						/>

						{children}
					</>
				) : (
					<div className="text-muted-foreground p-8 text-center">
						<Typography>{noSelectionMessage}</Typography>
					</div>
				)}
			</section>
		)
	}
)

DetailsPanel.displayName = 'DetailsPanel'
