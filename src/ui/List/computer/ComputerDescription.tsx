import { lazy } from 'react'
import { type DeviceDto } from '@/core/devices/devices/domain/dto/Device.dto'
import { getRelativeTime } from '@/utils/getRelativeTime'

interface Props {
	open: boolean
	device: DeviceDto
}

const TableCellDescInfo = lazy(async () =>
	import('@/components/Table/TableCellDescInfo').then(m => ({
		default: m.TableCellDescInfo
	}))
)
const TableCellDescription = lazy(async () =>
	import('@/components/Table/TableCellDescription').then(m => ({
		default: m.TableCellDescription
	}))
)
const TableDescDivider = lazy(async () =>
	import('@/components/Table/TableDescDivider').then(m => ({
		default: m.TableDescDivider
	}))
)

export function ComputerDescription({ open, device }: Props) {
	return (
		<>
			<TableCellDescription
				open={open}
				state={device}
				stateId={device.id}
				url={`/device/edit/${device.id}`}
				colspan={10}
			>
				<TableDescDivider label="Información básica">
					<TableCellDescInfo title="Estatus" text={device.status?.name ?? ''} />
					<TableCellDescInfo title="Activo" text={device.activo ?? 'Sin Activo'} />
				</TableDescDivider>

				{device.employee?.name && (
					<TableDescDivider label="Información de usuario">
						<TableCellDescInfo
							title="Nombre y Apellido"
							text={`${device?.employee?.name ?? ''} ${
								device?.employee?.lastName ?? ''
							}`}
						/>

						<TableCellDescInfo
							title="Area"
							text={device?.employee?.departamento?.name ?? ''}
						/>
						<TableCellDescInfo
							title="Cargo"
							text={device?.employee?.cargo?.name ?? ''}
						/>
						<TableCellDescInfo
							title="Código de empleado"
							text={`${device?.employee?.employeeCode ?? ''}`}
						/>
						<TableCellDescInfo
							title="Cédula"
							text={`${device?.employee?.cedula ?? ''}`}
						/>
					</TableDescDivider>
				)}

				<TableDescDivider label="Información de ubicación">
					<TableCellDescInfo
						title="Región"
						text={`${device?.location?.site.city.state.region.name ?? ''}`}
					/>
					<TableCellDescInfo
						title="Estado"
						text={`${device?.location?.site.city.state.name ?? ''}`}
					/>
					<TableCellDescInfo
						title="Ciudad"
						text={`${device?.location?.site.city.name ?? ''}`}
					/>
				</TableDescDivider>

				<TableDescDivider label="Procesador">
					<TableCellDescInfo
						title="Procesador"
						text={
							device.computer
								? `${device?.computer?.processor?.productCollection} ${device?.computer?.processor?.numberModel}`
								: ''
						}
					/>

					<TableCellDescInfo
						title="Nucleos"
						text={device.computer ? `${device?.computer?.processor?.cores}` : ''}
					/>
					<TableCellDescInfo
						title="Frecuencia"
						text={device.computer ? `${device?.computer?.processor?.frequency}` : ''}
					/>
				</TableDescDivider>

				<TableDescDivider label="Memoria Ram">
					<TableCellDescInfo
						title="Memoria Ram"
						text={device.computer ? `${device?.computer?.memoryRamCapacity} Gb` : ''}
					/>
					<TableCellDescInfo
						title="Modulos"
						text={
							device.computer
								? device?.computer?.memoryRam?.map(mem => mem).join(' / ')
								: ''
						}
					/>

					<TableCellDescInfo
						title="Tipo"
						text={
							device?.model?.modelComputer
								? device?.model?.modelComputer?.memoryRamType?.name
								: device?.model?.modelLaptop
								? device?.model?.modelLaptop?.memoryRamType?.name
								: ''
						}
					/>
				</TableDescDivider>
				<TableDescDivider label="Disco Duro">
					<TableCellDescInfo
						title="Disco Duro"
						text={
							device?.computer?.hardDriveCapacity
								? `${device?.computer?.hardDriveCapacity?.name} Gb`
								: 'Sin Disco'
						}
					/>
					<TableCellDescInfo
						title="Tipo"
						text={device?.computer?.hardDriveType?.name ?? 'No Aplica'}
					/>
				</TableDescDivider>
				<TableDescDivider label="Sistema Operativo">
					<TableCellDescInfo
						title="Sistema Operativo"
						text={device?.computer?.operatingSystem?.name ?? 'No Aplica'}
					/>
					<TableCellDescInfo
						title="Arquitectura"
						text={device?.computer?.operatingSystemArq?.name ?? 'No Aplica'}
					/>
				</TableDescDivider>
				<TableCellDescInfo
					title="Última Actualización"
					text={
						device.updatedAt
							? `${new Date(
									device.updatedAt
							  ).toLocaleDateString()} (${getRelativeTime(device.updatedAt)})`
							: 'Sin Actualización'
					}
				/>
			</TableCellDescription>
		</>
	)
}
