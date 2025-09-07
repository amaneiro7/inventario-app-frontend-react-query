import { memo } from 'react'
import { cn } from '@/shared/lib/utils'
import { GetDeviceIcon } from '@/entities/category/infra/ui/GetDeviceIcon'
import Typography from '@/shared/ui/Typography'
import { DeviceSummaryCardDetails } from '@/entities/shipment/infra/ui/DeviceSummaryCardDetails'
import { type DeviceDto } from '@/entities/devices/devices/domain/dto/Device.dto'

interface EmployeeDeviceSummaryCardProps {
	device: DeviceDto
	className?: HTMLElement['className']
}

export const EmployeeDeviceSummaryCard = memo(
	({ device, className }: EmployeeDeviceSummaryCardProps) => {
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
			device.category.name?.toLowerCase() ?? ''
		)
		const isHardDrive = ['disco'].includes(device.category.name?.toLowerCase() ?? '')

		const baseDetails = [
			{ label: 'Marca', value: device.brand.name },
			{ label: 'Modelo', value: device.model.name },
			{ label: 'Serial', value: device.serial },
			{ label: 'Activo', value: device.activo }
		]

		const computerDetails = [
			{ label: 'Nombre de Equipo', value: device.computer?.computerName },
			{ label: 'Procesador', value: device.computer?.processor?.name },
			{
				label: 'Memoria RAM',
				value: device.computer?.memoryRamCapacity
					? `${device.computer?.memoryRamCapacity} Gb`
					: null
			},
			{ label: 'Módulos RAM', value: device.computer?.memoryRam?.join(' / ') },
			{
				label: 'Disco Duro',
				value: device.computer?.hardDriveCapacity
					? `${device.computer?.hardDriveCapacity?.name} Gb`
					: null
			},
			{ label: 'Tipo de Disco', value: device.computer?.hardDriveType?.name },
			{ label: 'Sistema Operativo', value: device.computer?.operatingSystem?.name },
			{ label: 'Arquitectura', value: device.computer?.operatingSystemArq?.name },
			{ label: 'Dirección IP', value: device.computer?.ipAddress }
		]

		const hardDriveDetails = [
			{
				label: 'Estado del Disco',
				value: device.hardDrive?.health ? `${device.hardDrive?.health}%` : null
			},
			{
				label: 'Capacidad',
				value: device.hardDrive?.hardDriveCapacity
					? `${device.hardDrive?.hardDriveCapacity?.name} Gb`
					: null
			},
			{ label: 'Tipo de Disco', value: device.hardDrive?.hardDriveType?.name }
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
							categoryName={device.category.name}
							className="text-muted-foreground aspect-square sm:w-4 md:w-5 lg:w-8"
						/>
						{device.category.name ?? 'Categoría'} - {device.model.name}
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
	}
)
EmployeeDeviceSummaryCard.displayName = 'EmployeeDeviceSummaryCard'
