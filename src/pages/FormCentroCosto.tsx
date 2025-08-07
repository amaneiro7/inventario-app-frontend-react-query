import { FormContainer } from '@/widgets/FormContainer/FormContainer'
import { useCreateCentroCosto } from '@/entities/employee/centroCosto/infra/hook/useCreateCentroCosto'
import { CentroCostoInputs } from '@/entities/employee/centroCosto/infra/ui/CentroCostoInputs'
import { CentroCostoSearch } from '@/features/centro-costo-search/ui/CentroCostoSearch'

export default function FormCentroCosto() {
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
	} = useCreateCentroCosto()

	return (
		<FormContainer
			id={key}
			description="Ingrese los datos del cenrto de costo el cual desea registar."
			isAddForm={mode === 'add'}
			handleSubmit={handleSubmit}
			handleClose={() => {
				window.history.back()
			}}
			reset={mode === 'edit' ? resetForm : undefined}
			url="/form/centrocosto/add"
			border
			lastUpdated={formData.updatedAt}
			searchInput={<CentroCostoSearch />}
		>
			<CentroCostoInputs
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
