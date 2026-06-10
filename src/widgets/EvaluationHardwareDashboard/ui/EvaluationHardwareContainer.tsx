import { lazy, memo, Suspense, useMemo } from 'react'
import { eventManager } from '@/shared/lib/utils/eventManager'
import { Table } from '@/shared/ui/Table/Table'
import { TableBody } from '@/shared/ui/Table/TableBody'
import { TableHead } from '@/shared/ui/Table/TableHead'
import { TableHeader } from '@/shared/ui/Table/TableHeader'
import { TablePageWrapper } from '@/shared/ui/Table/TablePageWrapper'
import { TableRow } from '@/shared/ui/Table/TableRow'
import { TypeOfSiteTabNav } from '@/features/type-of-site-tab-nav/ui/TypeOfSiteTabNav'
import { PaginationBar } from '@/shared/ui/Pagination/PaginationBar'
import { TabsNav } from '@/shared/ui/Tabs/TabsNav'
import { EvaluationHardwareTableLoading } from './EvaluationHardwareTableLoading'
import { EvaluationHardwareDashboardGetByCriteria } from '@/entities/devices/deviceEvaluation/application/EvalutionHardwareDashboardGetByCriteria'
import type { EvaluationHardwareDashboardResponse } from '@/entities/devices/deviceEvaluation/domain/dto/EvaluationHardwareDashboard.dto'
import type { EvaluationHardwareDashboardFilters } from '@/entities/devices/deviceEvaluation/application/createEvaluationHardwareQueryParams'

const TableEvaluationHardware = lazy(() =>
	import('@/widgets/EvaluationHardwareDashboard/ui/TableEvaluationHardware').then(m => ({
		default: m.TableEvaluationHardware
	}))
)

interface EvaluationHardwareDashboardContainerProps {
	query: EvaluationHardwareDashboardFilters
	handlePageSize: (pageSize: number) => void
	handlePageClick: ({ selected }: { selected: number }) => void
	handleSort: (field: string) => Promise<void>
	handleChange: (name: string, value: string | number) => void
	data: EvaluationHardwareDashboardResponse | undefined
	isError: boolean
	isLoading: boolean
}

export const EvaluationHardwareDashboardContainer = memo(
	({
		query,
		data,
		isError,
		isLoading,
		handleSort,
		handleChange,
		handlePageSize,
		handlePageClick
	}: EvaluationHardwareDashboardContainerProps) => {
		const SkeletonFallback = useMemo(() => {
			return Array.from({
				length: query.pageSize ?? EvaluationHardwareDashboardGetByCriteria.defaultPageSize
			}).map((_, index) => <EvaluationHardwareTableLoading key={`loader-${index}`} />)
		}, [query.pageSize, EvaluationHardwareDashboardGetByCriteria.defaultPageSize])

		return (
			<>
				<TablePageWrapper>
					<TabsNav
						isLoading={isLoading}
						total={data?.info?.total}
						pageSize={query.pageSize}
						pageNumber={query.pageNumber}
						defaultPageSize={EvaluationHardwareDashboardGetByCriteria.defaultPageSize}
					>
						<TypeOfSiteTabNav
							handleChange={handleChange}
							value={query.typeOfSiteId}
							omit={['ALMACEN']}
						/>
					</TabsNav>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead aria-colindex={1} size="xSmall" isTab>
									Estado
								</TableHead>
								<TableHead
									aria-colindex={2}
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="serial"
									size="small"
									isTab
								>
									Serial
								</TableHead>
								<TableHead
									aria-colindex={3}
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="locationId"
									size="large"
									isTab
								>
									Ubicación
								</TableHead>
								<TableHead
									aria-colindex={4}
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="employeeId"
									size="large"
									isTab
									className="hidden 2xl:table-cell"
								>
									Usuario asignado
								</TableHead>
								<TableHead
									aria-colindex={5}
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField=""
									size="small"
									isTab
									className="1md:table-cell hidden"
								>
									Memoria RAM
								</TableHead>
								<TableHead
									aria-colindex={6}
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="hardDriveCapacityId"
									size="small"
									isTab
									className="1md:table-cell hidden"
								>
									Disco Duro
								</TableHead>
								<TableHead
									aria-colindex={7}
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="processorId"
									size="xLarge"
									isTab
									className="hidden lg:table-cell"
								>
									Procesador
								</TableHead>
								<TableHead
									aria-colindex={8}
									size="xLarge"
									isTab
									className="1xl:table-cell hidden"
								>
									Motivo
								</TableHead>

								<TableHead aria-colindex={9} isTab size="xSmall">
									<span className="sr-only">Acciones</span>
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<>
								{isLoading && SkeletonFallback}
								{data !== undefined && (
									<Suspense fallback={SkeletonFallback}>
										<TableEvaluationHardware
											isError={isError}
											devices={data?.devices}
										/>
									</Suspense>
								)}
							</>
						</TableBody>
					</Table>
				</TablePageWrapper>
				{data && !isLoading && !isError && (
					<PaginationBar
						registerOptions={EvaluationHardwareDashboardGetByCriteria.pageSizeOptions}
						totalPages={data?.info?.totalPage}
						total={data?.info?.total}
						currentPage={data?.info?.page}
						pageSize={query.pageSize}
						handlePageClick={handlePageClick}
						handlePageSize={handlePageSize}
					/>
				)}
			</>
		)
	}
)
