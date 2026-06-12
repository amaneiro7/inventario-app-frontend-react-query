import { lazy, memo, Suspense, useMemo } from 'react'
import { eventManager } from '@/shared/lib/utils/eventManager'
import { useGetAllMigrationRules } from '../hook/useGetAllMigrationRule'
import { MigrationRuleGetByCriteria } from '../../application/MigrationRuleGetByCriteria'
import { MigrationRuleTableLoading } from './MigrationRuleTableLoading'
import type { MigrationRuleFilters } from '../../application/createMigrationRuleQueryParams'

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

const MigrationRuleTable = lazy(() =>
	import('./MigrationRuleTable').then(m => ({ default: m.MigrationRuleTable }))
)

interface MigrationRuleWrapperProps {
	query: MigrationRuleFilters
	handlePageSize: (pageSize: number) => void
	handlePageClick: ({ selected }: { selected: number }) => void
	handleSort: (field: string) => Promise<void>
}

export const MigrationRuleTableWrapper = memo(
	({ handlePageClick, handlePageSize, handleSort, query }: MigrationRuleWrapperProps) => {
		const { data: migrationRules, isError, isLoading } = useGetAllMigrationRules(query)

		const SkeletonFallback = useMemo(() => {
			return Array.from({
				length: query.pageSize ?? MigrationRuleGetByCriteria.defaultPageSize
			}).map((_, index) => <MigrationRuleTableLoading key={`loader-${index}`} />)
		}, [query.pageSize, MigrationRuleGetByCriteria.defaultPageSize])
		return (
			<>
				<TablePageWrapper>
					<TabsNav
						isLoading={isLoading}
						total={migrationRules?.info?.total}
						pageSize={query.pageSize}
						pageNumber={query.pageNumber}
						defaultPageSize={MigrationRuleGetByCriteria.defaultPageSize}
					/>

					<Table>
						<TableHeader>
							<TableRow>
								<TableHead
									aria-colindex={1}
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="isActive"
									size="small"
								>
									Estado
								</TableHead>
								<TableHead
									aria-colindex={2}
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="minRamGb"
									size="small"
								>
									RAM Mínima
								</TableHead>
								<TableHead
									aria-colindex={3}
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="minDiskGb"
									size="small"
								>
									Disco Mínimo
								</TableHead>
								<TableHead aria-colindex={4} size="auto">
									Lista de CPUs Aprobados
								</TableHead>
								<TableHead aria-colindex={5} size="xSmall">
									{/* <span className="sr-only">Acciones</span> */}
									Acciones
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<>
								{isLoading && SkeletonFallback}
								{migrationRules !== undefined && (
									<Suspense fallback={SkeletonFallback}>
										<MigrationRuleTable
											isError={isError}
											migrationRules={migrationRules.data}
										/>
									</Suspense>
								)}
							</>
						</TableBody>
					</Table>
				</TablePageWrapper>
				{migrationRules && !isLoading && !isError && (
					<PaginationBar
						registerOptions={MigrationRuleGetByCriteria.pageSizeOptions}
						totalPages={migrationRules?.info?.totalPage}
						total={migrationRules?.info?.total}
						currentPage={migrationRules?.info?.page}
						pageSize={query.pageSize}
						handlePageClick={handlePageClick}
						handlePageSize={handlePageSize}
					/>
				)}
			</>
		)
	}
)

MigrationRuleTableWrapper.displayName = 'MigrationRuleTableWrapper'
