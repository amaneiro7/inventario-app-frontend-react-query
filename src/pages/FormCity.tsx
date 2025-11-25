import { lazy, Suspense } from 'react'
import { useCreateCity } from '@/entities/locations/city/infra/hook/useCreateCity'
import { FormSkeletonLayout } from '@/widgets/FormContainer/FormSkeletonLayout'
import { CityFormSkeletonLayout } from '@/entities/locations/city/infra/ui/CityFormSkeletonLayout'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { useHasPermission } from '@/shared/lib/hooks/useHasPermission'
import { PERMISSIONS } from '@/shared/config/permissions'

const FormLayout = lazy(() =>
	import('@/widgets/FormContainer/FormLayout').then(m => ({ default: m.FormLayout }))
)
const CityInputs = lazy(() =>
	import('@/entities/locations/city/infra/ui/CityInputs').then(m => ({ default: m.CityInputs }))
)
const CitySearch = lazy(() =>
	import('@/features/city-search/ui/CitySearch').then(m => ({ default: m.CitySearch }))
)

export default function FormCity() {
	const {
		formData,
		key,
		mode,
		errors,
		isError,
		isLoading,
		isNotFound,
		hasChanges,
		isSubmitting,
		required,
		onRetry,
		handleChange,
		handleSubmit,
		discardChanges
	} = useCreateCity()
	const canEdit = useHasPermission(PERMISSIONS.CITIES.UPDATE)

	return (
		<Suspense
			fallback={
				<FormSkeletonLayout border>
					<CityFormSkeletonLayout />
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
					description="Ingrese los datos de la ciudad el cual desea registar."
					isAddForm={mode === 'add'}
					handleSubmit={handleSubmit}
					canEdit={canEdit}
					isSubmitting={isSubmitting}
					isDirty={hasChanges}
					lastUpdated={formData?.updatedAt}
					isLoading={isLoading}
					isError={isError}
					isNotFound={isNotFound}
					onRetry={onRetry}
					reset={mode === 'edit' ? discardChanges : undefined}
					url="/form/city/add"
					border
					searchInput={<CitySearch />}
				>
					<Suspense fallback={<CityFormSkeletonLayout />}>
						<CityInputs
							isLoading={isLoading}
							required={required}
							canEdit={canEdit}
							formData={formData}
							handleChange={handleChange}
							errors={errors}
						/>
					</Suspense>
				</FormLayout>
			</ErrorBoundary>
		</Suspense>
	)
}
