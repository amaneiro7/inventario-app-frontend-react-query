import { lazy, Suspense } from 'react'
import { useCreateLocation } from '@/entities/locations/locations/infra/hook/useCreateLocation'
import { FormSkeletonLayout } from '@/widgets/FormContainer/FormSkeletonLayout'

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
		onRetry,
		handleChange,
		handleSite,
		handleSubmit,
		resetForm
	} = useCreateLocation()

	return (
		<Suspense fallback={<FormSkeletonLayout />}>
			<FormLayout
				id={key}
				description="Ingrese los datos de la ubicación el cual desea registar."
				isAddForm={mode === 'add'}
				handleSubmit={handleSubmit}
				isError={isError}
				isNotFound={isNotFound}
				onRetry={onRetry}
				reset={mode === 'edit' ? resetForm : undefined}
				url="/form/location/add"
				border
				lastUpdated={formData.updatedAt}
				searchInput={<LocationSearch />}
			>
				<LocationInputs
					required={required}
					formData={formData}
					disabled={disabled}
					handleChange={handleChange}
					handleSite={handleSite}
					errors={errors}
					mode={mode}
					isLoading={isLoading}
				/>
			</FormLayout>
		</Suspense>
	)
}
