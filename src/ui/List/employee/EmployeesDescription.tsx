import { TableCellDescInfo } from '@/components/Table/TableCellDescInfo'
import { TableCellDescription } from '@/components/Table/TableCellDescription'
import { type EmployeeDto } from '@/core/employee/employee/domain/dto/Employee.dto'

interface EmployeeDescriptionProps {
	open: boolean
	employee: EmployeeDto
}

export function EmployeeDescription({ open, employee }: EmployeeDescriptionProps) {
	return (
		<>
			<TableCellDescription
				open={open}
				state={employee}
				stateId={employee.id}
				url={`/employee/edit/${employee.id}`}
				colspan={11}
			>
				<TableCellDescInfo title="Tipo de usuario" text={employee?.type} />
				<TableCellDescInfo title="Activo" text={employee?.isStillWorking ? 'Si' : 'No'} />

				{employee?.cedula && (
					<TableCellDescInfo
						title="Cedula"
						text={`${employee.nationality}-${employee.cedula}`}
					/>
				)}
				<TableCellDescInfo title="Correo eléctronico" text={employee.email ?? ''} />

				<TableCellDescInfo
					title="Centro de Costo"
					text={`${employee?.centroTrabajo?.centroCosto?.id} - ${employee?.centroTrabajo?.centroCosto?.name}`}
				/>

				<TableCellDescInfo
					title="Centro de Trabajo"
					text={`${employee?.centroTrabajoId} - ${employee?.centroTrabajo?.name}`}
				/>

				<TableCellDescInfo
					title="Directiva"
					text={employee?.departamento?.vicepresidenciaEjecutiva?.directiva?.name ?? ''}
				/>
				<TableCellDescInfo
					title="V.P.E"
					text={employee?.departamento?.vicepresidenciaEjecutiva?.name ?? ''}
				/>
				<TableCellDescInfo
					title="Región"
					text={`${employee?.location?.site?.city?.state?.region?.name ?? ''}`}
				/>
				<TableCellDescInfo
					title="Estado"
					text={`${employee?.location?.site?.city?.state?.name ?? ''}`}
				/>
				<TableCellDescInfo
					title="Ciudad"
					text={`${employee?.location?.site?.city?.name ?? ''}`}
				/>
				<TableCellDescInfo title="Ubicación" text={`${employee?.location?.name ?? ''}`} />

				<TableCellDescInfo
					title="Última Actualización"
					text={
						employee.updatedAt ? new Date(employee.updatedAt).toLocaleDateString() : ''
					}
				/>
			</TableCellDescription>
		</>
	)
}
