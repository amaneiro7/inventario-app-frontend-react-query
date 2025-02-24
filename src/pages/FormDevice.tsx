import { Suspense, useMemo } from 'react'
import { useCreateDevice } from '@/core/devices/devices/infra/hook/useCreateDevice'
import { Loading } from '@/components/Loading'
import { FormContainer } from '@/components/FormContainer/formContainer'
import { DeviceInputs } from '@/ui/Form/Device/DeviceInputs'
import { CategoryOptions } from '@/core/category/domain/entity/CategoryOptions'
import { AddMFPFeatures } from '@/ui/Form/Device/AddMFPFeatures'

export default function FormDevice() {
	const {
		formData,
		key,
		mode,
		errors,
		disabled,
		required,
		handleChange,
		handleLocation,
		handleMemory,
		handleModel,
		handleSubmit,
		resetForm
	} = useCreateDevice()

	const addionalFeatures = useMemo(() => {
		if (formData.categoryId === CategoryOptions.MFP) {
			return (
				<AddMFPFeatures
					ipAddress={formData.ipAddress}
					handleChange={handleChange}
					error={errors.ipAddress}
				/>
			)
		} else {
			return null
		}
	}, [formData.categoryId])

	return (
		<Suspense fallback={<Loading />}>
			<FormContainer
				id={key}
				title="Dispositivo"
				description="Ingrese los datos del dispositivo el cual desea registar."
				isAddForm={mode === 'add'}
				handleSubmit={handleSubmit}
				handleClose={() => {
					return
				}}
				reset={mode === 'edit' ? resetForm : undefined}
				url="/Processor/add"
			>
				<DeviceInputs
					formData={formData}
					handleChange={handleChange}
					handleLocation={handleLocation}
					handleModel={handleModel}
					errors={errors}
					disabled={disabled}
					required={required}
				/>
				<Suspense>{addionalFeatures}</Suspense>
			</FormContainer>
		</Suspense>
	)
}
