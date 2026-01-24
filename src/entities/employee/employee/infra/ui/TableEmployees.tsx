import { lazy, memo, Suspense } from 'react'
import { useTableGenericDeviceBody } from '@/entities/devices/devices/infra/ui/DeviceTable/useTableGenericDeviceBody'
import { formatearTelefono } from '@/shared/lib/utils/formatearTelefono'
import { type EmployeeDto } from '@/entities/employee/employee/domain/dto/Employee.dto'

const TableRow = lazy(() =>
	import('@/shared/ui/Table/TableRow').then(m => ({ default: m.TableRow }))
)
const TableCell = lazy(() =>
	import('@/shared/ui/Table/TableCell').then(m => ({ default: m.TableCell }))
)
const TableCellError = lazy(() =>
	import('@/shared/ui/Table/TableCellError').then(m => ({ default: m.TableCellError }))
)
const TableCellEmpty = lazy(() =>
	import('@/shared/ui/Table/TableCellEmpty').then(m => ({ default: m.TableCellEmpty }))
)
const TableCellOpenIcon = lazy(() =>
	import('@/shared/ui/Table/TableCellOpenIcon').then(m => ({ default: m.TableCellOpenIcon }))
)
const Dialog = lazy(() => import('@/shared/ui/Modal/Modal').then(m => ({ default: m.Dialog })))
const DetailsEmployeeModal = lazy(() =>
	import('./DetailsEmployeeModal').then(m => ({ default: m.DetailsEmployeeModal }))
)
interface TableEmployeesProps {
	employees?: EmployeeDto[]
	isError: boolean
}

/**
 * `TableEmployees` is a memoized component that renders a table of employee data.
 * It handles displaying loading states, error states, empty states, and individual employee rows
 * with expandable details.
 */
export const TableEmployees = memo(({ employees, isError }: TableEmployeesProps) => {
	const { dialogRef, handleCloseModal, handleViewDetails, selectedDevice } =
		useTableGenericDeviceBody<EmployeeDto>()
	if (isError) {
		return <TableCellError />
	}
	if (employees && employees.length === 0) {
		return <TableCellEmpty />
	}

	return (
		<>
			{employees?.map(employee => (
				<TableRow key={employee.id}>
					<TableCell
						className="hidden xl:table-cell"
						aria-colindex={1}
						size="xxSmall"
						value={employee?.employeeCode ?? ''}
					>
						{employee?.employeeCode ?? ''}
					</TableCell>

					<TableCell aria-colindex={2} size="small" value={employee?.userName}>
						{employee?.userName}
					</TableCell>

					<TableCell
						className="1md:table-cell hidden"
						aria-colindex={3}
						size="small"
						value={employee?.name ?? ''}
					>
						{employee?.name ?? ''}
					</TableCell>

					<TableCell
						className="1md:table-cell hidden"
						aria-colindex={4}
						size="small"
						value={employee?.lastName ?? ''}
					>
						{employee?.lastName ?? ''}
					</TableCell>

					<TableCell
						className="hidden lg:table-cell"
						aria-colindex={5}
						size="xLarge"
						value={employee?.departamento?.name ?? ''}
					>
						{employee?.departamento?.name ?? ''}
					</TableCell>

					<TableCell
						className="hidden xl:table-cell"
						aria-colindex={6}
						size="xLarge"
						value={employee?.cargo?.name ?? ''}
					>
						{employee?.cargo?.name ?? ''}
					</TableCell>

					<TableCell
						aria-colindex={7}
						size="small"
						value={employee.phone ? formatearTelefono(employee?.phone[0]) : ''}
					>
						{employee.phone ? formatearTelefono(employee?.phone[0]) : ''}
					</TableCell>

					<TableCell
						aria-colindex={8}
						size="small"
						value={employee.extension ? formatearTelefono(employee?.extension[0]) : ''}
					>
						{employee.extension ? formatearTelefono(employee?.extension[0]) : ''}
					</TableCell>

					<TableCellOpenIcon index={9} onClick={() => handleViewDetails(employee)} />
				</TableRow>
			))}
			<Dialog ref={dialogRef}>
				{selectedDevice && (
					<Suspense>
						<DetailsEmployeeModal
							onClose={handleCloseModal}
							employee={selectedDevice}
						/>
					</Suspense>
				)}
			</Dialog>
		</>
	)
})
