import { FormContainer } from '@/components/FormContainer/formContainer'
import { useCreateDepartamento } from '@/core/employee/departamento/infra/hook/useCreateDepartamento'
import { DepartamentoInputs } from '@/ui/Form/Departamento/DepartamentoInputs'
import { DepartamentoSearch } from '@/ui/Form/Departamento/DepartamentoSearch'

export default function FormDepartamento() {
	const {
		formData,
		mode,
		key,
		errors,
		required,
		disabled,
		handleChange,
		handleSubmit,
		resetForm
	} = useCreateDepartamento()

	return (
		<FormContainer
			id={key}
			description="Ingrese los datos del departamento el cual desea registar."
			isAddForm={mode === 'add'}
			handleSubmit={handleSubmit}
			handleClose={() => {
				window.history.back()
			}}
			reset={mode === 'edit' ? resetForm : undefined}
			url="/form/departamento/add"
			border
			lastUpdated={formData.updatedAt}
			searchInput={<DepartamentoSearch />}
		>
			<DepartamentoInputs
				required={required}
				formData={formData}
				disabled={disabled}
				handleChange={handleChange}
				errors={errors}
				mode={mode}
			/>
		</FormContainer>
	)
}
