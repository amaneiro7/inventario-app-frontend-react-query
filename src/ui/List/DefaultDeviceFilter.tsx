import { useCallback, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { useEffectAfterMount } from '@/hooks/utils/useEffectAfterMount'
import { CityCombobox } from '@/components/ComboBox/Asincrono/CityComboBox'
import { StateCombobox } from '@/components/ComboBox/Sincrono/StateComboBox'
import { ModelCombobox } from '@/components/ComboBox/Asincrono/ModelComboBox'
import { BrandCombobox } from '@/components/ComboBox/Asincrono/BrandComboBox'
import { StatusCombobox } from '@/components/ComboBox/Sincrono/StatusComboBox'
import { Input } from '@/components/Input/Input'

export function DefaultDeviceFilter({
	activo,
	statusId,
	brandId,
	modelId,
	stateId,
	cityId,
	categoryId,
	regionId,
	handleChange
}: {
	activo?: string
	statusId?: string
	brandId?: string
	modelId?: string
	categoryId?: string
	stateId?: string
	regionId?: string
	cityId?: string
	handleChange: (name: string, value: string | number) => void
}) {
	const [localActivo, setLocalActivo] = useState(activo ?? '')
	const [debounceActivo] = useDebounce(localActivo)

	useEffectAfterMount(() => {
		handleChange('activo', debounceActivo)
	}, [debounceActivo])

	useEffectAfterMount(() => {
		if (!activo) {
			setLocalActivo('')
		}
	}, [activo])

	const handleActivo = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.trim().toUpperCase()
		setLocalActivo(value)
	}, [])
	return (
		<>
			<Input
				value={localActivo}
				label="Activo"
				name="activo"
				type="search"
				onChange={handleActivo}
			/>

			<StatusCombobox handleChange={handleChange} name="state" value={statusId} />

			<BrandCombobox handleChange={handleChange} name="brandId" value={brandId} />

			<ModelCombobox
				handleChange={handleChange}
				brandId={brandId}
				categoryId={categoryId}
				name="modelId"
				value={modelId}
			/>

			<StateCombobox
				handleChange={handleChange}
				name="stateId"
				regionId={regionId}
				value={stateId}
			/>

			<CityCombobox
				handleChange={handleChange}
				name="cityId"
				stateId={stateId}
				regionId={regionId}
				value={cityId}
			/>
		</>
	)
}
