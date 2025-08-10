import { lazy, Suspense } from 'react'
import { useCreateDirectiva } from '@/entities/employee/directiva/infra/hook/useCreateDirectiva'
import { FormSkeletonLayout } from '@/widgets/FormContainer/FormSkeletonLayout'

const FormLayout = lazy(() =>
	import('@/widgets/FormContainer/FormLayout').then(m => ({ default: m.FormLayout }))
)
const DirectivaInputs = lazy(() =>
	import('@/entities/employee/directiva/infra/ui/DirectivaInputs').then(m => ({
		default: m.DirectivaInputs
	}))
)
const DirectivaSearch = lazy(() =>
	import('@/features/directiva-search/ui/DirectivaSearch').then(m => ({
		default: m.DirectivaSearch
	}))
)

export default function FormDirectiva() {
	const {
		formData,
		mode,
		key,
		errors,
		isError,
		isLoading,
		isNotFound,
		onRetry,
		required,
		handleChange,
		handleSubmit,
		resetForm
	} = useCreateDirectiva()

	return (
		<Suspense fallback={<FormSkeletonLayout />}>
			<FormLayout
				id={key}
				description="Ingrese los datos de la directiva el cual desea registar."
				isAddForm={mode === 'add'}
				handleSubmit={handleSubmit}
				isError={isError}
				isLoading={isLoading}
				isNotFound={isNotFound}
				onRetry={onRetry}
				reset={mode === 'edit' ? resetForm : undefined}
				url="/form/directiva/add"
				border
				searchInput={<DirectivaSearch />}
			>
				<DirectivaInputs
					required={required}
					formData={formData}
					handleChange={handleChange}
					errors={errors}
				/>
			</FormLayout>
		</Suspense>
	)
}
