import { lazy, memo, Suspense, useMemo } from 'react'
import { FormContainer } from '@/components/FormContainer/formContainer'
import { useCreateEmployee } from '@/core/employee/employee/infra/hook/useCreateEmployee'
import { EmployeeSearch } from '@/ui/Form/Employee/EmployeeSearch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs'

const AsignDevices = lazy(() =>
	import('@/ui/Form/Employee/AsignDevices').then(m => ({ default: m.AsignDevices }))
)
const EmployeeInputs = lazy(() =>
	import('@/ui/Form/Employee/EmployeeInputs').then(m => ({ default: m.EmployeeInputs }))
)

const FormEmployee = memo(() => {
	const {
		formData,
		key,
		mode,
		errors,
		disabled,
		required,
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
	return (
		<FormContainer
			id={key}
			title="Usuarios"
			description="Ingrese los datos del usuario el cual desea registar."
			isAddForm={mode === 'add'}
			handleSubmit={handleSubmit}
			handleClose={() => {
				window.history.back()
			}}
			searchInput={<EmployeeSearch />}
			reset={mode === 'edit' ? resetForm : undefined}
			lastUpdated={updatedAt}
			url="/employee/add"
		>
			<Tabs defaultValue="form" className="space-y-4">
				<TabsList>
					<TabsTrigger value="form">Formulario</TabsTrigger>
					{mode === 'edit' && (
						<TabsTrigger value="asignDevice">Dispositvios asignados</TabsTrigger>
					)}
				</TabsList>

				<TabsContent value="form" className="space-y-4">
					<Suspense fallback={<div className="min-h-[765px]">Loading...</div>}>
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
					</Suspense>
				</TabsContent>

				<TabsContent value="asignDevice" className="space-y-4">
					<Suspense fallback={<div className="min-h-[765px]">Loading...</div>}>
						<AsignDevices devices={formData.devices} />
					</Suspense>
				</TabsContent>
			</Tabs>
		</FormContainer>
	)
})

FormEmployee.displayName = 'FormEmployee'
export default FormEmployee
