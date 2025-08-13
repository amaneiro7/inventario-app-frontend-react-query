import { lazy, memo } from 'react'
import { getRelativeTime } from '@/shared/lib/utils/getRelativeTime'
import { convertNumberMiles } from '@/shared/lib/utils/convertNumberMiles'
import { type DeviceDto } from '@/entities/devices/devices/domain/dto/Device.dto'

const TableCellDescInfo = lazy(() =>
	import('@/shared/ui/Table/TableCellDescInfo').then(m => ({ default: m.TableCellDescInfo }))
)

const TableCellDescription = lazy(() =>
	import('@/shared/ui/Table/TableCellDescription').then(m => ({
		default: m.TableCellDescription
	}))
)

interface PartsDescriptionProps {
	open: boolean
	device: DeviceDto
	colSpan: number
	visibleColumns: string[]
}

export const PartsDescription = memo(
	({ open, device, colSpan, visibleColumns }: PartsDescriptionProps) => {
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
	}
)

PartsDescription.displayName = 'PartsDescription'
