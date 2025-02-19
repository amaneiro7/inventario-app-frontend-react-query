import { lazy, Suspense, useState } from 'react'
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
		<Suspense>
			<Input
				value={localActivo}
				label="Activo"
				name="activo"
				type="search"
				onChange={e => {
					let { value } = e.target
					value = value.trim().toUpperCase()
					setLocalActivo(value)
				}}
			/>
			<Suspense>
				<StatusCombobox handleChange={handleChange} name="state" value={statusId} />
			</Suspense>
			<Suspense>
				<BrandCombobox handleChange={handleChange} name="brandId" value={brandId} />
			</Suspense>
			<Suspense>
				<ModelCombobox
					handleChange={handleChange}
					brandId={brandId}
					categoryId={categoryId}
					name="modelId"
					value={modelId}
				/>
			</Suspense>
			<Suspense>
				<StateCombobox
					handleChange={handleChange}
					name="stateId"
					regionId={regionId}
					value={stateId}
				/>
			</Suspense>
			<Suspense>
				<CityCombobox
					handleChange={handleChange}
					name="cityId"
					stateId={stateId}
					regionId={regionId}
					value={cityId}
				/>
			</Suspense>
		</Suspense>
	)
}
