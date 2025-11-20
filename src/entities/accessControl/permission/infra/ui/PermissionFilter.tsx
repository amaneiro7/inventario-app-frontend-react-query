import { memo, useState } from 'react'
import { useEffectAfterMount } from '@/shared/lib/hooks/useEffectAfterMount'
import { Input } from '@/shared/ui/Input/Input'

interface PermissionFilterProps {
	name?: string
	description?: string
	handleChange: (name: string, value: string | number) => void
}

export const PermissionFilter = memo(
	({ handleChange, name, description }: PermissionFilterProps) => {
		const [localNameDate, setLocalNameDate] = useState(name ?? '')
		const [localDescriptionDate, setLocalDescriptionDate] = useState(description ?? '')

		useEffectAfterMount(() => {
			handleChange('name', localNameDate)
		}, [localNameDate])
		useEffectAfterMount(() => {
			handleChange('priority', localDescriptionDate)
		}, [localDescriptionDate])

		useEffectAfterMount(() => {
			if (!name) {
				setLocalNameDate('')
			}
		}, [name])
		useEffectAfterMount(() => {
			if (!description) {
				setLocalDescriptionDate('')
			}
		}, [description])

		return (
			<>
				<Input
					id="permissiom-name-search"
					value={localNameDate}
					label="Nombre"
					name="name"
					type="search"
					transform
					placeholder="Buscar por nombre"
					onChange={e => setLocalNameDate(e.target.value)}
				/>
				<Input
					id="permission-description-search"
					value={localDescriptionDate}
					label="Descripción"
					name="description"
					type="search"
					transform
					placeholder="Buscar por descripción"
					onChange={e => setLocalDescriptionDate(e.target.value)}
				/>
			</>
		)
	}
)

PermissionFilter.displayName = 'PermissionFilter'
