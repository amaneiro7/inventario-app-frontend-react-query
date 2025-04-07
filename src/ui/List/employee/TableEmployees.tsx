import React, { memo } from 'react'
import { useExpendedRows } from '@/hooks/utils/useExpendedRows'
import { TableRow } from '@/components/Table/TableRow'
import { TableCell } from '@/components/Table/TableCell'
import { TableCellError } from '@/components/Table/TableCellError'
import { TableCellEmpty } from '@/components/Table/TableCellEmpty'
import { TableCellOpenIcon } from '@/components/Table/TableCellOpenIcon'
import { EmployeeDescription } from './EmployeesDescription'
import { type EmployeeDto } from '@/core/employee/employee/domain/dto/Employee.dto'

interface TableEmployeesProps {
	employees?: EmployeeDto[]
	isError: boolean
	colSpan: number
	visibleColumns: string[]
}

export const TableEmployees = memo(
	({ employees, isError, colSpan, visibleColumns }: TableEmployeesProps) => {
		const { expandedRows, handleRowClick } = useExpendedRows()

		if (isError) {
			return <TableCellError colSpan={colSpan} />
		}
		if (employees && employees.length === 0) {
			return <TableCellEmpty colSpan={colSpan} />
		}

		return (
			<>
				{employees !== undefined &&
					employees.map(employee => (
						<React.Fragment key={employee.id}>
							<TableRow
								className={`[&>td]:cursor-pointer ${
									expandedRows.includes(employee.id) &&
									'[&>td]:bg-slate-200 [&>td]:border-b-slate-200'
								}`}
								onClick={() => handleRowClick(employee.id)}
							>
								{visibleColumns.includes('employeeCode') ? (
									<TableCell
										size="xxSmall"
										value={employee?.employeeCode ?? ''}
									/>
								) : null}
								{visibleColumns.includes('userName') ? (
									<TableCell size="small" value={employee?.userName} />
								) : null}
								{visibleColumns.includes('name') ? (
									<TableCell size="small" value={employee?.name ?? ''} />
								) : null}
								{visibleColumns.includes('lastName') ? (
									<TableCell size="small" value={employee?.lastName ?? ''} />
								) : null}
								{visibleColumns.includes('centroTrabajoId') ? (
									<TableCell
										size="xxSmall"
										value={employee?.centroTrabajoId ?? ''}
									/>
								) : null}
								{visibleColumns.includes('departamentoId') ? (
									<TableCell
										size="xLarge"
										value={employee?.departamento?.name ?? ''}
									/>
								) : null}
								{visibleColumns.includes('cargoId') ? (
									<TableCell size="xLarge" value={employee?.cargo?.name ?? ''} />
								) : null}
								{visibleColumns.includes('phone') ? (
									<TableCell
										size="small"
										value={employee?.phone?.map(tel => tel).join(', ')}
									/>
								) : null}
								{visibleColumns.includes('extension') ? (
									<TableCell
										size="small"
										value={employee?.extension?.map(ext => ext).join(', ')}
									/>
								) : null}
								<TableCellOpenIcon open={expandedRows.includes(employee.id)} />
							</TableRow>

							<EmployeeDescription
								open={expandedRows.includes(employee.id)}
								employee={employee}
								colSpan={colSpan}
								visibleColumns={visibleColumns}
							/>
						</React.Fragment>
					))}
			</>
		)
	}
)
