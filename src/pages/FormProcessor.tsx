import { lazy, Suspense } from 'react'
import { useCreateProcessor } from '@/entities/devices/features/processor/infra/hooks/useCreateProcessor'
import { useHasPermission } from '@/shared/lib/hooks/useHasPermission'
import { PERMISSIONS } from '@/shared/config/permissions'
import { FormSkeletonLayout } from '@/widgets/FormContainer/FormSkeletonLayout'
import { ProcessorFormSkeletonLayout } from '@/entities/devices/features/processor/infra/ui/ProcessorFormLayoutSkeleton.tsx'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import { InputFallback } from '@/shared/ui/Loading/InputFallback'

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
		hasChanges,
		isSubmitting,
		onRetry,
		handleChange,
		handleSubmit,
		resetForm
	} = useCreateProcessor()
	const canEdit = useHasPermission(PERMISSIONS.PROCESSORS.UPDATE)

	return (
		<Suspense
			fallback={
				<FormSkeletonLayout border>
					<ProcessorFormSkeletonLayout />
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
					description="Ingrese los datos del procesador el cual desea registar."
					isAddForm={mode === 'add'}
					canEdit={canEdit}
					isSubmitting={isSubmitting}
					isDirty={hasChanges}
					lastUpdated={formData?.updatedAt}
					isLoading={isLoading}
					handleSubmit={handleSubmit}
					isError={isError}
					isNotFound={isNotFound}
					onRetry={onRetry}
					reset={mode === 'edit' ? resetForm : undefined}
					url="/form/processor/add"
					border
					searchInput={
						<Suspense fallback={<InputFallback />}>
							<ProcessorSearch />
						</Suspense>
					}
				>
					<Suspense fallback={<ProcessorFormSkeletonLayout />}>
						<ProcessorInputs
							isLoading={isLoading}
							formData={formData}
							canEdit={canEdit}
							handleChange={handleChange}
							errors={errors}
						/>
					</Suspense>
				</FormLayout>
			</ErrorBoundary>
		</Suspense>
	)
}
