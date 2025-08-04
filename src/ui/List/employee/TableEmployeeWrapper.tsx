import { lazy, memo, Suspense } from 'react'
import { useGetAllEmployees } from '@/entities/employee/employee/infra/hook/useGetAllEmployee'
import { eventManager } from '@/shared/lib/utils/eventManager'
import { useTableDeviceWrapper } from './useTableEmployeeWrapper'

import { EmployeeGetByCriteria } from '@/entities/employee/employee/application/EmployeeGetByCriteria'
import { TablePageWrapper } from '@/shared/ui/Table/TablePageWrapper'
import { Table } from '@/shared/ui/Table/Table'
import { TableBody } from '@/shared/ui/Table/TableBody'
import { TableHead } from '@/shared/ui/Table/TableHead'
import { TableHeader } from '@/shared/ui/Table/TableHeader'
import { TableRow } from '@/shared/ui/Table/TableRow'
import { LoadingTable } from '@/shared/ui/Table/LoadingTable'
import { PaginationBar } from '../../../shared/ui/Pagination/PaginationBar'
import { TabsNav } from '../Tab/TabsNav'
import { type EmployeeFilters } from '@/entities/employee/employee/application/createEmployeeQueryParams'

interface TableEmployeeWrapperProps {
	query: EmployeeFilters
	handlePageSize: (pageSize: number) => void
	handlePageClick: ({ selected }: { selected: number }) => void
	handleSort: (field: string) => Promise<void>
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
							{isLoading ||
								(employees === undefined && (
									<LoadingTable
										registerPerPage={query?.pageSize}
										colspan={colSpan}
									/>
								))}
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
