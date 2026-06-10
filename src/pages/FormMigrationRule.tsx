import { lazy, Suspense } from 'react'
import { useCreateMigrationRule } from '@/entities/devices/deviceEvaluation/infra/hook/useCreateMigrationRule'
import { useHasPermission } from '@/features/auth/hook/useHasPermission'
import { FormSkeletonLayout } from '@/widgets/FormContainer/FormSkeletonLayout'
import { ModelSkeleton } from '@/entities/model/models/infra/ui/ModelSkeletons/ModelFormLayoutSkeleton.tsx'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { PERMISSIONS } from '@/shared/config/permissions'

const MigrationRuleInputs = lazy(() =>
	import('@/entities/devices/deviceEvaluation/infra/ui/MigrationRuleInputs').then(m => ({
		default: m.MigrationRuleInputs
	}))
)

const FormLayout = lazy(() =>
	import('@/widgets/FormContainer/FormLayout').then(m => ({ default: m.FormLayout }))
)

// const ModelSearch = lazy(() =>
// 	import('@/features/model-search/ui/ModelSearch').then(m => ({ default: m.ModelSearch }))
// )

export default function FormMigrationRule() {
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
	} = useCreateMigrationRule()
	const hasUpdatePermission = useHasPermission(PERMISSIONS.MIGRATION_RULES.UPDATE)

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
					description="Ingrese los datos de la regla de migración que desea registrar."
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
					url="/form/migration-rule/add"
				>
					<Suspense fallback={<ModelSkeleton type="form" />}>
						<MigrationRuleInputs
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
