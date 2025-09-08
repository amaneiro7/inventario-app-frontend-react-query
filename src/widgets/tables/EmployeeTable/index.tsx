import { lazy, memo, Suspense, useMemo } from 'react'
import { useGetAllEmployees } from '@/entities/employee/employee/infra/hook/useGetAllEmployee'
import { eventManager } from '@/shared/lib/utils/eventManager'
import { EmployeeGetByCriteria } from '@/entities/employee/employee/application/EmployeeGetByCriteria'
import { EmployeeTableLoading } from './EmployeeTableLoading'
import { type EmployeeFilters } from '@/entities/employee/employee/application/createEmployeeQueryParams'

const Table = lazy(() => import('@/shared/ui/Table/Table').then(m => ({ default: m.Table })))
const TableBody = lazy(() =>
	import('@/shared/ui/Table/TableBody').then(m => ({ default: m.TableBody }))
)
const TableHead = lazy(() =>
	import('@/shared/ui/Table/TableHead').then(m => ({ default: m.TableHead }))
)
const TableHeader = lazy(() =>
	import('@/shared/ui/Table/TableHeader').then(m => ({ default: m.TableHeader }))
)
const TablePageWrapper = lazy(() =>
	import('@/shared/ui/Table/TablePageWrapper').then(m => ({ default: m.TablePageWrapper }))
)
const TableRow = lazy(() =>
	import('@/shared/ui/Table/TableRow').then(m => ({ default: m.TableRow }))
)

const TabsNav = lazy(() => import('@/shared/ui/Tabs/TabsNav').then(m => ({ default: m.TabsNav })))

const PaginationBar = lazy(() =>
	import('@/shared/ui/Pagination/PaginationBar').then(m => ({ default: m.PaginationBar }))
)

interface TableEmployeeWrapperProps {
	query: EmployeeFilters
	handlePageSize: (pageSize: number) => void
	handlePageClick: ({ selected }: { selected: number }) => void
	handleSort: (field: string) => Promise<void>
}

const TableEmployees = lazy(() =>
	import('@/entities/employee/employee/infra/ui/TableEmployees').then(m => ({
		default: m.TableEmployees
	}))
)

export const TableEmployeeWrapper = memo(function ({
	query,
	handlePageSize,
	handlePageClick,
	handleSort
}: TableEmployeeWrapperProps) {
	const { data: employees, isLoading, isError } = useGetAllEmployees(query)

	const SkeletonFallback = useMemo(() => {
		return Array.from({
			length: query.pageSize ?? EmployeeGetByCriteria.defaultPageSize
		}).map((_, index) => <EmployeeTableLoading key={`loader-${index}`} />)
	}, [query.pageSize, EmployeeGetByCriteria.defaultPageSize])

	return (
		<>
			<TablePageWrapper>
				<TabsNav
					isLoading={isLoading}
					total={employees?.info?.total}
					pageSize={query.pageSize}
					pageNumber={query.pageNumber}
					defaultPageSize={EmployeeGetByCriteria.defaultPageSize}
				/>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead
								aria-colindex={1}
								handleSort={eventManager(handleSort)}
								orderBy={query.orderBy}
								orderType={query.orderType}
								orderByField="employeeCode"
								size="xxSmall"
								className="hidden xl:table-cell"
							>
								Cod. Empleado
							</TableHead>
							<TableHead
								aria-colindex={2}
								handleSort={eventManager(handleSort)}
								orderBy={query.orderBy}
								orderType={query.orderType}
								orderByField="userName"
								size="small"
							>
								Usuario
							</TableHead>
							<TableHead
								aria-colindex={3}
								handleSort={eventManager(handleSort)}
								orderBy={query.orderBy}
								orderType={query.orderType}
								orderByField="name"
								size="small"
								className="2md:table-cell hidden"
							>
								Nombres
							</TableHead>
							<TableHead
								aria-colindex={4}
								handleSort={eventManager(handleSort)}
								orderBy={query.orderBy}
								orderType={query.orderType}
								orderByField="lastName"
								size="small"
								className="2md:table-cell hidden"
							>
								Apellidos
							</TableHead>
							<TableHead
								aria-colindex={5}
								handleSort={eventManager(handleSort)}
								orderBy={query.orderBy}
								orderType={query.orderType}
								orderByField="departamentoId"
								size="xLarge"
								className="hidden lg:table-cell"
							>
								Departamento
							</TableHead>
							<TableHead
								aria-colindex={6}
								handleSort={eventManager(handleSort)}
								orderBy={query.orderBy}
								orderType={query.orderType}
								orderByField="cargoId"
								size="xLarge"
								className="hidden xl:table-cell"
							>
								Cargo
							</TableHead>
							<TableHead
								aria-colindex={7}
								handleSort={eventManager(handleSort)}
								orderBy={query.orderBy}
								orderType={query.orderType}
								orderByField="phone"
								size="small"
							>
								Teléfono
							</TableHead>
							<TableHead
								aria-colindex={8}
								handleSort={eventManager(handleSort)}
								orderBy={query.orderBy}
								orderType={query.orderType}
								orderByField="extension"
								size="small"
							>
								Extensión
							</TableHead>
							<TableHead aria-colindex={9} isTab size="xSmall">
								<span className="sr-only">Acciones</span>
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<>
							{isLoading && SkeletonFallback}

							{employees !== undefined && (
								<Suspense fallback={SkeletonFallback}>
									<TableEmployees isError={isError} employees={employees.data} />
								</Suspense>
							)}
						</>
					</TableBody>
				</Table>
			</TablePageWrapper>
			{employees && !isLoading && !isError && (
				<PaginationBar
					registerOptions={EmployeeGetByCriteria.pageSizeOptions}
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
