import { lazy } from 'react'
import { type DeviceDto } from '@/core/devices/devices/domain/dto/Device.dto'

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

export function PrinterDescription({ open, device }: Props) {
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
				<TableDescDivider label="Información de impresora">
					<TableCellDescInfo
						title="Dirección de IP"
						text={`${device?.mfp?.ipAddress ?? ''}`}
					/>
				</TableDescDivider>

				<TableCellDescInfo
					title="Última Actualización"
					text={device.updatedAt ? new Date(device.updatedAt).toLocaleDateString() : ''}
				/>
			</TableCellDescription>
		</>
	)
}
