import {
	Laptop,
	Printer,
	Monitor,
	Server,
	Computer,
	HardDrive,
	Keyboard,
	Mouse,
	Phone,
	Scan,
	RadioTower,
	Usb,
	Camera,
	Tablet,
	Webcam,
	Speaker,
	Dock,
	PenTool,
	Mic,
	Antenna,
	LaptopMinimalCheck
} from 'lucide-react'
import Typography from '@/shared/ui/Typography'
import { ShipmentDeviceCardDetails } from './ShipmentDeviceCardDetails'
import { type ShipmentDevice } from '@/entities/shipment/domain/dto/Shipment.dto'
import { CategoryOptionsName } from '@/entities/category/domain/entity/CategoryOptionsName'

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

		if (lowerCategory.includes(CategoryOptionsName.COMPUTER.toLowerCase())) return <Computer />
		if (lowerCategory.includes(CategoryOptionsName.SERVER.toLowerCase())) return <Server />
		if (lowerCategory.includes(CategoryOptionsName.LAPTOP.toLowerCase())) return <Laptop />
		if (lowerCategory.includes(CategoryOptionsName.ALLINONE.toLowerCase()))
			return <LaptopMinimalCheck />
		if (lowerCategory.includes(CategoryOptionsName.MONITOR.toLowerCase())) return <Monitor />
		if (lowerCategory.includes(CategoryOptionsName.FINANTIALPRINTER.toLowerCase()))
			return <Printer />
		if (lowerCategory.includes(CategoryOptionsName.LASERPRINTER.toLowerCase()))
			return <Printer />
		if (lowerCategory.includes(CategoryOptionsName.INKPRINTER.toLowerCase())) return <Printer />
		if (lowerCategory.includes(CategoryOptionsName.HARDDRIVE.toLowerCase()))
			return <HardDrive />
		if (lowerCategory.includes(CategoryOptionsName.KEYBOARD.toLowerCase())) return <Keyboard />
		if (lowerCategory.includes(CategoryOptionsName.MOUSE.toLowerCase())) return <Mouse />
		if (lowerCategory.includes(CategoryOptionsName.BAM.toLowerCase())) return <Antenna />
		if (lowerCategory.includes(CategoryOptionsName.MFP.toLowerCase())) return <Printer />
		if (lowerCategory.includes(CategoryOptionsName.PHONE.toLowerCase())) return <Phone />
		if (lowerCategory.includes(CategoryOptionsName.SCANNER.toLowerCase())) return <Scan />
		if (lowerCategory.includes(CategoryOptionsName.ANTENAS.toLowerCase())) return <RadioTower />
		if (lowerCategory.includes(CategoryOptionsName.CABLEUSB.toLowerCase())) return <Usb />
		if (lowerCategory.includes(CategoryOptionsName.CAMARAS.toLowerCase())) return <Camera />
		if (lowerCategory.includes(CategoryOptionsName.IPAD.toLowerCase())) return <Tablet />
		if (lowerCategory.includes(CategoryOptionsName.WEBCAM.toLowerCase())) return <Webcam />
		if (lowerCategory.includes(CategoryOptionsName.CORNETAS.toLowerCase())) return <Speaker />
		if (lowerCategory.includes(CategoryOptionsName.DOCKING.toLowerCase())) return <Dock />
		if (lowerCategory.includes(CategoryOptionsName.LAPIZOPTICO.toLowerCase()))
			return <PenTool />
		if (lowerCategory.includes(CategoryOptionsName.CONVERTIDORVGAHDMI.toLowerCase()))
			return <Monitor />
		if (lowerCategory.includes(CategoryOptionsName.MIC.toLowerCase())) return <Mic />

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
