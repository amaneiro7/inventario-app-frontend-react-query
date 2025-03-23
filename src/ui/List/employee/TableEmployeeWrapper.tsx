import { lazy, memo, Suspense } from 'react'
import { useGetAllEmployees } from '@/core/employee/employee/infra/hook/useGetAllEmployee'
import { EmployeeGetByCriteria } from '@/core/employee/employee/application/EmployeeGetByCriteria'
import { TablePageWrapper } from '@/components/Table/TablePageWrapper'
import { Table } from '@/components/Table/Table'
import { TableBody } from '@/components/Table/TableBody'
import { TableHead } from '@/components/Table/TableHead'
import { TableHeader } from '@/components/Table/TableHeader'
import { TableRow } from '@/components/Table/TableRow'
import { LoadingTable } from '@/components/Table/LoadingTable'
import { PaginationBar } from '../Pagination/PaginationBar'
import { TabsNav } from '../Tab/TabsNav'
import { type EmployeeFilters } from '@/core/employee/employee/application/createEmployeeQueryParams'

interface TableEmployeeWrapperProps {
	query: EmployeeFilters
	handlePageSize: (pageSize: number) => void
	handlePageClick: ({ selected }: { selected: number }) => void
	handleSort: (field: string) => void
}

const TableEmployees = lazy(() =>
	import('@/ui/List/employee/TableEmployees').then(m => ({ default: m.TableEmployees }))
)

export const TableEmployeeWrapper = memo(function ({
	query,
	handlePageSize,
	handlePageClick,
	handleSort
}: TableEmployeeWrapperProps) {
	const { employees, isLoading, isError } = useGetAllEmployees(query)
	const colSpan = 9

	return (
		<>
			<TablePageWrapper>
				<TabsNav
					total={employees?.info?.total}
					pageSize={query.pageSize}
					pageNumber={query.pageNumber}
					defaultPageSize={EmployeeGetByCriteria.defaultPageSize}
				/>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead
								handleSort={handleSort}
								orderBy={query.orderBy}
								orderType={query.orderType}
								orderByField="employeeCode"
								size="xxSmall"
								name="Cod. Empleado"
							/>
							<TableHead
								handleSort={handleSort}
								orderBy={query.orderBy}
								orderType={query.orderType}
								orderByField="userName"
								size="small"
								name="Usuario"
							/>
							<TableHead
								handleSort={handleSort}
								orderBy={query.orderBy}
								orderType={query.orderType}
								orderByField="name"
								size="small"
								name="Nombres"
							/>
							<TableHead
								handleSort={handleSort}
								orderBy={query.orderBy}
								orderType={query.orderType}
								orderByField="lastName"
								size="small"
								name="Apellidos"
							/>
							<TableHead
								handleSort={handleSort}
								orderBy={query.orderBy}
								orderType={query.orderType}
								orderByField="centroTrabajoId"
								size="xxSmall"
								name="Centro Trabajo"
							/>
							<TableHead
								handleSort={handleSort}
								orderBy={query.orderBy}
								orderType={query.orderType}
								orderByField="departamentoId"
								size="xLarge"
								name="Departamento"
							/>
							<TableHead
								handleSort={handleSort}
								orderBy={query.orderBy}
								orderType={query.orderType}
								orderByField="cargoId"
								size="xLarge"
								name="Cargo"
							/>
							<TableHead size="small" name="Teléfono" />
							<TableHead size="small" name="Extensón" />
							<TableHead size="xxSmall" name="" />
						</TableRow>
					</TableHeader>
					<TableBody>
						<Suspense>
							{isLoading && (
								<LoadingTable registerPerPage={query?.pageSize} colspan={colSpan} />
							)}
							{employees !== undefined && (
								<TableEmployees
									colSpan={colSpan}
									isError={isError}
									employees={employees.data}
								/>
							)}
						</Suspense>
					</TableBody>
				</Table>
			</TablePageWrapper>
			{employees && !isLoading && !isError && (
				<PaginationBar
					registerOptions={EmployeeGetByCriteria.pegaSizeOptions}
					totalPages={employees?.info?.totalPage}
					total={employees?.info?.total}
					currentPage={employees?.info?.page}
					pageSize={query.pageSize}
					handlePageClick={handlePageClick}
					handlePageSize={handlePageSize}
				/>
			)}
		</>
	)
})
