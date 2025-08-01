import { memo } from 'react'
import { TableCellDescription } from '@/shared/ui/Table/TableCellDescription'
import { TableCellDescInfo } from '@/shared/ui/Table/TableCellDescInfo'
import { getRelativeTime } from '@/shared/lib/utils/getRelativeTime'
import { convertNumberMiles } from '@/shared/lib/utils/convertNumberMiles'
import { type DeviceDto } from '@/entities/devices/devices/domain/dto/Device.dto'
import { formatearTelefono } from '@/shared/lib/utils/formatearTelefono'

interface Props {
	open: boolean
	device: DeviceDto
	colSpan: number
	visibleColumns: string[]
}

export const ComputerDescription = memo(({ open, device, colSpan, visibleColumns }: Props) => {
	return (
		<>
			<TableCellDescription
				open={open}
				state={device}
				stateId={device.id}
				url={`/form/device/edit/${device.id}`}
				colspan={colSpan}
			>
				<TableCellDescInfo title="Estatus" text={device.status?.name ?? ''} />
				<TableCellDescInfo title="Activo" text={device.activo ?? 'Sin Activo'} />

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
						<TableCellDescInfo
							title="Directiva"
							text={device?.employee?.directiva?.name ?? ''}
						/>
						<TableCellDescInfo
							title="V.P.E."
							text={device?.employee?.vicepresidenciaEjecutiva?.name ?? ''}
						/>
						<TableCellDescInfo
							title="V.P."
							text={device?.employee?.vicepresidencia?.name ?? ''}
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
				{device.employee?.extension && device.employee?.extension.length > 0 && (
					<TableCellDescInfo
						title="Extensiones"
						text={device.employee?.extension
							?.map(ext => formatearTelefono(ext))
							.join('  ')}
					/>
				)}
				{device.employee?.phone && device.employee?.phone.length > 0 && (
					<TableCellDescInfo
						title="Teléfono"
						text={device.employee?.phone?.map(tel => formatearTelefono(tel)).join('  ')}
					/>
				)}

				{device?.location?.site?.city?.state?.region?.name && (
					<TableCellDescInfo
						title="Región"
						text={`${device?.location?.site?.city?.state?.region?.name ?? ''}`}
					/>
				)}
				{device?.location?.site.city.state.name && (
					<TableCellDescInfo
						title="Estado"
						text={`${device?.location?.site.city.state.name ?? ''}`}
					/>
				)}
				{device?.location?.site.city.name && (
					<TableCellDescInfo
						title="Ciudad"
						text={`${device?.location?.site.city.name ?? ''}`}
					/>
				)}
				{device?.location?.site?.name && (
					<TableCellDescInfo
						title="Sitio"
						text={`${device?.location?.site?.name ?? ''}`}
					/>
				)}
				{!visibleColumns.includes('locationId') && (
					<TableCellDescInfo title="Ubicación" text={`${device?.locationId ?? ''}`} />
				)}

				{!visibleColumns.includes('categoryId') && (
					<TableCellDescInfo title="Categoria" text={device.category.name ?? ''} />
				)}
				{!visibleColumns.includes('brandId') && (
					<TableCellDescInfo title="Marca" text={device.brand.name ?? ''} />
				)}
				{!visibleColumns.includes('modelId') && (
					<TableCellDescInfo title="Modelo" text={device.model.name ?? ''} />
				)}
				{!visibleColumns.includes('computerName') && device.computer?.computerName && (
					<TableCellDescInfo
						title="Nombre de Equipo"
						text={device.computer?.computerName}
					/>
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
						text={device.computer ? `${device?.computer?.processor?.entitiess}` : ''}
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
				<div className="gap-2 md:grid md:grid-cols-1">
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

				<div className="gap-2 md:grid md:grid-cols-1">
					<TableCellDescInfo
						title="Sistema Operativo"
						text={device?.computer?.operatingSystem?.name ?? 'No Aplica'}
					/>
					<TableCellDescInfo
						title="Arquitectura"
						text={device?.computer?.operatingSystemArq?.name ?? 'No Aplica'}
					/>
				</div>

				{!visibleColumns.includes('observation') && (
					<TableCellDescInfo title="Observación" text={device.observation ?? ''} />
				)}

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
