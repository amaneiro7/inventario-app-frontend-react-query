import { lazy, Suspense } from 'react'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import { usePermissionGroupFilter } from '../hooks/usePermissionGroupFilter'
import { ButtonSectionSkeleton } from '@/shared/ui/ButttonSection/ButtonSectionSkeleton'
import { useNavigate } from 'react-router-dom'
import { TableSkeleton } from '@/widgets/tables/TableSkeleton'
import { PermissionGroupDataWrapper } from './PermissionGroupDataWrapper'

const PermissionGroupFilter = lazy(() =>
	import('./PermissionGroupFilter').then(m => ({ default: m.PermissionGroupFilter }))
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

export const PermissionGroupList = () => {
	const navigate = useNavigate()
	const { cleanFilters, handlePageSize, handlePageClick, handleSort, handleChange, ...query } =
		usePermissionGroupFilter()
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
						<PermissionGroupFilter
							handleChange={handleChange}
							name={query.name}
							description={query.description}
							permissionId={query.permissionId}
						/>
					</FilterSection>
					<Suspense fallback={<ButtonSectionSkeleton />}>
						<ButtonSection
							handleClear={cleanFilters}
							handleAdd={() => {
								navigate('/form/permission-groups/add')
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
					<PermissionGroupDataWrapper
						handleChange={handleChange}
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
