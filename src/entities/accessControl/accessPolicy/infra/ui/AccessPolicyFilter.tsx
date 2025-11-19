import { lazy, memo, Suspense, useState } from 'react'
import { useEffectAfterMount } from '@/shared/lib/hooks/useEffectAfterMount'
import { Input } from '@/shared/ui/Input/Input'
import { InputFallback } from '@/shared/ui/Loading/InputFallback'

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

interface AccessPolicyFilterProps {
	name?: string
	cargoId?: string
	departamentoId?: string
	priority?: string
	handleChange: (name: string, value: string | number) => void
}

export const AccessPolicyFilter = memo(
	({ handleChange, cargoId, departamentoId, name, priority }: AccessPolicyFilterProps) => {
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
					<DepartamentoCombobox
						name="departamentoId"
						handleChange={handleChange}
						value={departamentoId}
					/>
				</Suspense>
				<Suspense fallback={<InputFallback />}>
					<CargoCombobox name="cargoId" handleChange={handleChange} value={cargoId} />
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
