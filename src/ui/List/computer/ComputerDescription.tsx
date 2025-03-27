import { memo } from 'react'
import { TableCellDescription } from '@/components/Table/TableCellDescription'
import { TableCellDescInfo } from '@/components/Table/TableCellDescInfo'
import { getRelativeTime } from '@/utils/getRelativeTime'
import { convertNumberMiles } from '@/utils/convertNumberMiles'
import { type DeviceDto } from '@/core/devices/devices/domain/dto/Device.dto'

interface Props {
	open: boolean
	device: DeviceDto
	colSpan: number
}

export const ComputerDescription = memo(({ open, device, colSpan }: Props) => {
	return (
		<>
			<TableCellDescription
				open={open}
				state={device}
				stateId={device.id}
				url={`/device/edit/${device.id}`}
				colspan={colSpan}
			>
				<TableCellDescInfo title="Estatus" text={device.status?.name ?? ''} />
				<TableCellDescInfo title="Activo" text={device.activo ?? 'Sin Activo'} />

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
				<TableCellDescInfo title="Sitio" text={`${device?.location?.site?.name ?? ''}`} />

				{device.employee?.name && (
					<>
						<TableCellDescInfo
							title="Nombre y Apellido"
							text={`${device?.employee?.name ?? ''} ${
								device?.employee?.lastName ?? ''
							}`}
						/>
						<TableCellDescInfo
							title="Código de empleado"
							text={`${device?.employee?.employeeCode ?? ''}`}
						/>
						<TableCellDescInfo
							title="Cédula"
							text={`${device?.employee.nationality ?? ''}-${
								convertNumberMiles(device?.employee?.cedula) ?? ''
							}`}
						/>
					</>
				)}
				{device.employee?.name && (
					<>
						<TableCellDescInfo
							title="Directiva"
							text={
								device?.employee?.departamento?.vicepresidenciaEjecutiva?.directiva
									?.name ?? ''
							}
						/>
						<TableCellDescInfo
							title="V.P.E."
							text={
								device?.employee?.departamento?.vicepresidenciaEjecutiva?.name ?? ''
							}
						/>
						<TableCellDescInfo
							title="Departamento"
							text={device?.employee?.departamento?.name ?? ''}
						/>
						<TableCellDescInfo
							title="Cargo"
							text={device?.employee?.cargo?.name ?? ''}
						/>
					</>
				)}

				<div className="md:grid md:grid-cols-2 md:grid-rows-2 md:gap-2">
					<TableCellDescInfo
						title="Procesador"
						className="col-span-2"
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
				</div>
				<div className="md:grid md:grid-cols-2 md:grid-rows-2 md:gap-2">
					<TableCellDescInfo
						title="Memoria Ram"
						className="md:col-span-2"
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
				</div>
				<div className="md:grid md:grid-cols-1 gap-2">
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
				</div>

				<div className="md:grid md:grid-cols-1 gap-2">
					<TableCellDescInfo
						title="Sistema Operativo"
						text={device?.computer?.operatingSystem?.name ?? 'No Aplica'}
					/>
					<TableCellDescInfo
						title="Arquitectura"
						text={device?.computer?.operatingSystemArq?.name ?? 'No Aplica'}
					/>
				</div>

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
})
