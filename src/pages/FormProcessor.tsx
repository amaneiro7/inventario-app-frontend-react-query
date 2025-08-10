import { lazy, Suspense } from 'react'
import { useCreateProcessor } from '@/entities/devices/features/processor/infra/hooks/useCreateProcessor'
import { FormSkeletonLayout } from '@/widgets/FormContainer/FormSkeletonLayout'

const ProcessorInputs = lazy(() =>
	import('@/entities/devices/features/processor/infra/ui/ProcessorInputs').then(m => ({
		default: m.ProcessorInputs
	}))
)
const ProcessorSearch = lazy(() =>
	import('@/features/processor-search/ui/ProcessorSearch').then(m => ({
		default: m.ProcessorSearch
	}))
)

const FormLayout = lazy(() =>
	import('@/widgets/FormContainer/FormLayout').then(m => ({ default: m.FormLayout }))
)

export default function FormProcessor() {
	const {
		formData,
		key,
		mode,
		errors,
		isError,
		isLoading,
		isNotFound,
		onRetry,
		handleChange,
		handleSubmit,
		resetForm
	} = useCreateProcessor()

	return (
		<Suspense fallback={<FormSkeletonLayout />}>
			<FormLayout
				id={key}
				description="Ingrese los datos del procesador el cual desea registar."
				isAddForm={mode === 'add'}
				handleSubmit={handleSubmit}
				isError={isError}
				isLoading={isLoading}
				isNotFound={isNotFound}
				onRetry={onRetry}
				reset={mode === 'edit' ? resetForm : undefined}
				url="/form/Processor/add"
				border
				searchInput={<ProcessorSearch />}
			>
				<ProcessorInputs formData={formData} handleChange={handleChange} errors={errors} />
			</FormLayout>
		</Suspense>
	)
}
