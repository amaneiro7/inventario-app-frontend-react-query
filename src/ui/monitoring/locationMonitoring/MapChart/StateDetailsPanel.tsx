import Typography from '@/components/Typography'
import { StateData } from './useMapChart'
import { StatusProgress } from '@/ui/Home/InventoryStatus/StatusProgress'
import { DeviceSelectedList } from './DeviceSelectedList'

export const StateDetailsPanel = ({
	selectedState,
	stateStats
}: {
	selectedState: string | null
	stateStats: Record<string, StateData>
	getColor: (stateName: string) => string
}) => {
	return (
		<div className="max-h-[650px] space-y-4">
			<Typography variant="h4" color="azul">
				{selectedState ? `Detalles de ${selectedState}` : 'Selecciona un estado'}
			</Typography>

			{selectedState && stateStats[selectedState] ? (
				<div className="space-y-3">
					<div className="rounded-lg border p-4">
						<Typography variant="p" option="large" weight="bold" color="azul">
							{stateStats[selectedState].percentage.toFixed(1)}%
						</Typography>
						<Typography variant="p" option="small" color="gris">
							Sitios Activos
						</Typography>
					</div>

					<div className="grid grid-cols-2 gap-2">
						<div className="rounded-lg border p-3 text-center">
							<div className="text-verde text-lg font-semibold">
								{stateStats[selectedState].onlineCount}
							</div>
							<div className="text-muted-foreground text-xs">Activos</div>
						</div>
						<div className="rounded-lg border p-3 text-center">
							<div className="text-rojo text-lg font-semibold">
								{stateStats[selectedState].offlineCount}
							</div>
							<div className="text-muted-foreground text-xs">Inactivos</div>
						</div>
					</div>

					<div className="rounded-lg border p-3 text-center">
						<div className="text-lg font-semibold">
							{stateStats[selectedState].total}
						</div>
						<div className="text-muted-foreground text-xs">Total Sitios</div>
					</div>

					{/* Progress bar */}
					<StatusProgress
						label="Estado de la Red"
						total={stateStats[selectedState].total}
						value={stateStats[selectedState].onlineCount}
						indicatorColor={'bg-verde'}
						backgroundColor="bg-rojo"
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
