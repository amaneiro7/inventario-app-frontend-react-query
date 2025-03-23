import { TableCellDescInfo } from '@/components/Table/TableCellDescInfo'
import { TableCellDescription } from '@/components/Table/TableCellDescription'
import { TableDescDivider } from '@/components/Table/TableDescDivider'
import { getRelativeTime } from '@/utils/getRelativeTime'
import { type DeviceDto } from '@/core/devices/devices/domain/dto/Device.dto'

interface Props {
	open: boolean
	device: DeviceDto
}

export function FinantialPrinterDescription({ open, device }: Props) {
	return (
		<>
			<TableCellDescription
				open={open}
				state={device}
				stateId={device.id}
				url={`/device/edit/${device.id}`}
				colspan={7}
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
