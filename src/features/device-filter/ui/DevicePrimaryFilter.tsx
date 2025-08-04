import { lazy, Suspense, useCallback, useState } from 'react'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { useEffectAfterMount } from '@/shared/lib/hooks/useEffectAfterMount'
import { Input } from '@/shared/ui/Input/Input'
import { InputFallback } from '@/shared/ui/Loading/InputFallback'
import { Divider } from '../../../shared/ui/Divider'

const CityCombobox = lazy(() =>
	import('@/entities/locations/city/infra/ui/CityComboBox').then(m => ({
		default: m.CityCombobox
	}))
)
const StateCombobox = lazy(() =>
	import('@/entities/locations/state/infra/ui/StateComboBox').then(m => ({
		default: m.StateCombobox
	}))
)
const ModelCombobox = lazy(() =>
	import('@/entities/model/models/infra/ui/ModelComboBox').then(m => ({
		default: m.ModelCombobox
	}))
)
const BrandCombobox = lazy(() =>
	import('@/entities/brand/infra/ui/BrandComboBox').then(m => ({
		default: m.BrandCombobox
	}))
)
const StatusCombobox = lazy(() =>
	import('@/entities/status/status/infra/ui/StatusComboBox').then(m => ({
		default: m.StatusCombobox
	}))
)
const DirectivaCombobox = lazy(() =>
	import('@/entities/employee/directiva/infra/ui/DirectivaComboBox').then(m => ({
		default: m.DirectivaCombobox
	}))
)
const VicepresidenciaEjecutivaCombobox = lazy(() =>
	import(
		'@/entities/employee/vicepresidenciaEjecutiva/infra/ui/VicepresidenciaEjecutivaComboBox'
	).then(m => ({
		default: m.VicepresidenciaEjecutivaCombobox
	}))
)
const VicepresidenciaCombobox = lazy(() =>
	import('@/entities/employee/vicepresidencia/infra/ui/VicepresidenciaComboBox').then(m => ({
		default: m.VicepresidenciaCombobox
	}))
)

export function DevicePrimaryFilter({
	activo,
	statusId,
	brandId,
	modelId,
	stateId,
	cityId,
	categoryId,
	mainCategoryId,
	regionId,
	administrativeRegionId,
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
	mainCategoryId?: string
	directivaId?: string
	vicepresidenciaEjecutivaId?: string
	vicepresidenciaId?: string
	stateId?: string
	administrativeRegionId?: string
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
				id="activo-search"
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
				<BrandCombobox
					handleChange={handleChange}
					name="brandId"
					value={brandId}
					mainCategoryId={mainCategoryId}
				/>
			</Suspense>

			<Suspense fallback={<InputFallback />}>
				<ModelCombobox
					handleChange={handleChange}
					brandId={brandId}
					categoryId={categoryId}
					mainCategoryId={mainCategoryId}
					name="modelId"
					value={modelId}
				/>
			</Suspense>

			<Divider />
			<Suspense fallback={<InputFallback />}>
				<StateCombobox
					handleChange={handleChange}
					name="stateId"
					regionId={regionId}
					administrativeRegionId={administrativeRegionId}
					value={stateId}
				/>
			</Suspense>

			<Suspense fallback={<InputFallback />}>
				<CityCombobox
					handleChange={handleChange}
					name="cityId"
					stateId={stateId}
					regionId={regionId}
					administrativeRegionId={administrativeRegionId}
					value={cityId}
				/>
			</Suspense>
			<Divider />
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
					directivaId={directivaId}
					vicepresidenciaEjecutivaId={vicepresidenciaEjecutivaId}
				/>
			</Suspense>
		</>
	)
}
