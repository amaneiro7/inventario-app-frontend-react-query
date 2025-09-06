import { User, MapPin, Cpu, Server } from 'lucide-react'
import { getRelativeTime } from '@/shared/lib/utils/getRelativeTime'
import { formatearTelefono } from '@/shared/lib/utils/formatearTelefono'
import { convertNumberMiles } from '@/shared/lib/utils/convertNumberMiles'
import { DetailModalWrapper } from '@/shared/ui/DescriptionList/DetailModalWrapper'
import { DetailModalHeader } from '@/shared/ui/DescriptionList/DetailModalHeader'
import { DetailModalContent } from '@/shared/ui/DescriptionList/DetailModalContent'
import { CardDetail } from '@/shared/ui/DescriptionList/CardDetail'
import { DetailItem } from '@/shared/ui/DescriptionList/DetailItem'
import { ModalTitle } from './ModalTitle'
import { type DeviceDto } from '../../../domain/dto/Device.dto'

interface ComputerDetailsModalProps {
	device: DeviceDto
	onCLose: () => void
}

export const ComputerDetailsModal = ({ device, onCLose }: ComputerDetailsModalProps) => {
	if (!device) return null

	const { computer, employee, location, model } = device

	const employeeFullName = employee ? `${employee.name} ${employee.lastName}`.trim() : ''
	const cedula =
		employee?.cedula && employee?.nationality
			? `${employee.nationality}-${convertNumberMiles(employee.cedula)}`
			: ''
	const processor = computer?.processor
		? `${computer.processor.productCollection} ${computer.processor.numberModel}`
		: ''

	return (
		<DetailModalWrapper>
			{/* --- HEADER --- */}
			<DetailModalHeader onClose={onCLose} url={`/form/device/edit/${device.id}`}>
				<ModalTitle
					activo={device.activo}
					category={device.category.name}
					computerName={computer?.computerName}
					serial={device.serial}
					statusId={device.statusId}
					statusName={device.status.name}
				/>
			</DetailModalHeader>

			{/* --- BODY --- */}
			<DetailModalContent>
				{/* --- INFORMACIÓN BÁSICA --- */}
				<CardDetail title="Información General" icon={<Server className="h-5 w-5" />}>
					<DetailItem label="Categoría" value={device.category.name} />
					<DetailItem label="Marca" value={device.brand.name} />
					<DetailItem label="Modelo" value={model.name} />
					<DetailItem label="Observación" value={device.observation} />
					<DetailItem
						label="Última Actualización"
						value={device.updatedAt ? getRelativeTime(device.updatedAt) : ''}
					/>
				</CardDetail>
				{/* --- HARDWARE --- */}
				<CardDetail title="Hardware" icon={<Cpu className="h-5 w-5" />}>
					{computer?.processor && (
						<>
							<DetailItem label="Procesador" value={processor} />
							<div className="grid grid-cols-1 gap-2 md:grid-cols-2">
								<DetailItem
									label="Núcleos"
									value={computer?.processor?.cores?.toString()}
								/>
								<DetailItem
									label="Frecuencia"
									value={computer?.processor?.frequency}
								/>
							</div>
						</>
					)}
					<div className="grid grid-cols-1 items-start justify-start gap-2 md:grid-cols-2">
						<DetailItem
							label="Memoria RAM"
							value={`${computer?.memoryRamCapacity ?? ''} GB`}
						/>
						<DetailItem
							label="Módulos de RAM"
							value={
								device.computer
									? device?.computer?.memoryRam?.map(mem => mem).join(' / ')
									: ''
							}
						/>
						<DetailItem
							label="Tipo de RAM"
							value={
								device?.model?.modelComputer
									? device?.model?.modelComputer?.memoryRamType?.name
									: device?.model?.modelLaptop
										? device?.model?.modelLaptop?.memoryRamType?.name
										: ''
							}
						/>
					</div>
					<div className="grid grid-cols-1 gap-2 md:grid-cols-2">
						<DetailItem
							label="Disco Duro"
							value={
								computer?.hardDriveCapacity
									? `${computer?.hardDriveCapacity?.name} GB`
									: 'Sin Disco'
							}
						/>
						{computer?.hardDriveCapacity && (
							<DetailItem
								label="Tipo de Disco"
								value={computer?.hardDriveType?.name}
							/>
						)}
					</div>
					{computer?.operatingSystem && (
						<div className="grid grid-cols-1 gap-2 md:grid-cols-2">
							<DetailItem
								label="Sistema Operativo"
								value={computer?.operatingSystem?.name}
							/>
							<DetailItem
								label="Arquitectura"
								value={computer?.operatingSystemArq?.name}
							/>
						</div>
					)}
					<div className="grid grid-cols-1 gap-2 md:grid-cols-2">
						{computer?.ipAddress && (
							<DetailItem
								className="font-mono"
								label="Dirección IP"
								value={computer?.ipAddress}
							/>
						)}
						{computer?.macAddress && (
							<DetailItem
								className="font-mono"
								label="Dirección MAC"
								value={computer.macAddress}
							/>
						)}
					</div>
				</CardDetail>
				{/* --- UBICACIÓN --- */}
				<CardDetail title="Ubicación" icon={<MapPin className="h-5 w-5" />}>
					<DetailItem label="Tipo de Sitio" value={location?.typeOfSite?.name} />
					<div className="grid grid-cols-1 gap-2 md:grid-cols-2">
						<DetailItem
							label="Zona"
							value={location?.site?.city?.state?.region?.administratveRegion?.name}
						/>
						<DetailItem
							label="Región"
							value={location?.site?.city?.state?.region.name}
						/>
					</div>
					<div className="grid grid-cols-1 gap-2 md:grid-cols-2">
						<DetailItem label="Estado" value={location?.site?.city?.state?.name} />
						<DetailItem label="Ciudad" value={location?.site?.city?.name} />
					</div>

					<DetailItem label="Sitio" value={location?.site?.name} />
					<DetailItem label="Ubicación" value={location?.name} />
				</CardDetail>
				{employee && (
					<CardDetail title="Usuario Asignado" icon={<User className="h-5 w-5" />}>
						<DetailItem label="Usuario" value={employee.userName} />
						{employee.name && <DetailItem label="Nombre" value={employeeFullName} />}
						<div className="grid grid-cols-1 gap-2 md:grid-cols-2">
							{employee.employeeCode && (
								<DetailItem label="Cod. Empleado" value={employee.employeeCode} />
							)}
							{employee.cedula && <DetailItem label="Cédula" value={cedula} />}
						</div>
						{employee.directiva && (
							<DetailItem label="Directiva" value={employee.directiva?.name} />
						)}
						{employee.vicepresidenciaEjecutiva && (
							<DetailItem
								label="V.P.E"
								value={employee.vicepresidenciaEjecutiva?.name}
							/>
						)}
						{employee.vicepresidencia && (
							<DetailItem label="V.P." value={employee.vicepresidencia?.name} />
						)}
						{employee.departamento && (
							<DetailItem label="Departamento" value={employee.departamento?.name} />
						)}
						{employee.cargo && (
							<DetailItem label="Cargo" value={employee.cargo?.name} />
						)}
						<DetailItem
							label="Extensiones"
							value={employee.extension
								?.map(ext => formatearTelefono(ext))
								.join('  ')}
						/>
						<DetailItem
							label="Teléfono"
							value={employee.phone?.map(ext => formatearTelefono(ext)).join('  ')}
						/>
					</CardDetail>
				)}
			</DetailModalContent>
		</DetailModalWrapper>
	)
}
