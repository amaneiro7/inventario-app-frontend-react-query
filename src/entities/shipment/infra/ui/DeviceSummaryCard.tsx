import { memo } from 'react'
import { cn } from '@/shared/lib/utils'
import { GetDeviceIcon } from '@/entities/category/infra/ui/GetDeviceIcon'
import Typography from '@/shared/ui/Typography'
import { DeviceSummaryCardDetails } from './DeviceSummaryCardDetails'
import { type ShipmentDevice } from '@/entities/shipment/domain/dto/Shipment.dto'

interface ShippedDeviceCardProps {
	shipmentDevice: ShipmentDevice
	className?: HTMLElement['className']
}

export const DeviceSummaryCard = memo(({ shipmentDevice, className }: ShippedDeviceCardProps) => {
	const { deviceSnapshot: device } = shipmentDevice

	if (!device) {
		return (
			<div className="flex w-full items-center gap-4 rounded-lg border border-red-300 bg-red-50 p-3 shadow-lg sm:w-auto md:min-w-[350px]">
				<Typography color="rojo">
					Error: No se pudieron cargar los datos de este dispositivo.
				</Typography>
			</div>
		)
	}

	const isComputer = ['computadoras', 'laptops', 'all in one', 'servidores'].includes(
		device.categoryName?.toLowerCase() ?? ''
	)
	const isHardDrive = ['disco'].includes(device.categoryName?.toLowerCase() ?? '')

	const baseDetails = [
		{ label: 'Marca', value: device.brandName },
		{ label: 'Modelo', value: device.modelName },
		{ label: 'Serial', value: device.serial },
		{ label: 'Activo', value: device.activo }
	]

	const computerDetails = [
		{ label: 'Nombre de Equipo', value: device.computerName },
		{ label: 'Procesador', value: device.processorName },
		{
			label: 'Memoria RAM',
			value: device.memoryRamCapacity ? `${device.memoryRamCapacity} Gb` : null
		},
		{ label: 'Módulos RAM', value: device.memoryRam?.join(' / ') },
		{
			label: 'Disco Duro',
			value: device.hardDriveCapacity ? `${device.hardDriveCapacity} Gb` : null
		},
		{ label: 'Tipo de Disco', value: device.hardDriveType },
		{ label: 'Sistema Operativo', value: device.operatingSystem },
		{ label: 'Arquitectura', value: device.operatingSystemArq },
		{ label: 'Dirección IP', value: device.ipAddress }
	]

	const hardDriveDetails = [
		{ label: 'Estado del Disco', value: device.health ? `${device.health}%` : null },
		{
			label: 'Capacidad',
			value: device.hardDriveCapacity ? `${device.hardDriveCapacity} Gb` : null
		},
		{ label: 'Tipo de Disco', value: device.hardDriveType }
	]

	return (
		<div className={cn('rounded-lg border p-3 shadow-lg', className)}>
			<div className="flex-grow">
				<Typography
					variant="p"
					option="small"
					weight="bold"
					className="mb-2 flex flex-row items-center gap-2 text-balance"
				>
					<GetDeviceIcon
						categoryName={device.categoryName}
						className="text-muted-foreground aspect-square sm:w-4 md:w-5 lg:w-8"
					/>
					{device.categoryName ?? 'Categoría'} - {device.modelName}
				</Typography>
				<div className="grid grid-cols-1 gap-x-4">
					{baseDetails.map(
						(device, index) =>
							device.value && (
								<DeviceSummaryCardDetails
									key={`device-summary-card-detail-${index}`}
									label={device.label}
									value={device.value}
								/>
							)
					)}
					{isComputer &&
						computerDetails.map(
							(device, index) =>
								device.value && (
									<DeviceSummaryCardDetails
										key={`device-summary-card-detail-${index}`}
										label={device.label}
										value={device.value}
									/>
								)
						)}
					{isHardDrive &&
						hardDriveDetails.map(
							(device, index) =>
								device.value && (
									<DeviceSummaryCardDetails
										key={`device-summary-card-detail-${index}`}
										label={device.label}
										value={device.value}
									/>
								)
						)}
				</div>
			</div>
		</div>
	)
})
DeviceSummaryCard.displayName = 'DeviceSummaryCard'
