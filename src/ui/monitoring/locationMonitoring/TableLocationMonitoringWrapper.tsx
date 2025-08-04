import { lazy, memo, Suspense } from 'react'
import { eventManager } from '@/shared/lib/utils/eventManager'
import { useTableLocationMonitoringWrapper } from './useTableLocationMonitoringWrapper'

import { Table } from '@/shared/ui/Table/Table'
import { TableBody } from '@/shared/ui/Table/TableBody'
import { TableHead } from '@/shared/ui/Table/TableHead'
import { TableHeader } from '@/shared/ui/Table/TableHeader'
import { TablePageWrapper } from '@/shared/ui/Table/TablePageWrapper'
import { TableRow } from '@/shared/ui/Table/TableRow'
import { TabsNav } from '../../List/Tab/TabsNav'
import { TypeOfSiteTabNav } from '../../List/Tab/TypeOfSiteTabNav'
import { LoadingTable } from '@/shared/ui/Table/LoadingTable'
import { PaginationBar } from '../../../shared/ui/Pagination/PaginationBar'

import { LocationMonitoringGetByCriteria } from '@/entities/locations/locationMonitoring/application/LocationMonitoringGetByCriteria'
import { type LocationMonitoring } from '@/entities/locations/locationMonitoring/domain/dto/LocationMonitoring.dto'
import { type Response } from '@/entities/shared/domain/methods/Response'
import { type LocationMonitoringFilters } from '@/entities/locations/locationMonitoring/application/createLocationMonitoringQueryParams'

interface TableLocationMonitoringWrapperProps {
	query: LocationMonitoringFilters
	handlePageSize: (pageSize: number) => void
	handlePageClick: ({ selected }: { selected: number }) => void
	handleSort: (field: string) => Promise<void>
	handleChange: (name: string, value: string | number) => void
	locationMonitorings: Response<LocationMonitoring> | undefined
	isError: boolean
	isLoading: boolean
}

const TableLocationMonitoring = lazy(() =>
	import('@/ui/monitoring/locationMonitoring/TableLocationMonitoring').then(m => ({
		default: m.TableLocationMonitoring
	}))
)

export const TableLocationMonitoringWrapper = memo(
	({
		query,
		locationMonitorings,
		isError,
		isLoading,
		handleSort,
		handleChange,
		handlePageSize,
		handlePageClick
	}: TableLocationMonitoringWrapperProps) => {
		const { colSpan, headers, visibleColumns } = useTableLocationMonitoringWrapper()
		return (
			<>
				<TablePageWrapper>
					<TabsNav
						isLoading={isLoading}
						total={locationMonitorings?.info?.total}
						pageSize={query.pageSize}
						pageNumber={query.pageNumber}
						defaultPageSize={LocationMonitoringGetByCriteria.defaultPageSize}
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
								{headers
									.filter(header => header.visible)
									.map((header, index) => (
										<TableHead
											aria-colindex={index + 1}
											key={header.key}
											isTab={header.isTab}
											handleSort={
												header.hasOrder
													? eventManager(handleSort)
													: undefined
											}
											name={header.label}
											orderBy={header.hasOrder ? query.orderBy : undefined}
											orderType={
												header.hasOrder ? query.orderType : undefined
											}
											orderByField={header.hasOrder ? header.key : undefined}
											size={header.size}
										/>
									))}
							</TableRow>
						</TableHeader>
						<TableBody>
							<>
								{isLoading && (
									<LoadingTable
										registerPerPage={query?.pageSize}
										colspan={colSpan}
										openIcon={false}
									/>
								)}
								{locationMonitorings !== undefined && (
									<Suspense
										fallback={
											<LoadingTable
												registerPerPage={query?.pageSize}
												colspan={colSpan}
												openIcon={false}
											/>
										}
									>
										<TableLocationMonitoring
											colSpan={colSpan}
											isError={isError}
											locations={locationMonitorings.data}
											visibleColumns={visibleColumns}
										/>
									</Suspense>
								)}
							</>
						</TableBody>
					</Table>
				</TablePageWrapper>
				{locationMonitorings && !isLoading && !isError && (
					<PaginationBar
						registerOptions={LocationMonitoringGetByCriteria.pegaSizeOptions}
						totalPages={locationMonitorings?.info?.totalPage}
						total={locationMonitorings?.info?.total}
						currentPage={locationMonitorings?.info?.page}
						pageSize={query.pageSize}
						handlePageClick={handlePageClick}
						handlePageSize={handlePageSize}
					/>
				)}
			</>
		)
	},
	(prevProps, nextProps) =>
		prevProps.query === nextProps.query &&
		prevProps.handleSort === nextProps.handleSort &&
		prevProps.handleChange === nextProps.handleChange &&
		prevProps.handlePageSize === nextProps.handlePageSize &&
		prevProps.handlePageClick === nextProps.handlePageClick &&
		prevProps.isLoading === nextProps.isLoading &&
		prevProps.isError === nextProps.isError &&
		prevProps.locationMonitorings === nextProps.locationMonitorings
)
