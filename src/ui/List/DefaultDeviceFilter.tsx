import { lazy, Suspense, useCallback, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { useEffectAfterMount } from '@/hooks/utils/useEffectAfterMount'
import { Input } from '@/components/Input/Input'
import { InputFallback } from '@/components/Loading/InputFallback'

const CityCombobox = lazy(() =>
	import('@/components/ComboBox/Asincrono/CityComboBox').then(m => ({ default: m.CityCombobox }))
)
const StateCombobox = lazy(() =>
	import('@/components/ComboBox/Sincrono/StateComboBox').then(m => ({ default: m.StateCombobox }))
)
const ModelCombobox = lazy(() =>
	import('@/components/ComboBox/Asincrono/ModelComboBox').then(m => ({
		default: m.ModelCombobox
	}))
)
const BrandCombobox = lazy(() =>
	import('@/components/ComboBox/Asincrono/BrandComboBox').then(m => ({
		default: m.BrandCombobox
	}))
)
const StatusCombobox = lazy(() =>
	import('@/components/ComboBox/Sincrono/StatusComboBox').then(m => ({
		default: m.StatusCombobox
	}))
)
const DirectivaCombobox = lazy(() =>
	import('@/components/ComboBox/Sincrono/DirectivaComboBox').then(m => ({
		default: m.DirectivaCombobox
	}))
)
const VicepresidenciaEjecutivaCombobox = lazy(() =>
	import('@/components/ComboBox/Sincrono/VicepresidenciaEjecutivaComboBox').then(m => ({
		default: m.VicepresidenciaEjecutivaCombobox
	}))
)
const VicepresidenciaCombobox = lazy(() =>
	import('@/components/ComboBox/Sincrono/VicepresidenciaComboBox').then(m => ({
		default: m.VicepresidenciaCombobox
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
	directivaId,
	vicepresidenciaEjecutivaId,
	vicepresidenciaId,
	handleChange
}: {
	activo?: string
	statusId?: string
	brandId?: string
	modelId?: string
	categoryId?: string
	directivaId?: string
	vicepresidenciaEjecutivaId?: string
	vicepresidenciaId?: string
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

			<Suspense fallback={<InputFallback />}>
				<StatusCombobox handleChange={handleChange} name="statusId" value={statusId} />
			</Suspense>

			<Suspense fallback={<InputFallback />}>
				<BrandCombobox handleChange={handleChange} name="brandId" value={brandId} />
			</Suspense>

			<Suspense fallback={<InputFallback />}>
				<ModelCombobox
					handleChange={handleChange}
					brandId={brandId}
					categoryId={categoryId}
					name="modelId"
					value={modelId}
				/>
			</Suspense>

			<Suspense fallback={<InputFallback />}>
				<StateCombobox
					handleChange={handleChange}
					name="stateId"
					regionId={regionId}
					value={stateId}
				/>
			</Suspense>

			<Suspense fallback={<InputFallback />}>
				<CityCombobox
					handleChange={handleChange}
					name="cityId"
					stateId={stateId}
					regionId={regionId}
					value={cityId}
				/>
			</Suspense>
			<Suspense fallback={<InputFallback />}>
				<DirectivaCombobox
					name="directivaId"
					handleChange={handleChange}
					value={directivaId}
				/>
			</Suspense>
			<Suspense fallback={<InputFallback />}>
				<VicepresidenciaEjecutivaCombobox
					name="vicepresidenciaEjecutivaId"
					handleChange={handleChange}
					value={vicepresidenciaEjecutivaId}
					directivaId={directivaId}
				/>
			</Suspense>
			<Suspense fallback={<InputFallback />}>
				<VicepresidenciaCombobox
					name="vicepresidenciaId"
					handleChange={handleChange}
					value={vicepresidenciaId}
					vicepresidenciaEjecutivaId={vicepresidenciaEjecutivaId}
				/>
			</Suspense>
		</>
	)
}
