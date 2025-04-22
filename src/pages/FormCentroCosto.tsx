import { FormContainer } from '@/components/FormContainer/formContainer'
import { useCreateCentroCosto } from '@/core/employee/centroCosto/infra/hook/useCreateCentroCosto'
import { CentroCostoInputs } from '@/ui/Form/CentroCosto/CentroCostoInputs'
import { CentroCostoSearch } from '@/ui/Form/CentroCosto/CentroCostoSearch'

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
			title="Centro de Costo"
			description="Ingrese los datos del cenrto de costo el cual desea registar."
			isAddForm={mode === 'add'}
			handleSubmit={handleSubmit}
			handleClose={() => {
				window.history.back()
			}}
			reset={mode === 'edit' ? resetForm : undefined}
			url="/centrocosto/add"
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
