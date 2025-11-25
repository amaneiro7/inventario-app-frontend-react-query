import { lazy, Suspense } from 'react'
import { FormSkeletonLayout } from '@/widgets/FormContainer/FormSkeletonLayout'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import { useCreateAccessPolicy } from '@/entities/accessControl/accessPolicy/infra/hooks/useCreateAccessPolicy'
import { AccessPolicyFormSkeletonLayout } from '@/entities/accessControl/accessPolicy/infra/ui/AccessPolicyFormLayoutSkeleton'
import { InputFallback } from '@/shared/ui/Loading/InputFallback'
import { useHasPermission } from '@/shared/lib/hooks/useHasPermission'
import { PERMISSIONS } from '@/shared/config/permissions'

const AccessPolicySearch = lazy(() =>
	import('@/features/access-policy-search/ui/AccessPolicySearch').then(m => ({
		default: m.AccessPolicySearch
	}))
)

const FormLayout = lazy(() =>
	import('@/widgets/FormContainer/FormLayout').then(m => ({ default: m.FormLayout }))
)
const AccessPolicyInputs = lazy(() =>
	import('@/entities/accessControl/accessPolicy/infra/ui/AccessPolicyInputs').then(m => ({
		default: m.AccessPolicyInputs
	}))
)

export default function FormAccessPolicy() {
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
		discardChanges
	} = useCreateAccessPolicy()
	const canEdit = useHasPermission(PERMISSIONS.ACCESS_POLICIES.UPDATE)

	return (
		<Suspense
			fallback={
				<FormSkeletonLayout border>
					<AccessPolicyFormSkeletonLayout />
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
					description="Ingrese los datos de la política de acceso que desea registrar."
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
					reset={mode === 'edit' ? discardChanges : undefined}
					url="/form/access-policy/add"
					border
					searchInput={
						<Suspense fallback={<InputFallback />}>
							<AccessPolicySearch />
						</Suspense>
					}
				>
					<Suspense fallback={<AccessPolicyFormSkeletonLayout />}>
						<AccessPolicyInputs
							canEdit={canEdit}
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
