import { memo, Suspense } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/ui/Card'
import { useComputerCountBrandDashboardFilter } from '@/entities/devices/dashboard/infra/hooks/useComputerCountBrandDashboardFilters'
import { MainInventoryBrandTableFilter } from './MainInventoryBrandTableFilter'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import { FilterSection } from '@/shared/ui/FilterSection'
import { PrimaryFilterSkeleton } from '@/widgets/tables/PrimaryFilterSkeleton'
import { InventoryBrandContainer } from './InventoryBrandContainer'
export const InventoryBrandTable = memo(() => {
	const { cleanFilters, handlePageSize, handlePageClick, handleSort, handleChange, ...query } =
		useComputerCountBrandDashboardFilter()

	return (
		<Card>
			<CardHeader>
				<CardTitle>Inventario de Equipos por Marca y Categoría</CardTitle>
				<CardDescription className="pb-2">
					Tabla detallada con filtros para explorar el inventario por marca y categoría
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col justify-center">
				<ErrorBoundary
					fallback={({ onReset }) => (
						<WidgetErrorFallback
							onReset={onReset}
							variant="default"
							message="No se pudieron cargar los filrtros."
						/>
					)}
				>
					<FilterSection>
						<Suspense fallback={<PrimaryFilterSkeleton inputQuantity={4} />}>
							<MainInventoryBrandTableFilter
								handleChange={handleChange}
								brandId={query.brandId}
								categoryId={query.categoryId}
								modelName={query.modelName}
								siteId={query.siteId}
							/>
						</Suspense>
					</FilterSection>
					<InventoryBrandContainer query={query} />
				</ErrorBoundary>
			</CardContent>
		</Card>
	)
})

InventoryBrandTable.displayName = 'InventoryBrandTable'
