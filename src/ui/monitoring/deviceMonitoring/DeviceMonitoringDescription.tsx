import { memo } from 'react'
import { TableCellDescription } from '@/components/Table/TableCellDescription'
import { TableCellDescInfo } from '@/components/Table/TableCellDescInfo'
import { type DeviceMonitoringDto } from '@/core/devices/deviceMonitoring/domain/dto/DeviceMonitoring.dto'

interface Props {
	open: boolean
	device: DeviceMonitoringDto
	colSpan: number
	visibleColumns: string[]
}

export const DeviceMonitoringDescription = memo(
	({ open, device, colSpan, visibleColumns }: Props) => {
		return (
			<>
				<TableCellDescription
					open={open}
					state={device}
					stateId={device.id}
					url={`/form/device/edit/${device.id}`}
					colspan={colSpan}
				>
					{device?.employee?.userName && (
						<TableCellDescInfo
							title="Usuario"
							text={device?.employee?.userName ?? ''}
						/>
					)}
					{device?.employee?.name && device?.employee?.lastName && (
						<TableCellDescInfo
							title="Nombre y Apellido"
							text={`${device?.employee?.name ?? ''} ${device?.employee?.lastName ?? ''}`}
						/>
					)}
					{device?.employee?.directiva && (
						<TableCellDescInfo
							title="Directiva"
							text={device?.employee?.directiva?.name ?? ''}
						/>
					)}
					{device?.employee?.vicepresidenciaEjecutiva && (
						<TableCellDescInfo
							title="V.P.E."
							text={device?.employee?.vicepresidenciaEjecutiva?.name ?? ''}
						/>
					)}
					{device?.employee?.vicepresidencia && (
						<TableCellDescInfo
							title="V.P."
							text={device?.employee?.vicepresidencia?.name ?? ''}
						/>
					)}
					{device?.employee?.departamento && (
						<TableCellDescInfo
							title="Departamento"
							text={device?.employee?.departamento?.name ?? ''}
						/>
					)}
					{device?.employee?.cargo && (
						<TableCellDescInfo
							title="Cargo"
							text={device?.employee?.cargo?.name ?? ''}
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
						<TableCellDescInfo title="Ubicación" text={`${device?.location ?? ''}`} />
					)}
				</TableCellDescription>
			</>
		)
	}
)

DeviceMonitoringDescription.displayName = 'DeviceMonitoringDescription'
