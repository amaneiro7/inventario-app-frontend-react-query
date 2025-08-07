import { FormLayout } from '@/widgets/FormContainer/FormLayout'
import { useCreateVicepresidencia } from '@/entities/employee/vicepresidencia/infra/hook/useCreateVicepresidencia'
import { VicepresidenciasInputs } from '@/entities/employee/vicepresidencia/infra/ui/VicepresidenciaInputs'
import { VicepresidenciaSearch } from '@/features/vicepresidencia-search/ui/VicepresidenciaSearch'

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
		<FormLayout
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
		</FormLayout>
	)
}
