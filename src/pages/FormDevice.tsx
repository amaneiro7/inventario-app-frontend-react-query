import { Suspense, lazy } from 'react'
import { useCreateDevice } from '@/entities/devices/devices/infra/hook/useCreateDevice'
import { FormSkeletonLayout } from '@/widgets/FormContainer/FormSkeletonLayout'
import { DeviceFormSkeletonLayout } from '@/entities/devices/devices/infra/ui/DeviceForm/DeviceFormLayoutSkeleton'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import { InputFallback } from '@/shared/ui/Loading/InputFallback'
import { useHasPermission } from '@/features/auth/hook/useHasPermission'
import { PERMISSIONS } from '@/shared/config/permissions'
import { HistoryTimelineSkeleton } from '@/widgets/HistoryTimeline/HistoryTimelineSkeleton'

const Tabs = lazy(() => import('@/shared/ui/Tabs').then(m => ({ default: m.Tabs })))
const TabsContent = lazy(() => import('@/shared/ui/Tabs').then(m => ({ default: m.TabsContent })))
const TabsList = lazy(() => import('@/shared/ui/Tabs').then(m => ({ default: m.TabsList })))
const TabsTrigger = lazy(() => import('@/shared/ui/Tabs').then(m => ({ default: m.TabsTrigger })))
const DetailsBoxWrapper = lazy(() =>
	import('@/shared/ui/DetailsWrapper/DetailsBoxWrapper').then(m => ({
		default: m.DetailsBoxWrapper
	}))
)

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

const DeviceHistoryTimeline = lazy(() =>
	import('@/widgets/HistoryTimeline/DeviceHistoryTimeline').then(m => ({
		default: m.DeviceHistoryTimeline
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
		submitError,
		deviceData,
		onRetry,
		handleChange,
		handleLocation,
		handleMemory,
		handleModel,
		handleSubmit,
		discardChanges
	} = useCreateDevice()
	const hasUpdatePermission = useHasPermission(PERMISSIONS.DEVICES.UPDATE)

	// Si estamos en modo 'add', siempre se puede editar.
	// Si estamos en modo 'edit', solo se puede editar si tiene el permiso de UPDATE.
	const canEdit = mode === 'add' || hasUpdatePermission
	return (
		<Tabs defaultValue="form" className="h-full space-y-4">
			<DetailsBoxWrapper>
				<TabsList className="w-fit">
					<TabsTrigger value="form">Formulario</TabsTrigger>
					{mode === 'edit' && (
						<>
							<TabsTrigger value="history">Historial</TabsTrigger>
						</>
					)}
				</TabsList>
			</DetailsBoxWrapper>
			<TabsContent value="form" className="space-y-4">
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
							submitError={submitError}
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
			</TabsContent>
			<TabsContent value="history" className="space-y-4">
				<DetailsBoxWrapper className="h-full">
					<ErrorBoundary
						fallback={({ onReset }) => (
							<WidgetErrorFallback
								onReset={onReset}
								variant="default"
								message="El historial no está disponible."
							/>
						)}
					>
						<Suspense fallback={<HistoryTimelineSkeleton />}>
							<DeviceHistoryTimeline
								deviceData={deviceData}
								history={formData.history ?? []}
							/>
						</Suspense>
					</ErrorBoundary>
				</DetailsBoxWrapper>
			</TabsContent>
		</Tabs>
	)
}
