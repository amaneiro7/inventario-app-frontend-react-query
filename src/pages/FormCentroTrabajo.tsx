import { FormContainer } from '@/widgets/FormContainer/FormContainer'
import { useCreateCentroTrabajo } from '@/entities/employee/centroTrabajo/infra/hook/useCreateCentroTrabajo'
import { CentroTrabajoInputs } from '@/entities/employee/centroTrabajo/infra/ui/CentroTrabajoInputs'
import { CentroTrabajoSearch } from '@/features/centro-trabajo-search/ui/CentroTrabajoSearch'

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
			description="Ingrese los datos del cenrto de Trabajo el cual desea registar."
			isAddForm={mode === 'add'}
			handleSubmit={handleSubmit}
			handleClose={() => {
				window.history.back()
			}}
			reset={mode === 'edit' ? resetForm : undefined}
			url="/form/centrotrabajo/add"
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
