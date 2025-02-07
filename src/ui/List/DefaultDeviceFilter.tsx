import { lazy, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { useEffectAfterMount } from '@/hooks/utils/useEffectAfterMount'
const Input = lazy(
	async () => await import('@/components/Input/Input').then(m => ({ default: m.Input }))
)
const StatusCombobox = lazy(
	async () =>
		await import('@/components/ComboBox/Sincrono/StatusComboBox').then(m => ({
			default: m.StatusCombobox
		}))
)
const BrandCombobox = lazy(
	async () =>
		await import('@/components/ComboBox/Asincrono/BrandComboBox').then(m => ({
			default: m.BrandCombobox
		}))
)
const ModelCombobox = lazy(
	async () =>
		await import('@/components/ComboBox/Asincrono/ModelComboBox').then(m => ({
			default: m.ModelCombobox
		}))
)
const StateCombobox = lazy(
	async () =>
		await import('@/components/ComboBox/Sincrono/StateComboBox').then(m => ({
			default: m.StateCombobox
		}))
)
const CityCombobox = lazy(
	async () =>
		await import('@/components/ComboBox/Asincrono/CityComboBox').then(m => ({
			default: m.CityCombobox
		}))
)

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
	return (
		<>
			<Input
				value={localActivo}
				label="Activo"
				name="activo"
				onChange={e => {
					let { value } = e.target
					value = value.trim().toUpperCase()
					setLocalActivo(value)
				}}
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
