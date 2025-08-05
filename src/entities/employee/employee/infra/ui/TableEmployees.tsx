import React, { memo } from 'react'
import { useExpendedRows } from '@/shared/lib/hooks/useExpendedRows'
import { TableRow } from '@/shared/ui/Table/TableRow'
import { TableCell } from '@/shared/ui/Table/TableCell'
import { TableCellError } from '@/shared/ui/Table/TableCellError'
import { TableCellEmpty } from '@/shared/ui/Table/TableCellEmpty'
import { TableCellOpenIcon } from '@/shared/ui/Table/TableCellOpenIcon'
import { EmployeeDescription } from '@/entities/employee/employee/infra/ui/EmployeesDescription'
import { formatearTelefono } from '@/shared/lib/utils/formatearTelefono'
import { type EmployeeDto } from '@/entities/employee/employee/domain/dto/Employee.dto'

interface TableEmployeesProps {
	/**
	 * An array of employee data to display in the table.
	 */
	employees?: EmployeeDto[]
	/**
	 * Indicates whether an error occurred during data fetching.
	 */
	isError: boolean
	/**
	 * The number of columns the table should span.
	 */
	colSpan: number
	/**
	 * An array of column names that are currently visible in the table.
	 * Used to conditionally render table cells.
	 */
	visibleColumns: string[]
}

/**
 * `TableEmployees` is a memoized component that renders a table of employee data.
 * It handles displaying loading states, error states, empty states, and individual employee rows
 * with expandable details.
 */
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
									'[&>td]:border-b-slate-200 [&>td]:bg-slate-200'
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
										value={formatearTelefono(employee?.phone[0])}
									/>
								) : null}
								{visibleColumns.includes('extension') ? (
									<TableCell
										size="small"
										value={formatearTelefono(employee?.extension[0])}
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