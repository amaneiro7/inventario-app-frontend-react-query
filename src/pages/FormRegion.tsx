import { lazy, Suspense } from 'react'
import { useCreateRegion } from '@/entities/locations/region/infra/hook/useCreateRegion'
import { FormSkeletonLayout } from '@/widgets/FormContainer/FormSkeletonLayout'

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
		onRetry,
		handleChange,
		handleSubmit,
		resetForm
	} = useCreateRegion()

	return (
		<Suspense fallback={<FormSkeletonLayout />}>
			<FormLayout
				id={key}
				description="Busque la región el cual desea registrar en una de las zonas administrativas"
				isAddForm
				handleSubmit={handleSubmit}
				isError={isError}
				isNotFound={isNotFound}
				onRetry={onRetry}
				reset={mode === 'edit' ? resetForm : undefined}
				url="/form/region/"
				border
				standBy={mode !== 'edit'}
				searchInput={<RegionSearch />}
			>
				{mode === 'edit' && (
					<RegionInputs
						required={required}
						isLoading={isLoading}
						formData={formData}
						disabled={disabled}
						handleChange={handleChange}
						errors={errors}
					/>
				)}
			</FormLayout>
		</Suspense>
	)
}
