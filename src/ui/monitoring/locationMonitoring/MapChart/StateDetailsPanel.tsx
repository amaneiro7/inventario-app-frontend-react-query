import Typography from '@/components/Typography'
import { StateData } from './useMapChart'
import { StatusProgress } from '@/ui/Home/InventoryStatus/StatusProgress'
import { DeviceSelectedList } from './DeviceSelectedList'

interface StateDetailsPanelProps {
	selectedState: string | null
	stateStats: Record<string, StateData>
}
export const StateDetailsPanel = ({ selectedState, stateStats }: StateDetailsPanelProps) => {
	return (
		<div className="flex flex-col gap-4">
			<Typography variant="h5" color="azul">
				{selectedState ? `Detalles de ${selectedState}` : 'Selecciona un estado'}
			</Typography>

			{selectedState && stateStats[selectedState] ? (
				<div className="space-y-3">
					<div className="rounded-lg border p-4 shadow-sm">
						<Typography variant="p" option="large" weight="bold" color="azul">
							{stateStats[selectedState].percentage.toFixed(1)}%
						</Typography>
						<Typography variant="p" className="text-lg" color="gris">
							Porcentaje de Equipos Online
						</Typography>
					</div>
					{/* Counts Grid */}
					<div className="grid grid-cols-2 gap-3">
						<div className="rounded-lg border p-3 text-center shadow-sm">
							<Typography variant="p" weight="semibold" color="verde" option="large">
								{stateStats[selectedState].onlineCount}
							</Typography>
							<Typography className="text-muted-foreground text-xs">
								Activos
							</Typography>
						</div>
						<div className="rounded-lg border p-3 text-center">
							<Typography variant="p" weight="semibold" color="rojo" option="large">
								{stateStats[selectedState].offlineCount}
							</Typography>
							<Typography className="text-muted-foreground text-xs">
								Inactivos
							</Typography>
						</div>
					</div>

					<div className="rounded-lg border p-3 text-center">
						<Typography variant="p" weight="semibold" color="black" option="large">
							{stateStats[selectedState].total}
						</Typography>
						<Typography className="text-muted-foreground text-xs">
							Total Sitios
						</Typography>
					</div>

					{/* Progress bar */}
					<StatusProgress
						label="Estado de la Red"
						total={stateStats[selectedState].total}
						value={stateStats[selectedState].onlineCount}
						indicatorColor="bg-verde"
					/>

					{/* Device list for selected state */}
					<DeviceSelectedList selectedState={selectedState} />
				</div>
			) : (
				<div className="text-muted-foreground p-8 text-center">
					<Typography>
						Haz clic en cualquier estado del mapa para ver los detalles de los equipos
						en esa región.
					</Typography>
				</div>
			)}
		</div>
	)
}
