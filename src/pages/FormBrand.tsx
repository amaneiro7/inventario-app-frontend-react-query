import { lazy, Suspense } from 'react'
import { useCreateBrand } from '@/entities/brand/infra/hooks/useCreateBrand'
import { FormSkeletonLayout } from '@/widgets/FormContainer/FormSkeletonLayout'
import { BrandFormSkeletonLayout } from '@/entities/brand/infra/ui/BrandFormLayoutSkeleton'

const FormLayout = lazy(() =>
	import('@/widgets/FormContainer/FormLayout').then(m => ({ default: m.FormLayout }))
)
const BrandInputs = lazy(() =>
	import('@/entities/brand/infra/ui/BrandInputs').then(m => ({ default: m.BrandInputs }))
)
const BrandSearch = lazy(() =>
	import('@/features/brand-search/ui/BrandSearch').then(m => ({ default: m.BrandSearch }))
)

export default function FormBrand() {
	const {
		formData,
		mode,
		key,
		errors,
		isError,
		isLoading,
		isNotFound,
		onRetry,
		handleChange,
		handleSubmit,
		resetForm
	} = useCreateBrand()
	return (
		<Suspense
			fallback={
				<FormSkeletonLayout border>
					<BrandFormSkeletonLayout />
				</FormSkeletonLayout>
			}
		>
			<FormLayout
				id={key}
				description="Ingrese los datos de la marca el cual desea registar."
				isAddForm={mode === 'add'}
				handleSubmit={handleSubmit}
				isError={isError}
				isNotFound={isNotFound}
				onRetry={onRetry}
				reset={mode === 'edit' ? resetForm : undefined}
				url="/form/brand/add"
				border
				searchInput={<BrandSearch />}
			>
				<Suspense fallback={<BrandFormSkeletonLayout />}>
					<BrandInputs
						formData={formData}
						isLoading={isLoading}
						handleChange={handleChange}
						errors={errors}
					/>
				</Suspense>
			</FormLayout>
		</Suspense>
	)
}
