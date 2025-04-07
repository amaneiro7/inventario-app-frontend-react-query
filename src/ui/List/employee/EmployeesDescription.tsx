import { TableCellDescInfo } from '@/components/Table/TableCellDescInfo'
import { TableCellDescription } from '@/components/Table/TableCellDescription'
import { type EmployeeDto } from '@/core/employee/employee/domain/dto/Employee.dto'
import { getRelativeTime } from '@/utils/getRelativeTime'
import { memo } from 'react'

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
					url={`/employee/edit/${employee.id}`}
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

					{employee?.centroTrabajo?.centroCosto?.id && (
						<TableCellDescInfo
							title="Centro de Costo"
							text={`${employee?.centroTrabajo?.centroCosto?.id} - ${employee?.centroTrabajo?.centroCosto?.name}`}
						/>
					)}

					{employee?.centroTrabajoId && (
						<TableCellDescInfo
							title="Centro de Trabajo"
							text={`${employee?.centroTrabajoId} - ${employee?.centroTrabajo?.name}`}
						/>
					)}

					{employee?.departamento?.vicepresidenciaEjecutiva?.directiva?.name && (
						<TableCellDescInfo
							title="Directiva"
							text={
								employee?.departamento?.vicepresidenciaEjecutiva?.directiva?.name ??
								''
							}
						/>
					)}
					{employee?.departamento?.vicepresidenciaEjecutiva?.name && (
						<TableCellDescInfo
							title="V.P.E"
							text={employee?.departamento?.vicepresidenciaEjecutiva?.name ?? ''}
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
