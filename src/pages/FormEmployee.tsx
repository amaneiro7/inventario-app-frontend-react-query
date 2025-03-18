import { FormContainer } from '@/components/FormContainer/formContainer'
import { useCreateEmployee } from '@/core/employee/employee/infra/hook/useCreateEmployee'
import { EmployeeInputs } from '@/ui/Form/Employee/EmployeeInputs'
import { EmployeeSearch } from '@/ui/Form/Employee/EmployeeSearch'

export default function FormEmployee() {
	const {
		formData,
		key,
		mode,
		errors,
		disabled,
		required,
		handleChange,
		handleDepartment,
		handleSubmit,
		handlePhoneInputs,
		resetForm
	} = useCreateEmployee()

	return (
		<FormContainer
			id={key}
			title="Usuarios"
			description="Ingrese los datos del usuario el cual desea registar."
			isAddForm={mode === 'add'}
			handleSubmit={handleSubmit}
			handleClose={() => {
				return
			}}
			searchInput={<EmployeeSearch />}
			reset={mode === 'edit' ? resetForm : undefined}
			lastUpdated={formData.updatedAt}
			url="/employee/add"
		>
			<EmployeeInputs
				formData={formData}
				errors={errors}
				required={required}
				disabled={disabled}
				mode={mode}
				handleChange={handleChange}
				handleDepartment={handleDepartment}
				handlePhoneInputs={handlePhoneInputs}
			/>
		</FormContainer>
	)
}
