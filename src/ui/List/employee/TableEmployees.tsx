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
}

export const TableEmployees = memo(({ employees, isError, colSpan }: TableEmployeesProps) => {
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
							<TableCell size="xxSmall" value={employee?.employeeCode ?? ''} />
							<TableCell size="small" value={employee?.userName} />
							<TableCell size="small" value={employee?.name ?? ''} />
							<TableCell size="small" value={employee?.lastName ?? ''} />
							<TableCell size="xxSmall" value={employee?.centroTrabajoId ?? ''} />
							<TableCell size="xLarge" value={employee?.departamento?.name ?? ''} />
							<TableCell size="xLarge" value={employee?.cargo?.name ?? ''} />
							<TableCell
								size="small"
								value={employee?.phone?.map(tel => tel).join(', ')}
							/>
							<TableCell
								size="small"
								value={employee?.extension?.map(ext => ext).join(', ')}
							/>
							<TableCellOpenIcon open={expandedRows.includes(employee.id)} />
						</TableRow>

						<EmployeeDescription
							open={expandedRows.includes(employee.id)}
							employee={employee}
						/>
					</React.Fragment>
				))}
		</>
	)
})
