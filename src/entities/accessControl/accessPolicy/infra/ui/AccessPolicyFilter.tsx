import { lazy, memo, Suspense, useState } from 'react'
import { useEffectAfterMount } from '@/shared/lib/hooks/useEffectAfterMount'
import { Input } from '@/shared/ui/Input/Input'
import { InputFallback } from '@/shared/ui/Loading/InputFallback'

const RoleCombobox = lazy(() =>
	import('@/entities/role/infra/ui/RoleComboBox').then(m => ({
		default: m.RoleCombobox
	}))
)
const CargoCombobox = lazy(() =>
	import('@/entities/employee/cargo/infra/ui/CargoComboBox').then(m => ({
		default: m.CargoCombobox
	}))
)

const DepartamentoCombobox = lazy(() =>
	import('@/entities/employee/departamento/infra/ui/DepartamentoComboBox').then(m => ({
		default: m.DepartamentoCombobox
	}))
)
const VicepresidenciaCombobox = lazy(() =>
	import('@/entities/employee/vicepresidencia/infra/ui/VicepresidenciaComboBox').then(m => ({
		default: m.VicepresidenciaCombobox
	}))
)
const VicepresidenciaEjecutivaCombobox = lazy(() =>
	import(
		'@/entities/employee/vicepresidenciaEjecutiva/infra/ui/VicepresidenciaEjecutivaComboBox'
	).then(m => ({
		default: m.VicepresidenciaEjecutivaCombobox
	}))
)
const DirectivaCombobox = lazy(() =>
	import('@/entities/employee/directiva/infra/ui/DirectivaComboBox').then(m => ({
		default: m.DirectivaCombobox
	}))
)

interface AccessPolicyFilterProps {
	name?: string
	roleId?: string
	cargoId?: string
	departamentoId?: string
	vicepresidenciaId?: string
	vicepresidenciaEjecutivaId?: string
	directivaId?: string
	priority?: string
	handleChange: (name: string, value: string | number) => void
}

export const AccessPolicyFilter = memo(
	({
		handleChange,
		roleId,
		cargoId,
		departamentoId,
		directivaId,
		vicepresidenciaEjecutivaId,
		vicepresidenciaId,
		name,
		priority
	}: AccessPolicyFilterProps) => {
		const [localNameDate, setLocalNameDate] = useState(name ?? '')
		const [localPriorityDate, setLocalPriorityDate] = useState(priority ?? '')

		useEffectAfterMount(() => {
			handleChange('name', localNameDate)
		}, [localNameDate])
		useEffectAfterMount(() => {
			handleChange('priority', localPriorityDate)
		}, [localPriorityDate])

		useEffectAfterMount(() => {
			if (!name) {
				setLocalNameDate('')
			}
		}, [name])
		useEffectAfterMount(() => {
			if (!priority) {
				setLocalPriorityDate('')
			}
		}, [priority])

		return (
			<>
				<Input
					id="access-policy-name-search"
					value={localNameDate}
					label="Nombre"
					name="name"
					type="search"
					transform
					placeholder="Buscar por nombre"
					onChange={e => setLocalNameDate(e.target.value)}
				/>
				<Suspense fallback={<InputFallback />}>
					<RoleCombobox name="roleId" handleChange={handleChange} value={roleId} />
				</Suspense>
				<Suspense fallback={<InputFallback />}>
					<CargoCombobox name="cargoId" handleChange={handleChange} value={cargoId} />
				</Suspense>
				<Suspense fallback={<InputFallback />}>
					<DepartamentoCombobox
						name="departamentoId"
						directivaId={directivaId}
						vicepresidenciaId={vicepresidenciaId}
						vicepresidenciaEjecutivaId={vicepresidenciaEjecutivaId}
						handleChange={handleChange}
						value={departamentoId}
					/>
				</Suspense>
				<Suspense fallback={<InputFallback />}>
					<VicepresidenciaCombobox
						name="vicepresidenciaId"
						directivaId={directivaId}
						vicepresidenciaEjecutivaId={vicepresidenciaEjecutivaId}
						handleChange={handleChange}
						value={vicepresidenciaId}
					/>
				</Suspense>
				<Suspense fallback={<InputFallback />}>
					<VicepresidenciaEjecutivaCombobox
						name="vicepresidenciaEjecutivaId"
						directivaId={directivaId}
						handleChange={handleChange}
						value={vicepresidenciaEjecutivaId}
					/>
				</Suspense>
				<Suspense fallback={<InputFallback />}>
					<DirectivaCombobox
						name="directivaId"
						handleChange={handleChange}
						value={directivaId}
					/>
				</Suspense>
				<Input
					id="access-policy-priority-search"
					value={localPriorityDate}
					label="Prioridad"
					name="priority"
					type="search"
					transform
					placeholder="Buscar por prioridad"
					onChange={e => setLocalPriorityDate(e.target.value)}
				/>
			</>
		)
	}
)

AccessPolicyFilter.displayName = 'AccessPolicyFilter'
