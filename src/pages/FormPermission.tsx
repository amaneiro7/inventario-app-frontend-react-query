import { lazy, Suspense } from 'react'
import { useCreatePermission } from '@/entities/accessControl/permission/infra/hooks/useCreatePermission'
import { FormSkeletonLayout } from '@/widgets/FormContainer/FormSkeletonLayout'
import { PermissionFormSkeletonLayout } from '@/entities/accessControl/permission/infra/ui/PermissionFormLayoutSkeleton'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'

const FormLayout = lazy(() =>
	import('@/widgets/FormContainer/FormLayout').then(m => ({ default: m.FormLayout }))
)
const PermissionInputs = lazy(() =>
	import('@/entities/accessControl/permission/infra/ui/PermissionInputs').then(m => ({
		default: m.PermissionInputs
	}))
)
const PermissionSearch = lazy(() =>
	import('@/features/permission-search/ui/PermissionSearch').then(m => ({
		default: m.PermissionSearch
	}))
)

export default function FormPermission() {
	const {
		formData,
		mode,
		key,
		errors,
		isError,
		isLoading,
		// hasChanges,
		// isSubmitting,
		isNotFound,
		onRetry,
		handleChange,
		handleSubmit,
		resetForm
	} = useCreatePermission()
	return (
		<Suspense
			fallback={
				<FormSkeletonLayout border>
					<PermissionFormSkeletonLayout />
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
					description="Ingrese los datos del permiso el cual desea registar."
					isAddForm={mode === 'add'}
					handleSubmit={handleSubmit}
					isError={isError}
					isNotFound={isNotFound}
					onRetry={onRetry}
					reset={mode === 'edit' ? resetForm : undefined}
					url="/form/permission/add"
					border
					searchInput={<PermissionSearch />}
				>
					<Suspense fallback={<PermissionFormSkeletonLayout />}>
						<PermissionInputs
							formData={formData}
							isLoading={isLoading}
							handleChange={handleChange}
							errors={errors}
						/>
					</Suspense>
				</FormLayout>
			</ErrorBoundary>
		</Suspense>
	)
}
