import { FormContainer } from '@/widgets/FormContainer/formContainer'
import { useCreateVicepresidencia } from '@/entities/employee/vicepresidencia/infra/hook/useCreateVicepresidencia'
import { VicepresidenciasInputs } from '@/ui/Form/Vicepresidencia/VicepresidenciaInputs'
import { VicepresidenciaSearch } from '@/ui/Form/Vicepresidencia/VicepresidenciaSearch'

export default function FormVicepresidencia() {
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
	} = useCreateVicepresidencia()

	return (
		<FormContainer
			id={key}
			description="Ingrese los datos de la vicepresidencia el cual desea registar."
			isAddForm={mode === 'add'}
			handleSubmit={handleSubmit}
			handleClose={() => {
				window.history.back()
			}}
			reset={mode === 'edit' ? resetForm : undefined}
			url="/form/vicepresidencia/add"
			border
			searchInput={<VicepresidenciaSearch />}
		>
			<VicepresidenciasInputs
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
