import { lazy, Suspense } from 'react'
import { useCreateCentroCosto } from '@/entities/employee/centroCosto/infra/hook/useCreateCentroCosto'
import { FormSkeletonLayout } from '@/widgets/FormContainer/FormSkeletonLayout'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'

const FormLayout = lazy(() =>
	import('@/widgets/FormContainer/FormLayout').then(m => ({ default: m.FormLayout }))
)
const CentroCostoInputs = lazy(() =>
	import('@/entities/employee/centroCosto/infra/ui/CentroCostoInputs').then(m => ({
		default: m.CentroCostoInputs
	}))
)
const CentroCostoSearch = lazy(() =>
	import('@/features/centro-costo-search/ui/CentroCostoSearch').then(m => ({
		default: m.CentroCostoSearch
	}))
)

export default function FormCentroCosto() {
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
		onRetry,
		handleChange,
		handleSubmit,
		resetForm
	} = useCreateCentroCosto()

	return (
		<Suspense fallback={<FormSkeletonLayout />}>
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
					description="Ingrese los datos del cenrto de costo el cual desea registar."
					isAddForm={mode === 'add'}
					handleSubmit={handleSubmit}
					isError={isError}
					isNotFound={isNotFound}
					onRetry={onRetry}
					reset={mode === 'edit' ? resetForm : undefined}
					url="/form/centrocosto/add"
					border
					lastUpdated={formData.updatedAt}
					searchInput={<CentroCostoSearch />}
				>
					<CentroCostoInputs
						isLoading={isLoading}
						required={required}
						formData={formData}
						disabled={disabled}
						handleChange={handleChange}
						errors={errors}
						mode={mode}
					/>
				</FormLayout>
			</ErrorBoundary>
		</Suspense>
	)
}
