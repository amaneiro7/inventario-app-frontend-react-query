import { FormContainer } from '@/components/FormContainer/formContainer'
import { useCreateCentroTrabajo } from '@/core/employee/centroTrabajo/infra/hook/useCreateCentroTrabajo'
import { CentroTrabajoInputs } from '@/ui/Form/CentroTrabajo/CentroTrabajoInputs'
import { CentroTrabajoSearch } from '@/ui/Form/CentroTrabajo/CentroTrabajoSearch'

export default function FormCentroTrabajo() {
	const {
		formData,
		mode,
		key,
		errors,
		disabled,
		required,
		handleChange,
		handleSubmit,
		resetForm
	} = useCreateCentroTrabajo()

	return (
		<FormContainer
			id={key}
			title="Centro de Trabajo"
			description="Ingrese los datos del cenrto de Trabajo el cual desea registar."
			isAddForm={mode === 'add'}
			handleSubmit={handleSubmit}
			handleClose={() => {
				window.history.back()
			}}
			reset={mode === 'edit' ? resetForm : undefined}
			url="/centrotrabajo/add"
			border
			lastUpdated={formData.updatedAt}
			searchInput={<CentroTrabajoSearch />}
		>
			<CentroTrabajoInputs
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
