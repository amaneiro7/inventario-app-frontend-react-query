import { lazy, Suspense } from 'react'
import { useCreateSite } from '@/entities/locations/site/infra/hook/useCreateCity'
import { FormSkeletonLayout } from '@/widgets/FormContainer/FormSkeletonLayout'

const SiteInputs = lazy(() =>
	import('@/entities/locations/site/infra/ui/SiteInputs').then(m => ({ default: m.SiteInputs }))
)
const SiteSearch = lazy(() =>
	import('@/features/site-search/ui/SiteSearch').then(m => ({ default: m.SiteSearch }))
)

const FormLayout = lazy(() =>
	import('@/widgets/FormContainer/FormLayout').then(m => ({ default: m.FormLayout }))
)

export default function FormSite() {
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
	} = useCreateSite()

	return (
		<Suspense fallback={<FormSkeletonLayout />}>
			<FormLayout
				id={key}
				description="Ingrese los datos del sitio el cual desea registar."
				isAddForm={mode === 'add'}
				handleSubmit={handleSubmit}
				isError={isError}
				isLoading={isLoading}
				isNotFound={isNotFound}
				onRetry={onRetry}
				reset={mode === 'edit' ? resetForm : undefined}
				url="/form/site/add"
				border
				searchInput={<SiteSearch />}
			>
				<SiteInputs
					required={required}
					formData={formData}
					handleChange={handleChange}
					errors={errors}
					mode={mode}
				/>
			</FormLayout>
		</Suspense>
	)
}
