import { lazy, memo, Suspense, useCallback, useMemo } from 'react'
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
	setPageNumber: (page: number) => void
	setPageSize: (pageSize: number) => void
}

const TableEmployees = lazy(() =>
	import('@/ui/List/employee/TableEmployees').then(m => ({ default: m.TableEmployees }))
)

export const TableEmployeeWrapper = memo(function ({
	query,
	setPageNumber,
	setPageSize
}: TableEmployeeWrapperProps) {
	const { employees, isLoading } = useGetAllEmployees(query)
	const handlePageSize = useCallback(
		(pageSize: number) => {
			setPageSize(pageSize)
			setPageNumber(1)
		},
		[setPageSize, setPageNumber]
	)

	const handlePageClick = useCallback(
		({ selected }: { selected: number }) => {
			setPageNumber(selected + 1)
		},
		[setPageNumber]
	)

	const start = useMemo(() => {
		if (query.pageSize && query.pageNumber) {
			return query?.pageSize * (query?.pageNumber - 1) + 1
		}
		return 1
	}, [query?.pageSize, query?.pageNumber])
	const end = useMemo(() => {
		if (query.pageSize && query.pageNumber) {
			return query?.pageSize * query?.pageNumber
		}
		return EmployeeGetByCriteria.defaultPageSize
	}, [query?.pageSize, query?.pageNumber])
	return (
		<>
			<TablePageWrapper>
				<TabsNav total={employees?.info?.total} start={start} end={end} />
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead size="xxSmall" name="Cod. Empleado" />
							<TableHead size="small" name="Usuario" />
							<TableHead size="small" name="Nombres" />
							<TableHead size="small" name="Apellidos" />
							<TableHead size="xxSmall" name="Centro Trabajo" />
							<TableHead size="xLarge" name="Departamento" />
							<TableHead size="xLarge" name="Cargo" />
							<TableHead size="small" name="Teléfono" />
							<TableHead size="small" name="Extensón" />
							<TableHead size="xxSmall" name="" />
						</TableRow>
					</TableHeader>
					<TableBody>
						<Suspense>
							{isLoading && (
								<LoadingTable registerPerPage={query?.pageSize} colspan={9} />
							)}
							{employees !== undefined && (
								<TableEmployees employees={employees.data} />
							)}
						</Suspense>
					</TableBody>
				</Table>
			</TablePageWrapper>
			{!isLoading && employees !== undefined && (
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
