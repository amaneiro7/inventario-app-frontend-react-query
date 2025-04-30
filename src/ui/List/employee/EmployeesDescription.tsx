import { memo } from 'react'
import { formatearTelefono } from '@/utils/formatearTelefono'
import { getRelativeTime } from '@/utils/getRelativeTime'
import { TableCellDescInfo } from '@/components/Table/TableCellDescInfo'
import { TableCellDescription } from '@/components/Table/TableCellDescription'
import { type EmployeeDto } from '@/core/employee/employee/domain/dto/Employee.dto'

interface EmployeeDescriptionProps {
	open: boolean
	employee: EmployeeDto
	colSpan: number
	visibleColumns: string[]
}

export const EmployeeDescription = memo(
	({ open, employee, colSpan, visibleColumns }: EmployeeDescriptionProps) => {
		return (
			<>
				<TableCellDescription
					open={open}
					state={employee}
					stateId={employee.id}
					url={`/form/employee/edit/${employee.id}`}
					colspan={colSpan}
				>
					<TableCellDescInfo title="Tipo de usuario" text={employee?.type} />
					<TableCellDescInfo
						title="Activo"
						text={employee?.isStillWorking ? 'Si' : 'No'}
					/>
					{!visibleColumns.includes('employeeCode') && employee?.employeeCode && (
						<TableCellDescInfo
							title="Cod. de Empleado"
							text={`${employee?.employeeCode}`}
						/>
					)}

					{!visibleColumns.includes('name') && employee?.name && (
						<TableCellDescInfo title="Nombres" text={employee.name} />
					)}
					{!visibleColumns.includes('lastName') && employee?.lastName && (
						<TableCellDescInfo title="Apellidos" text={employee.lastName} />
					)}
					{employee?.cedula && (
						<TableCellDescInfo
							title="Cedula"
							text={`${employee.nationality}-${employee.cedula}`}
						/>
					)}
					<TableCellDescInfo title="Correo eléctronico" text={employee.email ?? ''} />

					{employee?.directiva?.name && (
						<TableCellDescInfo
							title="Directiva"
							text={employee?.directiva?.name ?? ''}
						/>
					)}
					{employee?.vicepresidenciaEjecutiva?.name && (
						<TableCellDescInfo
							title="V.P.E"
							text={employee?.vicepresidenciaEjecutiva?.name ?? ''}
						/>
					)}
					{employee?.vicepresidencia?.name && (
						<TableCellDescInfo
							title="V.P."
							text={employee?.vicepresidencia?.name ?? ''}
						/>
					)}
					{employee?.departamento?.name && !visibleColumns.includes('departamentoId') && (
						<TableCellDescInfo
							title="Departamento"
							text={employee?.departamento?.name ?? ''}
						/>
					)}
					{employee?.cargo?.name && !visibleColumns.includes('cargoId') && (
						<TableCellDescInfo title="Cargo" text={employee?.cargo?.name ?? ''} />
					)}
					{employee?.location?.site?.city?.state?.region?.name && (
						<TableCellDescInfo
							title="Región"
							text={`${employee?.location?.site?.city?.state?.region?.name ?? ''}`}
						/>
					)}
					{employee?.location?.site?.city?.state?.name && (
						<TableCellDescInfo
							title="Estado"
							text={`${employee?.location?.site?.city?.state?.name ?? ''}`}
						/>
					)}
					{employee?.location?.site?.city?.name && (
						<TableCellDescInfo
							title="Ciudad"
							text={`${employee?.location?.site?.city?.name ?? ''}`}
						/>
					)}
					{employee?.location?.name && (
						<TableCellDescInfo
							title="Ubicación"
							text={`${employee?.location?.name ?? ''}`}
						/>
					)}
					{employee?.extension && (
						<TableCellDescInfo
							title="Extensiones"
							text={employee?.extension
								?.map(ext => formatearTelefono(ext))
								.join('  ')}
						/>
					)}
					{employee?.phone && (
						<TableCellDescInfo
							title="Teléfono"
							text={employee?.phone?.map(tel => formatearTelefono(tel)).join('  ')}
						/>
					)}

					<TableCellDescInfo
						title="Última Actualización"
						text={
							employee.updatedAt
								? `${new Date(
										employee.updatedAt
									).toLocaleDateString()} (${getRelativeTime(employee.updatedAt)})`
								: 'Sin Actualización'
						}
					/>
				</TableCellDescription>
			</>
		)
	}
)
