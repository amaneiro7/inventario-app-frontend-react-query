import { lazy } from 'react'
import { Input } from '@/shared/ui/Input/Input'
import { Divider } from '../../../shared/ui/Divider'
import { useDevicePrimaryFilter } from '../model/useDevicePrimaryFilter'

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
const CargoCombobox = lazy(() =>
	import('@/entities/employee/cargo/infra/ui/CargoComboBox').then(m => ({
		default: m.CargoCombobox
	}))
)
const DirectivaCombobox = lazy(() =>
	import('@/entities/employee/directiva/infra/ui/DirectivaComboBox').then(m => ({
		default: m.DirectivaCombobox
	}))
)
const VicepresidenciaEjecutivaCombobox = lazy(() =>
	import('@/entities/employee/vicepresidenciaEjecutiva/infra/ui/VicepresidenciaEjecutivaComboBox').then(
		m => ({
			default: m.VicepresidenciaEjecutivaCombobox
		})
	)
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
	departamentoId,
	cargoId,
	vicepresidenciaEjecutivaId,
	vicepresidenciaId,
	handleChange
}: {
	activo?: string
	statusId?: string
	brandId?: string
	modelId?: string
	categoryId?: string
	cargoId?: string
	departamentoId?: string
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
	const { handleActivo, localActivo } = useDevicePrimaryFilter({
		activo,
		handleChange
	})
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

			<StatusCombobox handleChange={handleChange} name="statusId" value={statusId} />

			<BrandCombobox
				handleChange={handleChange}
				name="brandId"
				value={brandId}
				mainCategoryId={mainCategoryId}
			/>

			<ModelCombobox
				handleChange={handleChange}
				brandId={brandId}
				categoryId={categoryId}
				mainCategoryId={mainCategoryId}
				name="modelId"
				value={modelId}
			/>

			<Divider />

			<StateCombobox
				handleChange={handleChange}
				name="stateId"
				regionId={regionId}
				administrativeRegionId={administrativeRegionId}
				value={stateId}
			/>

			<CityCombobox
				handleChange={handleChange}
				name="cityId"
				stateId={stateId}
				regionId={regionId}
				administrativeRegionId={administrativeRegionId}
				value={cityId}
			/>

			<Divider />

			<DirectivaCombobox name="directivaId" handleChange={handleChange} value={directivaId} />

			<VicepresidenciaEjecutivaCombobox
				name="vicepresidenciaEjecutivaId"
				handleChange={handleChange}
				value={vicepresidenciaEjecutivaId}
				directivaId={directivaId}
			/>

			<VicepresidenciaCombobox
				name="vicepresidenciaId"
				handleChange={handleChange}
				value={vicepresidenciaId}
				directivaId={directivaId}
				vicepresidenciaEjecutivaId={vicepresidenciaEjecutivaId}
			/>

			<CargoCombobox
				name="cargoId"
				handleChange={handleChange}
				value={cargoId}
				directivaId={directivaId}
				departamentoId={departamentoId}
				vicepresidenciaEjecutivaId={vicepresidenciaEjecutivaId}
				vicepresidenciaId={vicepresidenciaId}
			/>
		</>
	)
}
