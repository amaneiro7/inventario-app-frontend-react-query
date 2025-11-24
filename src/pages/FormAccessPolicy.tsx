import { lazy, Suspense } from 'react'

import { FormSkeletonLayout } from '@/widgets/FormContainer/FormSkeletonLayout'

import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import { useCreateAccessPolicy } from '@/entities/accessControl/accessPolicy/infra/hooks/useCreateAccessPolicy'
import { AccessPolicyFormSkeletonLayout } from '@/entities/accessControl/accessPolicy/infra/ui/AccessPolicyFormLayoutSkeleton'

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
	} = useCreateAccessPolicy()

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
					handleSubmit={handleSubmit}
					isError={isError}
					isNotFound={isNotFound}
					onRetry={onRetry}
					reset={mode === 'edit' ? resetForm : undefined}
					url="/form/access-policy/add"
					border
				>
					<Suspense fallback={<AccessPolicyFormSkeletonLayout />}>
						<AccessPolicyInputs
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
