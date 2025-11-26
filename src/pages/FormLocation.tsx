import { lazy, Suspense } from 'react'
import { useCreateLocation } from '@/entities/locations/locations/infra/hook/useCreateLocation'
import { FormSkeletonLayout } from '@/widgets/FormContainer/FormSkeletonLayout'
import { LocationFormSkeletonLayout } from '@/entities/locations/locations/infra/ui/LocationFormSkeletonLayout'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import { InputFallback } from '@/shared/ui/Loading/InputFallback'
import { useHasPermission } from '@/shared/lib/hooks/useHasPermission'
import { PERMISSIONS } from '@/shared/config/permissions'

const LocationInputs = lazy(() =>
	import('@/entities/locations/locations/infra/ui/LocationInputs').then(m => ({
		default: m.LocationInputs
	}))
)
const LocationSearch = lazy(() =>
	import('@/features/location-search/ui/LocationSearch').then(m => ({
		default: m.LocationSearch
	}))
)

const FormLayout = lazy(() =>
	import('@/widgets/FormContainer/FormLayout').then(m => ({ default: m.FormLayout }))
)

export default function FormLocation() {
	const {
		formData,
		mode,
		key,
		errors,
		required,
		disabled,
		isError,
		isLoading,
		isNotFound,
		isSubmitting,
		hasChanges,
		onRetry,
		handleChange,
		handleSite,
		handleSubmit,
		discardChanges
	} = useCreateLocation()
	const canEdit = useHasPermission(PERMISSIONS.LOCATIONS.UPDATE)
	return (
		<Suspense
			fallback={
				<FormSkeletonLayout border>
					<LocationFormSkeletonLayout />
				</FormSkeletonLayout>
			}
		>
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
					description="Ingrese los datos de la ubicación el cual desea registar."
					isAddForm={mode === 'add'}
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
					url="/form/location/add"
					border
					searchInput={
						<Suspense fallback={<InputFallback />}>
							<LocationSearch />
						</Suspense>
					}
				>
					<Suspense fallback={<LocationFormSkeletonLayout />}>
						<LocationInputs
							canEdit={canEdit}
							required={required}
							formData={formData}
							disabled={disabled}
							handleChange={handleChange}
							handleSite={handleSite}
							errors={errors}
							mode={mode}
							isLoading={isLoading}
						/>
					</Suspense>
				</FormLayout>
			</ErrorBoundary>
		</Suspense>
	)
}
