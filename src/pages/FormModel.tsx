import { lazy, Suspense } from 'react'
import { useCreateModel } from '@/entities/model/models/infra/hook/useCreateModels'
import { useHasPermission } from '@/features/auth/hook/useHasPermission'
import { FormSkeletonLayout } from '@/widgets/FormContainer/FormSkeletonLayout'
import { ModelSkeleton } from '@/entities/model/models/infra/ui/ModelSkeletons/ModelFormLayoutSkeleton.tsx'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { InputFallback } from '@/shared/ui/Loading/InputFallback'
import { PERMISSIONS } from '@/shared/config/permissions'

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
		hasChanges,
		isSubmitting,
		submitError,
		onRetry,
		handleChange,
		handleSubmit,
		discardChanges
	} = useCreateModel()
	const hasUpdatePermission = useHasPermission(PERMISSIONS.MODELS.UPDATE)

	// Si estamos en modo 'add', siempre se puede editar.
	// Si estamos en modo 'edit', solo se puede editar si tiene el permiso de UPDATE.
	const canEdit = mode === 'add' || hasUpdatePermission
	return (
		<Suspense
			fallback={
				<FormSkeletonLayout>
					<ModelSkeleton type="form" />
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
					description="Ingrese los datos del modelo el cual desea registar."
					isAddForm={mode === 'add'}
					isSubmitting={isSubmitting}
					submitError={submitError}
					isDirty={hasChanges}
					isLoading={isLoading}
					lastUpdated={formData?.updatedAt}
					canEdit={canEdit}
					handleSubmit={handleSubmit}
					isError={isError}
					isNotFound={isNotFound}
					onRetry={onRetry}
					reset={mode === 'edit' ? discardChanges : undefined}
					url="/form/model/add"
					searchInput={
						<Suspense fallback={<InputFallback />}>
							<ModelSearch />
						</Suspense>
					}
				>
					<Suspense fallback={<ModelSkeleton type="form" />}>
						<ModelInputs
							canEdit={canEdit}
							required={required}
							disabled={disabled}
							formData={formData}
							handleChange={handleChange}
							errors={errors}
							mode={mode}
							isLoading={isLoading}
						/>
					</Suspense>
				</FormLayout>
			</ErrorBoundary>
		</Suspense>
	)
}
