import { memo } from 'react'
import { cn } from '@/shared/lib/utils'
import { DeviceMonitoringGetByCriteria } from '@/entities/devices/deviceMonitoring/application/DeviceMonitoringGetByCriteria'
import { DeviceMonitoringStatuses } from '@/entities/devices/deviceMonitoring/domain/value-object/Status'
import { Icon } from '@/shared/ui/icon/Icon'
import { MonitoringMapSkeleton } from '../../Shared/ui/MonitoringMapSkeleton'
import Typography from '@/shared/ui/Typography'
import { PaginationBar } from '@/shared/ui/Pagination/PaginationBar'
import { type DeviceMonitoring } from '@/entities/devices/deviceMonitoring/domain/dto/DeviceMonitoring.dto'
import { type Response } from '@/entities/shared/domain/methods/Response'
import { type DeviceMonitoringFilters } from '@/entities/devices/deviceMonitoring/application/createDeviceMonitoringQueryParams'

interface DeviceMonitoringMapProps {
	pageSize: DeviceMonitoringFilters['pageSize']
	handlePageSize: (pageSize: number) => void
	handlePageClick: ({ selected }: { selected: number }) => void
	deviceMonitorings: Response<DeviceMonitoring> | undefined
	isError: boolean
	isLoading: boolean
	isFetching: boolean // Add isFetching to props if it's available from useQuery
}

export const DeviceMonitoringMap = memo(
	({
		deviceMonitorings,
		isError,
		isLoading,
		isFetching,
		pageSize,
		handlePageSize,
		handlePageClick
	}: DeviceMonitoringMapProps) => {
		if (isError) {
			return (
				<div className="text-center font-medium text-red-600">
					<p>No se pudo cargar la información de monitoreo.</p>
					<p>Por favor, intenta de nuevo más tarde.</p>
					{/* Optional: Add a button to retry if you have a refetch function */}
				</div>
			)
		}

		if (isLoading) {
			return <MonitoringMapSkeleton pageSize={pageSize} />
		}

		if (!isLoading && deviceMonitorings?.data.length === 0) {
			return (
				<div className="col-span-full py-8 text-center text-gray-500" role="status">
					<p>No se encontraron equipos para los filtros aplicados.</p>
					<p>Intenta ajustar los filtros o revisa si hay dispositivos registrados.</p>
				</div>
			)
		}

		return (
			<>
				{/* Simplified visual representation of devices in a location */}
				<div className="grid grid-cols-3 gap-4 overflow-y-auto pr-2 pb-16 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
					{/* Added overflow for scrollable content */}
					{deviceMonitorings?.data.map(device => (
						<div
							key={device.id}
							className={cn(
								`relative flex min-h-[96px] flex-col items-center justify-center rounded-md border p-2`, // Ensure consistent min-height for cards
								{
									'border-green-300 bg-green-50':
										device.status === DeviceMonitoringStatuses.ONLINE,
									'border-red-300 bg-red-50':
										device.status === DeviceMonitoringStatuses.OFFLINE // Use OFFLINE for clarity
								}
							)}
							aria-label={`Estado del equipo ${device.computerName}: ${device.status === DeviceMonitoringStatuses.ONLINE ? 'Activo' : 'Inactivo'}`}
						>
							{device.status === DeviceMonitoringStatuses.ONLINE ? (
								<Icon
									name="wifi"
									className="text-verde-500 mb-1 h-6 w-6"
									aria-hidden="true"
								/>
							) : (
								<Icon
									name="wifiOff"
									className="text-rojo-500 mb-1 h-6 w-6"
									aria-hidden="true"
								/>
							)}
							<Typography
								variant="span"
								align="center"
								weight="medium"
								option="tiny"
								className="w-full truncate"
							>
								{device.computerName}
							</Typography>
							<Typography
								variant="span"
								align="center"
								weight="medium"
								option="tiny"
								className="text-muted-foreground w-full truncate text-[10px]"
							>
								{device.ipAddress}
							</Typography>
						</div>
					))}

					{deviceMonitorings?.data?.length === 0 ? (
						<div className="text-muted-foreground col-span-full py-8 text-center">
							No hay equipos en esta ubicación
						</div>
					) : null}
				</div>

				{/* Legend for status colors */}
				<div className="absolute right-4 bottom-4 flex flex-col gap-0.5">
					{isFetching && (
						<Typography variant="span" option="tiny" color="gris">
							Actualizando...
						</Typography>
					)}
					<div className="flex items-center gap-4 text-xs">
						<div className="flex items-center gap-1">
							<div className="h-3 w-3 rounded-full bg-green-500"></div>
							<Typography variant="span" option="tiny">
								Activo
							</Typography>
						</div>
						<div className="flex items-center gap-1">
							<div className="h-3 w-3 rounded-full bg-red-500"></div>
							<Typography variant="span" option="tiny">
								Inactivo
							</Typography>
						</div>
					</div>
				</div>

				{/* Pagination Bar */}
				{deviceMonitorings && !isLoading && !isError && (
					<div className="mt-4 flex w-full justify-center">
						{/* Centered pagination */}
						<PaginationBar
							registerOptions={DeviceMonitoringGetByCriteria.pageSizeOptions}
							totalPages={deviceMonitorings?.info?.totalPage}
							total={deviceMonitorings?.info?.total}
							currentPage={deviceMonitorings?.info?.page}
							pageSize={pageSize}
							handlePageClick={handlePageClick}
							handlePageSize={handlePageSize}
						/>
					</div>
				)}
			</>
		)
	}
)
