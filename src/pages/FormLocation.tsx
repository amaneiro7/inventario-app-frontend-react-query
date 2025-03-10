import { FormContainer } from '@/components/FormContainer/formContainer'
import { Loading } from '@/components/Loading'
import { useCreateLocation } from '@/core/locations/locations/infra/hook/useCreateLocation'
import { LocationSearch } from '@/ui/Form/Location/LocationSearch'
import { lazy, Suspense } from 'react'
const LocationInputs = lazy(async () =>
	import('@/ui/Form/Location/LocationInputs').then(m => ({ default: m.LocationInputs }))
)

export default function FormLocation() {
	const {
		formData,
		mode,
		key,
		errors,
		required,
		handleChange,
		handleSite,
		handleSubmit,
		resetForm
	} = useCreateLocation()

	return (
		<FormContainer
			id={key}
			title="ubicación"
			description="Ingrese los datos de la ubicación el cual desea registar."
			isAddForm={mode === 'add'}
			handleSubmit={handleSubmit}
			handleClose={() => {
				return
			}}
			reset={mode === 'edit' ? resetForm : undefined}
			url="/location/add"
			border
			lastUpdated={formData.updatedAt}
			searchInput={<LocationSearch />}
		>
			<Suspense fallback={<Loading />}>
				<LocationInputs
					required={required}
					formData={formData}
					handleChange={handleChange}
					handleSite={handleSite}
					errors={errors}
					mode={mode}
				/>
			</Suspense>
		</FormContainer>
	)
}
