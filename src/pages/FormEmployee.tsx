import { lazy, Suspense, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateEmployee } from '@/entities/employee/employee/infra/hook/useCreateEmployee'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/Tabs'
import { FormContainer } from '@/widgets/FormContainer/FormContainer'
import { DetailsBoxWrapper } from '@/shared/ui/DetailsWrapper/DetailsBoxWrapper'
import { AsignDevicesSkeleton } from '@/widgets/AsignDevices/AsignDevicesSkeleton'
import { FormSkeleton } from '@/widgets/FormContainer/FormSkeleton'
import { SignatureGeneratorSkeleton } from '@/widgets/SignatureGenerator/components/SignatureGeneratorSkeleton'

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

export default function FormEmployee() {
	const {
		formData,
		key,
		mode,
		errors,
		disabled,
		required,
		employeeData,
		handleChange,
		handleSubmit,
		resetForm,
		handleAddPhones,
		handleClearFirstPhone,
		handlePhoneChange,
		handleRemovePhones
	} = useCreateEmployee()
	const updatedAt = useMemo(() => {
		return formData.updatedAt
	}, [formData.updatedAt])
	const navigate = useNavigate()

	return (
		<>
			<Tabs defaultValue="form" className="h-full space-y-4">
				<DetailsBoxWrapper position="right">
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
							</>
						)}
					</TabsList>
				</DetailsBoxWrapper>

				<TabsContent value="form" className="space-y-4">
					<Suspense fallback={<FormSkeleton />}>
						<FormContainer
							id={key}
							description="Ingrese los datos del usuario el cual desea registar."
							isAddForm={mode === 'add'}
							handleSubmit={handleSubmit}
							handleClose={() => {
								navigate(-1)
							}}
							searchInput={<EmployeeSearch />}
							reset={mode === 'edit' ? resetForm : undefined}
							lastUpdated={updatedAt}
							url="/form/employee/add"
						>
							<EmployeeInputs
								formData={formData}
								errors={errors}
								required={required}
								disabled={disabled}
								mode={mode}
								handleChange={handleChange}
								handleAddPhones={handleAddPhones}
								handleClearFirstPhone={handleClearFirstPhone}
								handlePhoneChange={handlePhoneChange}
								handleRemovePhones={handleRemovePhones}
							/>
						</FormContainer>
					</Suspense>
				</TabsContent>

				<TabsContent value="asignDevice" className="space-y-4">
					<DetailsBoxWrapper className="h-full">
						<Suspense fallback={<AsignDevicesSkeleton />}>
							<AsignDevices data={employeeData} />
						</Suspense>
					</DetailsBoxWrapper>
				</TabsContent>
				<TabsContent value="signatureGenerator" className="space-y-4">
					<Suspense fallback={<SignatureGeneratorSkeleton />}>
						<SignatureGenerator employeeData={employeeData} />
					</Suspense>
				</TabsContent>
			</Tabs>
		</>
	)
}
