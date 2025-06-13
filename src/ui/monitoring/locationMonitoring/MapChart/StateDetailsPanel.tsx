import Typography from '@/components/Typography'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card'
import { StateData } from './useMapChart'
import { StatusProgress } from '@/ui/Home/InventoryStatus/StatusProgress'
import { DeviceSelectedList } from './DeviceSelectedList'

interface StateDetailsPanelProps {
	selectedState: string | null
	stateStats: Record<string, StateData>
}
export const StateDetailsPanel = ({ selectedState, stateStats }: StateDetailsPanelProps) => {
	return (
		<Card className="flex h-full flex-col">
			<CardHeader>
				<CardTitle>
					{selectedState ? `Detalles de ${selectedState}` : 'Selecciona un estado'}
				</CardTitle>
				<CardDescription>
					{selectedState
						? 'Aquí puedes ver un resumen del estado de los equipos.'
						: 'Haz clic en cualquier estado del mapa para ver los detalles.'}
				</CardDescription>
			</CardHeader>
			<CardContent className="flex-grow overflow-y-auto pb-4">
				{selectedState && stateStats[selectedState] ? (
					<div className="space-y-4">
						<div className="rounded-lg border p-4 shadow-sm">
							<Typography variant="p" option="large" weight="bold" color="azul">
								{stateStats[selectedState].percentage.toFixed(1)}%
							</Typography>
							<Typography variant="p" option="small" color="gris">
								Porcentaje de Equipos Online
							</Typography>
						</div>
						{/* Counts Grid */}
						<div className="grid grid-cols-2 gap-3">
							<div className="rounded-lg border p-3 text-center shadow-sm">
								<Typography
									variant="p"
									weight="semibold"
									color="verde"
									option="large"
								>
									{stateStats[selectedState].onlineCount}
								</Typography>
								<Typography className="text-muted-foreground text-xs">
									Activos
								</Typography>
							</div>
							<div className="rounded-lg border p-3 text-center">
								<Typography
									variant="p"
									weight="semibold"
									color="rojo"
									option="large"
								>
									{stateStats[selectedState].offlineCount}
								</Typography>
								<Typography className="text-muted-foreground text-xs">
									Inactivos
								</Typography>
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
							Haz clic en cualquier estado del mapa para ver los detalles de los
							equipos en esa región.
						</Typography>
					</div>
				)}
			</CardContent>
		</Card>
	)
}
