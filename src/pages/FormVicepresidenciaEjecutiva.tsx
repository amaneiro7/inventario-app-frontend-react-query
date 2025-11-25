import { lazy, Suspense } from 'react'
import { useCreateVicepresidenciaEjecutiva } from '@/entities/employee/vicepresidenciaEjecutiva/infra/hook/useCreateVicepresidenciaEjecutiva'
import { FormSkeletonLayout } from '@/widgets/FormContainer/FormSkeletonLayout'
import { VicepresidenciaEjecutivaFormSkeletonLayout } from '@/entities/employee/vicepresidenciaEjecutiva/infra/ui/VicepresidenciaEjecutivaFormLayoutSkeleton.tsx'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { InputFallback } from '@/shared/ui/Loading/InputFallback'
import { useHasPermission } from '@/shared/lib/hooks/useHasPermission'
import { PERMISSIONS } from '@/shared/config/permissions'

const VicepresidenciaEjecutivasInputs = lazy(() =>
	import(
		'@/entities/employee/vicepresidenciaEjecutiva/infra/ui/VicepresidenciaEjecutivaInputs'
	).then(m => ({ default: m.VicepresidenciaEjecutivasInputs }))
)
const VicepresidenciaEjecutivaSearch = lazy(() =>
	import('@/features/vicepresidencia-ejecutiva-search/ui/VicepresidenciaEjecutivaSearch').then(
		m => ({ default: m.VicepresidenciaEjecutivaSearch })
	)
)

const FormLayout = lazy(() =>
	import('@/widgets/FormContainer/FormLayout').then(m => ({ default: m.FormLayout }))
)

export default function FormVicepresidenciaEjecutiva() {
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
	} = useCreateVicepresidenciaEjecutiva()
	const canEdit = useHasPermission(PERMISSIONS.VICEPRESIDENCIA_EJECUTIVAS.UPDATE)
	return (
		<Suspense
			fallback={
				<FormSkeletonLayout border>
					<VicepresidenciaEjecutivaFormSkeletonLayout />
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
					description="Ingrese los datos de la vicepresidencia ejecutiva el cual desea registar."
					isAddForm={mode === 'add'}
					isSubmitting={isSubmitting}
					isDirty={hasChanges}
					isLoading={isLoading}
					lastUpdated={formData?.updatedAt}
					canEdit={canEdit}
					handleSubmit={handleSubmit}
					isError={isError}
					isNotFound={isNotFound}
					onRetry={onRetry}
					reset={mode === 'edit' ? resetForm : undefined}
					url="/form/vicepresidenciaEjecutiva/add"
					border
					searchInput={
						<Suspense fallback={<InputFallback />}>
							<VicepresidenciaEjecutivaSearch />
						</Suspense>
					}
				>
					<Suspense fallback={<VicepresidenciaEjecutivaFormSkeletonLayout />}>
						<VicepresidenciaEjecutivasInputs
							isLoading={isLoading}
							canEdit={canEdit}
							required={required}
							formData={formData}
							handleChange={handleChange}
							errors={errors}
						/>
					</Suspense>
				</FormLayout>
			</ErrorBoundary>
		</Suspense>
	)
}
