import { FormLayout } from '@/widgets/FormContainer/FormLayout'
import { useCreateVicepresidenciaEjecutiva } from '@/entities/employee/vicepresidenciaEjecutiva/infra/hook/useCreateVicepresidenciaEjecutiva'
import { VicepresidenciaEjecutivasInputs } from '@/entities/employee/vicepresidenciaEjecutiva/infra/ui/VicepresidenciaEjecutivaInputs'
import { VicepresidenciaEjecutivaSearch } from '@/features/vicepresidencia-ejecutiva-search/ui/VicepresidenciaEjecutivaSearch'

export default function FormVicepresidenciaEjecutiva() {
	const { formData, mode, key, errors, required, handleChange, handleSubmit, resetForm } =
		useCreateVicepresidenciaEjecutiva()

	return (
		<FormLayout
			id={key}
			description="Ingrese los datos de la vicepresidencia ejecutiva el cual desea registar."
			isAddForm={mode === 'add'}
			handleSubmit={handleSubmit}
			handleClose={() => {
				window.history.back()
			}}
			reset={mode === 'edit' ? resetForm : undefined}
			url="/form/vicepresidenciaEjecutiva/add"
			border
			searchInput={<VicepresidenciaEjecutivaSearch />}
		>
			<VicepresidenciaEjecutivasInputs
				required={required}
				formData={formData}
				handleChange={handleChange}
				errors={errors}
			/>
		</FormLayout>
	)
}
