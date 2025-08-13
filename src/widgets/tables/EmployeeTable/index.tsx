import { lazy, memo, Suspense } from 'react'
import { useGetAllEmployees } from '@/entities/employee/employee/infra/hook/useGetAllEmployee'
import { eventManager } from '@/shared/lib/utils/eventManager'
import { useTableDeviceWrapper } from './useTableEmployeeWrapper'
import { EmployeeGetByCriteria } from '@/entities/employee/employee/application/EmployeeGetByCriteria'
import { LoadingTable } from '@/shared/ui/Table/LoadingTable'
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
	const { colSpan, headers, visibleColumns } = useTableDeviceWrapper()

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
							{headers
								.filter(header => header.visible)
								.map((header, index) => (
									<TableHead
										aria-colindex={index}
										key={header.key}
										isTab={header.isTab}
										handleSort={
											header.hasOrder ? eventManager(handleSort) : undefined
										}
										name={header.label}
										orderBy={header.hasOrder ? query.orderBy : undefined}
										orderType={header.hasOrder ? query.orderType : undefined}
										orderByField={header.hasOrder ? header.key : undefined}
										size={header.size}
									/>
								))}
						</TableRow>
					</TableHeader>
					<TableBody>
						<>
							{(isLoading || employees === undefined) && (
								<LoadingTable registerPerPage={query?.pageSize} colspan={colSpan} />
							)}
							{employees !== undefined && (
								<Suspense
									fallback={
										<LoadingTable
											registerPerPage={query?.pageSize}
											colspan={colSpan}
										/>
									}
								>
									<TableEmployees
										colSpan={colSpan}
										isError={isError}
										employees={employees.data}
										visibleColumns={visibleColumns}
									/>
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
