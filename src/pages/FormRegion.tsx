import { lazy, Suspense } from 'react'
import { useCreateRegion } from '@/entities/locations/region/infra/hook/useCreateRegion'
import { RegionFormLayoutSkeleton } from '@/entities/locations/region/infra/ui/RegionFormLayoutSkeleton'
import { RegionFormInputSkeleton } from '@/entities/locations/region/infra/ui/RegionFormInputSkeleton'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { InputFallback } from '@/shared/ui/Loading/InputFallback'
import { useHasPermission } from '@/shared/lib/hooks/useHasPermission'
import { PERMISSIONS } from '@/shared/config/permissions'

const RegionInputs = lazy(() =>
	import('@/entities/locations/region/infra/ui/RegionInputs').then(m => ({
		default: m.RegionInputs
	}))
)
const RegionSearch = lazy(() =>
	import('@/features/region-search/ui/RegionSearch').then(m => ({ default: m.RegionSearch }))
)

const FormLayout = lazy(() =>
	import('@/widgets/FormContainer/FormLayout').then(m => ({ default: m.FormLayout }))
)

export default function FormRegion() {
	const {
		formData,
		mode,
		key,
		errors,
		disabled,
		required,
		isError,
		isLoading,
		isNotFound,
		hasChanges,
		isSubmitting,
		onRetry,
		handleChange,
		handleSubmit,
		discardChanges
	} = useCreateRegion()
	const canEdit = useHasPermission(PERMISSIONS.REGIONS.UPDATE)
	return (
		<Suspense fallback={<RegionFormLayoutSkeleton />}>
			<ErrorBoundary
				fallback={({ onReset }) => (
					<WidgetErrorFallback
						onReset={onReset}
						variant="default"
						message="No se pudo cargar el formulario."
					/>
				)}
			>
				<FormLayout
					id={key}
					description="Busque la región el cual desea registrar en una de las zonas administrativas"
					isAddForm
					isSubmitting={isSubmitting}
					isDirty={hasChanges}
					isLoading={isLoading}
					lastUpdated={formData?.updatedAt}
					canEdit={canEdit}
					handleSubmit={handleSubmit}
					isError={isError}
					isNotFound={isNotFound}
					onRetry={onRetry}
					reset={mode === 'edit' ? discardChanges : undefined}
					url="/form/region/"
					border
					standBy={mode !== 'edit'}
					searchInput={
						<Suspense fallback={<InputFallback />}>
							<RegionSearch />
						</Suspense>
					}
				>
					{mode === 'edit' && (
						<Suspense fallback={<RegionFormInputSkeleton />}>
							<RegionInputs
								canEdit={canEdit}
								required={required}
								isLoading={isLoading}
								formData={formData}
								disabled={disabled}
								handleChange={handleChange}
								errors={errors}
							/>
						</Suspense>
					)}
				</FormLayout>
			</ErrorBoundary>
		</Suspense>
	)
}
