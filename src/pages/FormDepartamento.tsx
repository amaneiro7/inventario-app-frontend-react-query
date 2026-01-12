import { lazy, Suspense } from 'react'
import { useCreateDepartamento } from '@/entities/employee/departamento/infra/hook/useCreateDepartamento'
import { FormSkeletonLayout } from '@/widgets/FormContainer/FormSkeletonLayout'
import { DepartamentoFormSkeletonLayout } from '@/entities/employee/departamento/infra/ui/DepartamentoFormSkeletonLayout'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { useHasPermission } from '@/features/auth/hook/useHasPermission'
import { PERMISSIONS } from '@/shared/config/permissions'
import { InputFallback } from '@/shared/ui/Loading/InputFallback'

const FormLayout = lazy(() =>
	import('@/widgets/FormContainer/FormLayout').then(m => ({ default: m.FormLayout }))
)
const DepartamentoInputs = lazy(() =>
	import('@/entities/employee/departamento/infra/ui/DepartamentoInputs').then(m => ({
		default: m.DepartamentoInputs
	}))
)
const DepartamentoSearch = lazy(() =>
	import('@/features/departamento-search/ui/DepartamentoSearch').then(m => ({
		default: m.DepartamentoSearch
	}))
)

export default function FormDepartamento() {
	const {
		formData,
		key,
		mode,
		errors,
		isError,
		isLoading,
		isNotFound,
		required,
		disabled,
		hasChanges,
		isSubmitting,
		submitError,
		onRetry,
		handleChange,
		handleSubmit,
		discardChanges
	} = useCreateDepartamento()
	const hasUpdatePermission = useHasPermission(PERMISSIONS.DEPARTAMENTOS.UPDATE)

	// Si estamos en modo 'add', siempre se puede editar.
	// Si estamos en modo 'edit', solo se puede editar si tiene el permiso de UPDATE.
	const canEdit = mode === 'add' || hasUpdatePermission
	return (
		<Suspense
			fallback={
				<FormSkeletonLayout border>
					<DepartamentoFormSkeletonLayout />
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
					description="Ingrese los datos del departamento el cual desea registar."
					isAddForm={mode === 'add'}
					canEdit={canEdit}
					isSubmitting={isSubmitting}
					submitError={submitError}
					isDirty={hasChanges}
					isLoading={isLoading}
					handleSubmit={handleSubmit}
					isError={isError}
					isNotFound={isNotFound}
					onRetry={onRetry}
					reset={mode === 'edit' ? discardChanges : undefined}
					url="/form/departamento/add"
					border
					lastUpdated={formData.updatedAt}
					searchInput={
						<Suspense fallback={<InputFallback />}>
							<DepartamentoSearch />
						</Suspense>
					}
				>
					<Suspense fallback={<DepartamentoFormSkeletonLayout />}>
						<DepartamentoInputs
							canEdit={canEdit}
							isLoading={isLoading}
							required={required}
							formData={formData}
							disabled={disabled}
							handleChange={handleChange}
							errors={errors}
							mode={mode}
						/>
					</Suspense>
				</FormLayout>
			</ErrorBoundary>
		</Suspense>
	)
}
