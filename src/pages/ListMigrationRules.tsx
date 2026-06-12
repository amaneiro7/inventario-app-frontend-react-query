import { lazy, Suspense } from 'react'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import CollapsableBoxWrapper from '@/shared/ui/DetailsWrapper/CollapsableBoxWrapper'
import { PrimaryFilterSkeleton } from '@/widgets/tables/PrimaryFilterSkeleton'
import { ButtonSectionSkeleton } from '@/shared/ui/ButttonSection/ButtonSectionSkeleton'
import { useNavigate } from 'react-router-dom'
import { useMigrationRuleFilter } from '@/entities/devices/deviceEvaluation/infra/hook/useMigrationRuleFilter'
import { TableSkeleton } from '@/widgets/tables/TableSkeleton'

const DetailsBoxWrapper = lazy(() =>
	import('@/shared/ui/DetailsWrapper/DetailsBoxWrapper').then(m => ({
		default: m.DetailsBoxWrapper
	}))
)

const FilterSection = lazy(() =>
	import('@/shared/ui/FilterSection').then(m => ({ default: m.FilterSection }))
)

const ButtonSection = lazy(() =>
	import('@/shared/ui/ButttonSection/ButtonSection').then(m => ({ default: m.ButtonSection }))
)
const MigrationRuleTableWrapper = lazy(() =>
	import('@/entities/devices/deviceEvaluation/infra/ui/MigrationRuleTableWrapper').then(m => ({
		default: m.MigrationRuleTableWrapper
	}))
)
const MigrationRulesPrimaryFilter = lazy(() =>
	import('@/features/migration-rules-filter/ui/MigrationRulesPrimaryFilter').then(m => ({
		default: m.MigrationRulesPrimaryFilter
	}))
)
export default function ListMigrationRules() {
	const navigate = useNavigate()
	const { cleanFilters, handlePageSize, handlePageClick, handleSort, handleChange, ...query } =
		useMigrationRuleFilter()
	return (
		<>
			<ErrorBoundary
				fallback={({ onReset }) => (
					<WidgetErrorFallback
						onReset={onReset}
						variant="default"
						message="Error al cargar los filtros."
					/>
				)}
			>
				<DetailsBoxWrapper>
					<CollapsableBoxWrapper title="Filtros de búsqueda" isDefaultOpen>
						<Suspense
							fallback={
								<>
									<PrimaryFilterSkeleton inputQuantity={3} />
									<ButtonSectionSkeleton
										hasFilterButton={false}
										hasDownloadButton={false}
									/>
								</>
							}
						>
							<FilterSection>
								<MigrationRulesPrimaryFilter
									handleChange={handleChange}
									minDiskGb={query.minDiskGb}
									minRamGbOperator={query.minRamGbOperator}
									minRamGb={query.minRamGb}
									minDiskGbOperator={query.minDiskGbOperator}
									isActive={query.isActive}
								/>
							</FilterSection>
							<ButtonSection
								handleClear={cleanFilters}
								handleAdd={() => {
									navigate('/form/migration-rules/add')
								}}
							/>
						</Suspense>
					</CollapsableBoxWrapper>
				</DetailsBoxWrapper>
			</ErrorBoundary>
			<ErrorBoundary
				fallback={({ onReset }) => (
					<WidgetErrorFallback
						onReset={onReset}
						variant="default"
						message="No se pudo cargar la tabla de datos."
					/>
				)}
			>
				<Suspense fallback={<TableSkeleton />}>
					<MigrationRuleTableWrapper
						handlePageClick={handlePageClick}
						handlePageSize={handlePageSize}
						handleSort={handleSort}
						query={query}
					/>
				</Suspense>
			</ErrorBoundary>
		</>
	)
}
