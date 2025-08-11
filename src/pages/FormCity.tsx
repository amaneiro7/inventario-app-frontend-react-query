import { lazy, Suspense } from 'react'
import { useCreateCity } from '@/entities/locations/city/infra/hook/useCreateCity'
import { FormSkeletonLayout } from '@/widgets/FormContainer/FormSkeletonLayout'

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
		mode,
		key,
		errors,
		required,
		isError,
		isLoading,
		isNotFound,
		onRetry,
		handleChange,
		handleSubmit,
		resetForm
	} = useCreateCity()

	return (
		<Suspense fallback={<FormSkeletonLayout />}>
			<FormLayout
				id={key}
				description="Ingrese los datos de la ciudad el cual desea registar."
				isAddForm={mode === 'add'}
				handleSubmit={handleSubmit}
				isError={isError}
				isNotFound={isNotFound}
				onRetry={onRetry}
				reset={mode === 'edit' ? resetForm : undefined}
				url="/form/city/add"
				border
				searchInput={<CitySearch />}
			>
				<CityInputs
					isLoading={isLoading}
					required={required}
					formData={formData}
					handleChange={handleChange}
					errors={errors}
				/>
			</FormLayout>
		</Suspense>
	)
}
