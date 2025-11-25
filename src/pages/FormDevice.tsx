import { Suspense, lazy } from 'react'
import { useCreateDevice } from '@/entities/devices/devices/infra/hook/useCreateDevice'
import { FormSkeletonLayout } from '@/widgets/FormContainer/FormSkeletonLayout'
import { DeviceFormSkeletonLayout } from '@/entities/devices/devices/infra/ui/DeviceForm/DeviceFormLayoutSkeleton'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import { InputFallback } from '@/shared/ui/Loading/InputFallback'
import { useHasPermission } from '@/shared/lib/hooks/useHasPermission'
import { PERMISSIONS } from '@/shared/config/permissions'

const FormLayout = lazy(() =>
	import('@/widgets/FormContainer/FormLayout').then(m => ({ default: m.FormLayout }))
)

const DeviceInputs = lazy(() =>
	import('@/entities/devices/devices/infra/ui/DeviceForm/DeviceInputs').then(m => ({
		default: m.DeviceInputs
	}))
)
const SerialSearch = lazy(() =>
	import('@/features/device-by-serial-search/ui/SerialSearch').then(m => ({
		default: m.SerialSearch
	}))
)

export default function FormDevice() {
	const {
		formData,
		key,
		mode,
		errors,
		disabled,
		required,
		isError,
		isLoading,
		isNotFound,
		hasChanges,
		isSubmitting,
		onRetry,
		handleChange,
		handleLocation,
		handleMemory,
		handleModel,
		handleSubmit,
		discardChanges
	} = useCreateDevice()
	const canEdit = useHasPermission(PERMISSIONS.DEVICES.UPDATE)

	return (
		<Suspense
			fallback={
				<FormSkeletonLayout>
					<DeviceFormSkeletonLayout />
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
					description="Ingrese los datos del dispositivo el cual desea registar."
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
					reset={mode === 'edit' ? discardChanges : undefined}
					updatedBy={formData.history}
					url="/form/device/add"
					searchInput={
						<Suspense fallback={<InputFallback />}>
							<SerialSearch />
						</Suspense>
					}
				>
					<Suspense fallback={<DeviceFormSkeletonLayout />}>
						<DeviceInputs
							canEdit={canEdit}
							formData={formData}
							errors={errors}
							required={required}
							disabled={disabled}
							mode={mode}
							isLoading={isLoading}
							handleChange={handleChange}
							handleLocation={handleLocation}
							handleMemory={handleMemory}
							handleModel={handleModel}
						/>
					</Suspense>
				</FormLayout>
			</ErrorBoundary>
		</Suspense>
	)
}
