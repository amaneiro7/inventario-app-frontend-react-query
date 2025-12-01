import { lazy, memo, Suspense, useMemo } from 'react'
import { eventManager } from '@/shared/lib/utils/eventManager'
import { useGetAllAccessPolicies } from '../hooks/useGetAllAccessPolicy'
import { AccessPolicyGetByCriteria } from '../../application/AccessPolicyGetByCriteria'
import { AccessPolicyTableLoading } from './AccesspolicyTableLoading'
import { AccessPolicyTable } from './AccessPolicyTable'
import { type AccessPolicyFilters } from '../../application/createAccessPolicyQueryParams'

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

interface TableAccessPolicyWrapperProps {
	query: AccessPolicyFilters
	handlePageSize: (pageSize: number) => void
	handlePageClick: ({ selected }: { selected: number }) => void
	handleSort: (field: string) => Promise<void>
}

export const AccessPolicyTableWrapper = memo(
	({ handlePageClick, handlePageSize, handleSort, query }: TableAccessPolicyWrapperProps) => {
		const { data: accessPolicies, isError, isLoading } = useGetAllAccessPolicies(query)

		const SkeletonFallback = useMemo(() => {
			return Array.from({
				length: query.pageSize ?? AccessPolicyGetByCriteria.defaultPageSize
			}).map((_, index) => <AccessPolicyTableLoading key={`loader-${index}`} />)
		}, [query.pageSize, AccessPolicyGetByCriteria.defaultPageSize])
		return (
			<>
				<TablePageWrapper>
					<TabsNav
						isLoading={isLoading}
						total={accessPolicies?.info?.total}
						pageSize={query.pageSize}
						pageNumber={query.pageNumber}
						defaultPageSize={AccessPolicyGetByCriteria.defaultPageSize}
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
									size="medium"
								>
									Nombre
								</TableHead>
								<TableHead
									className="hidden lg:table-cell"
									aria-colindex={2}
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="priority"
									size="small"
								>
									Prioridad
								</TableHead>
								<TableHead
									className="2md:table-cell hidden"
									aria-colindex={3}
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="roleId"
									size="medium"
								>
									Rol
								</TableHead>
								<TableHead
									aria-colindex={4}
									className="4xl:table-cell hidden"
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="directivaId"
									size="medium"
								>
									Directiva
								</TableHead>
								<TableHead
									className="3xl:table-cell hidden"
									aria-colindex={5}
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="vicepresidenciaEjecutivaId"
									size="medium"
								>
									Vicepresidencia Ejecutiva
								</TableHead>
								<TableHead
									className="hidden 2xl:table-cell"
									aria-colindex={6}
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="vicepresidenciaId"
									size="auto"
								>
									Vicepresidencia
								</TableHead>
								<TableHead
									aria-colindex={7}
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="departamentoId"
									size="medium"
								>
									Departamento
								</TableHead>
								<TableHead
									aria-colindex={8}
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="cargoId"
									size="large"
								>
									Cargo
								</TableHead>
								<TableHead
									className="1xl:table-cell hidden"
									aria-colindex={9}
									size="xxLarge"
								>
									Grupo de permisos
								</TableHead>
								<TableHead aria-colindex={10} size="xSmall">
									{/* <span className="sr-only">Acciones</span> */}
									Acciones
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<>
								{isLoading && SkeletonFallback}
								{accessPolicies !== undefined && (
									<Suspense fallback={SkeletonFallback}>
										<AccessPolicyTable
											isError={isError}
											accessPolicies={accessPolicies.data}
										/>
									</Suspense>
								)}
							</>
						</TableBody>
					</Table>
				</TablePageWrapper>
				{accessPolicies && !isLoading && !isError && (
					<PaginationBar
						registerOptions={AccessPolicyGetByCriteria.pageSizeOptions}
						totalPages={accessPolicies?.info?.totalPage}
						total={accessPolicies?.info?.total}
						currentPage={accessPolicies?.info?.page}
						pageSize={query.pageSize}
						handlePageClick={handlePageClick}
						handlePageSize={handlePageSize}
					/>
				)}
			</>
		)
	}
)

AccessPolicyTableWrapper.displayName = 'AccessPolicyTableWrapper'
