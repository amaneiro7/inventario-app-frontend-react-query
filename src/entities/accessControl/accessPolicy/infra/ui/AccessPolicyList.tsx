import { lazy, Suspense } from 'react'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import { useAccessPolicyFilter } from '../hooks/useAccessPolicyFilter'
import { ButtonSectionSkeleton } from '@/shared/ui/ButttonSection/ButtonSectionSkeleton'
import { useNavigate } from 'react-router-dom'
import { AccessPolicyTableWrapper } from './AccessPolicyTableWrapper'
import { TableSkeleton } from '@/widgets/tables/TableSkeleton'

const AccessPolicyFilter = lazy(() =>
	import('./AccessPolicyFilter').then(m => ({ default: m.AccessPolicyFilter }))
)

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

export const AccessPolicyList = () => {
	const navigate = useNavigate()
	const { cleanFilters, handlePageSize, handlePageClick, handleSort, handleChange, ...query } =
		useAccessPolicyFilter()
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
					<FilterSection>
						<AccessPolicyFilter
							handleChange={handleChange}
							name={query.name}
							cargoId={query.cargoId}
							departamentoId={query.departamentoId}
							priority={query.priority}
						/>
					</FilterSection>
					<Suspense fallback={<ButtonSectionSkeleton />}>
						<ButtonSection
							handleClear={cleanFilters}
							handleAdd={() => {
								navigate('/form/access-policy/add')
							}}
						/>
					</Suspense>
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
					<AccessPolicyTableWrapper
						handlePageSize={handlePageSize}
						handlePageClick={handlePageClick}
						handleSort={handleSort}
						query={query}
					/>
				</Suspense>
			</ErrorBoundary>
		</>
	)
}
