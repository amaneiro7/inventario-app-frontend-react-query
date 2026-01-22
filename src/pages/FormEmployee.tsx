import { lazy, Suspense } from 'react'
import { useCreateEmployee } from '@/entities/employee/employee/infra/hook/useCreateEmployee'
import { FormSkeletonLayout } from '@/widgets/FormContainer/FormSkeletonLayout'
import { AsignDevicesSkeleton } from '@/widgets/AsignDevices/AsignDevicesSkeleton'
import { SignatureGeneratorSkeleton } from '@/widgets/SignatureGenerator/components/SignatureGeneratorSkeleton'
import { EmployeeFormSkeletonLayout } from '@/entities/employee/employee/infra/ui/EmployeeForm/EmployeeFormLayoutSkeleton'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import { InputFallback } from '@/shared/ui/Loading/InputFallback'
import { useHasPermission } from '@/features/auth/hook/useHasPermission'
import { PERMISSIONS } from '@/shared/config/permissions'
import { EmployeeHistoryTimelineSkeleton } from '@/widgets/EmployeeHistoryTimeline/EmployeeHistoryTimelineSkeleton'

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

const EmployeeSearch = lazy(() =>
	import('@/features/employee-search/ui/EmployeeSearch').then(m => ({
		default: m.EmployeeSearch
	}))
)
const EmployeeInputs = lazy(() =>
	import('@/entities/employee/employee/infra/ui/EmployeeForm/EmployeeInputs').then(m => ({
		default: m.EmployeeInputs
	}))
)
const AsignDevices = lazy(() =>
	import('@/widgets/AsignDevices').then(m => ({ default: m.AsignDevices }))
)
const SignatureGenerator = lazy(() =>
	import('@/widgets/SignatureGenerator').then(m => ({ default: m.SignatureGenerator }))
)
const EmployeeHistoryTimeline = lazy(() =>
	import('@/widgets/EmployeeHistoryTimeline/EmployeeHistoryTimeline').then(m => ({
		default: m.EmployeeHistoryTimeline
	}))
)

export default function FormEmployee() {
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
		employeeData,
		isSubmitting,
		hasChanges,
		submitError,
		onRetry,
		handleChange,
		handleSubmit,
		discardChanges,
		handleAddPhones,
		handleClearFirstPhone,
		handlePhoneChange,
		handleRemovePhones
	} = useCreateEmployee()
	const hasUpdatePermission = useHasPermission(PERMISSIONS.EMPLOYEES.UPDATE)

	// Si estamos en modo 'add', siempre se puede editar.
	// Si estamos en modo 'edit', solo se puede editar si tiene el permiso de UPDATE.
	const canEdit = mode === 'add' || hasUpdatePermission
	return (
		<>
			<Tabs defaultValue="form" className="h-full space-y-4">
				<DetailsBoxWrapper position="start">
					<TabsList className="w-fit">
						<TabsTrigger value="form">Formulario</TabsTrigger>
						{mode === 'edit' && (
							<>
								<TabsTrigger value="asignDevice">
									Dispositivos asignados
								</TabsTrigger>
								<TabsTrigger value="signatureGenerator">
									Generador de firma
								</TabsTrigger>
								<TabsTrigger value="history">Historial</TabsTrigger>
							</>
						)}
					</TabsList>
				</DetailsBoxWrapper>

				<TabsContent value="form" className="space-y-4">
					<Suspense
						fallback={
							<FormSkeletonLayout>
								<EmployeeFormSkeletonLayout />
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
								description="Ingrese los datos del usuario el cual desea registar."
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
								searchInput={
									<Suspense fallback={<InputFallback />}>
										<EmployeeSearch />
									</Suspense>
								}
								reset={mode === 'edit' ? discardChanges : undefined}
								url="/form/employee/add"
							>
								<Suspense fallback={<EmployeeFormSkeletonLayout />}>
									<EmployeeInputs
										canEdit={canEdit}
										formData={formData}
										errors={errors}
										required={required}
										disabled={disabled}
										isLoading={isLoading}
										mode={mode}
										handleChange={handleChange}
										handleAddPhones={handleAddPhones}
										handleClearFirstPhone={handleClearFirstPhone}
										handlePhoneChange={handlePhoneChange}
										handleRemovePhones={handleRemovePhones}
									/>
								</Suspense>
							</FormLayout>
						</ErrorBoundary>
					</Suspense>
				</TabsContent>

				<TabsContent value="asignDevice" className="space-y-4">
					<DetailsBoxWrapper className="h-full">
						<ErrorBoundary
							fallback={({ onReset }) => (
								<WidgetErrorFallback
									onReset={onReset}
									variant="default"
									message="La vista de dispositivos asigandos no esta disponible"
								/>
							)}
						>
							<Suspense fallback={<AsignDevicesSkeleton />}>
								<AsignDevices data={employeeData} />
							</Suspense>
						</ErrorBoundary>
					</DetailsBoxWrapper>
				</TabsContent>
				<TabsContent value="signatureGenerator" className="space-y-4">
					<ErrorBoundary
						fallback={({ onReset }) => (
							<WidgetErrorFallback
								onReset={onReset}
								variant="default"
								message="El generador de firmas no esta disponible."
							/>
						)}
					>
						<Suspense fallback={<SignatureGeneratorSkeleton />}>
							<SignatureGenerator employeeData={employeeData} />
						</Suspense>
					</ErrorBoundary>
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
							<Suspense fallback={<EmployeeHistoryTimelineSkeleton />}>
								<EmployeeHistoryTimeline
									history={employeeData?.history}
									devices={employeeData?.devices}
								/>
							</Suspense>
						</ErrorBoundary>
					</DetailsBoxWrapper>
				</TabsContent>
			</Tabs>
		</>
	)
}
