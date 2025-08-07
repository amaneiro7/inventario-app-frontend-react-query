import { FormContainer } from '@/widgets/FormContainer/FormContainer'
import { useCreateCargo } from '@/entities/employee/cargo/infra/hook/useCreateCargo'
import { CargoSearch } from '@/features/cargo-search/ui/CargoSearch'
import { CargoInputs } from '@/entities/employee/cargo/infra/ui/CargoInputs'

export default function FormCargo() {
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
	} = useCreateCargo()

	return (
		<FormContainer
			id={key}
			description="Ingrese los datos del Cargo el cual desea registar."
			isAddForm={mode === 'add'}
			handleSubmit={handleSubmit}
			handleClose={() => {
				window.history.back()
			}}
			reset={mode === 'edit' ? resetForm : undefined}
			url="/form/cargo/add"
			border
			lastUpdated={formData.updatedAt}
			searchInput={<CargoSearch />}
		>
			<CargoInputs
				required={required}
				formData={formData}
				disabled={disabled}
				handleChange={handleChange}
				errors={errors}
			/>
		</FormContainer>
	)
}
