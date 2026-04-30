import { lazy, Suspense } from 'react'
import { useGetComputerCountBrandDashboard } from '@/entities/devices/dashboard/infra/hooks/useGetComputerCountBrandDashboard'
import { InventoryBrandTableLoading } from './InventoryBrandTableLoading'
import { InventoryBrandRow } from './InventoryBrandRow'
import { eventManager } from '@/shared/lib/utils/eventManager'
import type { ComputerCountBrandDashboardFilters } from '@/entities/devices/dashboard/application/createComputerCountBrandQueryParams'

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

const TableRow = lazy(() =>
	import('@/shared/ui/Table/TableRow').then(m => ({ default: m.TableRow }))
)

const SkeletonFallback = Array.from({
	length: 25
}).map((_, index) => <InventoryBrandTableLoading key={`loader-${index}`} />)

export function InventoryBrandContainer({
	query,
	handleSort
}: {
	query: ComputerCountBrandDashboardFilters
	handleSort: (field: string) => Promise<void>
}) {
	const { computerDashboard, isError, isLoading } = useGetComputerCountBrandDashboard(query)

	return (
		<>
			<Table className="table-fixed">
				<TableHeader>
					<TableRow>
						<TableHead
							aria-colindex={1}
							size="xxLarge"
							orderByField="modelName"
							orderBy={query.orderBy}
							orderType={query.orderType}
							handleSort={eventManager(handleSort)}
						>
							Modelo
						</TableHead>
						<TableHead
							aria-colindex={2}
							size="xLarge"
							orderByField="brandId"
							orderBy={query.orderBy}
							orderType={query.orderType}
							handleSort={eventManager(handleSort)}
						>
							Marca
						</TableHead>
						<TableHead
							aria-colindex={3}
							size="medium"
							orderByField="categoryId"
							orderBy={query.orderBy}
							orderType={query.orderType}
							handleSort={eventManager(handleSort)}
						>
							Categoria
						</TableHead>
						<TableHead
							aria-colindex={4}
							size="small"
							className="text-center"
							orderByField="count"
							orderBy={query.orderBy}
							orderType={query.orderType}
							handleSort={eventManager(handleSort)}
						>
							Cantidad
						</TableHead>
						<TableHead
							aria-colindex={5}
							size="small"
							className="text-center"
							orderByField="inUse"
							orderBy={query.orderBy}
							orderType={query.orderType}
							handleSort={eventManager(handleSort)}
						>
							En uso
						</TableHead>
						<TableHead
							aria-colindex={6}
							size="small"
							className="text-center"
							orderByField="inAlmacen"
							orderBy={query.orderBy}
							orderType={query.orderType}
							handleSort={eventManager(handleSort)}
						>
							En almacen
						</TableHead>
						<TableHead aria-colindex={7} size="medium">
							Estatus
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<>
						{isLoading && SkeletonFallback}
						{computerDashboard !== undefined && (
							<Suspense fallback={SkeletonFallback}>
								<InventoryBrandRow
									data={computerDashboard?.data}
									isError={isError}
								/>
							</Suspense>
						)}
					</>
				</TableBody>
			</Table>
		</>
	)
}
