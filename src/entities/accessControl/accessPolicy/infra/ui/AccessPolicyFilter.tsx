import { lazy, memo, useState } from 'react'
import { useEffectAfterMount } from '@/shared/lib/hooks/useEffectAfterMount'
import { Input } from '@/shared/ui/Input/Input'

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
const UnidadCombobox = lazy(() =>
	import('@/entities/employee/unidad/infra/ui/UnidadComboBox').then(m => ({
		default: m.UnidadCombobox
	}))
)

interface AccessPolicyFilterProps {
	name?: string
	roleId?: string
	cargoId?: string
	unidadId?: string
	priority?: string
	handleChange: (name: string, value: string | number) => void
}

export const AccessPolicyFilter = memo(
	({ handleChange, roleId, cargoId, unidadId, name, priority }: AccessPolicyFilterProps) => {
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

				<RoleCombobox name="roleId" handleChange={handleChange} value={roleId} />

				<CargoCombobox name="cargoId" handleChange={handleChange} value={cargoId} />

				<UnidadCombobox
					name="unidadId"
					handleChange={handleChange}
					value={unidadId}
					method="search"
				/>

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
