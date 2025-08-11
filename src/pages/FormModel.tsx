import { lazy, Suspense } from 'react'
import { useCreateModel } from '@/entities/model/models/infra/hook/useCreateModels'
import { FormSkeletonLayout } from '@/widgets/FormContainer/FormSkeletonLayout'

const ModelInputs = lazy(() =>
	import('@/entities/model/models/infra/ui/ModelForm/ModelInputs').then(m => ({
		default: m.ModelInputs
	}))
)

const FormLayout = lazy(() =>
	import('@/widgets/FormContainer/FormLayout').then(m => ({ default: m.FormLayout }))
)

const ModelSearch = lazy(() =>
	import('@/features/model-search/ui/ModelSearch').then(m => ({ default: m.ModelSearch }))
)

export default function FormModel() {
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
	} = useCreateModel()

	return (
		<Suspense fallback={<FormSkeletonLayout />}>
			<FormLayout
				id={key}
				description="Ingrese los datos del modelo el cual desea registar."
				isAddForm={mode === 'add'}
				handleSubmit={handleSubmit}
				isError={isError}
				isNotFound={isNotFound}
				onRetry={onRetry}
				reset={mode === 'edit' ? resetForm : undefined}
				url="/form/model/add"
				lastUpdated={formData.updatedAt}
				searchInput={<ModelSearch />}
			>
				<ModelInputs
					required={required}
					disabled={disabled}
					formData={formData}
					handleChange={handleChange}
					errors={errors}
					mode={mode}
					isLoading={isLoading}
				/>
			</FormLayout>
		</Suspense>
	)
}
