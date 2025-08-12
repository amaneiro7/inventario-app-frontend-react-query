import { lazy, Suspense } from 'react'
import { useCreateDirectiva } from '@/entities/employee/directiva/infra/hook/useCreateDirectiva'
import { FormSkeletonLayout } from '@/widgets/FormContainer/FormSkeletonLayout'
import { DirectivaFormSkeletonLayout } from '@/entities/employee/directiva/infra/ui/DirectivaFormLayoutSkeleton.tsx'

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
		<Suspense
			fallback={
				<FormSkeletonLayout border>
					<DirectivaFormSkeletonLayout />
				</FormSkeletonLayout>
			}
		>
			<FormLayout
				id={key}
				description="Ingrese los datos de la directiva el cual desea registar."
				isAddForm={mode === 'add'}
				handleSubmit={handleSubmit}
				isError={isError}
				isNotFound={isNotFound}
				onRetry={onRetry}
				reset={mode === 'edit' ? resetForm : undefined}
				url="/form/directiva/add"
				border
				searchInput={<DirectivaSearch />}
			>
				<Suspense fallback={<DirectivaFormSkeletonLayout />}>
					<DirectivaInputs
						required={required}
						isLoading={isLoading}
						formData={formData}
						handleChange={handleChange}
						errors={errors}
					/>
				</Suspense>
			</FormLayout>
		</Suspense>
	)
}
