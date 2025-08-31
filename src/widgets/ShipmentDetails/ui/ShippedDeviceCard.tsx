import { Laptop, Printer, Monitor, Server, Computer, HardDrive, Keyboard } from 'lucide-react'
import Typography from '@/shared/ui/Typography'
import { ShipmentDeviceCardDetails } from './ShipmentDeviceCardDetails'
import { type ShipmentDevice } from '@/entities/shipment/domain/dto/Shipment.dto'

interface ShippedDeviceCardProps {
	shipmentDevice: ShipmentDevice
}

export const ShippedDeviceCard = ({ shipmentDevice }: ShippedDeviceCardProps) => {
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

	// Función para seleccionar un icono basado en la categoría
	const getDeviceIcon = (categoryName?: string) => {
		if (!categoryName) return <Computer />
		const lowerCategory = categoryName.toLowerCase()

		if (lowerCategory.includes('computadora')) return <Computer />
		if (lowerCategory.includes('all')) return <Computer />
		if (lowerCategory.includes('servidor')) return <Server />
		if (lowerCategory.includes('laptop')) return <Laptop />
		if (lowerCategory.includes('impresora')) return <Printer />
		if (lowerCategory.includes('monitor')) return <Monitor />
		if (lowerCategory.includes('disco')) return <HardDrive />
		if (lowerCategory.includes('keyboard')) return <Keyboard />

		return <Computer /> // Icono por defecto
	}

	const isComputer = ['computadoras', 'laptops', 'all in one', 'servidores'].includes(
		device.categoryName?.toLowerCase() ?? ''
	)
	const isHardDrive = ['disco'].includes(device.categoryName?.toLowerCase() ?? '')

	return (
		<div className="flex w-full gap-4 rounded-lg border p-3 shadow-lg sm:w-auto md:min-w-[350px]">
			<div className="text-azul">{getDeviceIcon(device.categoryName)}</div>
			<div className="flex-grow">
				<Typography variant="p" className="font-semibold">
					{device.categoryName ?? 'Categoría'} - {device.modelName ?? 'Modelo'}
				</Typography>
				<div className="grid grid-cols-1 gap-x-4 text-sm text-gray-500">
					<ShipmentDeviceCardDetails label="Marca" value={device.brandName} />
					<ShipmentDeviceCardDetails label="Modelo" value={device.modelName} />
					<ShipmentDeviceCardDetails label="Serial" value={device.serial} />
					<ShipmentDeviceCardDetails label="Activo" value={device.activo} />
					{isComputer && (
						<>
							<ShipmentDeviceCardDetails
								label="Nombre de Equipo"
								value={device.computerName}
							/>
							<ShipmentDeviceCardDetails
								label="Procesador"
								value={device.processorName}
							/>
							<ShipmentDeviceCardDetails
								label="Memoria Ram"
								value={
									device.memoryRamCapacity
										? `${device.memoryRamCapacity} Gb`
										: null
								}
							/>
							<ShipmentDeviceCardDetails
								label="Modulos Ram"
								value={device.memoryRam?.join(' / ')}
							/>
							<ShipmentDeviceCardDetails
								label="Disco Duro"
								value={
									device.hardDriveCapacity
										? `${device.hardDriveCapacity} Gb`
										: null
								}
							/>
							<ShipmentDeviceCardDetails
								label="Tipo de disco"
								value={device.hardDriveType}
							/>
							<ShipmentDeviceCardDetails
								label="Sistema Operativo"
								value={device.operatingSystem}
							/>
							<ShipmentDeviceCardDetails
								label="Arquitectura"
								value={device.operatingSystemArq}
							/>
							<ShipmentDeviceCardDetails
								label="Dirección IP"
								value={device.ipAddress}
							/>
						</>
					)}
					{isHardDrive && (
						<>
							<ShipmentDeviceCardDetails
								label="Estado del disco"
								value={device.health ? `${device.health}%` : null}
							/>
							<ShipmentDeviceCardDetails
								label="Disco Duro"
								value={
									device.hardDriveCapacity
										? `${device.hardDriveCapacity} Gb`
										: null
								}
							/>
							<ShipmentDeviceCardDetails
								label="Tipo de disco"
								value={device.hardDriveType}
							/>
						</>
					)}
				</div>
			</div>
		</div>
	)
}
