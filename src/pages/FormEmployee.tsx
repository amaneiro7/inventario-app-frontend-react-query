import { FormContainer } from '@/components/FormContainer/formContainer'
import { InfoBox } from '@/components/InfoBox/InfoBox'
import { InfoBoxText } from '@/components/InfoBox/InfoBoxText'
import { InfoBoxTitle } from '@/components/InfoBox/InfoBoxTitle'
import Typography from '@/components/Typography'
import { useCreateEmployee } from '@/core/employee/employee/infra/hook/useCreateEmployee'
import { EmployeeInputs } from '@/ui/Form/Employee/EmployeeInputs'
import { EmployeeSearch } from '@/ui/Form/Employee/EmployeeSearch'

export default function FormEmployee() {
	const {
		formData,
		key,
		mode,
		errors,
		disabled,
		required,
		handleChange,
		handleDepartment,
		handleSubmit,
		resetForm,
		handleAddPhones,
		handleClearFirstPhone,
		handlePhoneChange,
		handleRemovePhones
	} = useCreateEmployee()
	return (
		<FormContainer
			id={key}
			title="Usuarios"
			description="Ingrese los datos del usuario el cual desea registar."
			isAddForm={mode === 'add'}
			handleSubmit={handleSubmit}
			handleClose={() => {
				return
			}}
			searchInput={<EmployeeSearch />}
			reset={mode === 'edit' ? resetForm : undefined}
			lastUpdated={formData.updatedAt}
			url="/employee/add"
		>
			<EmployeeInputs
				formData={formData}
				errors={errors}
				required={required}
				disabled={disabled}
				mode={mode}
				handleChange={handleChange}
				handleDepartment={handleDepartment}
				handleAddPhones={handleAddPhones}
				handleClearFirstPhone={handleClearFirstPhone}
				handlePhoneChange={handlePhoneChange}
				handleRemovePhones={handleRemovePhones}
			/>
			{formData.devices.length > 0 && (
				<div className="flex flex-col gap-4 border border-gray-400 rounded-lg p-8 pt-4">
					<Typography color="azul" variant="h5">
						Información de dispositivos asignados
					</Typography>
					{formData.devices.map(
						({ id, category, brand, serial, model, location, computer }) => (
							<InfoBox key={id}>
								<InfoBoxTitle title={category.name} url={`/device/edit/${id}`} />
								<InfoBoxText desc="Marca" text={brand.name} />
								<InfoBoxText desc="Model" text={model.name} />
								<InfoBoxText desc="Serial" text={serial ?? 'Sin serial'} />
								<InfoBoxText desc="Ubicación" text={location.name} />
								{computer && (
									<InfoBoxText
										desc="Dirección IP"
										text={computer.ipAddress ?? 'Sin IP'}
									/>
								)}
							</InfoBox>
						)
					)}
				</div>
			)}
		</FormContainer>
	)
}
