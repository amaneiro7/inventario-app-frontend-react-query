import { lazy, memo, Suspense, useMemo } from 'react'
import { eventManager } from '@/shared/lib/utils/eventManager'
import { useGetAllPermissions } from '../hooks/useGetAllPermission'
import { PermissionGetByCriteria } from '../../application/PermissionGetByCriteria'
import { PermissionTableLoading } from './PermissionTableLoading'
import { PermissionTable } from './PermissionTable'
import { type PermissionFilters } from '../../application/createPermissionQueryParams'

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

interface TablePermissionWrapperProps {
	query: PermissionFilters
	handlePageSize: (pageSize: number) => void
	handlePageClick: ({ selected }: { selected: number }) => void
	handleSort: (field: string) => Promise<void>
}

export const PermissionTableWrapper = memo(
	({ handlePageClick, handlePageSize, handleSort, query }: TablePermissionWrapperProps) => {
		const { data: permissions, isError, isLoading } = useGetAllPermissions(query)

		const SkeletonFallback = useMemo(() => {
			return Array.from({
				length: query.pageSize ?? PermissionGetByCriteria.defaultPageSize
			}).map((_, index) => <PermissionTableLoading key={`loader-${index}`} />)
		}, [query.pageSize, PermissionGetByCriteria.defaultPageSize])
		return (
			<>
				<TablePageWrapper>
					<TabsNav
						isLoading={isLoading}
						total={permissions?.info?.total}
						pageSize={query.pageSize}
						pageNumber={query.pageNumber}
						defaultPageSize={PermissionGetByCriteria.defaultPageSize}
					/>

					<Table>
						<TableHeader>
							<TableRow>
								<TableHead
									aria-colindex={1}
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="name"
									size="xxLarge"
								>
									Nombre
								</TableHead>
								<TableHead
									aria-colindex={2}
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="description"
									size="auto"
								>
									Descripción
								</TableHead>

								<TableHead aria-colindex={6} size="xSmall">
									{/* <span className="sr-only">Acciones</span> */}
									Acciones
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<>
								{isLoading && SkeletonFallback}
								{permissions !== undefined && (
									<Suspense fallback={SkeletonFallback}>
										<PermissionTable
											isError={isError}
											permissions={permissions.data}
										/>
									</Suspense>
								)}
							</>
						</TableBody>
					</Table>
				</TablePageWrapper>
				{permissions && !isLoading && !isError && (
					<PaginationBar
						registerOptions={PermissionGetByCriteria.pageSizeOptions}
						totalPages={permissions?.info?.totalPage}
						total={permissions?.info?.total}
						currentPage={permissions?.info?.page}
						pageSize={query.pageSize}
						handlePageClick={handlePageClick}
						handlePageSize={handlePageSize}
					/>
				)}
			</>
		)
	}
)

PermissionTableWrapper.displayName = 'PermissionTableWrapper'
