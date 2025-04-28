import { FormContainer } from '@/components/FormContainer/formContainer'
import { useCreateVicepresidenciaEjecutiva } from '@/core/employee/vicepresidenciaEjecutiva/infra/hook/useCreateVicepresidenciaEjecutiva'
import { VicepresidenciaEjecutivasInputs } from '@/ui/Form/VicepresidenciaEjecutiva/VicepresidenciaEjecutivaInputs'
import { VicepresidenciaEjecutivaSearch } from '@/ui/Form/VicepresidenciaEjecutiva/VicepresidenciaEjecutivaSearch'

export default function FormVicepresidenciaEjecutiva() {
	const { formData, mode, key, errors, required, handleChange, handleSubmit, resetForm } =
		useCreateVicepresidenciaEjecutiva()

	return (
		<FormContainer
			id={key}
			description="Ingrese los datos de la vicepresidencia ejecutiva el cual desea registar."
			isAddForm={mode === 'add'}
			handleSubmit={handleSubmit}
			handleClose={() => {
				window.history.back()
			}}
			reset={mode === 'edit' ? resetForm : undefined}
			url="form/vicepresidenciaEjecutiva/add"
			border
			searchInput={<VicepresidenciaEjecutivaSearch />}
		>
			<VicepresidenciaEjecutivasInputs
				required={required}
				formData={formData}
				handleChange={handleChange}
				errors={errors}
			/>
		</FormContainer>
	)
}
